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
  function Validator(options) {


    var selectorRules = {}
    
    function Validate(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
        var errorMessage
        //Lây ra các rules của selector
        var rules = selectorRules[rule.selector]
        
        for (var i = 0; i < rules.length; ++i) {
            errorMessage = rules[i](inputElement.value)
            if (errorMessage) 
                break
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }

        return !errorMessage
                    
    }

    var formElement = document.querySelector(options.form)
    

    if(formElement) {
        formElement.onsubmit = (e) => {
            e.preventDefault()

            var isFormValid = true

            options.rules.forEach(rule => {
                var inputElement = formElement.querySelector(rule.selector)
                var isValid = Validate(inputElement, rule)
                if (!isValid) {
                    isFormValid = false
                }

                
            })

            if (isFormValid) {
                //submit voi javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]')

                    var formValues = Array.from(enableInputs).reduce((values, input) => {
                        values[input.name] = input.value
                        return values

                    }, {})
                    options.onSubmit(formValues)
                } 
                //submit vs hanh vi mac dinh
                else {
                    formElement.submit()
                }
            } 

            
        }

        options.rules.forEach(rule => {

            //Lưu lại các rules cho mỗi input
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
                
            } else {
                selectorRules[rule.selector] = [rule.test]
            }
            
            var inputElement = formElement.querySelector(rule.selector)
            
            if (inputElement) {
                inputElement.onblur = () => {
                    Validate(inputElement, rule)
                }

                inputElement.oninput = () => {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)

                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })

    }
}


Validator.isRequired = function (selector) {
    return {
        selector,
        test(value) {
            return value.trim() ? undefined : 'Vui Lòng nhập trường này'
        }
    }
    
}

Validator.isEmail = function (selector) {
    return {
        selector,
        test(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Trường này phải là Email'
        }
    }
    
}


Validator.minLength = function (selector, min) {
    return {
        selector,
        test(value) {
            return value.length >= min ? undefined : `Vui Lòng nhập tối thiểu ${min} kí tự`
        }
    }
    
}

Validator.isConfirm = function (selector, getConfirmValue, message) {
    return {
        selector,
        test(value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không đúng'
        }
    }
}


Validator({
  form: '#form-1',
  formGroupSelector: '#form-group',
  errorSelector: '.form-message',
  rules: [ 
      Validator.isRequired('#fullname'),
      Validator.isEmail('#email'),
      Validator.minLength('#password', 6),
      Validator.isRequired('#password_confirmation'),
      Validator.isConfirm('#password_confirmation', function() {
        return document.querySelector('#form-1 #password').value
      }, 'Mật khẩu nhập lại không chính xác'),

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


