import pool from './db';

export default async function getTopEightThreads() {
    try {
        // Parameterized query to get top 8 threads by most replies along with board name
        const [rows]: object[] = await pool.query(`
            SELECT 
                threads.id, 
                boards.name, 
                threads.title, 
                threads.image_path, 
                CONCAT(SUBSTRING(threads.content, 1, 30), ' . . . . ') AS content,
                COUNT(replies.id) AS reply_count
            FROM 
                threads
            LEFT JOIN 
                replies ON threads.id = replies.thread_id
            JOIN 
                boards ON boards.id = threads.board_id
            GROUP BY 
                threads.id, boards.name, threads.title, threads.image_path, threads.content
            ORDER BY 
                reply_count DESC
            LIMIT 8
        `);

        return rows;
    } catch (error) {
        console.error('Error fetching top threads:', error);
        throw new Error('Could not fetch top threads');
    }
}
