import { NextResponse } from 'next/server';
import getThreads from '@/lib/getThreads';
import axios from 'axios';
import { NextRequest } from 'next/server';
import pool from '@/lib/db';

interface Params {
  board_id: string;
}

// This function extracts the board_id from the request URL
export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { board_id } = params;
  const [threads, board_data] = await getThreads(+board_id);
  return NextResponse.json({ threads, board_data });
}

export async function POST(req: NextRequest, { params }: { params: { board_id: string } }) {
  try {
    const { board_id } = params;

    // Extract IP address
    const ip_address = req.headers.get('x-forwarded-for') || req.ip || '0.0.0.0'; // Fallback to '0.0.0.0' if no IP found

    const formData = await req.formData();
    const file = formData.get("media") as File; // Expect a single file upload
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const username = formData.get('username') as string;

    let image_path = null;

    if (file && file.size) {
      // Prepare the upload to Cloudinary
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "college_chan"); // Your Cloudinary upload preset
      uploadData.append("quality", "auto:eco"); // Set quality to auto:eco
      uploadData.append("fetch_format", "auto"); // Optional: Use auto for fetch format

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`; // Your Cloudinary cloud name

      // Upload the image to Cloudinary
      const uploadResponse = await axios.post(cloudinaryUrl, uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Get the secure URL from the response
      image_path = uploadResponse.data.secure_url;
    }

    const data = [board_id, title, ip_address, image_path, content, username]; // Include ip_address in your data array
    const query = `
      INSERT INTO threads (board_id, title, ip_address, image_path, content, username)
      VALUES (?, ?, ?, ?, ? ,?)
    `;

    // Run the query (assuming you are using MySQL or similar with `pool`)
    const result = await pool.query(query, data);

    return NextResponse.json({ Message: "Success", status: 201, data, result });

  } catch (error: unknown) {
    console.error('Error processing form:', error);
    return NextResponse.json({ error: 'Error processing form', details: error.message }, { status: 500 });
  }
}



// import { NextResponse } from 'next/server';
// import { NextRequest } from 'next/server';
// import pool from '@/lib/db';

