import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
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

        const { userId } = params;
        const client = await clientPromise;
        const db = client.db("taxurgedb");

        const documents = await db
            .collection("documents")
            .find({ userId: new ObjectId(userId) })
            .toArray();

        return NextResponse.json({ documents });
    } catch (error) {
        console.error("Error fetching user documents:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
