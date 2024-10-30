import { NextResponse } from 'next/server';
import getBoards from '@/lib/getBoards'; // Adjust the import based on your structure

export async function GET() {
    try {
        const boards = await getBoards();
        return NextResponse.json(boards);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Failed to fetch boards' }, { status: 500 });
    }
}
