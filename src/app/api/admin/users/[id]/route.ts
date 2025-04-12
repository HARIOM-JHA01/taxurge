import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";
export async function PUT(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        // Verify admin authentication

        const cookieStore = cookies();
        const adminAuthCookie = cookieStore.get("admin_auth");
        if (!adminAuthCookie) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { userId } = params;
        const { fullName, email } = await request.json();

        // Validate input
        if (!fullName || !email) {
            return NextResponse.json(
                { message: "Name and email are required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db();

        // Update user
        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(userId) },
            {
                $set: {
                    fullName,
                    email,
                    updatedAt: new Date(),
                },
            }
        );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "User updated successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
