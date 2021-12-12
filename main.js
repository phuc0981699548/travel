window.addEventListener('load', () => {
  // menu mobile and tablet
  const menu = document.querySelector('.header-nav__list')
  const menuBg = document.querySelector('.menu-bg')
  const menuToggle = document.querySelector('.menu-toggle')
  const menuClose = document.querySelector('.menu-close')

  menuToggle.addEventListener('click', handelToggleMenu)
  menuClose.addEventListener('click', handelCloseMenu)

  function handelToggleMenu() {
    menuBg.classList.add('is-active')
    menu.classList.add('is-active')
    menuClose.classList.add('is-active')
  }
  
  function handelCloseMenu() {
    menuBg.classList.remove('is-active')
    menu.classList.remove('is-active')
    this.classList.remove('is-active')

  }


  // modal book ticket
  const buyBtn = document.querySelector('.js-buy-ticket')
  const modal = document.querySelector('.js-modal')
  const modalClose = document.querySelector('.js-modal-close')
  const modalContainer = document.querySelector('.js-modal-container')
  
  if(buyBtn) {
    buyBtn.addEventListener('click', showBuyTickets)

  }
  if(modal) {
    modal.addEventListener('click', hideBuyTickets)
    
  }

  if(modalClose) {
    modalClose.addEventListener('click', hideBuyTickets)

  }
  if(modalContainer) {
    modalContainer.addEventListener('click', (e) =>{
         e.stopPropagation()
    })

  }
  
  function showBuyTickets() {
    modal.classList.add('is-active')
  }

  function hideBuyTickets() {
    modal.classList.remove('is-active')
  }
  
 

  // new
  const tabs = document.querySelectorAll('.tab-item')
  const panes = document.querySelectorAll('.tab-pane')
  const tabActive = document.querySelector('.tab-item.is-active')

  const line = document.querySelector('.tabs .line')

  if(tabActive) {
    line.style.left = tabActive.offsetLeft + 'px'
    line.style.width = tabActive.offsetWidth + 'px'

  }
  
  tabs.forEach((tab, index) => {
      const pane = panes[index]
      
      tab.addEventListener('click', handelActive)
      
      function handelActive() {
        const paneActive = document.querySelector('.tab-pane.is-active')
        const tabActive = document.querySelector('.tab-item.is-active')
        
        tabActive.classList.remove('is-active')
        paneActive.classList.remove('is-active')
        
        line.style.left = this.offsetLeft + "px";
        line.style.width = this.offsetWidth + "px";
        
        this.classList.add('is-active')
        pane.classList.add('is-active')
      }
     

  }) 
  

  // search-btn footer
  var btnSearch = document.querySelector('.search-box__btn')

  btnSearch.addEventListener('click', function() {
    this.parentElement.classList.toggle('is-active')
    this.previousElementSibling.focus()
  
  })


  // scroll back to top
  const btnScrollToTop = document.querySelector('.button-top')

  window.addEventListener('scroll', () => {
    if(this.window.pageYOffset > 130) {
      btnScrollToTop.style.display = 'block'
    } else {
      btnScrollToTop.style.display = 'none'
    }
  })

  btnScrollToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  })


  // validator
  function validator(options) {
    // Ham thực hiện validate
    function validate(inputElement , rule)  {

        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage = rule.test(inputElement.value)


        if(errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')

        }
    }

    var formElement = document.querySelector(options.form)
    
    if(formElement) {
        options.rules.forEach(rule => {
            var inputElement = formElement.querySelector(rule.selector) 
            
            if(inputElement) {
                inputElement.onblur = () => {
                    validate(inputElement, rule)
                }

                inputElement.oninput = () => {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)

                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }

            }
        });

    }





  }

  validator.isRequired = (selector) => {
      return {
          selector,
          test(value) {
              return value.trim() ? undefined : 'Vui lòng nhập tên'
          }

      }
  }

  validator.isEmail = (selector) => {
      return {
          selector,
          test(value) {
              var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
              return regex.test(value) ? undefined : 'Vui lòng nhập Email'
          }

      }
  }

  validator.minLength = (selector, min) => {
      return {
          selector,
          test(value) {
              return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`
          }

      }
  }

  validator.isConfirmed = (selector, getConfirmValue) => {
      return {
          selector,
          test(value) {
              return value === getConfirmValue() ? undefined : 'Mật khẩu nhập lại không chính xác'
          }

      }
  }

  validator({
      form: '#form-1',
      errorSelector: '.form-message',
      rules: [ 
          validator.isRequired('#fullname'),
          validator.isEmail('#email'),
          validator.minLength('#password', 6),
          validator.isConfirmed('#password_confirmation', function () {
              return document.querySelector('#form-1 #password').value
          })
          

      ],
   

})
 


  

  

  
})



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

// wow js
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


