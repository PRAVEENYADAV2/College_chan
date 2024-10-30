import pool from './db';

export default async function getBoards(board_id: number) {
    try {
        // Use parameterized query to avoid SQL injection
        const [rows] = await pool.query(
            `SELECT id, CONCAT(SUBSTRING(title, 1, 50), ' . . . ') AS title, image_path, CONCAT(SUBSTRING(content, 1, 200),' . . . ') AS content FROM threads WHERE board_id = ? ORDER BY created_at DESC`,
            [board_id]
        );

        const [board_rows] = await pool.query('SELECT * FROM boards WHERE id = ?', [board_id]);
        return [rows, board_rows]; // Return the threads for the given board
    } catch (error) {
        console.error('Error fetching boards:', error);
        throw new Error('Could not fetch boards');
    }
}
