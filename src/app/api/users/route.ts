import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, username } = await request.json();
    if (!email || !username) {
      return new Response(JSON.stringify({ message: 'Email and username required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const newUser = await prisma.user.create({
      data: { email, username },
    });
    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error creating user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}