import { TestUploadImageGateway } from '@/tests/gateways/test-upload-image.gateway';
import { InMemorySpeciesRepository } from '@/tests/repositories/in-memory-species-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { UploadImageGateway } from '../port/gateways/upload-image.gateway';
import { SpeciesRepository } from '../port/repositories/species-repository';
import { SpeciesData } from '../species';
import { addSpeciesUsecase } from './add-species';
import { querySpeciesBySlugUsecase } from './retrieve-species';

describe('Add Species', () => {
  let speciesRepository: SpeciesRepository;
  let uploadImageGateway: UploadImageGateway;

  beforeEach(() => {
    speciesRepository = new InMemorySpeciesRepository();
    uploadImageGateway = new TestUploadImageGateway();
  });

  it('should add a new species', async () => {
    const slug = 'new-species-name';
    const speciesToAdd: SpeciesData = {
      name: 'new species name',
      description: 'new species description',
      zone: 'Europe',
      seedImage: new Blob([]) as File,
    };
    const expectedSpecies = {
      name: 'new species name',
      description: 'new species description',
      zone: 'Europe',
      seedImage: 'https://placehold.co/600x400/png',
      slug,
    };

    await addSpeciesUsecase(speciesRepository, uploadImageGateway, speciesToAdd);

    const species = await querySpeciesBySlugUsecase(speciesRepository, slug);

    expect(species).toEqual(expectedSpecies);
  });
});
