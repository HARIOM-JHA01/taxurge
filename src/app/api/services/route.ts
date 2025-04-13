import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET - Public endpoint to fetch all services
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("taxurgedb");
        const services = await db.collection("services").find({}).toArray();
        return NextResponse.json({ services });
    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
