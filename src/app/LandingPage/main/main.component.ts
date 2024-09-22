import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  currentIndex = 0;
  totalCards = 0;
  firstCardWidth: number = 0;
  isDragging: boolean = false;
  startX: number = 0;
  startScrollLeft: number = 0;

  ngOnInit() {
    // Funcionalidad para carrusel con flechas (prev y next)
    this.totalCards = document.querySelectorAll('.card').length;
    
    // Funcionalidad de arrastre en el carrusel
    const carousel = document.querySelector(".carousel") as HTMLElement;
    const arrowBtns = document.querySelectorAll(".wrapper i");
    this.firstCardWidth = carousel.querySelector(".card")?.clientWidth || 0;

    // Agregar eventos a las flechas para moverse en el carrusel
    arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -this.firstCardWidth : this.firstCardWidth;
      });
    });

    // Eventos de arrastre
    carousel.addEventListener("mousedown", this.dragStart.bind(this));
    carousel.addEventListener("mousemove", this.dragging.bind(this));
    document.addEventListener("mouseup", this.dragStop.bind(this));
  }

  // Métodos para flechas prev y next
  updateCarousel() {
    const offset = this.currentIndex * -280;
    const carouselContainer = document.querySelector('.carousel-container') as HTMLElement;
    carouselContainer.style.transform = `translateX(${offset}px)`;
  }

  prev() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.totalCards - 1;
    this.updateCarousel();
  }

  next() {
    this.currentIndex = (this.currentIndex < this.totalCards - 1) ? this.currentIndex + 1 : 0;
    this.updateCarousel();
  }

  // Métodos para el arrastre
  dragStart(e: MouseEvent) {
    this.isDragging = true;
    const carousel = document.querySelector(".carousel") as HTMLElement;
    carousel.classList.add("dragging");
    this.startX = e.pageX;
    this.startScrollLeft = carousel.scrollLeft;
  }

  dragging(e: MouseEvent) {
    if (!this.isDragging) return;
    const carousel = document.querySelector(".carousel") as HTMLElement;
    carousel.scrollLeft = this.startScrollLeft - (e.pageX - this.startX);
  }

  dragStop() {
    this.isDragging = false;
    const carousel = document.querySelector(".carousel") as HTMLElement;
    carousel.classList.remove("dragging");
  }
}
