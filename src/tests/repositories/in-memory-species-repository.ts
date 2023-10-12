import { SpeciesRepository } from '@/domain/port/repositories/species-repository';
import { Species, SpeciesDetails } from '@/domain/species';

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

  withSpeciesList(): this {
    this.#species = [
      { slug: 'specie-slug', name: 'specie name', description: 'specie description', zone: 'Amazon' },
      { slug: 'an-other-specie-slug', name: 'an other specie name', description: 'an other specie description', zone: 'Central Africa' },
    ];
    return this;
  }
}
