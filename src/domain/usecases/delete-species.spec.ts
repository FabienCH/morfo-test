import { InMemorySpeciesRepository } from '@/tests/repositories/in-memory-species-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { SpeciesRepository } from '../port/repositories/species-repository';
import { deleteSpeciesUsecase } from './delete-species';

describe('Delete Species', () => {
  let speciesRepository: SpeciesRepository;

  beforeEach(() => {
    speciesRepository = new InMemorySpeciesRepository().withSpeciesList();
  });

  it('should delete the expected species', async () => {
    await deleteSpeciesUsecase('0', speciesRepository);

    const deletedSpecies = await speciesRepository.findBySlug('specie-slug');

    expect(deletedSpecies).toBeNull();
  });

  it('should not delete a species if it does not exist', async () => {
    const speciesList = await speciesRepository.getAll();

    await deleteSpeciesUsecase('non-existing-slug', speciesRepository);

    expect(speciesList.length).toBe((await speciesRepository.getAll()).length);
  });
});
