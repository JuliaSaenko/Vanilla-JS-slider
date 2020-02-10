function renderElement(tag, className) {
  let element = document.createElement(tag);
  element.setAttribute('class', className);

  return element
}

function createSlides() {
  const slider = document.querySelector('.slider__list');

  for(let i = 0; i < slidesImg.length; i++) {
    let slide = renderElement('li', 'slider__item');
    slide.setAttribute('id', 'slide-' + (i + 1));
    let slideImg = renderElement('img', 'slider__img');
    slideImg.setAttribute('src', slidesImg[i]);
    let slideText = renderElement('p', null);
    let text = document.createTextNode('Slide' + (i + 1));
    slideText.appendChild(text);
    slide.appendChild(slideImg);
    slide.appendChild(slideText);
    slider.appendChild(slide);
  }

  const firstSlide = document.querySelector('.slider__item');
  firstSlide.classList.add('active');
}

function createPagination() {
  const paginationList =  document.querySelector('.slider__pagination');

  for(let i = 0; i < slidesImg.length; i++) {
    let paginationBullet = renderElement('a', 'pagination__bullet');
    paginationBullet.setAttribute('href', '#slide-' + (i + 1));
    paginationList.appendChild(paginationBullet);
  }

  const firstPaginationBullet = document.querySelector('.pagination__bullet');
  firstPaginationBullet.classList.add('current');
}

function createSlider() {
  createSlides();
  createPagination();
}

createSlider();

const sliderSlides = document.querySelectorAll('.slider__item');

btnPrev.addEventListener('click', shiftSlide.bind(btnPrev, 'prev'));
btnNext.addEventListener('click', shiftSlide.bind(btnNext, 'next'));

function shiftSlide(direction) {
  let currentSlideId = sliderStartIndex;
  let lastSlideIndex = sliderPaginationBullets.length - 1;
  clearInterval(shiftSlidesInterval);

  if(direction === 'prev') {
    showPrevSlide(currentSlideId, lastSlideIndex);
  }

  if(direction === 'next') {
    showNextSlide(currentSlideId, lastSlideIndex);
  }

  changeSlide(slideId);
  shiftSlidesInterval = setInterval(shiftSlide, 3000, 'next');
}

function showPrevSlide(currentSlideId, lastSlideIndex) {
  if(currentSlideId > 0) {
    slideId = currentSlideId - 1;
  } else {
    slideId = lastSlideIndex;
  }
}

function showNextSlide(currentSlideId, lastSlideIndex) {
  if(currentSlideId !== lastSlideIndex) {
    slideId = currentSlideId + 1;
  } else {
    slideId = 0;
  }
}

const sliderPaginationBullets = document.querySelectorAll('.pagination__bullet');

function changeSlide(id) {


  for(let i = 0; i < sliderSlides.length; i++) {
    sliderSlides[i].classList.remove('active');
    sliderPaginationBullets[i].classList.remove('current');
  }

  sliderSlides[id].classList.add('active');
  console.log(sliderSlides[id]);
  sliderPaginationBullets[id].classList.add('current');
  sliderStartIndex = id;
}
