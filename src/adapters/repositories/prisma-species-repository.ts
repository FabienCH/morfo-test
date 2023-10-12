import { SpeciesRepository } from '@/domain/port/repositories/species-repository';
import { Species, SpeciesDetails, SpeciesToCreate } from '@/domain/species';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../../../prisma/prisma';

interface PrismaSpecies {
  id: string;
  name: string;
  slug: string;
  description: string;
  zone: string;
  seed_image: string;
  created_at: Date;
}

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

  async create(speciesToAdd: SpeciesToCreate): Promise<void> {
    const data = this.#toPrismaSpecies(speciesToAdd);
    await prisma.species.create({ data });
  }

  async delete(id: string): Promise<void> {
    await prisma.species.delete({ where: { id } });
  }

  #toSpecies(prismaSpecies: PrismaSpecies): Species {
    return {
      id: prismaSpecies.id,
      slug: prismaSpecies.slug,
      name: prismaSpecies.name,
      description: prismaSpecies.description,
      zone: prismaSpecies.zone,
    };
  }

  #toPrismaSpecies(speciesToAdd: SpeciesToCreate): PrismaSpecies {
    const { slug, name, description, zone, seedImage } = speciesToAdd;
    return { id: uuidv4(), slug, name, description, zone, seed_image: seedImage, created_at: new Date() };
  }
}
