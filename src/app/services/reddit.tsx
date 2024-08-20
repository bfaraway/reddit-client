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

export default async function getThreads(searchTerm?: string, after?: string): Promise<{ threads: Thread[], nextAfter: string | null }> {
  const baseUrl = searchTerm
    ? `https://www.reddit.com/search.json?q=${encodeURIComponent(searchTerm)}&raw_json=1&sort=relevance&limit=5`
    : `https://www.reddit.com/r/popular.json?raw_json=1&limit=5`;

  const url = after ? `${baseUrl}&after=${after}` : baseUrl;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'MyApp/1.0.0'
      },
      next: { revalidate: 60 } // Cache for 60 seconds
    });

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return { threads: [], nextAfter: null };
    }

    const data = await response.json();

    const threads: Thread[] = await Promise.all(data.data.children.map(async (child: any) => {
      const commentsResponse = await fetch(
        `https://www.reddit.com${child.data.permalink}.json?raw_json=1&limit=5`,
        {
          headers: {
            'User-Agent': 'MyApp/1.0.0'
          },
          next: { revalidate: 60 } // Cache for 60 seconds
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
          is_image: child.data.post_hint === 'image',
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
    return { threads, nextAfter: data.data.after };
  } catch (error) {
    console.error(error);
    return { threads: [], nextAfter: null };
  }
}