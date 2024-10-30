// 'use client';

// import { IoMdClose } from "react-icons/io";
// import { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { IoCreateOutline } from 'react-icons/io5';

// interface FormProps {
//     boardId: string;
//     onClose: () => void;
// }

// const CreatePostForm: React.FC<FormProps> = ({ boardId}) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [isDragging, setIsDragging] = useState(false);
//     const [position, setPosition] = useState({ x: 0, y: 0 });
//     const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//     const formRef = useRef<HTMLDivElement>(null);
//     const dragHandleRef = useRef<HTMLButtonElement>(null);
//     const router = useRouter();
//     const handleOpen = () => {
//         setIsOpen(true);
//     }

//     const handleClose = () => {
//         setIsOpen(false);
//     }
//     const handleMouseDown = (e: React.MouseEvent) => {
//         if (e.target === dragHandleRef.current && formRef.current) {
//             const formRect = formRef.current.getBoundingClientRect();
//             setDragOffset({
//                 x: e.clientX - formRect.left,
//                 y: e.clientY - formRect.top,
//             });
//             setIsDragging(true);
//         }
//     };

//     const handleMouseMove = (e: MouseEvent) => {
//         if (isDragging) {
//             setPosition({
//                 x: e.clientX - dragOffset.x,
//                 y: e.clientY - dragOffset.y,
//             });
//         }
//     };

//     const handleMouseUp = () => {
//         setIsDragging(false);
//     };

//     useEffect(() => {
//         if (isDragging) {
//             document.addEventListener('mousemove', handleMouseMove);
//             document.addEventListener('mouseup', handleMouseUp);
//         } else {
//             document.removeEventListener('mousemove', handleMouseMove);
//             document.removeEventListener('mouseup', handleMouseUp);
//         }

//         return () => {
//             document.removeEventListener('mousemove', handleMouseMove);
//             document.removeEventListener('mouseup', handleMouseUp);
//         };
//     }, [isDragging]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         const formData = new FormData(e.target as HTMLFormElement);

//         try {
//             const response = await axios.post(`/api/threads/${boardId}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             console.log('Form submitted successfully:', response.data);
//             window.location.href = `${window.location.origin}/posts/${boardId}`;
//         } catch (error) {
//             console.error('Error submitting form:', error);
//         }
//     };

//     return (
//         <div>
//             <button className="text-3xl dark:text-black" onClick={handleOpen}>
//                 <IoCreateOutline />
//             </button>
//             {isOpen && <div
//                 ref={formRef}
//                 className="create_post_form bg-gray-200 w-fit p-5 absolute"
//                 style={{ top: position.y, left: position.x }}
//             >
//                 <form onSubmit={handleSubmit} encType="multipart/form-data">
//                     <div className="form-header mb-2 flex justify-between">
//                         <button
//                             type="button"
//                             title="Close Form?"
//                             className="close-form p-2 bg-red-500 rounded-full text-white"
//                             onClick={handleClose}
//                         >
//                             <IoMdClose />
//                         </button>
//                         {/* Small drag button */}
//                         <button
//                             ref={dragHandleRef}
//                             onMouseDown={handleMouseDown}
//                             className="drag-btn bg-gray-500 text-white rounded-full p-1 text-xs cursor-move"
//                             style={{ cursor: 'grab' }}
//                             type="button"
//                             title="Drag Form"
//                         >
//                             ⬍
//                         </button>
//                     </div>

//                     <div className="title-field-container mb-2">
//                         <label>Title </label>
//                         <input id="form-post-title" name="title" placeholder="Title" maxLength={100} required />
//                     </div>

//                     <div className="username-field-container mb-2">
//                         <label>Username</label>
//                         <input id="form-username" name="username" placeholder="anonymous" defaultValue="anonymous" />
//                     </div>

//                     <div>
//                         <textarea
//                             id="form-content"
//                             name="content"
//                             cols={50}
//                             rows={10}
//                             spellCheck="false"
//                             style={{ height: '144px', width: '375px' }}
//                             required
//                         />
//                     </div>

