import { NextRequest, NextResponse } from "next/server";
import { PRODUCTS } from "@/constants/products";

export async function GET() {
  try {
    return NextResponse.json(PRODUCTS);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // For now, just return the static products
    // In a real app, you would save to a database
    return NextResponse.json({ message: "Product creation not implemented with static data" }, { status: 501 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
