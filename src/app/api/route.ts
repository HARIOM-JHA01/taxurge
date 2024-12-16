import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
    console.log(req.url);
    return NextResponse.json({ message: "Hello World" });
    }