// component for displaying a list of threads
import React from "react";
import { Thread } from "../services/reddit";
import { FaArrowUp, FaArrowDown, FaComment } from "react-icons/fa";

type ThreadListProps = {
  threads: Thread[];
};

const ThreadList: React.FC<ThreadListProps> = ({ threads }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-md p-4 mt-6">
      <ul className="w-1/2">
        {threads.map((thread, index) => (
          <li
            key={index}
            className="flex flex-col mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <p className="mr-4">{thread.data.author}</p>
              <p>{new Date(thread.data.created_utc * 1000).toLocaleString()}</p>
            </div>
            <h2 className=" flex items-left text-left font-bold text-xl mb-2 break-words">
              {thread.data.title}
            </h2>
            {thread.data.selftext && (
              <p className="mb-3 text-left text-gray-800 break-words">
                {thread.data.selftext}
              </p>
            )}
            {thread.data.is_video && thread.data.media?.reddit_video && (
              <div className="mb-3">
                <video
                  className="w-full h-auto rounded"
                  src={thread.data.media.reddit_video.fallback_url}
                  autoPlay
                  muted
                  loop
                  controls
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {thread.data.is_image && (
              <div className="mb-3">
                <img
                  className="w-full h-auto rounded-md"
                  src={thread.data.url}
                  alt={thread.data.title}
                />
              </div>
            )}
            {!thread.data.is_video &&
              !thread.data.is_image &&
              thread.data.thumbnail &&
              thread.data.thumbnail !== "self" && (
                <div className="mb-3">
                  <img
                    className="w-full h-auto rounded-md"
                    src={thread.data.thumbnail}
                    alt={thread.data.title}
                  />
                </div>
              )}
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <p className="flex items-center flex-row mr-4">
                <FaComment /> {thread.data.num_comments}
              </p>
              <p className="flex items-center flex-row">
                <FaArrowUp /> {thread.data.score}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreadList;
