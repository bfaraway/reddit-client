// component for displaying a list of threads
"use client";

import React, { useState } from "react";
import { Thread } from "../services/reddit";
import { FaArrowUp, FaArrowDown, FaComment } from "react-icons/fa";


type ThreadListProps = {
  threads: Thread[];
  error?: string;
};

const ThreadList: React.FC<ThreadListProps> = ({ threads, error }) => {
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center rounded-md p-4 mt-6">
        <p className="text-red-500 font-bold">Error: {error}</p>
        <p>Please try again later or contact support if the problem persists.</p>
      </div>
    );
  }

  if (threads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-md p-4 mt-6">
        <p>No threads found. Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-md p-4 mt-6">
      <ul className="w-1/2">
        {threads.map((thread) => (
          <ThreadItem key={thread.data.id} thread={thread} />
        ))}
      </ul>
    </div>
  );
};

const ThreadItem: React.FC<{ thread: Thread }> = React.memo(({ thread }) => {
  const [showComments, setShowComments] = useState(false);

  const handleClick = () => {
    setShowComments(!showComments);
  };

  return (
    <li className="flex flex-col mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <p className="mr-4">{thread.data.author}</p>
        <p>t{thread.data.created_utc}</p>
      </div>
      <h2 className="flex items-left text-left font-bold text-xl mb-2 break-words">
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
          <FaComment className="mr-2" onClick={handleClick} />{" "}
          {thread.data.num_comments}
        </p>
        <p className="flex items-center flex-row">
          <FaArrowUp className="mr-2" /> {thread.data.score}
          <FaArrowDown className="ml-2" /> 
        </p>
      </div>
      {showComments && (
        <div className="mt-4 border-t pt-4">
          <h3 className="font-semibold mb-2 items-left text-left">Comments</h3>
          <ul className="space-y-4">
            {thread.data.comments.map((comment) => (
              <li key={comment.id} className="bg-gray-50 p-3 rounded text-left">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <p className="mr-4">{comment.author}</p>
                  <p>{comment.created_utc}</p>
                </div>
                <p className="text-gray-800">{comment.body}</p>
                <p className="text-sm text-gray-600 mt-2">
                  <FaArrowUp className="inline mr-1" /> {comment.score}
                  <FaArrowDown className="inline ml-1" /> 
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
});

export default ThreadList;