'use client';
import { Button } from '@/components/ui/shadcn-button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const SpeciesFormSchema = z.object({
  name: z.string().min(1, 'Name is mandatory').max(100, 'Name must be under 100 characters'),
  description: z.string().max(500, 'Name must be under 500 characters'),
  zone: z.string().min(1, 'Zone is mandatory').max(100, 'Name must be under 100 characters'),
  seedImage: z
    .any()
    .refine((files): files is File[] => !!files.length, 'Seed image is mandatory')
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, 'Max image size is 5MB')
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type), 'Only .jpg, .jpeg and .png formats are supported'),
});

export type SpeciesFormValues = z.infer<typeof SpeciesFormSchema>;

export const SpeciesForm = ({ onSubmit }: { onSubmit: (speciesValues: SpeciesFormValues) => void }) => {
  const {
    register,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SpeciesFormValues>({
    resolver: zodResolver(SpeciesFormSchema),
  });
  const [, startTransition] = useTransition();

  return (
    <form
      className="space-y-10"
      onSubmit={() =>
        startTransition(() => {
          onSubmit(getValues());
        })
      }
    >
      <div>
        <label className="block">Name</label>
        <input
          type="text"
          className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
          {...register('name')}
          disabled={isSubmitting}
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block">Zone</label>
        <input
          type="text"
          className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
          {...register('zone')}
          disabled={isSubmitting}
        />
        {errors.zone && <p className="text-sm text-red-600 mt-1">{errors.zone.message}</p>}
      </div>
      <div>
        <label className="block">Description</label>
        <textarea
          className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
          {...register('description')}
          disabled={isSubmitting}
        />
        {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>}
      </div>
      <div>
        <label className="block">Seed image</label>
        <input
          type="file"
          className={`block border text-lg px-4 py-3 mt-2 rounded-lg border-gray-200 focus:bg-white text-gray-900 focus:border-blue-600 focus:ring-0 outline-none w-full  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed`}
          {...register('seedImage')}
          disabled={isSubmitting}
          accept={ACCEPTED_IMAGE_TYPES.join(',')}
        />
        {errors.seedImage && <p className="text-sm text-red-600 mt-1">{errors.seedImage.message?.toString()}</p>}
      </div>
      <pre>{JSON.stringify(watch(), null, 2)}</pre>
      <Button type="submit" disabled={isSubmitting}>
        Add species
      </Button>
    </form>
  );
};
