"use server";

import { revalidatePath } from "next/cache";

export interface Thread {
  data: {
    id: string;
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
    comments: {
      id: string;
      author: string;
      body: string;
      score: number;
      created_utc: number;
    }[];
  };
}

export default async function getThreads(searchTerm: string): Promise<Thread[]> {
  if (!searchTerm) {
    return [];
  }
  console.log("SearchTerm", searchTerm);
  try {
    const response = await fetch(
      `https://api.reddit.com/search?q=${searchTerm}&raw_json=1&sort=relevance&limit=5`,
      {
        headers: {
          'User-Agent': 'MyApp/1.0.0'
        }
      }
    );

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return [];
    }

    const data = await response.json();

    const threads: Thread[] = await Promise.all(data.data.children.map(async (child: any) => {
      const commentsResponse = await fetch(
        `https://api.reddit.com${child.data.permalink}.json?raw_json=1&limit=5`,
        {
          headers: {
            'User-Agent': 'MyApp/1.0.0'
          }
        }
      );
      const commentsData = await commentsResponse.json();
      
      return {
        data: {
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
          comments: commentsData[1].data.children
            .slice(0, 5)
            .map((comment: any) => ({
              id: comment.data.id,
              author: comment.data.author,
              body: comment.data.body,
              score: comment.data.score,
              created_utc: comment.data.created_utc
            }))
        }
      };
    }));

    revalidatePath("/");
    return threads;
  } catch (error) {
    console.error(error);
    return [];
  }
}