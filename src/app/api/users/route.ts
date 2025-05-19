import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ message: 'Email and password required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const newUser = await prisma.user.create({
      data: { email, password },
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