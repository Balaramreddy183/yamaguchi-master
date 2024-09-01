import { Component, OnInit, ElementRef, ViewChild, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from 'express';
import { HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit } from '@angular/core';
import { GalleryFacadeService } from '../../../../facade/gallery.facade.service';
import imagesLoaded from 'imagesloaded';

@Component({
    selector: 'app-landingpage',
    standalone: true,
    templateUrl: './landingpage.component.html',
    styleUrl: './landingpage.component.css',
    imports: [FooterComponent, HeaderComponent, FormsModule, ReactiveFormsModule, CommonModule],
})
export class LandingpageComponent implements OnInit, AfterViewInit {

    @ViewChild('countSection') countSection!: ElementRef;
    isLoading = true;
    contactSectionForm!: FormGroup;
    counters = [
        { start: 0, end: 40, current: 0, text: 'YEARS EXPERIENCE' },
        { start: 0, end: 6000, current: 0, text: 'BLACK BELTS' },
        { start: 0, end: 10000, current: 0, text: 'HAPPY STUDENTS' },
        { start: 500, end: 5000, current: 0, text: 'AWARDS WON' }
    ];

    private observer: IntersectionObserver | null = null;
    private hasAnimated = false;
    classes = [
        {
            name: 'Traditional Karate',
            image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            description: 'Master the ancient techniques of karate',
            private: true,
            group: true
        },
        {
            name: 'Sports Karate',
            image: 'https://images.unsplash.com/photo-1530417838433-4b24dd3f72d4?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'Compete at the highest levels of karate',
            private: true,
            group: true
        },
        {
            name: 'Yogic Karate',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80',
            description: 'Blend the power of karate with inner peace',
            private: true,
            group: true
        },
        {
            name: 'Self Defence',
            image: 'https://images.unsplash.com/photo-1517438322307-e67111335449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            description: 'Learn practical skills for personal safety',
            private: true,
            group: true
        },
        {
            name: 'Chakra Balancing',
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2099&q=80',
            description: 'Harmonize your body\'s energy centers',
            private: true,
            group: false
        },
        {
            name: 'Weight Management',
            image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            description: 'Achieve fitness goals through martial arts',
            private: true,
            group: true
        }
    ];
    gallery = [
        { src: '../../../../../assets/images/karate-images/asset 14.jpeg', alt: 'Karate Image 1', title: 'Karate Image 1', description: 'Karate Image 1', category: 'training', class: 'wide' },
        { src: '../../../../../assets/images/karate-images/asset 15.jpeg', alt: 'Karate Image 2', title: 'Karate Image 2', description: 'Karate Image 2', category: 'training', class: 'tall' },
        { src: '../../../../../assets/images/karate-images/asset 12.jpeg', alt: 'Karate Image 3', title: 'Karate Image 3', description: 'Karate Image 3', category: 'training' },
        { src: '../../../../../assets/images/karate-images/asset 13.jpeg', alt: 'Karate Image 4', title: 'Karate Image 4', description: 'Karate Image 4', category: 'events' },
        { src: '../../../../../assets/images/karate-images/asset 12.jpeg', alt: 'Karate Image 5', title: 'Karate Image 5', description: 'Karate Image 5', category: 'events' },
        { src: '../../../../../assets/images/karate-images/asset 13.jpeg', alt: 'Karate Image 6', title: 'Karate Image 6', description: 'Karate Image 6', category: 'competition' },
        { src: '../../../../../assets/images/karate-images/asset 12.jpeg', alt: 'Karate Image 7', title: 'Karate Image 7', description: 'Karate Image 7', category: 'training' },
        { src: '../../../../../assets/images/karate-images/asset 13.jpeg', alt: 'Karate Image 8', title: 'Karate Image 8', description: 'Karate Image 8', category: 'training' }
    ];
    lightboxActive = false;
    currentLightboxImage = '';
    currentImageIndex = 0;
    currentImageTitle = '';
    currentImageDescription = '';
    galleryImages: any;
    private isotopeInstance: any;

    constructor(
        private fb: FormBuilder,
        private renderer: Renderer2,
        private galleryFacadeService: GalleryFacadeService,

        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.contactSectionForm = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(100), Validators.minLength(10)]],
            subject: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]],
            phone: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
            message: ['', [Validators.required, Validators.maxLength(20000), Validators.minLength(5)]],
        });
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.preloadImages();
        }

        this.loadGalleryImages();
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.setupIntersectionObserver();
            this.initializeIsotope();
        }
    }

    private setupIntersectionObserver(): void {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !this.hasAnimated) {
                    setTimeout(() => this.animateCounters(), 100);
                    this.hasAnimated = true;
                } else if (!entry.isIntersecting) {
                    this.hasAnimated = false;
                    this.resetCounters();
                }
            });
        }, options);

        if (this.countSection) {
            this.observer.observe(this.countSection.nativeElement);
        }
    }

    private resetCounters(): void {
        this.counters.forEach(counter => {
            counter.current = 0;
        });
    }

    private animateCounters() {
        const duration = 2000;
        const steps = 50;

        this.counters.forEach((counter, index) => {
            setTimeout(() => {
                this.animateCounter(counter, duration, steps);
                this.animateIcon(index);
            }, index * 200);
        });
    }

    private animateCounter(counter: any, duration: number, steps: number) {
        const stepValue = (counter.end - counter.start) / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            counter.current = Math.round(counter.start + stepValue * currentStep);

            if (currentStep === steps) {
                counter.current = counter.end;
                clearInterval(timer);
            }
        }, duration / steps);

        const counterElement = this.countSection.nativeElement.querySelector(`[data-counter="${counter.text}"]`);
        if (counterElement) {
            this.renderer.setStyle(counterElement, 'opacity', '0');
            this.renderer.setStyle(counterElement, 'transform', 'scale(0.5)');
            setTimeout(() => {
                this.renderer.setStyle(counterElement, 'transition', 'opacity 0.5s, transform 0.5s');
                this.renderer.setStyle(counterElement, 'opacity', '1');
                this.renderer.setStyle(counterElement, 'transform', 'scale(1)');
            }, 100);

            const numberElement = counterElement.querySelector('.count-sub-title-number');
            if (numberElement) {
                this.renderer.setStyle(numberElement, 'color', '#e80040');
                setTimeout(() => {
                    this.renderer.setStyle(numberElement, 'transition', 'color 0.5s');
                    this.renderer.setStyle(numberElement, 'color', '#ffffff');
                }, duration);
            }
        }
    }

    private animateIcon(index: number) {
        const iconElement = this.countSection.nativeElement.querySelector(`[data-icon="${index}"]`);
        if (iconElement) {
            this.renderer.setStyle(iconElement, 'transform', 'scale(0) rotate(-180deg)');
            this.renderer.setStyle(iconElement, 'opacity', '0');
            setTimeout(() => {
                this.renderer.setStyle(iconElement, 'transition', 'transform 0.5s, opacity 0.5s');
                this.renderer.setStyle(iconElement, 'transform', 'scale(1) rotate(0deg)');
                this.renderer.setStyle(iconElement, 'opacity', '1');
            }, 100);
        }
    }

    preloadImages() {
        // const totalImages = this.galleryImages.length;
        // let loadedImages = 0;

        // this.galleryImages.forEach((filename: any) => {
        //     const img = new Image();
        //     img.onload = () => {
        //         loadedImages++;
        //         if (loadedImages === totalImages) {
        //             this.initializeIsotope();
        //         }
        //     };
        //     img.filename = image.filename;
        // });
    }

    private initializeIsotope(): void {
        import('isotope-layout').then(Isotope => {
            const grid = document.querySelector('.gallery-grid');
            if (grid) {
                this.isotopeInstance = new Isotope.default(grid as HTMLElement, {
                    itemSelector: '.gallery-item',
                    percentPosition: true,
                    masonry: {
                        columnWidth: '.gallery-item'
                    }
                });

                const filterButtons = document.querySelectorAll('.filter-btn');
                filterButtons.forEach(button => {
                    button.addEventListener('click', (event) => {
                        const filterValue = (event.target as HTMLElement).getAttribute('data-filter');
                        this.isotopeInstance.arrange({ filter: filterValue });

                        filterButtons.forEach(btn => btn.classList.remove('active'));
                        (event.target as HTMLElement).classList.add('active');

                        setTimeout(() => {
                            this.isotopeInstance.layout();
                        }, 100);
                    });
                });

                // Ensure layout is recalculated after all images are loaded
                imagesLoaded(grid, () => {
                    this.isotopeInstance.layout();
                });
            }
        });
    }

    openLightbox(index: number): void {
        this.lightboxActive = true;
        this.currentImageIndex = index;
        this.updateLightboxImage();
    }

    closeLightbox() {
        this.lightboxActive = false;
    }

    changeImage(direction: number): void {
        this.currentImageIndex += direction;
        if (this.currentImageIndex < 0) {
            this.currentImageIndex = this.galleryImages.length - 1;
        } else if (this.currentImageIndex >= this.galleryImages.length) {
            this.currentImageIndex = 0;
        }
        this.updateLightboxImage();
    }

    private updateLightboxImage(): void {
        const currentImage = this.galleryImages[this.currentImageIndex];
        this.currentLightboxImage = currentImage.filename;
        this.currentImageTitle = currentImage.galleryTitle;
        this.currentImageDescription = currentImage.galleryDescription;
    }

    sendContactSectionForm() {
        console.log(this.contactSectionForm.value);
    }

    fallbackImage = 'https://images.unsplash.com/photo-1550259979-ed79b48d2a30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80';

    handleImageError(event: any) {
        event.target.style.backgroundImage = `url('${this.fallbackImage}')`;
    }

    loadGalleryImages() {
        this.isLoading = true;
        this.galleryFacadeService.getGalleryImages().subscribe((response: any) => {
            this.galleryImages = response.map((item: any) => ({
                ...item,
                filename: `data:image/png;base64,${item.filename}`
            }));
            this.isLoading = false;
            console.log("All Gallery Images ", this.galleryImages);
            this.preloadImages();
        });
    }
}