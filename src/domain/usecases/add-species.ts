'use server';
import slugify from 'slugify';
import { UploadImageGateway } from '../port/gateways/upload-image.gateway';
import { SpeciesRepository } from '../port/repositories/species-repository';
import { SpeciesData } from '../species';

export async function addSpeciesUsecase(
  speciesRepository: SpeciesRepository,
  uploadImageGateway: UploadImageGateway,
  speciesToAdd: SpeciesData,
): Promise<void> {
  const { name, zone, description } = speciesToAdd;
  const slug = slugify(name);
  const seedImage = await uploadImageGateway.upload(speciesToAdd.seedImage);

  return speciesRepository.create({ name, zone, description, slug, seedImage });
}
