import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <h1 className="text-3xl">Species list</h1>
        <Button>Just a button</Button>
      </section>
    </main>
  );
}
