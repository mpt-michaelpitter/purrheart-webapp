
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// Simple in-memory rate limiter for development
// Note: In production serverless/edge environments, use Redis (e.g., @upstash/ratelimit)
const rateLimitMap = new Map();

function rateLimit(ip: string) {
    const now = Date.now();
    const windowSize = 60 * 1000; // 1 minute
    const limit = 20; // 20 requests per minute

    const record = rateLimitMap.get(ip) || { count: 0, startTime: now };

    if (now - record.startTime > windowSize) {
        record.count = 1;
        record.startTime = now;
    } else {
        record.count += 1;
    }

    rateLimitMap.set(ip, record);
    return record.count > limit;
}

export async function middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || (request as { ip?: string }).ip || '127.0.0.1' || '192.168.18.3';

    // Rate Limit API routes
    if (request.nextUrl.pathname.startsWith('/api/')) {
        if (rateLimit(ip)) {
            return new NextResponse('Too Many Requests', { status: 429 });
        }
    }

    const response = NextResponse.next();

    // Security Headers
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Content-Security-Policy', "default-src 'self' https://app.sandbox.midtrans.com https://app.midtrans.com https://cdn.sanity.io; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.sandbox.midtrans.com https://app.midtrans.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https://app.sandbox.midtrans.com https://app.midtrans.com https://*.sanity.io wss://*.sanity.io;");

    return response;
}

export const config = {
    matcher: '/api/:path*',
};
