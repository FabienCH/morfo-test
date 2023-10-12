'use server';
import { PrismaSpeciesRepository } from '@/adapters/repositories/prisma-species-repository';
import { SpeciesRepository } from '../port/repositories/species-repository';

export async function deleteSpeciesUsecase(
  id: string,
  speciesRepository: SpeciesRepository = new PrismaSpeciesRepository(),
): Promise<void> {
  return speciesRepository.delete(id);
}
