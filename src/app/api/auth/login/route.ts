import { NextResponse } from "next/server";
import { validateUser } from "@/lib/auth-store";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const user = validateUser(email, password);

        if (user) {
            return NextResponse.json({ success: true, user });
        } else {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
    } catch (e) {
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}
