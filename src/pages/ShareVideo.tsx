import { useEffect, useState } from 'react'
import axios from 'axios';
import Header from '../components/Header'
import { truncateString } from '../utils';
import { CallAPIPOST } from '../shared/APIs';
import Notification from '../components/Notification'

const ShareVideo = () => {
  const [videoInfo, setVideoInfo] = useState<any>({});
  const [url, setURL] = useState<any>("");
  const [successSharing, setSuccessSharing] = useState<boolean>(false);
  const [failureSharing, setFailureSharing] = useState<boolean>(false);

  useEffect(() => {
    const videoId = url.split('v=')[1];

    // axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=AIzaSyDz6pFoCgQZQQDlJNaUIUwSK7UaMp5RPhM`)
    //   .then(response => {
    //     const videoData = response.data.items[0].snippet;
    //     setVideoInfo({
    //       title: videoData.title,
    //       description: videoData.description,
    //       thumbnail: videoData.thumbnails.medium.url,
    //       sharedBy: localStorage.getItem('email')
    //     });
    //   })
    //   .catch(error => {
    //     console.error('Error fetching YouTube data', error);
    //   });
    const fetchVideoInfo = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.GOOGLE_API}`);
        const videoData = response.data.items[0].snippet;
        setVideoInfo({
          title: videoData.title,
          description: videoData.description,
          thumbnail: videoData.thumbnails.medium.url,
          sharedBy: localStorage.getItem('email')
        });
      } catch (error) {

      }
    }
    fetchVideoInfo();
  }, [url]);

  const handleInputShare = (e: any) => {
    if (e.target.value === '') return;
    setURL(e.target.value);
  }

  const handleShareVideo = async () => {
    if (Object.keys(videoInfo).length === 0) return;
    const data = await CallAPIPOST('/share-video', videoInfo)

    if (data.success) {
      setSuccessSharing(true);
      setTimeout(() => {
        setSuccessSharing(false);
      }, 5000);
    } else {
      setFailureSharing(true);
      setTimeout(() => {
        setFailureSharing(false);
      }, 5000);
    }
  }
  return (
    <>
      <div className="min-h-full">
        <Header />
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {successSharing && <Notification des={'You have successfully shared!'} title={'Notification'} type={1} />}
            {failureSharing && <Notification des={'Something when wrong.'} title={'Sharing failure!'} type={0} />}
            <div className="bg-grey-lighter min-h-screen flex flex-col">
              <div className="container max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
                {videoInfo.title && <div className="lg:flex">
                  <img className="object-cover w-full h-56 rounded-lg lg:w-64" src={videoInfo.thumbnail} alt="" />
                  <div className="flex flex-col justify-between lg:mx-6">
                    <span className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                      {videoInfo.title}
                    </span>
                    <span className="text-xl text-gray-800 dark:text-white ">
                      {truncateString(videoInfo.description, 100)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-300">Shared by: {localStorage.getItem('email')}</span>
                  </div>
                </div>}
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                  <h1 className="mb-8 text-3xl text-center">Share video page</h1>
                  <label>Youtube link</label>
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="Share any youtube link"
                    onChange={handleInputShare}
                    placeholder="Share any youtube link" />

                  <button
                    onClick={handleShareVideo}
                    type="submit"
                    className="rounded-full text-white ml-4 bg-indigo-500 py-3 px-4 hover:bg-violet-600 active:bg-violet-700 w-full"
                  >Share</button>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}

export default ShareVideo