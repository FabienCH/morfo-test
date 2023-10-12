import { PrismaSpeciesRepository } from '@/adapters/repositories/prisma-species-repository';
import { buttonVariants } from '@/components/ui/shadcn-button';
import { Separator } from '@/components/ui/shadcn-separator';
import { Tooltip } from '@/components/ui/tooltip';
import { querySpeciesBySlugUsecase } from '@/domain/usecases/retrieve-species';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const ViewSpecies = async ({ slug }: { slug: string }) => {
  const species = await querySpeciesBySlugUsecase(new PrismaSpeciesRepository(), slug);

  if (!species) {
    notFound();
  }

  return (
    <section className="w-full">
      <header className="flex items-center">
        <Link href="/" className={`${buttonVariants({ variant: 'ghost' })}  mr-2`}>
          <Tooltip tooltip={'Back to dashboard'}>
            <ArrowLeft size={32} />
          </Tooltip>
        </Link>
        <h1 className="text-3xl my-4">{species.name}</h1>
      </header>
      <Separator className="mb-4" />
      <p className="mb-4">Location: {species.zone}</p>
      <div className="flex">
        <Image className="mb-4" src={species.seedImage} placeholder="empty" alt="seed of the species" width={600} height={400}></Image>
        <p className="px-4">{species.description}</p>
      </div>
    </section>
  );
};
