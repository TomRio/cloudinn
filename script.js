
(function (window, document) {
  const markers = document.querySelectorAll('mark');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.8
  });
  
  markers.forEach(mark => {
    observer.observe(mark);
  });
})(window, document);







(function (window, document) {
  const timelines = document.querySelectorAll('.timeline');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        entry.target.style.animationPlayState = 'running';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.8
  });
  
  timelines.forEach(timeline => {
    observer.observe(timeline);
  });
})(window, document);





//navigation

(function($) { "use strict";

	$(function() {
		var header = $(".start-style");
		$(window).scroll(function() {    
			var scroll = $(window).scrollTop();
		
			if (scroll >= 10) {
				header.removeClass('start-style').addClass("scroll-on");
			} else {
				header.removeClass("scroll-on").addClass('start-style');
			}
		});
	});		
		

	//Menu On Hover
		
	$('body').on('mouseenter mouseleave','.nav-item',function(e){
			if ($(window).width() > 750) {
				var _d=$(e.target).closest('.nav-item');_d.addClass('show');
				setTimeout(function(){
				_d[_d.is(':hover')?'addClass':'removeClass']('show');
				},1);
			}
	});	
	


	//Switch light/dark
	
	$("#switch").on('click', function () {
		if ($("body").hasClass("dark")) {
			$("body").removeClass("dark");
			$("#switch").removeClass("switched");
		}
		else {
			$("body").addClass("dark");
			$("#switch").addClass("switched");
		}
	});  
	
  })(jQuery);

// loadNav.js
fetch('nav.html')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to load nav.html');
    }
    return response.text();
  })
  .then(data => {
    // Insert the nav bar immediately after the opening <body> tag
    const body = document.querySelector('body');
    body.insertAdjacentHTML('afterbegin', data);
  })
  .catch(error => {
    console.error('Error loading the nav:', error);

    // If there was an error loading the nav, display the error message
    const body = document.querySelector('body');
    body.insertAdjacentHTML('afterbegin', "<div class='navigation-error'> <span>Nav error</span> </div>");
  });





 // window.onscroll = function() {document.getElementById('devi-right').appendChild(document.getElementById('child1'))(document.getElementById('child1').className = "test") };



