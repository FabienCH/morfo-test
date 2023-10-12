import { UploadImageGateway } from '@/domain/port/gateways/upload-image.gateway';
import { createClient } from '@supabase/supabase-js';
import { env } from 'process';

export class SuperbaseUploadImageGateway implements UploadImageGateway {
  async upload(image: File): Promise<string> {
    'use server';
    if (!env.SUPERBASE_URL || !env.SUPABASE_ANON_KEY) {
      throw new Error('Superbase env is not setup, check .env file');
    }
    const supabase = createClient(env.SUPERBASE_URL, env.SUPABASE_ANON_KEY);
    const { data, error } = await supabase.storage
      .from('species')
      .upload(`https://qpttcevgzjqqcoswjixf.supabase.co/storage/v1/object/public/species/${image.name}`, image);
    if (error) {
      throw new Error('Something went wrong while uploading image, please try again');
    } else {
      return data.path;
    }
  }
}
