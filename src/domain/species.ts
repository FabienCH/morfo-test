interface SpeciesBase {
  slug: string;
  name: string;
  description: string;
  zone: string;
}

export interface Species extends SpeciesBase {
  id: string;
  slug: string;
  name: string;
  description: string;
  zone: string;
}

export interface SpeciesDetails extends Species {
  seedImage: string;
}

export interface SpeciesToCreate extends SpeciesBase {
  seedImage: string;
}

export type SpeciesData = Omit<SpeciesBase, 'slug'> & { seedImage: File };
