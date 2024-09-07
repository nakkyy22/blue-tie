// eslint-disable-next-line no-undef
$(document).ready(function () {
    if (window.location.hash) {
        scrollToSection(window.location.hash);
    }
});

function scrollToSection(id) {
    // eslint-disable-next-line no-undef
    $('html, body').animate({
        // eslint-disable-next-line no-undef
        scrollTop: $(id).offset().top
    }, 100);
}