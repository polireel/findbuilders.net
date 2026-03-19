import { NextRequest, NextResponse } from "next/server";
import { db, leadsTable } from "@/lib/db";
import { eq } from "drizzle-orm";

export async function POST(
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

    await db
      .update(leadsTable)
      .set({ interestedCount: lead.interestedCount + 1 })
      .where(eq(leadsTable.id, id));

    return NextResponse.json({
      leadId: lead.id,
      clientName: lead.clientName,
      clientEmail: lead.clientEmail,
      clientPhone: lead.clientPhone || null,
      address: `${lead.city}, ${lead.state}`,
    });
  } catch (err) {
    console.error("POST /api/leads/[id]/contact error:", err);
    return NextResponse.json({ error: "Failed to contact lead" }, { status: 500 });
  }
}
