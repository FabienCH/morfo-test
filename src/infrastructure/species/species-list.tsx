import { PrismaSpeciesRepository } from '@/adapters/repositories/prisma-species-repository';
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { queryListSpeciesUsecase } from '@/domain/usecases/list-species';
import React from 'react';

export const SpeciesList = async () => {
  const speciesList = await queryListSpeciesUsecase(new PrismaSpeciesRepository());

  return (
    <section className="w-full">
      <h1 className="text-3xl py-4">Species list</h1>
      <Table>
        <TableCaption>A list of species</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Name</TableHead>
            <TableHead className="w-1/4">Zone</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {speciesList.map((species) => (
            <TableRow key={species.name}>
              <TableCell>{species.name}</TableCell>
              <TableCell>{species.zone}</TableCell>
              <TableCell>{species.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
