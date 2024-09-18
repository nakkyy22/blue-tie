/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
// var currentFullscreenImageIndex;
// var galleryImages = [
//     'img/KP8A7823.jpg',
//     'img/KP8A7946.jpg',
//     'img/KP8A7645.jpg',
//     'img/Copy of KP8A7840.jpg',
//     'img/7869.jpg',
//     'img/Copy of KP8A8116.jpg',
//     'img/Copy of KP8A8525.jpg',
//     'img/KP8A8511.jpg',
//     'img/KP8A8529.jpg',
//     'img/DSCF1370.jpg',
//     'img/IMG_2016.jpg',
//     'img/IMG_2020.jpg',
//     'img/IMG_2023.jpg',
//     'img/DSCF1365.jpg',
//     'img/DSCF1342.jpg',
//     'img/aleqsandreuli.jpg',
//     'img/DSCF1378.jpg',
//     'img/KP8A7645.jpg',
//     'img/Copy of KP8A7840.jpg'
//     // Добавьте пути к остальным изображениям
// ];
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
    console.log("Cookie set:", name, value, expires);
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            console.log("Cookie found:", name, cookie.substring(nameEQ.length, cookie.length));
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    console.log("Cookie not found:", name);
    return null;
}

window.onload = function() {
    if (getCookie('agreed') !== 'true') {
        document.getElementById('popup').style.display = 'flex';
    } else {
        console.log("User has already agreed, no popup shown.");
    }

    document.getElementById('yesBtn').onclick = function() {
        setCookie('agreed', 'true', 2); // Сохраняем cookie на 2 дня
        document.getElementById('popup').style.display = 'none';
    };

    document.getElementById('noBtn').onclick = function() {
        // Оставляем окно открытым
    };
};


$(document).ready(function() {
    var currentIndex = 0;

    $('.gallery-image').click(function() {
        currentIndex = $('.gallery-image').index(this);
        openFullscreen(currentIndex);
    });

    $('#closeFullscreenBtn').click(function() {
        closeFullscreenGallery();
    });

    $('#fullscreenGallery').click(function(event) {
        if (!$(event.target).closest('#fullscreenImage, .gallery-arrow').length) {
            closeFullscreenGallery();
        }
    });

    $('#prevArrow').click(function(event) {
        event.stopPropagation();
        navigateFullscreenGallery(-1);
    });

    $('#nextArrow').click(function(event) {
        event.stopPropagation();
        navigateFullscreenGallery(1);
    });

    function openFullscreen(index) {
        var src = $('.gallery-image').eq(index).attr('src');
        $('#fullscreenImage').attr('src', src);
        $('#fullscreenGallery').css('display', 'flex');
    }

    function closeFullscreenGallery() {
        $('#fullscreenGallery').css('display', 'none');
    }

    function navigateFullscreenGallery(direction) {
        currentIndex += direction;
        if (currentIndex < 0) {
            currentIndex = $('.gallery-image').length - 1;
        } else if (currentIndex >= $('.gallery-image').length) {
            currentIndex = 0;
        }
        openFullscreen(currentIndex);
    }
});
$(document).ready(function() {
    initHamburgerMenu();
    initInnerCarousel();
    // initHeaderBlur();
    initImageScroll();
    initHeaderActiveScroll();
    initHeaderImageHover();
    initWineItems();
});


function initInnerCarousel() {
    $('.carousel__inner').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        speed: 1200,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><images src="images/left1.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><images src="images/right1.svg"></button>',
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    dots: true,
                    arrows: false
                    
                }
            }
        
        ]
    });
    // eslint-disable-next-line no-undef
    $('.slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick---prev"><img src="images/left.svg"></button>',
        nextArrow: '<button type="button" class="slick---next"><img src="images/right.svg"></button>',
        appendDots: $('.dots-container'),  // контейнер для точек третьего слайдера
        responsive: [
            {
                breakpoint:1025,
                settings: {
                    dots: true,
                    arrows: false
                    
                }
            }
        
        ]
    });
    $('.carousel__inner_3').slick({
        // infinite: true,
        // slidesToShow: 3,
        // slidesToScroll: 3,
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick--prev"><img src="images/left1.svg"></button>',
        nextArrow: '<button type="button" class="slick--next"><img src="images/right1.svg"></button>',
        appendDots: $('.dots-container-3'),  // контейнер для точек третьего слайдера
        responsive: [
            {
                breakpoint:1025,
                settings: {
                    dots: true,
                    arrows: false
                    
                }
            }
        
        ]
    });
}

