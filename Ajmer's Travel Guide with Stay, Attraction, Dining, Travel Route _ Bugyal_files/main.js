//Global var to avoid any conflicts
var BYAL = {};

(function ($) {

	var urlAppend = '';
	var valueCoo = $('#seKeCoU').val();
	if (typeof valueCoo != 'undefined') {
		urlAppend = '?cDis=' + valueCoo;
	}

	// USE STRICT
	"use strict";


	//----------------------------------------------------/
	// Predefined Variables
	//----------------------------------------------------/
	var $window = $(window),
		$document = $(document),
		$body = $('body'),
		swipers = {},
		$progress_bar = $('.skills-item'),
        $sidebar = $('.fixed-sidebar');


    /* -----------------------------
     * Equal height elements
     * Script file: theme-plugins.js
     * Documentation about used plugin:
     * http://brm.io/jquery-match-height/
     * ---------------------------*/
	BYAL.equalHeight = function () {
		$('.js-equal-child').find('.theme-module').matchHeight({
			property: 'min-height'
		});
	};


	BYAL.equalHeight = function () {
		$('.js-equal-child').find('.theme-module').matchHeight({
			property: 'min-height'
		});
	};

	$('.js-user-search').keyup(function () {
		var value = $(this).val();
		if (value != '') {
			if (value.length > 2) {
				$('#search_result').show();
				$.post('/AutoP', {
					value : value,
					m : "m"
				}, function (data) {
					$('#search_result').html(data);
				});
			}
		} else {
			$('#search_result').hide();
		}
	});

	$('.js-user-search-m').keyup(function () {
		var value = $(this).val();
		if (value != '') {
			if (value.length > 2) {
				$('#search_result_m').show();
				$.post('/AutoP', {
					value : value,
					m : "m"
				}, function (data) {
					$('#search_result_m').html(data);
				});
			}
		} else {
			$('#search_result_m').hide();
		}
	});

	$(document).keyup(function (e) {
		if (e.keyCode == 27) {
			if($( '#SQA_result' ).has( '.search-result-cat' ).length > 0){
				$('#SQA_result').fadeOut(1000, function () {
				});
			}
			if($( '#search_result' ).has( '.search-result-cat' ).length > 0){
				$('#search_result').fadeOut(1000, function () {
				});
			}
			if($( '#search_result_m' ).has( '.search-result-cat' ).length > 0){
				$('#search_result_m').fadeOut(1000, function () {
				});
			}
		}
	});
	$(document).bind('click', function (event) {
      if (!($(event.target).parents().addBack().is('#search_result'))) {
    	  $('#search_result').fadeOut(1000);
  		}
      if (!($(event.target).parents().addBack().is('#search_result_m'))) {
    	  $('#search_result_m').fadeOut(1000);
  		}
      if(!($(event.target).parents().addBack().is('#SQA_result'))){
			$('#SQA_result').fadeOut(1000, function () {
			});
		}
	});


	/* -----------------------------
	 * Top Search bar function
	 * Script file: selectize.min.js
	 * Documentation about used plugin:
	 * https://github.com/selectize/selectize.js
	 * ---------------------------*/
    BYAL.TopSearch = function () {
		
		

        $('.js-user-searchEEEEEEEEEEEEEEEEEEEEEEEE').selectize({
            persist: false,
            maxItems: 2,
            valueField: 'value',
            labelField: 'value',
            searchField: ['value'],
			
			
			create: function(input)
        {
            return {
                value: input,
                text: input
            }
        },
        render: {
            option: function (item, escape) {
                console.log(item);
                return '<div>' + escape(item.value) + '</div>';
            }
        },
        load: function (query, callback) {
            if (!query.length) return callback();
            $.ajax({
                url: '/AutoP' ,
                dataType: 'json',
				data : {
						q : query
				},
                error: function () {
                    callback();
                },
                success: function (res) {
                    console.log(res);
                    callback(res);
                }
            });
        },
			
            options: [
                /*{blog: '<div>test</div>', spot:  '<div>agra</div>', icon:'bugyal-happy-face-icon',url:'http://localhost:8080/places/8593/Ajmer,India'},*/
             ]/*,
            render: {
                option: function(item, escape) {
                    return (item.blog ?  item.blog:'') + (item.spot ?  item.spot:'');
                },
                item: function(item, escape) {
                    var label = item.blog;
                    return '<div>' +
                        '<span class="label">' + escape(label) + '</span>' +
                        '</div>';
                }
            }*/
        });
    };
	
	/* BYAL.TopSearch = function () {
        $('.js-user-search').selectize({
            persist: false,
            maxItems: 2,
            valueField: 'name',
            labelField: 'name',
            searchField: ['name'],
            options: [
                {image: 'img/avatar30-sm.jpg', name: 'Marie Claire Stevens', message:'12 Friends in Common', icon:'bugyal-happy-face-icon',url:'http://localhost:8080/places/8593/Ajmer,India'},
             ],
            render: {
                option: function(item, escape) {
                    return '<div class="choose-photo-item" data-mh="choose-item"><figure><img src="/tgso/img/choose-photo15.jpg" alt="photo"><figcaption><a href="#">The Majestic Canyon</a><span>Last Added: 57 mins ago</span></figcaption></figure></div>';
                },
                item: function(item, escape) {
                    var label = item.name;
                    return '<div>' +
                        '<span class="label">' + escape(label) + '</span>' +
                        '</div>';
                }
            }
        });
    };
	*/
    /* -----------------------------
     * Material design js effects
     * Script file: material.min.js
     * Documentation about used plugin:
     * http://demos.creative-tim.com/material-kit/components-documentation.html
     * ---------------------------*/
    BYAL.Materialize = function () {
        $.material.init();

        $('.checkbox > label').on('click', function () {
            $(this).closest('.checkbox').addClass('clicked');
        })
    };


    /* -----------------------------
     * Bootstrap components init
     * Script file: theme-plugins.js, tether.min.js
     * Documentation about used plugin:
     * https://v4-alpha.getbootstrap.com/getting-started/introduction/
     * ---------------------------*/
    BYAL.Bootstrap = function () {
        //  Activate the Tooltips
        $('[data-toggle="tooltip"], [rel="tooltip"]').tooltip();

        // And Popovers
        $('[data-toggle="popover"]').popover();


        /* -----------------------------
         * Replace select tags with bootstrap dropdowns
         * Script file: theme-plugins.js
         * Documentation about used plugin:
         * https://silviomoreto.github.io/bootstrap-select/
         * ---------------------------*/
        $('.selectpicker').selectpicker();


        /* -----------------------------
         * Date time picker input field
         * Script file: daterangepicker.min.js, moment.min.js
         * Documentation about used plugin:
         * https://v4-alpha.getbootstrap.com/getting-started/introduction/
         * ---------------------------*/
        var date_select_field = $('input[class="datetimepicker"]');
        if (date_select_field.length) {
            var start = moment().subtract(29, 'days');

            date_select_field.daterangepicker({
                startDate: start,
                autoUpdateInput: false,
                singleDatePicker: true,
                showDropdowns: true,
                locale: {
                    format: 'DD/MM/YYYY'
                }
            });
            date_select_field.on('focus', function () {
                $(this).closest('.form-group').addClass('is-focused');
            });
            date_select_field.on('apply.daterangepicker', function (ev, picker) {
                $(this).val(picker.startDate.format('DD/MM/YYYY'));
                $(this).closest('.form-group').addClass('is-focused');
            });
            date_select_field.on('hide.daterangepicker', function () {
                if ('' === $(this).val()){
                    $(this).closest('.form-group').removeClass('is-focused');
                }
            });

        }


    };


    /* -----------------------------
     * Lightbox popups for media
     * Script file: jquery.magnific-popup.min.js
     * Documentation about used plugin:
     * http://dimsemenov.com/plugins/magnific-popup/documentation.html
     * ---------------------------*/
    BYAL.mediaPopups = function () {
        $('.play-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
        $('.js-zoom-image').magnificPopup({
            type: 'image',
            removalDelay: 500, //delay removal by X to allow out-animation
            callbacks: {
                beforeOpen: function () {
                    // just a hack that adds mfp-anim class to markup
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = 'mfp-zoom-in';
                }
            },
            closeOnContentClick: true,
            midClick: true
        });
        $('.js-zoom-gallery').each(function () {
            $(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                },
                removalDelay: 500, //delay removal by X to allow out-animation
                callbacks: {
                    beforeOpen: function () {
                        // just a hack that adds mfp-anim class to markup
                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                        this.st.mainClass = 'mfp-zoom-in';
                    }
                },
                closeOnContentClick: true,
                midClick: true
            });
        });
    };

    /* -----------------------------
     * Sliders and Carousels
     * Script file: swiper.jquery.min.js
     * Documentation about used plugin:
     * http://idangero.us/swiper/api/
     * ---------------------------*/

	BYAL.initSwiper = function () {
		var initIterator = 0;
		var $breakPoints = false;
		$('.swiper-container').each(function () {

			var $t = $(this);
			var index = 'swiper-unique-id-' + initIterator;

			$t.addClass('swiper-' + index + ' initialized').attr('id', index);
			$t.find('.swiper-pagination').addClass('pagination-' + index);

			var $effect = ($t.data('effect')) ? $t.data('effect') : 'slide',
				$crossfade = ($t.data('crossfade')) ? $t.data('crossfade') : true,
				$loop = ($t.data('loop') == false) ? $t.data('loop') : true,
				$showItems = ($t.data('show-items')) ? $t.data('show-items') : 1,
				$scrollItems = ($t.data('scroll-items')) ? $t.data('scroll-items') : 1,
				$scrollDirection = ($t.data('direction')) ? $t.data('direction') : 'horizontal',
				$mouseScroll = ($t.data('mouse-scroll')) ? $t.data('mouse-scroll') : false,
				$autoplay = ($t.data('autoplay')) ? parseInt($t.data('autoplay'), 10) : 0,
				$autoheight = ($t.hasClass('auto-height')) ? true: false,
				$slidesSpace = ($showItems > 1) ? 20 : 0;

			if ($showItems > 1) {
				$breakPoints = {
					480: {
						slidesPerView: 1,
						slidesPerGroup: 1
					},
					768: {
						slidesPerView: 2,
						slidesPerGroup: 2
					}
				}
			}

			swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
				pagination: '.pagination-' + index,
				paginationClickable: true,
				direction: $scrollDirection,
				mousewheelControl: $mouseScroll,
				mousewheelReleaseOnEdges: $mouseScroll,
				slidesPerView: $showItems,
				slidesPerGroup: $scrollItems,
				spaceBetween: $slidesSpace,
				keyboardControl: true,
				setWrapperSize: true,
				preloadImages: true,
				updateOnImagesReady: true,
				autoplay: $autoplay,
				autoHeight: $autoheight,
				loop: $loop,
				breakpoints: $breakPoints,
				effect: $effect,
				fade: {
					crossFade: $crossfade
				},
				parallax: true,
				onSlideChangeStart: function (swiper) {
				    var sliderThumbs = $t.siblings('.slider-slides');
					if (sliderThumbs.length) {
                        sliderThumbs.find('.slide-active').removeClass('slide-active');
						var realIndex = swiper.slides.eq(swiper.activeIndex).attr('data-swiper-slide-index');
                        sliderThumbs.find('.slides-item').eq(realIndex).addClass('slide-active');
					}
				}
			});
			initIterator++;
		});
		

        //swiper arrows
        $('.btn-prev').on('click', function () {
            var sliderID = $(this).closest('.slider-slides').siblings('.swiper-container').attr('id');
            swipers['swiper-' + sliderID].slidePrev();
        });

        $('.btn-next').on('click', function () {
            var sliderID = $(this).closest('.slider-slides').siblings('.swiper-container').attr('id');
            swipers['swiper-' + sliderID].slideNext();
        });
		
        //swiper arrows
        $('.btn-prev-without').on('click', function () {
            var sliderID = $(this).closest('.swiper-container').attr('id');
            swipers['swiper-' + sliderID].slidePrev();
        });

        $('.btn-next-without').on('click', function () {
            var sliderID = $(this).closest('.swiper-container').attr('id');
            swipers['swiper-' + sliderID].slideNext();
        });
		
		
        // Click on thumbs
        $('.slider-slides .slides-item').on('click', function () {
            if ($(this).hasClass('slide-active')) return false;
            var activeIndex = $(this).parent().find('.slides-item').index(this);
            var sliderID = $(this).closest('.slider-slides').siblings('.swiper-container').attr('id');
            swipers['swiper-' + sliderID].slideTo(activeIndex + 1);
            $(this).parent().find('.slide-active').removeClass('slide-active');
            $(this).addClass('slide-active');

            return false;
        });
	};

	
	/* -----------------------
	 * Progress bars Animation
	 * --------------------- */
    BYAL.progresBars = function () {
        $progress_bar.appear({force_process: true});
        $progress_bar.on('appear', function () {
            var current_bar = $(this);
            if (!current_bar.data('inited')) {
                current_bar.find('.skills-item-meter-active').fadeTo(300, 1).addClass('skills-animate');
                current_bar.data('inited', true);
            }
        });
    };



	/* -----------------------------
	 * Isotope sorting
	 * ---------------------------*/

	BYAL.IsotopeSort = function () {
		var $container = $('.sorting-container');
		$container.each(function () {
			var $current = $(this);
			var layout = ($current.data('layout').length) ? $current.data('layout') : 'masonry';
			$current.isotope({
				itemSelector: '.sorting-item',
				layoutMode: layout,
				percentPosition: true
			});

			$current.imagesLoaded().progress(function () {
				$current.isotope('layout');
			});

			var $sorting_buttons = $current.siblings('.sorting-menu').find('li');

			$sorting_buttons.on('click', function () {
				if ($(this).hasClass('active')) return false;
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				var filterValue = $(this).data('filter');
				if (typeof filterValue != "undefined") {
					$current.isotope({filter: filterValue});
					return false;
				}
			});
		});
	};

	/* -----------------------------
	 * Toggle functions
	 * ---------------------------*/

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href"); // activated tab
        if('#events' === target){
            $('.fc-state-active').click();
        }
    });

	// Toggle aside panels
	$(".js-sidebar-open").on('click', function () {
        $(this).toggleClass('active');
        $(this).closest($sidebar).toggleClass('open');
        return false;
    } );

	// Close on "Esc" click
    $window.keydown(function (eventObject) {
        if (eventObject.which == 27 && $sidebar.is(':visible')) {
            $sidebar.removeClass('open');
        }
    });

    // Close on click outside elements.
    $document.on('click', function (event) {
        if (!$(event.target).closest($sidebar).length && $sidebar.is(':visible')) {
            $sidebar.removeClass('open');
        }
    });

    // Toggle inline popups

    var $popup = $('.window-popup');

    $(".js-open-popup").on('click', function (event) {
        var target_popup = $(this).data('popup-target');
        var current_popup = $popup.filter(target_popup);
        var offset = $(this).offset();
        current_popup.addClass('open');
        current_popup.css('top', (offset.top - (current_popup.innerHeight() / 2)));
        $body.addClass('overlay-enable');
        return false;
    });

    // Close on "Esc" click
    $window.keydown(function (eventObject) {
        if (eventObject.which == 27) {
            $popup.removeClass('open');
            $body.removeClass('overlay-enable');
			$('.profile-menu').removeClass('expanded-menu');
			$('.popup-chat-responsive').removeClass('open-chat');
			$('.profile-settings-responsive').removeClass('open');
			$('.header-menu').removeClass('open');
        }
    });

    // Close on click outside elements.
    $document.on('click', function (event) {
        if (!$(event.target).closest($popup).length) {
            $popup.removeClass('open');
            $body.removeClass('overlay-enable');
			$('.profile-menu').removeClass('expanded-menu');
			$('.header-menu').removeClass('open');
        }
    });

    // Close active tab on second click.
    $('[data-toggle=tab]').on('click', function(){
		/*$body.toggleClass('body--fixed');*/

        if ($(this).hasClass('active') && $(this).closest('ul').hasClass('mobile-app-tabs')){
            $($(this).attr("href")).toggleClass('active');
            $(this).removeClass('active');
            return false;
        }
        $('html, body').animate({
	        scrollTop: $(this).parent().offset().top - 150 
	    }, 500);
    });


    // Close on "X" click
    $(".js-close-popup").on('click', function () {
        $(this).closest($popup).removeClass('open');
        $body.removeClass('overlay-enable');
        return false
    });

	$(".profile-settings-open").on('click', function () {
		$('.profile-settings-responsive').toggleClass('open');
		return false
	});

	$(".js-expanded-menu").on('click', function () {
		$('.profile-menu').toggleClass('expanded-menu');
		return false
	});

	$(".js-chat-open").on('click', function () {
		$('.popup-chat-responsive').toggleClass('open-chat');
		return false
	});
    $(".js-chat-close").on('click', function () {
        $('.popup-chat-responsive').removeClass('open-chat');
        return false
    });

	$(".js-open-responsive-menu").on('click', function () {
		$('.header-menu').toggleClass('open');
		return false
	});

	$(".js-close-responsive-menu").on('click', function () {
		$('.header-menu').removeClass('open');
		return false
	});
	
		/* -----------------------------
	 * On DOM ready functions
	 * ---------------------------*/

	$document.ready(function () {
        BYAL.Bootstrap();
        BYAL.Materialize();
        BYAL.initSwiper();
        BYAL.progresBars();
		BYAL.IsotopeSort();

        // Run scripts only if they included on page.

        if (typeof $.fn.selectize !== 'undefined'){
            BYAL.TopSearch();
        }
        if (typeof $.fn.matchHeight !== 'undefined'){
            BYAL.equalHeight();
        }
        if (typeof $.fn.magnificPopup !== 'undefined'){
            BYAL.mediaPopups();
        }
        if (typeof $.fn.gifplayer !== 'undefined'){
            $('.gif-play-image').gifplayer();
        }
        if (typeof $.fn.mediaelementplayer !== 'undefined'){
            $('#mediaplayer').mediaelementplayer({
                "features": ['prevtrack', 'playpause', 'nexttrack', 'loop', 'shuffle', 'current', 'progress', 'duration', 'volume']
            });
        }

        $('.mCustomScrollbar').perfectScrollbar({wheelPropagation:false});

	});
	
	$('.curr-list li a').click(function(event) {
		//event.preventDefault();
		var val = $(this).text();
		$('.curr-list').children('li').removeClass('active');
		$(this).parent().addClass('active');
		$('.curr').text(val);
		$.post('/AutoCom'+urlAppend, {
			q : val,
			dataType : "json",
			typ : "CRR"
		}, function (data) {});
		return false;
		
	})
	






