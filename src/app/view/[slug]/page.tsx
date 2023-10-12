import { ViewSpecies } from '@/infrastructure/species/view-species';
import React from 'react';

export default function ViewSpeciesPage({ params }: { params: { slug: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ViewSpecies slug={params.slug} />
    </main>
  );
}
