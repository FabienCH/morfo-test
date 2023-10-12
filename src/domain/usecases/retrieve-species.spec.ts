import { InMemorySpeciesRepository } from '@/tests/repositories/in-memory-species-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { SpeciesRepository } from '../port/repositories/species-repository';
import { querySpeciesBySlugUsecase } from './retrieve-species';

describe('Retrieve Species', () => {
  let speciesRepository: SpeciesRepository;

  beforeEach(() => {
    speciesRepository = new InMemorySpeciesRepository().withSpeciesList();
  });

  it('should give the expected species', async () => {
    const species = await querySpeciesBySlugUsecase(speciesRepository, 'specie-slug');
    expect(species).toEqual({
      id: '0',
      slug: 'specie-slug',
      name: 'specie name',
      description: 'specie description',
      zone: 'Amazon',
      seedImage: 'https://placehold.co/600x400/png',
    });
  });

  it('should not give a species if it does not exist', async () => {
    const species = await querySpeciesBySlugUsecase(speciesRepository, 'non-existing-slug');
    expect(species).toBeNull();
  });
});
