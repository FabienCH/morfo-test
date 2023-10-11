import { SpeciesRepository } from '../port/repositories/species-repository';
import { Species } from '../species';

export function queryListSpeciesUsecase(speciesRepository: SpeciesRepository): Promise<Species[]> {
  return speciesRepository.getAll();
}
