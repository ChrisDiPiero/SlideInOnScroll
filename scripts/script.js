function debounce(func, wait = 20, immediate = true) { //sets timeout to run function only occasionally cousin to THROTTLE
  let timeout;
  return function() {
    let context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  }
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
  sliderImages.forEach(slideImage => {
    // half way through the image
    const slideInAt = (window.scrollY + window.innerHeight) - slideImage.height / 2;
    // bottom of the image
    const imageBottom = slideImage.offsetTop + slideImage.height;
    const isHalfShown = slideInAt > slideImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if( isHalfShown && isNotScrolledPast) {
      slideImage.classList.add('active');
    } else {
      slideImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));