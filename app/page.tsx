import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto flex min-h-[200vh] w-full max-w-6xl items-start px-6 pt-20">
        <h1 className="text-3xl font-semibold">Fourway Media</h1>
      </main>
    </div>
  );
}
