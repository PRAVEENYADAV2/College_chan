import pool from './db';
import fs from 'fs';
import path from 'path';

export default async function getStats() {
    try {
        // Get total posts from the database
        const [posts] = await pool.query(`SELECT COUNT(id) AS total_posts FROM threads`);

        // Get the size of the public folder
        const publicFolderPath = path.join(process.cwd(), 'public'); // Use process.cwd() to get the root directory
        console.log(publicFolderPath)
        const totalStorageUsed = getFolderSize(publicFolderPath);

        return {
            total_posts: posts[0].total_posts,
            total_storage_used: totalStorageUsed,
        };

    } catch (error) {
        console.error('Error fetching stats:', error);
        throw new Error('Could not fetch stats');
    }
}

// Helper function to calculate folder size
function getFolderSize(dir: string) {
    let totalSize = 0;

    // Recursively calculate the size of all files in the directory
    function getSize(filePath: fs.PathLike) {
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
            totalSize += stats.size; // Add file size to total
        } else if (stats.isDirectory()) {
            const files = fs.readdirSync(filePath);
            files.forEach(file => getSize(path.join(filePath, file))); // Recursive call for directories
        }
    }

    getSize(dir);
    // return totalSize; // Size in bytes
    return Math.round(totalSize/1024**2); // Size in Mega Bytes
}
