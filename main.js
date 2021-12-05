

// const $ = document.querySelector.bind(document)
// const $$ = document.querySelectorAll.bind(document)

// add class
// $('.header-img').classList.add('wow', 'animate__slideInRight')
// $('.header-content__heading').classList.add('wow', 'animate__slideInDown')
// $('.header-content__des').classList.add('wow', 'animate__slideInDown')

// slider image
$(document).ready(function () {
  $('.image-slider').slick({
    slidesToShow: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow:"<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
    nextArrow:"<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          
        }
      }
      
    ]
  })
})





















wow = new WOW(
    {
    boxClass:     'wow',      // default
    animateClass: 'animate__animated', // default
    offset:       0,          // default
    mobile:       true,       // default
    live:         true        // default
  }
  )
  wow.init();