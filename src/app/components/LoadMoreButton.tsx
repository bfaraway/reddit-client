"use client";

import { useRouter } from 'next/navigation';
import Btn from "./Btn";

type LoadMoreButtonProps = {
  nextAfter: string;
  search?: string;
};

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ nextAfter, search }) => {
  const router = useRouter();

  const handleLoadMore = () => {
    const searchParams = new URLSearchParams();
    if (search) searchParams.set('search', search);
    searchParams.set('after', nextAfter);
    router.push(`/?${searchParams.toString()}`);
  };

  return <Btn text="Load More" onClick={handleLoadMore} />;
};

export default LoadMoreButton;