'use client'

export default function Boards(boards : any) {
    return (
        < div className='mb-4' >
            <div className='bg-[#38BDF8] text-white font-extrabold md:text-xl text-md p-2 border-black dark:border-white border-2'>
                <h1>Boards</h1>
            </div>
            <div className='bg-orange-100 dark:bg-slate-950 p-2 border border-black dark:border-white text-sm grid md:grid-cols-4 sm:grid-cols-2 grid-cols-2 gap-2'>
                <div className="column">

                    <h3 className="underline text-xl text-[#005e86] dark:text-[#38BDF8]">ShitPosting</h3>
                    <ul>
                        <li><a href={`posts/${boards.boards[0].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[0].name}</a></li>
                        <li><a href={`posts/${boards.boards[1].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[1].name}</a></li>
                        <li><a href={`posts/${boards.boards[2].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[2].name}</a></li>
                        <li><a href={`posts/${boards.boards[3].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[3].name}</a></li>
                        <li><a href={`posts/${boards.boards[4].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[4].name}</a></li>
                        <li><a href={`posts/${boards.boards[5].id}`}  className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[5].name}</a></li>
                        <li><a href={`posts/${boards.boards[6].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[6].name}</a></li>
                    </ul>
                </div>
                <div className="column">
                    <h3 className="underline text-xl text-[#005e86] dark:text-[#38BDF8]">Otaku</h3>
                    <ul>
                        <li><a href={`posts/${boards.boards[7].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[7].name}</a></li>
                        <li><a href={`posts/${boards.boards[8].id}`}  className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[8].name}</a></li>
                        <li><a href={`posts/${boards.boards[9].id}`}  className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[9].name}</a></li>
                        <li><a href={`posts/${boards.boards[10].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[10].name}</a></li>
                        <li><a href={`posts/${boards.boards[11].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[11].name}</a></li>
                        <li><a href={`posts/${boards.boards[12].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[12].name}</a></li>
                        <li><a href={`posts/${boards.boards[13].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[13].name}</a></li>
                        <li><a href={`posts/${boards.boards[14].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[14].name}</a></li>
                        <li><a href={`posts/${boards.boards[15].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[15].name}</a></li>
                        <li><a href={`posts/${boards.boards[16].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[16].name}</a></li>
                        <li><a href={`posts/${boards.boards[17].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[17].name}</a></li>
                        <li> <a href={`posts/${boards.boards[18].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[18].name}</a></li>
                        <li> <a href={`posts/${boards.boards[19].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[19].name}</a></li>
                    </ul>

                </div>
                <div className="column">
                    <h3 className="underline text-xl text-[#005e86] dark:text-[#38BDF8]">General</h3>
                    <ul>
                        <li> <a href={`posts/${boards.boards[20].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[20].name}</a></li>
                        <li> <a href={`posts/${boards.boards[21].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[21].name}</a></li>
                        <li> <a href={`posts/${boards.boards[22].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[22].name}</a></li>
                        <li> <a href={`posts/${boards.boards[23].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[23].name}</a></li>
                        <li> <a href={`posts/${boards.boards[24].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[24].name}</a></li>
                        <li> <a href={`posts/${boards.boards[25].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[25].name}</a></li>
                    </ul>

                </div>
                <div className="column">
                    <h3 className="underline text-xl text-[#005e86] dark:text-[#38BDF8]">Study CSE</h3>
                    <ul>
                        <li> <a href={`posts/${boards.boards[26].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[26].name}</a></li>
                        <li> <a href={`posts/${boards.boards[27].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[27].name}</a></li>
                        <li> <a href={`posts/${boards.boards[28].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[28].name}</a></li>
                        <li> <a href={`posts/${boards.boards[29].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[29].name}</a></li>
                        <li> <a href={`posts/${boards.boards[30].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[30].name}</a></li>
                        <li> <a href={`posts/${boards.boards[31].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[31].name}</a></li>
                        <li> <a href={`posts/${boards.boards[32].id}`} className="hover:underline hover:text-blue-500 text-blue-900 dark:text-white">{boards.boards[32].name}</a></li>

                    </ul>

                </div>
            </div>
        </div >
    )
}  