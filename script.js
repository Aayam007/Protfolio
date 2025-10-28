// Main JavaScript file for Bishow Shrestha Portfolio
$( document ).ready(function() {
    console.log( "Portfolio loaded successfully!" );
    
    // Add any custom portfolio interactions here
    // Smooth scroll for navigation links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });
    
    // Add animation on scroll for elements
    $(window).scroll(function() {
        $('.ftco-animate').each(function(){
            var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 3;
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            if( bottom_of_window > bottom_of_object ){
                $(this).addClass('animate__animated animate__fadeIn');
            }
        });
    });
});