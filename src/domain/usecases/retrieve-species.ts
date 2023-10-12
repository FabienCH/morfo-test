import { SpeciesRepository } from '../port/repositories/species-repository';
import { SpeciesDetails } from '../species';

export function querySpeciesBySlugUsecase(speciesRepository: SpeciesRepository, slug: string): Promise<SpeciesDetails | null> {
  return speciesRepository.findBySlug(slug);
}
