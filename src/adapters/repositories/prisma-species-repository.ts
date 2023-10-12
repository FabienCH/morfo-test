import { SpeciesRepository } from '@/domain/port/repositories/species-repository';
import { Species, SpeciesDetails } from '@/domain/species';
import { prisma } from '../../../prisma/prisma';

export class PrismaSpeciesRepository implements SpeciesRepository {
  async getAll(): Promise<Species[]> {
    const prismaSpeciesList = await prisma.species.findMany();
    return prismaSpeciesList.map(this.#toSpecies);
  }

  async findBySlug(slug: string): Promise<SpeciesDetails | null> {
    const prismaSpecies = await prisma.species.findFirst({ where: { slug } });
    if (!prismaSpecies) {
      return null;
    }

    return {
      ...this.#toSpecies(prismaSpecies),
      seedImage: prismaSpecies.seed_image,
    };
  }

  #toSpecies(prismaSpecies: {
    id: string;
    name: string;
    slug: string;
    description: string;
    zone: string;
    seed_image: string;
    created_at: Date;
  }): Species {
    return {
      slug: prismaSpecies.slug,
      name: prismaSpecies.name,
      description: prismaSpecies.description,
      zone: prismaSpecies.zone,
    };
  }
}
