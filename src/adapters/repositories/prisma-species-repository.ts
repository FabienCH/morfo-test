import { SpeciesRepository } from '@/domain/port/repositories/species-repository';
import { Species } from '@/domain/species';
import { prisma } from '../../../prisma/prisma';

export class PrismaSpeciesRepository implements SpeciesRepository {
  getAll(): Promise<Species[]> {
    return prisma.species.findMany();
  }
}
