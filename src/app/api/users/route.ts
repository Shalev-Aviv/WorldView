import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, username } = body;

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
            },
        });
        return new Response(JSON.stringify(newUser), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return new Response(JSON.stringify({ message: 'Error creating user' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}