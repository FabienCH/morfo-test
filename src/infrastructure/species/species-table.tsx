'use client';
import { Button, buttonVariants } from '@/components/ui/shadcn-button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/shadcn-table';
import { Tooltip } from '@/components/ui/tooltip';
import { Species } from '@/domain/species';
import { deleteSpeciesUsecase } from '@/domain/usecases/delete-species';
import { Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { DeleteSpeciesModal } from './delete-species-modal';

export const SpeciesTable = ({ speciesList }: { speciesList: Species[] }) => {
  const [speciesToDelete, setSpeciesToDelete] = useState<Species | null>(null);
  const [_, startTransition] = useTransition();
  const router = useRouter();

  const onClose = (confirmDelete: boolean) => {
    if (speciesToDelete && confirmDelete) {
      startTransition(() => deleteSpeciesUsecase(speciesToDelete.id));
      router.refresh();
    }
    setSpeciesToDelete(null);
  };

  return (
    <>
      <Table>
        <TableCaption>A list of species</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/5">Name</TableHead>
            <TableHead className="w-1/5">Zone</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-36 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {speciesList.map((species, index) => (
            <TableRow key={`${species.name}-${index}`}>
              <TableCell>{species.name}</TableCell>
              <TableCell>{species.zone}</TableCell>
              <TableCell>{species.description}</TableCell>
              <TableCell>
                <Link href={`./view/${species.slug}`} className={buttonVariants({ variant: 'ghost' })}>
                  <Tooltip tooltip={'View species details'}>
                    <Eye />
                  </Tooltip>
                </Link>
                <Button variant="ghost" onClick={() => setSpeciesToDelete(species)}>
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {<DeleteSpeciesModal species={speciesToDelete} onClose={onClose} />}
    </>
  );
};
