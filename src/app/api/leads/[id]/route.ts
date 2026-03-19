import { NextRequest, NextResponse } from "next/server";
import { db, leadsTable } from "@/lib/db";
import { eq } from "drizzle-orm";

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

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: rawId } = await params;
    const id = parseInt(rawId);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid lead id" }, { status: 400 });
    }
    const [lead] = await db.select().from(leadsTable).where(eq(leadsTable.id, id));
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json(formatLead(lead));
  } catch (err) {
    console.error("GET /api/leads/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch lead" }, { status: 500 });
  }
}
