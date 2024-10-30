import pool from './db';

export default async function postReply(thread_id: number, ip_address: string, content: string, image_path: string) {
    try {
        const query = `
            INSERT INTO replies (thread_id, ip_address, content, image_path)
            VALUES (?, ?, ?, ?);
        `;
        
        // Using pool to execute the query with the provided parameters
        const [result] = await pool.execute(query, [thread_id, ip_address, content, image_path]);

        // Return the result or something meaningful
        return result;
    } catch (error) {
        console.error('Error posting reply:', error);
        throw error;  // Re-throw the error for the calling function to handle
    }
}




// CREATE TABLE replies (
//     id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
//     thread_id INT NOT NULL,
//     ip_address VARCHAR(39) NOT NULL,
//     content TEXT NOT NULL,
//     image_path VARCHAR(255) DEFAULT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     status ENUM('active', 'deleted') DEFAULT 'active',
//     FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE
// );