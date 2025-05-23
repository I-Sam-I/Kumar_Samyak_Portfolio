/* Description: Custom JS file */

(function ($) {
  "use strict";

  $.easing.customEasing = function (x, t, b, c, d) {
    console.log("Custom easing function called"); // Add console log
    return c * ((t = t / d - 1) * t * t + 1) + b; // custom easing function
  };

  /* Navbar Scripts */
  // jQuery to collapse the navbar on scroll
  $(window).on("scroll load", function () {
    if ($(".navbar").offset().top > 60) {
      $(".fixed-top").addClass("top-nav-collapse");
    } else {
      $(".fixed-top").removeClass("top-nav-collapse");
    }
  });

  // jQuery for page scrolling feature - requires jQuery Easing plugin
  $(function () {
    $(document).on("click", "a.page-scroll", function (event) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top,
          },
          600,
          "customEasing"
        );
      event.preventDefault();
    });

    var fullscreenElements = document.querySelectorAll(".toggle-fullscreen");
    fullscreenElements.forEach(function (element) {
      element.addEventListener("click", function () {
        if (!document.fullscreenElement) {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.mozRequestFullScreen) {
            // Firefox
            element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
            // Chrome, Safari and Opera
            element.webkitRequestFullscreen();
          } else if (element.msRequestFullscreen) {
            // IE/Edge
            element.msRequestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            // Firefox
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            // Chrome, Safari and Opera
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            // IE/Edge
            document.msExitFullscreen();
          }
        }
      });
    });

    // Expand/Collapse functionality for blog posts
    const toggleButtons = document.querySelectorAll(".toggle-button");

    toggleButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const cardText = this.previousElementSibling;

        if (cardText.style.maxHeight) {
          // Collapse the content
          cardText.style.maxHeight = null;
          this.textContent = "Read More";
        } else {
          // Expand the content
          cardText.style.maxHeight = cardText.scrollHeight + "px";
          this.textContent = "Read Less";
        }
      });
    });
  });

  // offcanvas script from Bootstrap + added element to close menu on click in small viewport
  $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on(
    "click",
    function () {
      $(".offcanvas-collapse").toggleClass("open");
    }
  );

  // hover in desktop mode
  function toggleDropdown(e) {
    const _d = $(e.target).closest(".dropdown"),
      _m = $(".dropdown-menu", _d);
    setTimeout(
      function () {
        const shouldOpen = e.type !== "click" && _d.is(":hover");
        _m.toggleClass("show", shouldOpen);
        _d.toggleClass("show", shouldOpen);
        $('[data-toggle="dropdown"]', _d).attr("aria-expanded", shouldOpen);
      },
      e.type === "mouseleave" ? 300 : 0
    );
  }
  $("body")
    .on("mouseenter mouseleave", ".dropdown", toggleDropdown)
    .on("click", ".dropdown-menu a", toggleDropdown);

  /* Move Form Fields Label When User Types */
  // for input and textarea fields
  $("input, textarea").keyup(function () {
    if ($(this).val() != "") {
      $(this).addClass("notEmpty");
    } else {
      $(this).removeClass("notEmpty");
    }
  });

  /* Back To Top Button */
  // create the back to top button
  $("body").prepend(
    '<a href="body" class="back-to-top page-scroll">Back to Top</a>'
  );
  var amountScrolled = 700;
  $(window).scroll(function () {
    if ($(window).scrollTop() > amountScrolled) {
      $("a.back-to-top").fadeIn("500");
    } else {
      $("a.back-to-top").fadeOut("500");
    }
  });

  /* Removes Long Focus On Buttons */
  $(".button, a, button").mouseup(function () {
    $(this).blur();
  });
})(jQuery);
