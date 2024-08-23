import { Injectable } from '@angular/core';
import { GalleryService } from '../service/gallery.service';

@Injectable({ providedIn: 'root' })
export class GalleryFacadeService {
    constructor(private apiservice: GalleryService) { }

    createGalleryImages(data: any) {
        return this.apiservice.createGalleryImages(data);
    }

    getGalleryImages() {
        return this.apiservice.getGalleryImages();
    }
    updateGalleryImage(id: string, data: any) {
        return this.apiservice.updateGalleryImage(id, data);
    }
    deleteGalleryImage(id: string) {
        return this.apiservice.deleteGalleryImage(id);
    }
}