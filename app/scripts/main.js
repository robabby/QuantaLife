(function($) {
  'use strict';

  var $navItems = $('nav a[href^="#"]');
  var $backToTop = $('.back-to-top');
  var $callToAction = $('.call-to-action');

  var navWaypoint = new Waypoint({
    element: document.querySelector('body'),
    handler: function(direction) {
      var navigation = document.getElementById('navigation');
      if (direction === 'down') {
        navigation.classList.add('scrolled');
      } else {
        navigation.classList.remove('scrolled');
      }
    },
    offset: -25
  });

  $(document).on("scroll", handleOnScroll);

  function handleOnScroll(event){
    var scrollPos = $(document).scrollTop();
    $navItems.each(function () {
        var $this = $(this);
        var refElement = $($this.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $navItems.parent().removeClass("active");
            $this.parent().addClass("active");
        }
        else{
            $this.parent().removeClass("active");
        }
    });
  }

  $callToAction.on('click', function(e) {
    e.preventDefault();
    $('html, body').stop().animate({
      'scrollTop': $('#about').offset().top-66
    }, 500, 'swing', function () {
      window.location.hash = '#about';
      $(document).on("scroll", handleOnScroll);
    });
  });

  $navItems.on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");

    var $this = $(this);
    var $navItem = $(e.target);
    var target = this.hash;
    var $target = $(target);
    var $navLinks = $this.find('li');

    $navItems.each(function() {
      var $this = $(this);
      $this.parent().removeClass('active');
    });

    $navItem.parent().addClass('active');

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 500, 'swing', function () {
      window.location.hash = target;
      $(document).on("scroll", handleOnScroll);
    });
  });

  $backToTop.on('click', function(e) {
    e.preventDefault();
    $('html, body').stop().animate({
      'scrollTop': 0
    }, 500, 'swing', function () {
      $(document).on("scroll", handleOnScroll);
    });
  });
})(window.jQuery);
