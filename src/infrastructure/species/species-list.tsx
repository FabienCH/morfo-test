import { PrismaSpeciesRepository } from '@/adapters/repositories/prisma-species-repository';
import { buttonVariants } from '@/components/ui/shadcn-button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/shadcn-table';
import { Tooltip } from '@/components/ui/tooltip';
import { queryListSpeciesUsecase } from '@/domain/usecases/list-species';
import { Eye, PlusSquare } from 'lucide-react';
import Link from 'next/link';

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
      <Table>
        <TableCaption>A list of species</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Name</TableHead>
            <TableHead className="w-1/5">Zone</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-22">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {speciesList.map((species) => (
            <TableRow key={species.name}>
              <TableCell>{species.name}</TableCell>
              <TableCell>{species.zone}</TableCell>
              <TableCell>{species.description}</TableCell>
              <TableCell>
                <Link href={`./view/${species.slug}`} className={buttonVariants({ variant: 'ghost' })}>
                  <Tooltip tooltip={'View species details'}>
                    <Eye />
                  </Tooltip>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