function initHeaderBlur() {
    var header = document.getElementById('myHeader');
  
    window.addEventListener('scroll', function() {
        var scrollPosition = window.scrollY;
  
        if (scrollPosition > 500) {
            header.classList.add('blurred');
        } else {
            header.classList.remove('blurred');
        }
    });
}

function initHamburgerMenu() {
    const menu = document.querySelector('.menu'),
        menuItem = document.querySelectorAll('.menu_item'),
        hamburger = document.querySelector('.hamburger');

    // Функция для закрытия меню
    function closeMenu() {
        hamburger.classList.remove('hamburger_active');
        menu.classList.remove('menu_active');
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Добавление слушателя на документ для закрытия меню при клике вне его области
    document.addEventListener('click', (event) => {
        const target = event.target;
        const isMenu = target === menu || menu.contains(target);
        const isHamburger = target === hamburger;

        if (!isMenu && !isHamburger) {
            closeMenu();
        }
    });
}

function initImageScroll() {
    console.log('ImageScroll');
    var image1 = document.getElementById('scrollImage1');
    var image2 = document.getElementById('scrollImage2');
    var image3 = document.getElementById('scrollImage3');

    document.addEventListener('scroll', function() {
        // Изменяем изображение 1 при прокрутке
        // if (window.scrollY > 500) {
        //     image1.src = '../images/Logo 2-23.png';
        // } else {
        //     image1.src = '../images/Logo-23.png';
        // }
        // Изменяем изображение 2 при прокрутке
        // if (window.scrollY > 20) {
        //     image2.src = '../images/Logo 2-23.png';
        // } else {
        //     image2.src = '../images/Logo-23.png';
        // }
    });
}

// header
function initHeaderActiveScroll() {
    var $header = $('.header');
    var lastScrollTop = 0;
    var active = 'active';

    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();

        if (scrollTop > lastScrollTop) {
            // Прокрутка вниз
            $header.addClass(active);
        } else {
            // Прокрутка вверх
            $header.removeClass(active);
        }

        lastScrollTop = scrollTop;
    });
}

// avard color
function initHeaderImageHover() {
    var imageMappings = {
        'img/1b_11.png': ['img/1c_11.png'],
        'img/2b_11.png': ['img/2_11.png'],
        'img/3b_11.png': ['img/3_11.png'],
        'img/4b_11.png': ['img/4_11.png'],
        'img/5b_11.png':  ['img/5_11.png'],
        'img/6b_11.png': ['img/6_11.png'],
        'img/7b_11.png': ['img/7_11.png'],
        'img/1b__66.png': ['img/1c__66.png'],
        'img/2b__66.png': ['img/2c__66.png'],
        'img/3b__66.png': ['img/3c__66.png'],
        'img/1c__66_c.png': ['img/1__66.png'],
    };
  
    $('.award__item').hover(
        function() {
        // Наведение курсора
            var originalSrc = $('img', this).attr('src');
            var newImages = imageMappings[originalSrc];
  
            if (newImages && newImages.length > 0) {
                var randomImage = newImages[Math.floor(Math.random() * newImages.length)];
                $('img', this).attr('src', randomImage);
                $(this).data('originalSrc', originalSrc); // Сохраняем оригинальный путь к изображению
            }
        },
        function() {
        // Уход курсора
            var originalSrc = $(this).data('originalSrc');
            $('img', this).attr('src', originalSrc); // Возвращаем оригинальное изображение
        }
    );
}

//wine list 
function initWineItems() {
    var wineItems = document.querySelectorAll('.wine__item');

    wineItems.forEach(function(item) {
        var imgElement = item.querySelector('.wine__img');
        var textElement = item.querySelector('.wine__text');

        imgElement.addEventListener('click', function() {
            wineItems.forEach(function(innerItem) {
                innerItem.classList.remove('active');
            });
            item.classList.add('active');
            textElement.classList.add('active');
        });
    });
}

// Add JavaScript to change color on scroll
// window.addEventListener('scroll', function() {
//     var hamburger = document.querySelector('');
//     var hamburger1 = document.querySelector('');
//     var hamburger2 = document.querySelector('');
//     if (window.scrollY > 50) {
//         // Change color when scrolled past 50px
//         hamburger.style.backgroundColor = '#000'; // Change to desired color
//         hamburger1.style.backgroundColor = '#000'; // Change to desired color
//         hamburger2.style.backgroundColor = '#000'; // Change to desired color
//     } else {
//         // Revert to initial color when not scrolled past 50px
//         hamburger.style.backgroundColor = '#FAF8F4'; // Change to initial color
//         hamburger1.style.backgroundColor = '#FAF8F4'; // Change to initial color
//         hamburger2.style.backgroundColor = '#FAF8F4'; // Change to initial color
//     }
// });


