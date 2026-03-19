import { NextRequest, NextResponse } from "next/server";
import { db, leadsTable } from "@/lib/db";
import { eq, desc, sql, and, gte, lte, ilike, or } from "drizzle-orm";

function formatLead(lead: typeof leadsTable.$inferSelect) {
  const nameParts = lead.clientName.split(" ");
  const maskedName =
    nameParts.length > 1
      ? `${nameParts[0][0]}. ${nameParts[nameParts.length - 1]}`
      : lead.clientName;
  return {
    id: lead.id,
    title: lead.title,
    description: lead.description,
    category: lead.category,
    location: `${lead.city}, ${lead.state}`,
    city: lead.city,
    state: lead.state,
    budgetMin: lead.budgetMin,
    budgetMax: lead.budgetMax,
    timeline: lead.timeline,
    startDate: lead.startDate || null,
    isUrgent: lead.isUrgent,
    isVerified: lead.isVerified,
    interestedCount: lead.interestedCount,
    tags: lead.tags as string[],
    clientName: maskedName,
    postedAt: lead.postedAt.toISOString(),
    expiresAt: lead.expiresAt ? lead.expiresAt.toISOString() : null,
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(50, parseInt(searchParams.get("limit") || "12"));
    const offset = (page - 1) * limit;
    const category = searchParams.get("category") || "";
    const location = searchParams.get("location") || "";
    const search = searchParams.get("search") || "";
    const minBudget = searchParams.get("minBudget") || "";
    const maxBudget = searchParams.get("maxBudget") || "";

    const conditions = [];
    if (category) conditions.push(eq(leadsTable.category, category));
    if (location) {
      conditions.push(
        or(
          ilike(leadsTable.city, `%${location}%`),
          ilike(leadsTable.state, `%${location}%`)
        )!
      );
    }
    if (minBudget) conditions.push(gte(leadsTable.budgetMax, parseInt(minBudget)));
    if (maxBudget) conditions.push(lte(leadsTable.budgetMin, parseInt(maxBudget)));
    if (search) {
      conditions.push(
        or(
          ilike(leadsTable.title, `%${search}%`),
          ilike(leadsTable.description, `%${search}%`)
        )!
      );
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [leads, [{ count }]] = await Promise.all([
      db
        .select()
        .from(leadsTable)
        .where(where)
        .orderBy(desc(leadsTable.postedAt))
        .limit(limit)
        .offset(offset),
      db.select({ count: sql<number>`count(*)` }).from(leadsTable).where(where),
    ]);

    const total = Number(count);
    return NextResponse.json({
      leads: leads.map(formatLead),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("GET /api/leads error:", err);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title, description, category, city, state,
      budgetMin, budgetMax, timeline, startDate,
      isUrgent, tags, clientName, clientEmail, clientPhone,
    } = body;

    const [lead] = await db
      .insert(leadsTable)
      .values({
        title,
        description,
        category,
        city,
        state,
        budgetMin,
        budgetMax,
        timeline,
        startDate: startDate || null,
        isUrgent: isUrgent || false,
        isVerified: false,
        interestedCount: 0,
        tags: tags || [],
        clientName,
        clientEmail,
        clientPhone: clientPhone || null,
      })
      .returning();

    return NextResponse.json(formatLead(lead), { status: 201 });
  } catch (err) {
    console.error("POST /api/leads error:", err);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
