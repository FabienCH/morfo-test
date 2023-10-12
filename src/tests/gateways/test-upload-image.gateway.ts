import { UploadImageGateway } from '@/domain/port/gateways/upload-image.gateway';

export class TestUploadImageGateway implements UploadImageGateway {
  async upload(_: File): Promise<string> {
    return 'https://placehold.co/600x400/png';
  }
}
