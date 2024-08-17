import Btn from "./components/Btn";
import Header from "./components/Header";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1>Hello World</h1>
        <Btn text="Click me" />
      </div>
    </main>
  );
}

