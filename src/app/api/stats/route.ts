import { NextResponse } from "next/server";
import { db, leadsTable } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(leadsTable);
    return NextResponse.json({
      totalLeads: Number(result.count),
      totalContractors: 4820,
      totalProjectsCompleted: 12300,
      averageResponseTime: "< 2 hours",
    });
  } catch (err) {
    console.error("GET /api/stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
