import Header from '@/components/Home_Header'
import Boards from '@/components/Boards'
import Popular_Posts from "@/components/Popular_Posts";
import Stats from '@/components/Stats'
import Footer from "@/components/Footer";
// import Getip from '@/components/Getip'
import getBoards from '@/lib/getBoards';
import getTopEightThreads from '@/lib/getTopEightThreads'

export default async function Home() {
  const boards = await getBoards();
  const popular_threads = await getTopEightThreads();
  return (
    <div className="bg-yellow-50 min-h-[100dvh] dark:bg-slate-950">
      <div className="w-full max-w-[900px] min-h-4 m-auto md:p-10 p-3">
        <Header></Header>
        {/* <br /> */}
        <Boards boards={boards}></Boards>
        <Popular_Posts popular_threads={popular_threads}></Popular_Posts>
        <Stats></Stats>
        <Footer></Footer>
      </div>
    </div>
  );
}
