import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || typeof email !== 'string' || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      return new Response(JSON.stringify({ message: 'Please enter a valid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return new Response(JSON.stringify({ message: 'Password must be at least 6 characters.' }), {
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