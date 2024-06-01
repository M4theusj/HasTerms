document.addEventListener('DOMContentLoaded', function () {
    let observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
  
    let observer = new IntersectionObserver(onIntersection, observerOptions);
  
    function onIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          if (entry.target.classList.contains('fade-bounce')) {
            setTimeout(() => {
              let termsLetters = document.querySelectorAll('.terms');
              termsLetters.forEach((letter, index) => {
                setTimeout(() => {
                  letter.classList.add('bounce');
                }, index * 100);
              });
            }, 2000);
          }
        }
      });
    }
  
    let elementsToAnimate = document.querySelectorAll('.fade-bounce, .second-section, .slide-left, .slide-right');
    elementsToAnimate.forEach(element => {
      observer.observe(element);
    });
  });
  