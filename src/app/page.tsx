import { SpeciesList } from '@/infrastructure/species/species-list';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SpeciesList />
    </main>
  );
}
