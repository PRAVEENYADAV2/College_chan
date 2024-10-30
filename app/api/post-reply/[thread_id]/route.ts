// import { NextResponse, NextRequest } from 'next/server';
// import path from "path";
// import { writeFile } from "fs/promises";
// import pool from '@/lib/db';

// export async function POST(req: NextRequest, { params }: { params: { thread_id: string } }) {
//     try {
//         const { thread_id } = params;

//         // Extract IP address
//         const ip_address = req.headers.get('x-forwarded-for') || req.ip || '0.0.0.0'; // Fallback to '0.0.0.0' if no IP found

//         // Parse the form data
//         const formData = await req.formData();
//         const content = formData.get('content') as string;

//         // Extract the file if it exists
//         const file = formData.get("media") as File | null;

//         let image_path = null;

//         if (file?.size) {
//             // Proceed with the image upload logic only if a file exists
//             const buffer = Buffer.from(await file.arrayBuffer());
//             const filename = Date.now() + file.name.replaceAll(" ", "_");

//             try {
//                 // Save the file to the server
//                 await writeFile(
//                     path.join(process.cwd(), "/public/uploads/" + filename),
//                     buffer
//                 );
//                 image_path = `/uploads/${filename}`; // Construct the image path for database storage
//             } catch (error) {
//                 console.error("Error saving file:", error);
//                 return NextResponse.json({ message: "Failed to upload image", status: 500 });
//             }
//         }

//         // Prepare the data for the database
//         const data = [thread_id, ip_address, content, image_path];
//         const query = `
//             INSERT INTO replies (thread_id, ip_address, content, image_path)
//             VALUES (?, ?, ?, ?)
//         `;

//         // Run the query (assuming MySQL or a similar database)
//         const result = await pool.query(query, data);

//         // Return success response
//         return NextResponse.json({ message: "Success", status: 201, data, result });

//     } catch (error: unknown) {
//         console.error("Error occurred:", error);

//         // Check if the error is an instance of Error
//         if (error instanceof Error) {
//             return NextResponse.json(
//                 { error: 'Error processing form', details: error.message },
//                 { status: 500 }
//             );
//         } else {
//             // Handle case where error is not an Error object
//             return NextResponse.json(
//                 { error: 'Unknown error occurred' },
//                 { status: 500 }
//             );
//         }
//     }
// }
import { NextResponse, NextRequest } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: NextRequest, { params }: { params: { thread_id: string } }) {
    try {
        const { thread_id } = params;

        // Extract IP address
        const ip_address = req.headers.get('x-forwarded-for') || req.ip || '0.0.0.0';

        // Parse the form data
        const formData = await req.formData();
        const content = formData.get('content') as string;

        // Extract the file if it exists
        const file = formData.get("media") as File | null;

        let image_url = null;

        if (file && file.size) {
            // Proceed with the image upload logic only if a file exists
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = Date.now() + file.name.replaceAll(" ", "_");

            try {
                // Prepare the form data for Cloudinary upload
                const cloudinaryFormData = new FormData();
                cloudinaryFormData.append('file', new Blob([buffer]), filename);
                cloudinaryFormData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET); // Use a preset for security

                // Upload the image to Cloudinary
                const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: cloudinaryFormData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload image to Cloudinary');
                }

                const uploadResult = await response.json();
                image_url = uploadResult.secure_url; // Get the secure URL of the uploaded image
            } catch (error) {
                console.error("Error uploading image:", error);
                return NextResponse.json({ message: "Failed to upload image", status: 500 });
            }
        }

        // Prepare the data for the database
        const data = [thread_id, ip_address, content, image_url];
        const query = `
            INSERT INTO replies (thread_id, ip_address, content, image_path)
            VALUES (?, ?, ?, ?)
        `;

        // Run the query (assuming MySQL or a similar database)
        const result = await pool.query(query, data);

        // Return success response
        return NextResponse.json({ message: "Success", status: 201, data, result });

    } catch (error: unknown) {
        console.error("Error occurred:", error);

        if (error instanceof Error) {
            return NextResponse.json(
                { error: 'Error processing form', details: error.message },
                { status: 500 }
            );
        } else {
            return NextResponse.json(
                { error: 'Unknown error occurred' },
                { status: 500 }
            );
        }
    }
}