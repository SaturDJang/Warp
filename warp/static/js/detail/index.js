/* global $, marked, window, resizeSlides, mdElemsToHtmlElems, screenfull */

$(() => {
  const slidesSelector = '.slides';
  const $slides = $(slidesSelector).children();

  let currentSlideIndex = 0;
  let $currentSlide;

  function slideMover(idx) {
    $slides.css('display', 'none');
    $currentSlide = $slides.eq(idx);
    $currentSlide.css('display', 'flex');
  }

  function goToPrevSlide() {
    currentSlideIndex -= 1;
    if (currentSlideIndex < 0) currentSlideIndex = 0;
    slideMover(currentSlideIndex);
  }

  function goToNextSlide() {
    currentSlideIndex += 1;
    if (currentSlideIndex > $slides.length - 1) currentSlideIndex = $slides.length - 1;
    slideMover(currentSlideIndex);
  }

  mdElemsToHtmlElems(slidesSelector);

  $slides.css('display', 'none');
  $currentSlide = $slides.eq(currentSlideIndex);
  $currentSlide.css('display', 'flex');

  $('#prev-btn').click(() => {
    goToPrevSlide();
  });
  $('#next-btn').click(() => {
    goToNextSlide();
  });

  $(window).keyup((e) => {
    const keys = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
    };
    if (e.which === keys.left || e.which === keys.up) {
      goToPrevSlide();
    } else if (e.which === keys.right || e.which === keys.down) {
      goToNextSlide();
    }
  });

  if (screenfull.enabled) {
    screenfull.onchange(() => {
      if (screenfull.isFullscreen) {
        $slides.height(window.screen.height);
        $slides.width(window.screen.height * 1.333333);
        // $slides.css('height', '100%');
        // $slides.css('width', '100%');
        resizeSlides(true, $('div#normal-view'));
      } else {
        // $(slidesSelector).css('height', '');
        // $(slidesSelector).css('width', '');
        $slides.css('height', '');
        $slides.css('width', '');
      }
    });
  }
  $('#full-screen-btn').click(() => {
    if (screenfull.enabled) {
      screenfull.request($(slidesSelector)[0]);
    }
  });

  resizeSlides(true, $('div#normal-view'));
  $(window).resize(() => {
    resizeSlides(true, $('div#normal-view'));
  });
});
