"use server";

import { revalidatePath } from "next/cache";

export interface Thread {
  data: {
    title: string;
    author: string;
    created_utc: number;
    num_comments: number;
    score: number;
    selftext: string;
    is_video: boolean;
    is_image: boolean;
    media?: {
      reddit_video: {
        fallback_url: string;
      };
    };
    thumbnail: string;
    url: string;
  };
}

export default async function getThreads(
  searchTerm: string
): Promise<Thread[]> {
  if (!searchTerm) {
    return [];
  }
  console.log("SearchTerm", searchTerm);
  try {
    const response = await fetch(
      `https://api.reddit.com/search?q=${searchTerm}`
    );

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return [];
    }

    const data = await response.json();

    const threads: Thread[] = data.data.children.map((child: any) => ({
      id: child.data.id,
      title: child.data.title,
      author: child.data.author,
      created_utc: child.data.created_utc,
      num_comments: child.data.num_comments,
      score: child.data.score,
      selftext: child.data.selftext,
      is_video: child.data.is_video,
      is_image: child.data.is_image,
      media: child.data.media,
      thumbnail: child.data.thumbnail,
      url: child.data.url,
    }));

    revalidatePath("/");
    return data.data.children;
  } catch (error) {
    console.error(error);
    return [];
  }
}
