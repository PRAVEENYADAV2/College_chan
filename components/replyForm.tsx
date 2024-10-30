"use client";

import axios from "axios";
import { useState, useRef, useEffect } from "react";
import imageCompression from 'browser-image-compression';

export default function ReplyForm({ threadId, whomToReply }: { threadId: number; whomToReply: string }) {
    const [showForm, setShowForm] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleReplySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const mediaFiles = formData.getAll("media") as File[];
        const compressedFiles = await Promise.all(
            mediaFiles.map(async (file) => {
                // Define compression options
                const options = {
                    maxSizeMB: 0.2, // Maximum file size in MB
                    maxWidthOrHeight: 1024, // Maximum width or height
                    useWebWorker: true,
                };

                try {
                    const compressedFile = await imageCompression(file, options);
                    return compressedFile;
                } catch (error) {
                    console.error('Error compressing file:', error);
                    return file; // Fallback to original if compression fails
                }
            })
        );
        // Append compressed files to FormData
        compressedFiles.forEach((file) => {
            formData.append("media", file);
        });

        // Remove original media files from FormData
        formData.delete("media");
        compressedFiles.forEach((file) => {
            formData.append("media", file);
        });

        // Handle the form submission here (call your API to submit reply)
        console.log("Submitted reply for thread:", threadId, "with content:", replyContent, "to", whomToReply);
        try {
            const response = await axios.post(`/api/post-reply/${threadId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Form submitted successfully:', response.data);
            window.location.href = `${window.location.origin}/thread/${threadId}`;
        } catch (error) {
            console.error('Error submitting form:', error);
        }

        // Reset the form and hide it after submission
        setReplyContent("");
        setImage(null);
        setShowForm(false);
    };

    useEffect(() => {
        if (showForm && textareaRef.current) {
            setReplyContent(`>>> ${whomToReply}  `);
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(replyContent.length, replyContent.length);
        }
    }, [showForm, whomToReply]);

    return (
        <div className="mt-2">
            <button
                className="bg-gray-100 dark:bg-blue-800 p-2 h-fit rounded-lg"
                onClick={() => {
                    setShowForm(!showForm);
                }}
            >
                {showForm ? "Cancel" : "Reply"}
            </button>

            {showForm && (
                <form onSubmit={handleReplySubmit} className="mt-4">
                    <textarea
                        ref={textareaRef}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Type your reply..."
                        className="w-full p-2 border rounded mb-2 dark:bg-gray-900"
                        rows={3}
                        name="content"
                        required
                    ></textarea>

                    <input
                        type="file"
                        accept="image/*"
                        name="media"
                        className="ml-2 border rounded p-1"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded ml-2">
                        Submit Reply
                    </button>
                </form>
            )}
        </div>
    );
}
