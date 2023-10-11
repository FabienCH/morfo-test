import { SpeciesRepository } from '@/domain/port/repositories/species-repository';
import { Species } from '@/domain/species';

export class InMemorySpeciesRepository implements SpeciesRepository {
  constructor(private readonly species?: Species[]) {}

  async getAll(): Promise<Species[]> {
    return (await this.species) ?? [];
  }
}
