import { InMemorySpeciesRepository } from '@/tests/repositories/in-memory-species-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { SpeciesRepository } from '../port/repositories/species-repository';
import { SpeciesData } from '../species';
import { addSpeciesUsecase } from './add-species';
import { querySpeciesBySlugUsecase } from './retrieve-species';

describe('Add Species', () => {
  let speciesRepository: SpeciesRepository;

  beforeEach(() => {
    speciesRepository = new InMemorySpeciesRepository();
  });

  it('should add a new species', async () => {
    const slug = 'new-species-name';
    const speciesToAdd: SpeciesData = {
      name: 'new species name',
      description: 'new species description',
      zone: 'Europe',
      seedImage: 'https://placehold.co/600x400/png',
    };
    const expectedSpecies = { ...speciesToAdd, slug };

    await addSpeciesUsecase(speciesRepository, speciesToAdd);

    const species = await querySpeciesBySlugUsecase(speciesRepository, slug);

    expect(species).toEqual(expectedSpecies);
  });
});
