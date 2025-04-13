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
        const updates = await request.json();

        const client = await clientPromise;
        const db = client.db("taxurgedb");

        const result = await db
            .collection("services")
            .updateOne(
                { _id: new ObjectId(id) },
                { $set: { ...updates, updatedAt: new Date() } }
            );

        if (result.matchedCount === 0) {
            return NextResponse.json(
                { message: "Service not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Service updated successfully" });
    } catch (error) {
        console.error("Error updating service:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
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
        const client = await clientPromise;
        const db = client.db("taxurgedb");

        const result = await db.collection("services").deleteOne({
            _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { message: "Service not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Service deleted successfully" });
    } catch (error) {
        console.error("Error deleting service:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