/*	$('#CMSte_f_5').click(function() { 
		$('.bp-libxhl').addClass('bp-libx');
		$('.bp-libxhlcl').show();
	});
	
	$('.bp-libxhlcl').click(function() { 
		$('.bp-libxhl').removeClass('bp-libx');
		$('.bp-libxhlcl').hide();
	});

	$(document).keyup(function (e) {
		if (e.keyCode == 27) {
			$('.bp-libxhl').removeClass('bp-libx');
			$('.bp-libxhlcl').hide();
		}
	});*/

	if ($(window).width() < 514) {
		$('#tmle-o-d').removeClass('tmle_dual');
		$('#tmle-o-d').addClass('tmle_right');
    }
	
	$('body').tooltip({
		selector : '[rel=tooltip]'
	});

	$('.required-icon').tooltip({
		placement : 'left',
		title : 'Required field'
	});
	options = {
		pattern : 'yyyy-mm', // Default is 'mm/yyyy' and separator char is not mandatory
		selectedYear : 2016,
		startYear : 1970,
		finalYear : 2017,
		monthNames : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
	};
	

	// for check box
	$('.list-group.checked-list-box .list-group-item').each(function () {
		var $widget = $(this),
		$checkbox = $('<input type="checkbox" class="hidden" />'),
		color = ($widget.data('color') ? $widget.data('color') : "info"),
		style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
		settings = {
			on : {
				icon : 'glyphicon glyphicon-check'
			},
			off : {
				icon : 'glyphicon glyphicon-unchecked'
			}
		};
		$widget.css('cursor', 'pointer')
		$widget.append($checkbox);
		$widget.on('click', function () {
			$checkbox.prop('checked', !$checkbox.is(':checked'));
			$checkbox.triggerHandler('change');
			updateDisplay();
		});
		$checkbox.on('change', function () {
			updateDisplay();
		});

		function updateDisplay() {
			var isChecked = $checkbox.is(':checked');
			$widget.data('state', (isChecked) ? "on" : "off");
			$widget.find('.state-icon')
			.removeClass()
			.addClass('state-icon ' + settings[$widget.data('state')].icon);
			if (isChecked) {
				$widget.addClass(style + color + ' active');
			} else {
				$widget.removeClass(style + color + ' active');
			}
		}

		function init() {
			if ($widget.data('checked') == true) {
				$checkbox.prop('checked', !$checkbox.is(':checked'));
			}
			updateDisplay();
			if ($widget.find('.state-icon').length == 0) {
				$widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
			}
		}
		init();
	});

	// for adding more activities
	count = 1;
	var addFormGroup = function (event) {
		event.preventDefault();
		count++;
		var formGroup = $(this).closest('.form-group');

		var formGroupClone = formGroup.clone();

		$(this)
		.toggleClass('btn-success btn-add btn-danger btn-remove')
		.html('?').attr('title', 'Remove Activities');

		formGroupClone.find('input').val('');
		formGroupClone.find('input').attr('name', 'activities_' + count + '');
		formGroupClone.insertAfter(formGroup);
	};
	$(document).on('click', '.btn-add', addFormGroup);

	//for removing more activities
	var removeFormGroup = function (event) {
		event.preventDefault();
		var formGroup = $(this).closest('.form-group');
		formGroup.remove();
	};
	$(document).on('click', '.btn-remove', removeFormGroup);

	// changes need to be done against the last arrival of submit
	var x;
	$(".submit-show-next").click(function (e) {
		var relTriVal = $('#te').val(); // $(this).parents('.been-places-Ent').find('#rel-trip-Id-edit').val();
		e.preventDefault();
		var formId = $(this).closest('form').attr('id');
		var fCh = $('#ufbt').length;
		x = $(this).closest('.my_hide').is(':last-child');
		if($(this).attr('id') == 'goto_stay_tab'){
			if(fCh == 0){
				if($("input[class^='cty-d']").length < 1){
					//$('#city_d').css('box-shadow', '7px 5px 10px -5px rgb(255, 0, 0)');
					$('#city_d').parent().addClass('has-danger');
					return false;
				}
				if($('#trip_dates').val().length < 1){
					//$('#trip_dates').css('box-shadow', '7px 5px 10px -5px rgb(255, 0, 0)');
					$('#trip_dates').parent().addClass('has-danger');
					return false;
				}
				for (var i = 1; i < ($("input[class^='cty-d']").length+1); i++) {
					if ($('#city_sp_' + i).val() != "") {
						$("#spot_cards").append(spot_card_template({
								name : $('#cty_d' + i).val(),
								count : i
							}));
					}
				}
			}else{
				var taVa = $('#city_des').val();
				taVa = taVa.split('||');
				taVa = taVa[1].split('--');
				for (var i = 1; i < ($('#city_des').length+1); i++) {
						$("#spot_cards").append(spot_card_template({
								name : taVa[0],
								count : i
							}));
				}
			}
			$('#spot_card_d').html($('#city_d').val());
		} 
		if (!x) {
			$(this).closest('.my_hide').fadeOut(500, function () {
				$(this).closest('.my_hide').next().fadeIn().addClass('active');
			});
		} else {
			$(this).closest('.my_hide').fadeOut(500, function () {
				$(this).parents().find('.my_hide_first').fadeIn(3000).addClass('active');
				$('#spot_cards').empty();
				$('.org_result').empty();
				$('.des_result').empty();
				sel_ori = false;
				var upHol = $('#fileupload').children('.dz-message');
				$('#fileupload').empty();
				$('#fileupload').append(upHol);
			});
			$('#inf_mem_cr').modal('show');
			//location.reload();
			//$("a[href='#" + 'been-places' + "']").tab('show');
		}
		getValues(formId, relTriVal);
		
	});
	function getValues(form_id, relTriVal) {
		//undefined refers to upload photos form
		if (form_id != undefined) {
			var c = "#" + form_id + " input[type=text], #" + form_id + " textarea, #" + form_id + " select,#" + form_id + " input[type=hidden]";
			var arr = [];
			var list = [];
			$(c).each(function () {
				var input = $(this); // This is the jquery object of the input, do what you will
				var data = {};
				data.type = input.attr('name');
				data.val = input.val();
				arr.push(data);
			});
			var listObj = $("#" + form_id).find('#checklist');
			var len_of_checkist = listObj.length; //to check if list items exists or not on that form
			if (len_of_checkist > 0) {
				var selectedItems = listObj.find('li.active').length;
				for (k = 0; k < selectedItems; k++) {
					list.push(listObj.find('li.active').eq(k).text());
				}
			}
			sendajaxdata(arr, list, relTriVal, form_id);
		}
	}

	function sendajaxdata(a, l, relTriVal, form_id) {
		$.ajax({
			url : "/sec/CNMS"+urlAppend,
			type : 'POST',
			data : {back_a :a,back_l:l,relTriVal:relTriVal,form_id:form_id},
			success : function (data) {
				if (x) {
					$('#curr-mem-hold').empty();
					$("#curr-mem-hold").append(data);
				}
			}
		});
	}

	$(".submit-later").click(function (e) {
		var relTriVal = $('#te').val();
		var y = $(this).closest('.my_hide').is(':last-child');
		e.preventDefault();
		$.ajax({
			url : "/sec/CNMS/"+urlAppend,
			type : 'POST',
			data : {back_a:"" ,back_l:"",relTriVal:relTriVal,form_id:"CMSte_f_0"},
			success : function (data) {
					$('#curr-mem-hold').empty();
					$("#curr-mem-hold").append(data);
					$('#inf_mem_cr').modal('show');
			}
		});
		if (!y) {
			$(this).closest('.my_hide').fadeOut(500, function () {
				//$(this).closest('.my_hide').next().fadeIn().addClass('active');
				$(this).parents().find('.my_hide_first').fadeIn(3000).addClass('active');
			});
		} else {
			$(this).closest('.my_hide').fadeOut(500, function () {
				$(this).parents().find('.my_hide_first').fadeIn(3000).addClass('active');
			});
			//location.reload();
			//$("a[href='#" + 'been-places' + "']").tab('show');
		}
		$("#spot_cards").empty();
		$(".des_result").empty();
		$(".org_result").empty();
		sel_ori = false;
		var upHol = $('#fileupload').children('.dz-message');
		$('#fileupload').empty();
		$('#fileupload').append(upHol);
	});
	var di = 1;
	$(function () {
		$("#city_d").bind("keydown", function (event) {
			if (event.keyCode === $.ui.keyCode.TAB &&
				$(this).autocomplete("instance").menu.active) {
				event.preventDefault();
			}
		}).autocomplete({
			source : function (request, response) {
				$.ajax({
					url : '/AutoP'+urlAppend,
					dataType : "json",
					data : {
						q : request.term
					},
					success : function (data) {
						response(data);
					}
				}); //ajax ends
			}, //source block ends
			minLength : 2,
			select : function (event, ui) {
				var city_selected = $.trim(ui.item.value);
				//var res = true;
				res = check_city_selected(city_selected);
				//alert(res);
				if (res) {
					$('.city_match_error').fadeIn().text(city_selected + " is already choosen").delay(1000).fadeOut();
					$(this).val('');
					event.preventDefault();
				} else {
					//$('#city_d').css('box-shadow', '0px 5px 5px -5px rgb(123, 255, 97)');
					$('#city_d').parent().removeClass('has-danger');
					$('#city_d').parent().addClass('has-success');
					//$('#form-cnm').append('<input type=hidden name="cty_d'+city_selected.trim()+'" id="cty_d" value="'+city_selected+'">');
					/*$('#spot_card_d').html($('#city_d').val());
					$("#spot_cards").append(spot_card_template({
					name : $('#city_sp_'+i).val(),
					count : i
					}));*/
					$('.des_result').append('<span  id="cty-d'+di+'" class="cty">' + city_selected + '<i class="fa fa-times bpcl"></i></span>');
					$('.des_result').append('<input type=hidden name="cty_d'+di+'" id="cty_d'+di+'"  class="cty-d'+di+'" value="' + city_selected + '">');
					if (di > 4) {
						$('.des_result').append('<br>');
						$('.des_result').append('<br>');
					}
					di++;
					//fnr(city_selected);
					$(this).val('');
					event.preventDefault();
				}
			}
		}); // autocomplete block ends
	});

	function check_city_selected(m) {
		if ($('.cty').length != 0) {
			var city_there = [];
			for (var i = 0; i < $('.cty').length; i++) {
				city_there.push($('.cty').eq(i).text());
				//alert(city_there[i]);
			}
			if ($.inArray(m, city_there) != -1) {
				return true;
			} else {
				return false;
			}
		}
	}

	var sel_ori = false;
	var oi = 1;
	$(function () {
		var i = 1;
		$("#city_o").bind("keydown", function (event) {
			if (event.keyCode === $.ui.keyCode.TAB &&
				$(this).autocomplete("instance").menu.active) {
				event.preventDefault();
			}
		}).autocomplete({
			source : function (request, response) {
				$.ajax({
					url : '/AutoP/'+urlAppend,
					dataType : "json",
					data : {
						q : request.term
					},
					success : function (data) {
						response(data);
					}
				}); //ajax ends
			}, //source block ends
			minLength : 2,
			select : function (event, ui) {
				var city_selected = $.trim(ui.item.value);
				//var res = true;
				res = check_city_selected(city_selected);
				//alert(res);
				if (res) {
					$('.city_match_error').fadeIn().text(city_selected + " is already choosen").delay(1000).fadeOut();
					$(this).val('');
					event.preventDefault();
				} else if (sel_ori) {
					$('.city_match_error').fadeIn().text("Another Origin is already choosen").delay(1000).fadeOut();
					$(this).val('');
					event.preventDefault();
				} else {
					//$('#city_o').css('box-shadow', '0px 5px 5px -5px rgb(123, 255, 97)');
					$('#city_o').parent().removeClass('has-danger');
					$('#city_o').parent().addClass('has-success');
					$('.org_result').append('<span  id="cty-o'+oi+'" class="cty">' + city_selected + '<i class="fa fa-times bpcl"></i></span>');
					$('.org_result').append('<input type="hidden" name="cty_o" id="cty_o" class="cty-o'+oi+'" value="' + city_selected + '">');
					$(this).val('');
					event.preventDefault();
					sel_ori = true;
				}
			}
		}); 
	});

	$(function () {
		var i = 1;
		//var hCtyVal = $('#form-cnm').children('#cty_d').val();
		var hCtyVal;
		var hVal;
		var cntr;
		$("#spot_cards").on("keyup", "input[id^='hotl_d']"
		, function (event) {
			hCtyVal = $(this).parent().find('input[id^="htl_ct"]').val();
			cntr = this.id.substr(6);
			hVal = $(this).val();
			if (event.keyCode === $.ui.keyCode.TAB &&
				$(this).autocomplete("instance").menu.active) {
				event.preventDefault();
			}
		}).autocomplete({
			source : function (request, response) {
				$.ajax({
					url : '/AutoH/'+urlAppend,
					dataType : "json",
					data : {
						q : hVal,
						hCtyVal : hCtyVal
					},
					success : function (data) {
						response(data);
					}
				}); //ajax ends
			}, //source block ends
			minLength : 0,
			select : function (event, ui) {
				var h_selected = $.trim(ui.item.value);
				$("#HResult"+cntr).append('<span id="htlS'+cntr+'" class="cty">' + h_selected + '<i class="fa fa-times bphl"></i></span>');
				$("#HResult"+cntr).append('<input type="hidden" class="htlS'+cntr+'" name="htl_d'+cntr+'" id="htl_d'+cntr+'"  value="' + h_selected + '">');
				//$(this).val('');
				$("#hotl_d"+cntr).val('');
				event.preventDefault();
				//	}
			}
		}); // autocomplete block ends
	});

	$('body').on('click', '.bpcl', function () {
		var cVal = $(this).parent().attr('id');
		$(this).parent().remove();
		//var cVal = $(this).parent().text();
		$("."+cVal).remove();
		
	/*	if ($('#cty_o').val() === cVal) {
			$('#cty_o').remove();
			sel_ori = false;
		}
		if ($('#cty_d').val() === cVal) {
			$('#cty_d').remove();
		}
		if ($('.cty').length == 0) {
			$('.hr').hide();
		}
		if ($('.cty').length < 5) {
			$('.cty').$('br').remove();
		}*/
	});
	
	$('body').on('click', '.bphl', function () {
		var hVal = $(this).parent().attr('id');
		$(this).parent().remove();
		$("."+hVal).remove();
	});


	jQuery.validator.setDefaults({
		debug : true,
		success : "valid"
	});

	function custVali() {
		$("#form-cnm").validate({
			rules : {
				day_stay : {
					required : true
				},
				typ_stay : {
					required : true
				},
				TripDesc : {
					required : true
				}
			},
			messages : {
				day_stay : {
					required : "Please select Stay Duration"
				},
				typ_stay : {
					required : "Please select type of Stay"
				},
				TripDesc : {
					required : "Please Enter some trip description"
				}
			},
			highlight : function (element) {
				//$(element).closest('#form-cnm').addClass('has-error');
				$(element).closest('div').addClass('has-danger');
			},
			unhighlight : function (element) {
				//$(element).closest('#form-cnm').removeClass('has-error');
				$(element).closest('div').removeClass('has-danger');
			},
			submitHandler : function (form) {
				form.submit();
			}
		});
	};

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1);
			if (c.indexOf(name) == 0)
				return c.substring(name.length, c.length);
		}
		return "";
	}

	function checkCookie() {
		var c = getCookie("htc");
		if (c == "") {
			setCookie("htc", 1, 50);
			initN1 = true;
		}else{
		if (c != "" && c < 1) {
			initN1 = true;
			c++;
			setCookie("htc", c, 50);
		}
			if (c > 0 && c < 4) {
			initN1 = true;
			c++;
			setCookie("htc", c, 50);
			} else if (c > 3 && c < 6) {
			initN2 = true;
			c++;
			setCookie("htc", c, 50);
			}
			 else if (c > 5 && c < 8) {
			initN3 = true;
			c++;
			setCookie("htc", c, 50);
			}
			 else if (c > 7 && c < 9) {
			initN4 = true;
			c++;
			setCookie("htc", c, 50);
			}
		}
	}

	var current_step = 0;
	var init = false, initN1 = false, initN2 = false, initN3 = false, initN4 = false;
	var max_number_of_steps = 8;
	checkCookie();
	$('#inf_aler1_b').on('click', function (e) {
			//a2.modal('show');
	});
	$('#inf_aler2_b').on('click', function (e) {
			a3.modal('show');
	});
	if (initN4) {
		$('#step0').show();
		$('#tipHide').addClass('FBLoginPr');
		$('html, body').animate({
			scrollTop : 200
		}, 1200);
	}
	
	
	$('.stepbtn').click(function () {
		var next_step = current_step + 1;
		$('#step' + next_step).slideDown();
		$('#step' + current_step).hide()
		$('#backbtn').show();
		init = false;
		current_step++; // increase the step we are on...
		if (current_step == max_number_of_steps) {
			//$('.stepbtn').hide();
			$('.helpTip').hide();
			$('#tipHide').removeClass('FBLoginPr');
		}
	});
	$('.stepbtndn').click(function (event) {
		//$('#stepbtn').hide();
		$('.helpTip').hide();
		$('#tipHide').removeClass('FBLoginPr');
		event.preventDefault();
		$('html, body').animate({
			scrollTop : 0
		}, 1200);
	});

	$('#backbtn').click(function () {
		$('#step' + current_step).show()
		$('#step' + current_step).slideUp(); // hide it first,
		current_step--; // now update, so we know the correct step we are on
		if (current_step == 1) {
			$('#backbtn').hide();
		}
		/* if (current_step < max_number_of_steps) {
		$('#stepbtn').show(); // show, if its been hidden...
		}*/
	});

	$(document).on('click', '.close-hp-tip', function () {
		$('.helpTip').hide();
		$('#tipHide').removeClass('FBLoginPr');
	});

	var a1 = $('#inf_aler1');
	var a2 = $('#inf_aler2');
	var a3 = $('#inf_aler3');
	$(function () {
		if (initN1  && typeof a1 !== 'undefined' ) {
			a1.modal('show');
		} else if (initN2 && typeof a2 !== 'undefined' ) {
			a2.modal('show');
		} else if (initN3 && typeof a3 !== 'undefined' ) {
			a3.modal('show');
		}
	});

	$(document).on('click', '.checkbox-success', function () {
		var group = [];
		/*	$('.ckbx3').each(function() { 		//$.each($("input[name='ckbx3']:checked"), function() {
		if($(this).is(':checked')){
		group.push($(this).value);
		}

		});*/

		if (!$(this).hasClass('checked')) { //!$(this).children('.ckbx3').is(":checked")
			$(this).closest(".checkbox").addClass("checked");
			var val = $(this).children('.ckbx3').val();
			$.post('/AutoCom'+urlAppend, {
				q : val,
				typ : "UP"
			}, function (data) {});
		} else {
			$(this).closest(".checkbox").removeClass("checked");
		}

		if ($(this).children('.ckbx3').is(':checked')) {
			//group.push($(this).children('.ckbx3').val());
		}
	});

	$(function () {
		$('a.scroll-to[href*=\\#]:not([href=\\#])').click(function () {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html,body').animate({
						scrollTop : target.offset().top - 150
					}, 1000);
					return false;
				}
			}
		});
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#to-top').stop().animate({
				bottom : '30px'
			}, 750);
		} else {
			$('#to-top').stop().animate({
				bottom : '-100px'
			}, 750);
		}
	});

	$('.upload_button').click(function () {
		$("#fl-upl-mem").submit();
		$('.lightbox_3').fadeOut(function () {
			$('.lightbox_3').removeClass('popup-gallery');
			$('#mask').remove();
		});

	});

	$('.upload_2').click(function () {
		$('.lightbox_3').fadeIn();
		$('.lightbox_3').addClass('popup-gallery');
		var value = 0;
		var existV = $('#fl-upl-mem').find('.usrItinUpl-Id').val();
		var teVal = $('#te').val();
		if (typeof existV !== 'undefined' && existV.length > 0) {
			$(".usrItinUpl-Id").remove();
		}
		$('#fl-upl-mem').append('<input name="usrItinUplId" type="hidden" value="' + value + '" class="usrItinUpl-Id">');
		$('#fl-upl-mem').append('<input name="aUId" type="hidden" value="' + teVal + '" class="usrItinUpl-Id">');
	});

	$(document).on('click', '.close-BP-upl', function () {
		$('.lightbox_3').fadeOut(1000, function () {
			$('.lightbox_3').children('#filesList').empty();
			$('.lightbox_3').children('#progress').children('.bar').css('width', '0%');
			$(this).hide(400); //$(this).parent().hide(400);

		});
	});

	var spots_count = 1;

	var spot_inp_template = _.template('<div class="form-group"><input type="text"  autocomplete="off" placeholder="Spot" class="form-control city_sp" id="city_sp_<%= count %>" name="city_sp_<%= count %>"><div class="spot_result"></div></div>');
	var spot_card_template = _.template('<div class=""><div class="container-fluid spot-card"> \
			                        <div class="form-group text-center" style="height: 35px;"><strong><%= name %></strong></div> \
			                        <div class="form-group"><label for="typ_stay">Stayed At</label> \
			                            <select name="typ_stay_<%= count %>" id="typ_stay_<%= count %>" class="form-control"><option selected="selected" value="HL">Hotel</option><option value="RT">Resort</option><option value="LE">Lodge</option> \
			                                <option value="RH">Rest House</option><option value="GH">Guest House</option><option value="CT">Camp/Tent</option><option value="ML">Motel</option><option value="RF">Relative/Friend\'s House</option> \
			                            </select> \
			                        </div> \
			                        <div class="form-group"><label for="hotl_d">Specify Name</label><input placeholder="Stayed at" type="text" class="form-control" id="hotl_d<%= count %>" name="hotl_d<%= count %>"/><div class="h_result tag-div" id="HResult<%= count %>"></div><input type="hidden" name="htl_ct<%= count %>" id="htl_ct<%= count %>"  value="<%= name %>"/></div> \
			                        </div></div>');
