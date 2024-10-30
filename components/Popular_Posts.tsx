import { QueryResult } from "mysql2";

interface PopularPostsProps {
    popular_threads: QueryResult[]; // Adjust QueryResult to the actual type you're using
}
const Popular_Posts: React.FC<PopularPostsProps> = ({ popular_threads }) => {
    return (
        <div className="mb-1">
            <div className='bg-[#38BDF8] text-white font-extrabold md:text-xl text-md p-2 border-black dark:border-white border-2'>
                <h1>Popular Posts</h1>
            </div>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 gap-2 md:p-5 p-2 border border-black dark:border-white">
                {popular_threads.map((thread: any) =>
                // console.log(thread)
                (
                    <a href={`/thread/${thread.id}`} key={thread.id}
                        className="group">
                        <div>
                            <div className="board text-center font-bold">
                                <h1>{thread.name}</h1>
                            </div>
                            <div className="max-h-[200px] overflow-hidden thumbnail w-full">
                                <img src={thread.image_path} alt="" />
                            </div>
                            <h4 className="text-[#005E86] group-hover:text-[#4dc2f6] discription font-bold">
                                {thread.title}
                            </h4>
                            <p>{thread.content}</p>
                        </div>
                    </a>

                ))}
            </div>

        </div>
    )
}

export default Popular_Posts;