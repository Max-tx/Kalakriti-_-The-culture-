//**************image slider**********************
const carousel = document.querySelector(".carousel");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const slides = document.querySelectorAll(".slide");

let currentIndex = 0;

function showSlide(index) {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Autoplay functionality
let autoplayInterval = setInterval(nextSlide, 5000);

// Pause autoplay on button hover
prevBtn.addEventListener("mouseenter", () => clearInterval(autoplayInterval));
nextBtn.addEventListener("mouseenter", () => clearInterval(autoplayInterval));

// Resume autoplay when mouse leaves buttons
prevBtn.addEventListener("mouseleave", () => autoplayInterval = setInterval(nextSlide, 3000));
nextBtn.addEventListener("mouseleave", () => autoplayInterval = setInterval(nextSlide, 3000));

// Start the initial slide
showSlide(currentIndex);






