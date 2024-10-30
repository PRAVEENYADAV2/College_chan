import pool from './db'; // Make sure this path is correct based on your project structure

export default async function getBoards() {
    try {
        const [rows] = await pool.query('SELECT * FROM boards');
        return rows; // Return the active boards
    } catch (error) {
        console.error('Error fetching boards:', error);
        throw new Error('Could not fetch boards');
    }
}