/*	$('#add_spot').on('click', function () {
		$('#jrny_spots').append(spot_inp_template({
				count : spots_count
			}));
		spots_count++;
		return false;
	});

	$('#goto_stay_tab').bind('click', function () {
		if($("input[class^='cty-d']").length < 1){
			$('#city_d').css('box-shadow', 'inset 0 1px 1px rgba(0,0,0,.075)');
			return false;
		}else{
			$('#spot_card_d').html($('#city_d').val());
			for (var i = 0; i < $("input[class^='cty-d']").length; i++) {
				if ($('#city_sp_' + i).val() != "") {
					$("#spot_cards").append(spot_card_template({
							name : $('#cty_d' + i).val(),
							count : i
						}));
				}
			}
		}
	});*/
	
	
		// UI Form Element
	$(function () {
		var i = 1;
		$('#Orig_city').bind("keydown", function (event) {
			if (event.keyCode === $.ui.keyCode.TAB &&
				$(this).autocomplete("instance").menu.active) {
				event.preventDefault();
			}
		}).autocomplete({
			source : function (request, response) {
				$.ajax({
					url : '/AutoP'+urlAppend,
					dataType : "json",
					data : {
						q : request.term
					},
					success : function (data) {
						response(data);
					}
				}); //ajax ends
			}, //source block ends
			minLength : 2,
			select : function (event, ui) {
				var city_selected = $.trim(ui.item.value);
				$("input#Orig_city").val(city_selected);
				// $("input#Orig_city").addClass( "auto-select" );
				event.preventDefault();
				//}
			}
		}); // autocomplete block ends
	});

	$(function () {
		var i = 1;
		$('#ap-origin').bind("keydown", function (event) {
			if (event.keyCode === $.ui.keyCode.TAB &&
				$(this).autocomplete("instance").menu.active) {
				event.preventDefault();
			}
		}).autocomplete({
			source : function (request, response) {
				$.ajax({
					url : '/AutoA'+urlAppend,
					dataType : "json",
					data : {
						q : request.term
					},
					success : function (data) {
						response(data);
					}
				}); //ajax ends
			}, //source block ends
			minLength : 2,
			select : function (event, ui) {
				var city_selected = $.trim(ui.item.value);
				$("input#ap-origin").val(city_selected);
				$("#sear-o-fl").val(city_selected);
				// $("input#Orig_city").addClass( "auto-select" );
				event.preventDefault();
				//}
			}
		}); // autocomplete block ends
	});

	$(function () {
		var i = 1;
		$('#ap-dest').bind("keydown", function (event) {
			if (event.keyCode === $.ui.keyCode.TAB &&
				$(this).autocomplete("instance").menu.active) {
				event.preventDefault();
			}
		}).autocomplete({
			source : function (request, response) {
				$.ajax({
					url : '/AutoA'+urlAppend,
					dataType : "json",
					data : {
						q : request.term
					},
					success : function (data) {
						response(data);
					}
				}); //ajax ends
			}, //source block ends
			minLength : 2,
			select : function (event, ui) {
				var city_selected = $.trim(ui.item.value);
				$("input#ap-dest").val(city_selected);
				$("#sear-d-fl").val(city_selected);
				// $("input#Orig_city").addClass( "auto-select" );
				event.preventDefault();
				//}
			}
		}); // autocomplete block ends
	});

	$(function () {
		var i = 1;
		$('#dest-ho').bind("keydown", function (event) {
			if (event.keyCode === $.ui.keyCode.TAB &&
				$(this).autocomplete("instance").menu.active) {
				event.preventDefault();
			}
		}).autocomplete({
			source : function (request, response) {
				$.ajax({
					url : '/AutoP'+urlAppend,
					dataType : "json",
					data : {
						q : request.term
					},
					success : function (data) {
						response(data);
					}
				}); //ajax ends
			}, //source block ends
			minLength : 2,
			select : function (event, ui) {
				var city_selected = $.trim(ui.item.value);
				$("input#dest-ho").val(city_selected);
				$("#sear-d-ho").val(city_selected);
				// $("input#Orig_city").addClass( "auto-select" );
				event.preventDefault();
				//}
			}
		}); // autocomplete block ends
	});

	$(function () {
		$('.spo1').each(function () {
			var this_image = this;
			var src = $(this_image).attr('src') || '';
			if (!src.length > 0) {
				var lsrc = $(this_image).attr('lsrc') || '';
				if (lsrc.length > 0) {
					var img = new Image();
					img.src = lsrc;
					$(img).load(function () {
						this_image.src = this.src;
					});
				}
			}
		});
	});

	var te =  $('#te').val();
	var pagi;
	var pagiF;



	var onceS = true;

	
 	 var onceSPP = true;
	$(document).on('scroll',function () {
		if(onceSPP){
			/* PP on itin*/
	 		$('.itin_holder_C').find('.usr-itin-pd').each( function() {
				var thisIt = $(this).find('.img-pro');
				var pp =  thisIt.data('ppim')
				pp = pp.replace("http://", "https://");
				$.getJSON(pp, function(data){
				}).done(function( data ) {
					var name = data["data"];
					picUrl = name["url"]; 	
					if(picUrl  !== 'undefined' ){
						//thisIt.find('.author').find('.img-pro' ).attr( 'src', picUrl);
						//thisIt.find('.usrPro').find('.img-pro' ).attr( 'src', picUrl);
						thisIt.attr( 'src', picUrl);
						
					}
				});

				/*
	 			var thisIt = $(this);
		  	 	var picUrl;
				var pp =  thisIt.find('.hentry').find('.usr-MId').val();//[id^=usr-Itin-PPic]
				pp = pp.replace("http://", "https://");
				$.getJSON(pp, function(data){
				}).done(function( data ) {
					var name = data["data"];
					picUrl = name["url"]; 	
					if(picUrl  !== 'undefined' ){
						//thisIt.find('.author').find('.img-pro' ).attr( 'src', picUrl);
						//thisIt.find('.usrPro').find('.img-pro' ).attr( 'src', picUrl);
						$('.img-pro' ).attr( 'src', picUrl);
						onceSPP = false;
					}
				});
				*/
			});
			onceSPP = false;
			/* PP on QA*/
	 		$('.itin_holder_C').find('.comment-author').each( function() {
	 			var thisIt = $(this);
		  	 	var picUrlQA;
				var ppQA =  thisIt.find('.QA-author-I').val();//[id^=usr-Itin-PPic]
				ppQA = ppQA.replace("http://", "https://");
				$.getJSON(ppQA, function(data){
				}).done(function( data ) {
					var name = data["data"];
					picUrlQA = name["url"]; 	
					if(picUrlQA  !== 'undefined' ){
						thisIt.find('.img-pro-QA' ).attr( 'src', picUrlQA);
						onceSPP = false;
					}
				});
			});
			/* PP on comments*/
			$(this).find('.avatar-pp').each( function() {
			var picUrl;
			var thisIt = $(this);
			//var pp =  $(this).attr( 'data-pic').val();//[id^=usr-Itin-PPic]
			var pp =  thisIt.data('pic')
			$.getJSON(pp, function(data){
			}).done(function( data ) {
				var name = data["data"];
				picUrl = name["url"]; 	
				if(picUrl  !== 'undefined' ){
					thisIt.attr( 'src', picUrl);
					onceSPP = false;
				}
			});
		});
		
		/*
		var onceS = true;
	$(window).on('load', function () {
		if(onceS){
			$('.avatar-pp').each( function() {
			var thisIt = $(this);
			var picUrl;
			//var pp =  thisIt.attr( 'data-pic').val();//[id^=usr-Itin-PPic]
			var pp =  thisIt.data('pic')
			$.getJSON(pp, function(data){
			}).done(function( data ) {
				var name = data["data"];
				picUrl = name["url"]; 	
				if(picUrl  !== 'undefined' ){
					thisIt.attr( 'src', picUrl);
					
				}
			});
		});
		onceS = false;
		}
	});*/
		
		
		}
 		$(document).off('scroll');
 	});
	
	/*
	 * Updates the Star given on Itin, response is empty
	 * */
	$('.itin_holder_C').on('click','.a-itin-Cl',function(event){
		event.preventDefault();
		event.stopPropagation();
		Ulkup =  $('#sesKe').val();
		var w = $(this).data("tp");
		var v = $(this).parents('.itin-arti').children('[id^=usr-Itin-MId-]').val();
		//var typ= $(this).parent().find('#it-typ').val();
		$.post('/UTI'+urlAppend,{w:w, v:v, p:Ulkup,te:te }, function(data){
			$( "#frn_itin_holder" ).append( data );

			/*$( ".share_itin_holder" ).fadeIn();
			$('body').append('<div id="mask"></div>')
			$('#mask').fadeIn();*/
		});

	});
	

	
	$('#sh-frn-itin').on('scroll',function () {
		   if($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {
			   SIFr();
		   }
	});

	$('#dd0').on('click','.add-DD',function(event){
		event.preventDefault();
		event.stopPropagation();
		var value= $(this).parents('.photo-album-item-wrap').children('.cty_id_c').val();
		//var yrValue= $(this).parent().find("[id^=yearChoos]").val();
		var yrValue = 0;
		var typ= "DD";
		if(value != '')
		{	
			$.post('/AddBucket'+urlAppend,{value: value,typ: typ, yrValue:yrValue }, function(data){
			});
			$(this).remove();
			$(this).parents('.box').append('<ul class="check-circle" style="float: right;background: #CCF981;"><li>Added</li></ul>');
		}
	});

	$('.itin_holder_C').on('hover','.author a',function(event){
		$(this).parents('.author').children('.usrPro').show();
	});
	$('.itin_holder_C').on('mouseleave','.author',function(event){
		/*var atusrPro = true;
		$('.itin_holder_C').on('hover','.usrPro',function(event){
			atusrPro = false;
		});
		if(atusrPro){
			
		}*/
		$(this).children('.usrPro').hide();
	});

	$('#frn_itin_holder').on('keyup','.comm-mem',function(event){
		//	$('textarea').keyup(function(e){
			    if(event.keyCode == 13)
			    {
					var a = $(this);
			    	var iid = $(this).parents('.itin-arti').find('.usr-MId-I').val();
			    	var uiid = $(this).parent().find("input[id^='e-usr-id']").val();
			    	var uid = $('#te').val();
			    	var dataSend = {commem:$(this).val(), iid:iid, uiid:uiid, uid:uid};
			    	var fC = '<span class="label-key" style="margin: 9px;float: left"><i class="icon soap-icon-user"></i></span><p class="" >'+ $(this).val() +'</p><input type="hidden" id="par-comm-id'+ $(this).val() +'" name="par-comm-id'+ $(this).val() +'" value="'+ $(this).val() +'" style="margin: 9px;"/>';
			    	//$(this).trigger("enterKey");
					//$(this).after(fC);
					$.ajax({
					   url: '/SaComMem/'+urlAppend,
					   type: 'POST',
					   data: $.param(dataSend),
					   dataType: 'text',
					   success: function(response, textStatus, jqXHR) {
							a.parents('.comm-hold').children(':last-child').before(response);
							a.val('');
							a.parents('.comm-hold').focus();
					   },
					   error: function(jqXHR, textStatus, errorThrown){
						 alert(textStatus, errorThrown);
					  }
					});
					
					//$(this).parents('.comm-hold').find('li:last-child').before(a);
					
					//alert( $(this).parents('.comm-hold:last-child').children(':last-child').attr('class') );
					//$(this).parents('.comm-hold').children().append(a);
					//$(this).after(a);
			    }
		});
		
		$('#preloader').fadeOut();
		
		$('.curren-u li a').click(function(event) {
			event.preventDefault();
			var val = $(this).text();
			$('.curren-u').children('li').removeClass('active');
			$(this).parent().addClass('active');
			$(this).parents('.tab-pane').removeClass('active');
			$(this).parents('.nav-link').text(val);
			$('.curr').text(val);
			$.post('/AutoCom'+urlAppend, {
				q : val,
				typ : "CRR"
			}, function (data) {});
			return false;
		})
		
		$(function () {
			var i = 1;
			$('#Ques_Sea').bind("keydown", function (event) {
				if (event.keyCode === $.ui.keyCode.TAB &&
					$(this).autocomplete("instance").menu.active) {
					event.preventDefault();
				}
			}).autocomplete({
				source : function (request, response) {
					$.ajax({
						url : '/AutoCom'+urlAppend,
						dataType : "text",
						data : {
							q : request.term,  typ:"QAQ"
						},
						success : function (data) {
							$('#SQA_result').show();
							$('#SQA_result').html(data);
							//response(data);
						}
					}); //ajax ends
				}, //source block ends
				minLength : 2,
				select : function (event, ui) {
					// $("input#Orig_city").addClass( "auto-select" );
					//event.preventDefault();
					//}
				}
			}); // autocomplete block ends
		});

		var sa = $('#sticky-a');
		function sticky_m() {
		    var window_top = $(window).scrollTop();
		    
		    if (sa.length ){
		    	var div_top = sa.offset().top;
			    if ( window_top > div_top)
			    	sa.addClass('sticky');
			    else
			    	sa.removeClass('sticky');
			}
		}

		$(function() {
		    $(window).scroll(sticky_m);
		    sticky_m();
		});
$('.panel-heading a').click(function() {
  var clickElement = $(this);
  if (clickElement.parents('.panel-heading').is('.panel-active')) {
    $('.panel-heading').removeClass('panel-active');
  } else {
    $('.panel-heading').removeClass('panel-active');
    clickElement.parents('.panel-heading').addClass('panel-active');
  }
});

$.fn.extend({  togColor: function(css) {   return $(this).queue(function(next) {   $(this).css(css);    next();   });    } 	});

var offset = 220;
var duration = 1000;
$(window).scroll(function() {
	if ($(this).scrollTop() > offset) {
		$('#back-to-top').fadeIn(duration);
	} else {
		$('#back-to-top').fadeOut(duration);
	}
});

$('.back-to-top').click(function(event) {
	event.preventDefault();
	$('html, body').animate({scrollTop: 0}, duration);
	return false;
})


})(jQuery);
