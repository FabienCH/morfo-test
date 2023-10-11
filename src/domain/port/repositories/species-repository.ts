import { Species } from '@/domain/species';

export interface SpeciesRepository {
  getAll(): Promise<Species[]>;
}
