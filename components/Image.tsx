"use client";
import { CldImage } from 'next-cloudinary';

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Page({ src }: { src: string }) {
    return (
        <CldImage
            src={src} // Omit the file extension for Cloudinary public ID
            width={400} // Set a fixed width
            height={100} // Allow height to be auto
            alt="Description of the image" // Add meaningful alt text
        />
    );
}
