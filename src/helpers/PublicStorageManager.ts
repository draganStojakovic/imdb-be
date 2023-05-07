import { PROD } from 'constants/envVars';
import path from 'path';

class PublicStorageManager {
  private prod = PROD;
  private images: string;

  constructor() {
    if (this.prod) {
      this.images = path.join(__dirname, '..', '..', 'public', 'images');
    } else {
      this.images = path.join(__dirname, 'public', 'images');
    }
  }

  getImagesPath(): string {
    return this.images;
  }

  fileFullPath(file: string): string {
    return path.join(this.images, file);
  }
}

export const publicStorageManager = new PublicStorageManager();
