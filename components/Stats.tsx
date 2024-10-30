import getStats from "@/lib/getStats"
export default async function Stats() {
    const data: object = await getStats()
    console.log(data)
    return (
        <div className="stats mb-4">
            <div className='bg-[#38BDF8] dark:border-white text-white font-extrabold md:text-xl text-md p-2 border-black border-2'>
                <h1>Stats</h1>
            </div>
            <div className="border border-black dark:border-white p-2 flex sm:flex-row text-red-700 dark:text-white font-bold flex-col items-center gap-2 justify-between">
                <div>
                    <h1>Total Posts: {data.total_posts}</h1>
                </div>
                <div>
                    <h1>
                        Total Data: {data.total_storage_used} MB
                    </h1>
                </div>
            </div>
        </div>
    )
}