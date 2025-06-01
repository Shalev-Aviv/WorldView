import { NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

function getToken(req: NextRequest): string {
    const authHeader = req.headers.get('authorization');
    console.log('Authorization header:', authHeader);
    const token = authHeader?.replace('Bearer ', '');
    if (!token) {
        console.error('Authorization token missing or malformed');
        throw new Error('Authorization header missing or malformed');
    }
    return token;
}

function getUserId(req: NextRequest) {
    const token = getToken(req);
    try {
        const payload = jwt.verify(token, process.env.JWT_TOKEN || 'your-secret-key') as { userId: number };
        if (typeof payload.userId !== 'number') {
            console.error('Invalid token payload: userId is not a number');
            throw new Error('Invalid token payload');
        }
        return payload.userId;
    } catch (err: unknown) {
        const errorMessage = (err instanceof Error) ? err.message : 'Token verification failed';
        console.error('Token verification error:', errorMessage);
        throw new Error('Invalid or expired token');
    }
}

export async function POST(req: NextRequest) {
    try {
        const { countryName } = await req.json();
        if (!countryName || typeof countryName !== 'string') {
            return new Response(JSON.stringify({ message: 'countryName required as string' }), { status: 400 });
        }
        const userId = getUserId(req);

        const country = await prisma.country.findUnique({ where: { name: countryName } });
        if (!country) {
            return new Response(JSON.stringify({ message: 'Country does not exist' }), { status: 400 });
        }

        await prisma.userCountryVisit.upsert({
            where: {
                userId_countryName: {
                    userId: userId,
                    countryName: countryName,
                },
            },
            update: {
                visitCount: {
                    increment: 1,
                },
            },
            create: {
                userId: userId,
                countryName: countryName,
                visitCount: 1,
            },
        });
        return new Response(JSON.stringify({ message: 'Visit count updated successfully' }), { status: 200 });
    } catch (err: unknown) {
        const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
        if (typeof err === 'object' && err !== null && 'code' in err && (err as any).code === 'P2003') {
            return new Response(JSON.stringify({ message: 'Invalid country name (foreign key constraint failed)' }), { status: 400 });
        }
        console.error('POST /api/visit-country error:', err);
        const status = (err instanceof Error && (
            errorMessage === 'Unauthorized' ||
            errorMessage.includes('token') ||
            errorMessage.includes('Authorization')
        )) ? 401 : 500;
        return new Response(JSON.stringify({ message: errorMessage }), { status });
    }
}

export async function GET(req: NextRequest) {
    try {
        const userId = getUserId(req);

        const visited = await prisma.userCountryVisit.findMany({
            where: { userId: userId },
            select: { countryName: true }
        });

        const visitedCountryNames = visited.map((v: { countryName: string }) => v.countryName);

        return new Response(JSON.stringify({ visitedCountries: visitedCountryNames }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });

    } catch (err: unknown) {
        const errorMessage = (err instanceof Error) ? err.message : 'An unknown error occurred';
        console.error('GET /api/visit-country error:', err);
        const status = (err instanceof Error && (
            errorMessage === 'Unauthorized' ||
            errorMessage.includes('token') ||
            errorMessage.includes('Authorization')
        )) ? 401 : 500;
        return new Response(JSON.stringify({ message: errorMessage }), { status });
    }
}