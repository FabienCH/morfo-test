import { PrismaSpeciesRepository } from '@/adapters/repositories/prisma-species-repository';
import { buttonVariants } from '@/components/ui/shadcn-button';
import { queryListSpeciesUsecase } from '@/domain/usecases/list-species';
import { PlusSquare } from 'lucide-react';
import Link from 'next/link';
import { SpeciesTable } from './species-table';

export const SpeciesList = async () => {
  const speciesList = await queryListSpeciesUsecase(new PrismaSpeciesRepository());

  return (
    <section className="w-full">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl py-4">Species list</h1>
        <Link href="./add" className={buttonVariants({ variant: 'default' })}>
          <PlusSquare className="mr-2" /> Add species
        </Link>
      </header>
      <SpeciesTable speciesList={speciesList}></SpeciesTable>
    </section>
  );
};
