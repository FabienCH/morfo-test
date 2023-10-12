import { InMemorySpeciesRepository } from '@/tests/repositories/in-memory-species-repository';
import { describe, expect, it } from 'vitest';
import { SpeciesRepository } from '../port/repositories/species-repository';
import { queryListSpeciesUsecase } from './list-species';

describe('List Species', () => {
  let speciesRepository: SpeciesRepository;

  it('should give an empty list', async () => {
    speciesRepository = new InMemorySpeciesRepository();
    const speciesList = await queryListSpeciesUsecase(speciesRepository);
    expect(speciesList).toEqual([]);
  });

  it('should give a list of species', async () => {
    const expectedSpeciesList = [
      { id: '0', slug: 'specie-slug', name: 'specie name', description: 'specie description', zone: 'Amazon' },
      {
        id: '1',
        slug: 'an-other-specie-slug',
        name: 'an other specie name',
        description: 'an other specie description',
        zone: 'Central Africa',
      },
    ];
    speciesRepository = new InMemorySpeciesRepository().withSpeciesList();

    const speciesList = await queryListSpeciesUsecase(speciesRepository);
    expect(speciesList).toEqual(expectedSpeciesList);
  });
});
