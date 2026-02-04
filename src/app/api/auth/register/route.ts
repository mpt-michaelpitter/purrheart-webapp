import { NextResponse } from "next/server";
import { addUser } from "@/lib/auth-store";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const newUser = addUser({ name, email, password });

        // Return user without password
        const { password: _, ...userSafe } = newUser;

        return NextResponse.json({ success: true, user: userSafe });
    } catch (e: any) {
        return NextResponse.json({ error: e.message || "Registration failed" }, { status: 400 });
    }
}
