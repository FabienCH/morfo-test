import { Species, SpeciesDetails, SpeciesToCreate } from '@/domain/species';

export interface SpeciesRepository {
  getAll(): Promise<Species[]>;
  findBySlug(slug: string): Promise<SpeciesDetails | null>;
  create(speciesToAdd: SpeciesToCreate): Promise<void>;
  delete(id: string): Promise<void>;
}