//                     <input
//                         className="my-2"
//                         type="file"
//                         name="media"
//                         id="media_upload"
//                         accept=".png, .jpeg, .jpg, .webm, .mp4, .pdf, .gif, .mp3"
//                         multiple
//                     />

//                     <div>
//                         <button type="submit" id="form-submit-button" className="bg-white rounded-sm p-2">
//                             Submit
//                         </button>
//                     </div>
//                 </form>
//             </div>}
//         </div>
//     );
// };

// export default CreatePostForm;

'use client';

import { IoMdClose } from "react-icons/io";
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
// import { useRouter } from 'next/navigation';
import { IoCreateOutline } from 'react-icons/io5';
import imageCompression from 'browser-image-compression';

interface FormProps {
    boardId: string;
    onClose: () => void;
}

const CreatePostForm: React.FC<FormProps> = ({ boardId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const formRef = useRef<HTMLDivElement>(null);
    const dragHandleRef = useRef<HTMLButtonElement>(null);




    const handleOpen = () => {
        setIsOpen(true);
        if (window.innerWidth <= 600) {
            setPosition({ x: 0, y: 0 }); // Reset position when opening
        } else {
            setPosition({ x: 100, y: 100 }); // Reset position when opening

        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.target === dragHandleRef.current && formRef.current) {
            const formRect = formRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - formRect.left,
                y: e.clientY - formRect.top,
            });
            setIsDragging(true);
            e.preventDefault(); // Prevent default drag behavior
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleSubmit = async (e: React.FormEvent) => {
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

        try {
            const response = await axios.post(`/api/threads/${boardId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Form submitted successfully:', response.data);
            window.location.href = `/posts/${boardId}`;

        } catch (error) {
            console.error('Error submitting form:', error);
            alert("Error submitting form. Please try again."); // User feedback
        }
    };

    return (
        <div>
            <button className="text-3xl dark:text-black" onClick={handleOpen}>
                <IoCreateOutline />
            </button>
            {isOpen && (
                <div
                    ref={formRef}
                    className="create_post_form bg-gray-200 w-11/12 md:w-1/2 lg:w-1/3 p-2 absolute shadow-lg"
                    style={{ top: position.y, left: position.x }}
                >
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="form-header mb-2 flex justify-between items-center">
                            <button
                                type="button"
                                title="Close Form?"
                                className="close-form p-2 bg-red-500 rounded-full text-white"
                                onClick={handleClose}
                            >
                                <IoMdClose />
                            </button>
                            <button
                                ref={dragHandleRef}
                                onMouseDown={handleMouseDown}
                                className="drag-btn bg-gray-500 text-white rounded-full p-1 text-xs cursor-move"
                                type="button"
                                title="Drag Form"
                            >
                                ⬍
                            </button>
                        </div>

                        <div className="title-field-container mb-2 flex items-center gap-3">
                            <label htmlFor="form-post-title">Title</label>
                            <input
                                id="form-post-title"
                                name="title"
                                placeholder="Title"
                                maxLength={100}
                                required
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>

                        <div className="username-field-container mb-2 flex items-center gap-3">
                            <label htmlFor="form-username">Username</label>
                            <input
                                id="form-username"
                                name="username"
                                placeholder="anonymous"
                                defaultValue="anonymous"
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>

                        <div>
                            <textarea
                                id="form-content"
                                name="content"
                                cols={50}
                                rows={5}
                                spellCheck="false"
                                required
                                className="border border-gray-300 rounded p-2 w-full"
                            />
                        </div>

                        <input
                            className="my-2 w-full"
                            type="file"
                            name="media"
                            id="media_upload"
                            accept=".png, .jpeg, .jpg, .webm, .mp4, .pdf, .gif, .mp3"
                            multiple
                        />

                        <div>
                            <button type="submit" id="form-submit-button" className="bg-blue-500 text-white rounded-sm p-2 w-full">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CreatePostForm;
