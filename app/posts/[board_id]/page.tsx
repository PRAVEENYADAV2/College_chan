import getThreads from "@/lib/getThreads";
import CreatePostForm from '@/components/CreateThread'

interface Thread {
    id: number;
    title: string;
    content: string;
    image_path?: string;
}

interface BoardData {
    name: string;
}

export default async function Page({ params }: { params: { board_id: string } }) {
    const board_id = params.board_id;
    const [threads_data, board_data] = await getThreads(+board_id);
    const threads = threads_data;
    const boardName = board_data[0].name;


    return (
        <div className="bg-yellow-50 w-full min-h-[100vh] pt-[10vh]">
            <div className="container mx-auto px-4 py-8 bg-yellow-50">
                <div className="text-center flex gap-3 items-center justify-center mb-10">
                    <h1 className="text-4xl font-bold text-purple-800">/{params.board_id}/ {boardName}</h1>
                    {/* <button className="text-3xl dark:text-black" onClick={handleOpen}>
                        <IoCreateOutline />
                    </button> */}
                    <CreatePostForm boardId={board_id} ></CreatePostForm>
                </div>

                {/* Threads List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {threads.map((thread) => (
                        <a href={`/thread/${thread.id}`} key={thread.id}>
                            <div className="bg-orange-50 border rounded-lg p-4 shadow-lg">
                                <h2 className="text-2xl font-semibold mb-2 text-purple-600">{thread.title}</h2>

                                {/* Image */}
                                {thread.image_path && (
                                    <img src={thread.image_path} alt={thread.title} className="w-full h-48 object-cover rounded-md mb-4" />
                                )}

                                {/* Content */}
                                <p className="text-gray-700 mb-4">{thread.content}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

