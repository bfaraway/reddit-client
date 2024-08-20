import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import ThreadList from "./components/ThreadList";
import getThreads from "./services/reddit";
import LoadMoreButton from "./components/LoadMoreButton";

export default async function Home({
  searchParams: { search, after },
}: {
  searchParams: { search?: string; after?: string };
}) {
  const { threads, nextAfter } = await getThreads(search, after);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <SearchBar />
      <ThreadList threads={threads} />
      {nextAfter && <LoadMoreButton nextAfter={nextAfter} search={search} />}
      <Footer />
    </main>
  );
}