'use client';
import { SuperbaseUploadImageGateway } from '@/adapters/gateways/superbase-upload-image.gateway';
import { PrismaSpeciesRepository } from '@/adapters/repositories/prisma-species-repository';
import { addSpeciesUsecase } from '@/domain/usecases/add-species';
import { SubmitHandler } from 'react-hook-form';
import { SpeciesForm, SpeciesFormValues } from './species-form';

export const AddSpecies = () => {
  const onSubmit: SubmitHandler<SpeciesFormValues> = async (speciesFormValues) => {
    await addSpeciesUsecase(new PrismaSpeciesRepository(), new SuperbaseUploadImageGateway(), {
      ...speciesFormValues,
      seedImage: speciesFormValues.seedImage[0],
    });
  };

  return (
    <section className="w-full">
      <h1 className="text-3xl py-4">Add new species</h1>
      <SpeciesForm onSubmit={onSubmit}></SpeciesForm>
    </section>
  );
};
