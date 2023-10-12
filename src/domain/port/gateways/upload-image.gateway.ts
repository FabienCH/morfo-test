export interface UploadImageGateway {
  upload(image: File): Promise<string>;
}
