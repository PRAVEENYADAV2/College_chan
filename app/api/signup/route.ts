import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import pool from '@/lib/db'; // Assuming you have set up a DB connection in `lib/db`

export async function POST(request: Request) {
  try {
    const { username, email, password, role } = await request.json();

    // Validate the input
    if (!username || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Hash the password
    const password_hash = await bcrypt.hash(password, 10);

    // Database query to insert the new moderator
    const query = `
      INSERT INTO moderators (username, email, password_hash, role, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;

    // Run the query (assuming you are using MySQL or similar with `pool`)
    const result = await pool.query(query, [username, email, password_hash, role]);

    return NextResponse.json(
      { message: 'Moderator created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating moderator:', error);
    return NextResponse.json(
      { error: 'Failed to create moderator' },
      { status: 500 }
    );
  }
}
