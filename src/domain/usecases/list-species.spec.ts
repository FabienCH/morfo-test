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
      { name: 'specie name', description: 'specie description', zone: 'Amazon' },
      { name: 'an other specie name', description: 'an other specie description', zone: 'Central Africa' },
    ];
    speciesRepository = new InMemorySpeciesRepository(expectedSpeciesList);

    const speciesList = await queryListSpeciesUsecase(speciesRepository);
    expect(speciesList).toEqual(expectedSpeciesList);
  });
});
