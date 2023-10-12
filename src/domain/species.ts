export interface Species {
  slug: string;
  name: string;
  description: string;
  zone: string;
}

export interface SpeciesDetails extends Species {
  seedImage: string;
}

export type SpeciesData = Omit<Species, 'slug'> & { seedImage: File };
