import { NextResponse } from "next/server";
import { db, categoriesTable } from "@/lib/db";

export async function GET() {
  try {
    const categories = await db
      .select()
      .from(categoriesTable)
      .orderBy(categoriesTable.name);
    return NextResponse.json({ categories });
  } catch (err) {
    console.error("GET /api/categories error:", err);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
