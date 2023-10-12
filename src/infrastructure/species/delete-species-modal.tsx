'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Species } from '@/domain/species';

export const DeleteSpeciesModal = ({ species, onClose }: { species: Species | null; onClose: (confirmDelete: boolean) => void }) => {
  return (
    <AlertDialog open={!!species}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {species?.name}</AlertDialogTitle>
          <AlertDialogDescription>Are you sure you want to delete {species?.name}?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              onClose(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onClose(true);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
