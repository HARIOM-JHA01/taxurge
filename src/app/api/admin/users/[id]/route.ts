import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const cookieStore = cookies();
        const adminAuthCookie = cookieStore.get("admin_auth");
        if (!adminAuthCookie) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = params;
        const { fullName, email } = await request.json();

        console.log("Received data:", { id, fullName, email });

        // Validate input
        if (!fullName || !email) {
            return NextResponse.json(
                { message: "Name and email are required" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("taxurgedb"); // Specify correct database name

        // Find user first to verify existence
        const user = await db.collection("users").findOne({
            _id: new ObjectId(id),
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Update user
        const result = await db.collection("users").updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    fullName,
                    email,
                    updatedAt: new Date(),
                },
            }
        );
        return NextResponse.json(
            {
                message: "User updated successfully",
                user: {
                    _id: id,
                    fullName,
                    email,
                    updatedAt: new Date(),
                },
            },
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

export async function DELETE(
    request: Request,
    { params }: { params: { userId: string } }
) {
    const cookieStore = cookies();
    const adminAuthCookie = cookieStore.get("admin_auth");
    if (!adminAuthCookie) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const { userId } = params;
        const client = await clientPromise;
        const db = client.db("taxurgedb");

        const result = await db.collection("users").deleteOne({
            _id: new ObjectId(userId),
        });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
