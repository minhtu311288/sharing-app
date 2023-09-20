import { useEffect, useState } from "react";
import Header from "./components/Header"
import { CallAPIGET } from "./shared/APIs";
import { truncateString } from "./utils";

interface Video {
  thumbnail: string,
  title: string,
  sharedBy: string,
  description: string
}

export default function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const videoList = await CallAPIGET('/share-video', undefined);
      setVideos(videoList.data);
    }

    fetchData();
  }, [])
  return (
    <>
      <div className="min-h-full">
        <Header />
        <section className="bg-white dark:bg-gray-900">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {videos && videos.map((video: Video) => (
              <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
                <div className="lg:flex">
                  <img className="object-cover w-full h-56 rounded-lg lg:w-64" src={video.thumbnail} alt="" />
                  <div className="flex flex-col justify-between lg:mx-6">
                    <span className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                      {video.title}
                    </span>
                    <span className="text-xl text-gray-800 dark:text-white ">
                      {truncateString(video.description, 100)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-300">Shared by: {video.sharedBy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
