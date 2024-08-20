import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import ThreadList from "./components/ThreadList";
import getThreads from "./services/reddit";

export default async function Home({
  searchParams: { search },
}: {
  searchParams: { search?: string };
}) {
  const fetchedThreads = await getThreads(search || undefined);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <SearchBar />
      <ThreadList threads={fetchedThreads} />
      <Footer />
    </main>
  );
}