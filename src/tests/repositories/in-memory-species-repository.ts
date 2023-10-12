import { SpeciesRepository } from '@/domain/port/repositories/species-repository';
import { Species, SpeciesDetails, SpeciesToCreate } from '@/domain/species';

export class InMemorySpeciesRepository implements SpeciesRepository {
  #species?: Species[];

  constructor() {}

  async getAll(): Promise<Species[]> {
    return this.#species ?? [];
  }

  async findBySlug(slug: string): Promise<SpeciesDetails | null> {
    const species = this.#species?.find((species) => species.slug === slug);
    if (!species) {
      return null;
    }
    return { ...species, seedImage: 'https://placehold.co/600x400/png' };
  }

  async create(speciesToAdd: SpeciesToCreate): Promise<void> {
    if (this.#species) {
      this.#species.push({ ...speciesToAdd, id: `${this.#species.length}` });
    } else {
      this.#species = [{ ...speciesToAdd, id: '0' }];
    }
  }

  async delete(id: string): Promise<void> {
    this.#species = this.#species?.filter((species) => species.id !== id);
  }

  withSpeciesList(): this {
    this.#species = [
      { id: '0', slug: 'specie-slug', name: 'specie name', description: 'specie description', zone: 'Amazon' },
      {
        id: '1',
        slug: 'an-other-specie-slug',
        name: 'an other specie name',
        description: 'an other specie description',
        zone: 'Central Africa',
      },
    ];
    return this;
  }
}
