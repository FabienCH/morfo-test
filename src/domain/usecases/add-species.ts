import slugify from 'slugify';
import { SpeciesRepository } from '../port/repositories/species-repository';
import { SpeciesData } from '../species';

export function addSpeciesUsecase(speciesRepository: SpeciesRepository, speciesToAdd: SpeciesData): Promise<void> {
  const slug = slugify(speciesToAdd.name);
  return speciesRepository.create({ ...speciesToAdd, slug });
}
