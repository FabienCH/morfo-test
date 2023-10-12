import { Species, SpeciesDetails } from '@/domain/species';

export interface SpeciesRepository {
  getAll(): Promise<Species[]>;
  findBySlug(slug: string): Promise<SpeciesDetails | null>;
  create(speciesToAdd: SpeciesDetails): Promise<void>;
}
