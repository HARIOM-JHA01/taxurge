import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";

// POST - Create new service
export async function POST(request: Request) {
    try {
        const cookieStore = cookies();
        const adminAuthCookie = cookieStore.get("admin_auth");
        if (!adminAuthCookie) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const service = await request.json();
        const client = await clientPromise;
        const db = client.db("taxurgedb");

        const result = await db.collection("services").insertOne({
            ...service,
            createdAt: new Date(),
        });

        return NextResponse.json({
            message: "Service created successfully",
            service: { ...service, _id: result.insertedId },
        });
    } catch (error) {
        console.error("Error creating service:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
