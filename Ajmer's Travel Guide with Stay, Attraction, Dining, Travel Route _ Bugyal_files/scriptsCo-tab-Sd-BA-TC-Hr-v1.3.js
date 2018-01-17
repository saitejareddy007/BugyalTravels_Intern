/*
 * Title:   Bugyal - Custom Javascript file
 *
 */

$(document).ready(function ($) {
	var urlAppend = '';
	var valueCoo = $('#seKeCoU').val();
	if (typeof valueCoo != 'undefined') {
		urlAppend = '?cDis=' + valueCoo;
	}

	$('.take-upper').click(function () {
		$("html,body").animate({
			scrollTop : $('.search-box-wrapper').offset().top - 20
		}, 1500);
		cont = $(this).children('a').attr('href');
		$('.search-tabs li.active').removeClass('active');
		$('.search-tab-content').find('div').removeClass('active in');
		$('.search-tabs li:has(a[href=' + cont + '])').addClass('active');
		//$('.search-tab-content').children('div').addClass('fade');
		$('.search-tab-content').find(cont).addClass('active in');
	});

/*
	var top = $('.Search-spots').position().top;
	var left = $('.Search-spots').position().left;
	var width = $('.Search-spots').width();
	$('#search_result').css('left', left).css('top', 'top+95').
	css('width', 'width+150');
*/
	$('#search').keyup(function () {
		var value = $(this).val();
		if (value != '') {
			if (value.length > 2) {
				$('#search_result').show();
				$.post('/AutoP'+urlAppend, {
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

	$(document).keyup(function (e) {
		if (e.keyCode == 27) {
			$('#search_result').fadeOut(1000, function () {
				//$('#mask').remove();
			});
		}
	});
	$(document).bind('click', function (event) {
      if (!($(event.target).parents().addBack().is('#search_result'))) {
    	  $('#search_result').fadeOut(1000);
  		}
	});

	
	$('.curren-u li a').click(function(event) {
		event.preventDefault();
		var val = $(this).text();
		$('.curren-u').children('li').removeClass('active');
		$(this).parent().addClass('active');
		$('.curr').text(val);
		$.post('/AutoCom'+urlAppend, {
			q : val,
			typ : "CRR"
		}, function (data) {});
		return false;
	})

	// UI Form Element
	if ($(window).width() < 514) {
		$('#m-tab').removeClass('tabs');
		$('#m-tab').addClass('mtab');
		$('.tab-txt').hide();
    }
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
		$('.spo1').each(function () {
			  var imagex = $(this);
			  var imgOriginal = imagex.data('original');
			  $(imagex).attr('src', imgOriginal);
		});
	SpotSlide();
	});
	//SpotSlide();
		function SpotSlide(){
		$("#owl-Spot").owlCarousel({
			navigation : true, 
			slideSpeed : 300,
			paginationSpeed : 500,
			items: 1,
			singleItem: true,
			autoPlay : true,
			autoplaySpeed : 4000,
		    autoWidth:false,
		  responsiveClass:true,
			responsive:{
				0:{
					//items:1,
					nav:true,
					touchDrag:true,
					dots: false
				},
				600:{
					//items:1,
					touchDrag:true,
					nav:true,
					dots: false
				},
				1000:{
					//items:1,
					nav:true,
					loop:true,
					dots: false,
					mouseDrag:true
				}
			}
	  
	  });
	}
/*
		$("#owl-Spot").owlCarousel({
			 
			  navigation : true, // Show next and prev buttons
			  autoPlay:true,
			  pagination:true,
			  autoHeight:true,
			  slideSpeed : 300,
			  paginationSpeed : 400,
			  singleItem:true
		  
		  });
*/
	$(function () {
		$('.spot-Hotel-photo').each(function () {
			  var imagex = $(this);
			  var imgOriginal = imagex.data('original');
			  $(imagex).attr('src', imgOriginal);
		});
	});

/*
	var numItems = $('.hotel-list-item').length;
	$(function () {
		if(numItems > 20){
			$('.htl-hid').hide();
			$('.htl-hid-btn').show();
		}else{
			$('.htl-hid-btn').hide();
		}
	});
	
	$('.htl-hid-btn').on('click', function () {
		$('.htl-hid').show();
	});
	*/

	var routLInd = true;
	$('#get-routes').on('click', function () {
		gr();
		//routLInd = false;
	});
	var valueOC = $('#Orig_city').val();
	if (valueOC != '') {		//typeof valueOC != 'undefined'
		gr();
	}
	function gr(){
		var ctyOVal = $('#Orig_city').val();
		var ctyDVal = $('#Des_city').val();
		var Nr_airP = $('#Nr_airP').val();
		var Nr_airPName = $('#Nr_airPName').val();

		var typ = $('#it-typ').val();
		if(routLInd){
			//routLInd = false;
			$.post('/FRO'+urlAppend, {
				typ : typ,
				ctyOVal : ctyOVal,
				ctyDVal : ctyDVal,
				Nr_airP : Nr_airP,
				Nr_airPName : Nr_airPName
			}, function (data) {
				$("#route_r_h").html(data);
			});
		}

	}
	
	//var dinLInd = true;
/*	$('#get-dining').on('click', function () {*/
/*	$('#dining-tab').click(function () {
		if($('#dining_o_h').length){
			var ctyDVal = $('#Des_city').val();
			var typ = $('#it-typ').val();
			if(dinLInd){
				loading("#spot-dining-options");
				dinLInd = false;
				$.post('/FDO', {
					typ : typ,
					ctyDVal : ctyDVal
				}, function (data) {
					$("#dining_o_h").html(data);
				});
			}
		}
	});*/

/*	var itinLInd = true;
	$('#share-itin-tab').on('click', function () {
		var ctyDVal = $('#Des_city').val();
		//var typ = $(this).parent('#view-itin').find('#it-typ').val();
		if(itinLInd){
			loading("#spot-view-itin");
			itinLInd = false;
			$.post('/FUI', {
				typ : "VT",
				ctyDVal : ctyDVal
			}, function (data) {
				$("#itin_v_h").html(data);
			});
		}
	});*/

	function loading(elm) {
		$(elm).waitMe({
			effect : 'stretch',
			text : 'Just a Moment',
			bg : 'rgba(255,255,255,0.95)',
			color : '#6A0443',

		});
		my = setTimeout(function () {
				loading_remove(elm);
			}, 2000);

	}
	function loading_remove(elm) {
		$(elm).waitMe('hide');
	}


/*	$('.htl-select').on('click', function (e) {
		e.preventDefault();
		//var value= $(this).children('#htl_id').val();
		var htVal = $(this).parent().find('#htl-id').val();
		var ctyVal = $(this).parents().find('#p-spot-val-2').val();
		//var htRmVal = $(this).parents('.submit-room-booking').children('#htl-room-id').val();
		//var ctyVal= $( '.ctyD' ).find( '.shortlist_Cty_id' ).val();
		var typ = "HBL";
		if (htVal != '') {
			//$('#hotel-short').show();
			$.post('/AddBucket', {
			//	value : htRmVal,
				ctyVal : ctyVal,
				typ : typ,
				value : htVal
			}, function (data) {
				//url : '/jsp/BookHotelEnquiry.jsp'
				window.location.href = '/sec/bhe?htVal='+htVal+'&ctyVal='+ctyVal;
			});
		} else {
			//$('#hotel-short').hide();
		}
	});*/

	$( "#add-itinB" ).click(function() {
		$( "#addItin" ).submit();
	});

	// Script for SpotDetailView page
	var numHote;
	var numHotedynm;
	var firstT;
	var filter_rating_value = [2,4], filter_price_value;
	var articles = $('#spot-hotels').find('article');
	var curr = $('#cur').val();
	$(function($) {  

	    var len = articles.length;
	    var min_price = 1e5, max_price = 0;
	    var locations_array = [];

	    for (var i = 0; i < len; i++){
	        val = $(articles[i]).find('.htl-fil').attr('value');
	        val = val.split('-');
	        if(parseInt(val[3]) > max_price){
	        	max_price = parseInt(val[3]);
	        }
	        if(parseInt(val[2]) < min_price){
	        	min_price = parseInt(val[2]);
	        }
	        if($.inArray(val[1],locations_array) == -1){
	            $('#filter-place').append($('<option>', {
	                value: val[1],
	                text: val[1]
	            }));
	            locations_array.push(val[1]);
	        }        
	    }

	    min_price = parseInt(min_price);
	    max_price = parseInt(max_price);
	      if(min_price > max_price){
			var temp = min_price;
			min_price = max_price;	
			max_price = temp;
		}
	    filter_price_value = [min_price,max_price];
	    

	    $( "#filter-rating-value" ).html( "From " + filter_rating_value[ 0 ] + " to " + filter_rating_value[ 1 ] + " stars");
	    $( "#filter-price-value" ).html("From "+curr+" " + filter_price_value[ 0 ] + " to "+curr+" " + filter_price_value[ 1 ]);

	    $( "#filter-rating" ).slider({
	        range: true,
	        min: 0,
	        max: 5,
	        values: filter_rating_value,
	        slide: function( event, ui ) {
	            filter_rating_value = ui.values;        
	            $( "#filter-rating-value" ).html( "From " + ui.values[ 0 ] + " to " + ui.values[ 1 ] + " stars");
	            applyFilters();
	        }
	    });


	   $( '#filter-price' ).slider({
	        range: true,
	        min: min_price,
	        max: max_price,
	        values: filter_price_value,
	        step: 1,
	        stop: function( event, ui ) {
	            filter_price_value = ui.values;
	            $( '#filter-price-value' ).html('From '+curr+' ' + ui.values[ 0 ] + ' to '+curr+' ' + ui.values[ 1 ]);
	            applyFilters();
	        }
	    });

	    $('#filter-place').on('change',applyFilters);
			numHote = $('.hotel-list-item').length;
			firstT = true;
	    $('#htl-count').html("Showing "+ numHote +" Hotels");
	    
	});

	function hideInit(){
		$('.htl-hid').hide();
		$('#htl-hid-btn').show();
	}
	function applyFilters() {
		if(numHote > 20 && firstT){
			hideInit();
			firstT = false;
		}else{
			numHotedynm = numHote;
			//var $ = $;
			var val,flag;
			var filter_place = $('#filter-place').val().toLowerCase();
			var len = articles.length;

			for (var i = 0; i < len; i++){
				val = $(articles[i]).find('.htl-fil').attr('value');
				val = val.split('-');
				flag = true;
				
				if (val[0] >= filter_rating_value[0] && val[0] <= filter_rating_value[1]) {
					if (parseInt(val[3]) >= filter_price_value[0] && parseInt(val[3]) <= filter_price_value[1]){
						if(filter_place == "" || val[1].toLowerCase().search(filter_place) != -1){
							$(articles[i]).show();
							flag = false;
						}
					};
				};           
				
				if(flag) {
					$(articles[i]).hide();
					numHotedynm--;	
				};
			}
			$('#htl-count').html("Showing "+ numHotedynm +" Hotels");
			$('.hotel-list').delay(750).togColor({ border: '2px solid #ff9432' , backgroundColor: '#e6fff2' ,  transition: 'background-color 0.7s linear'})
		  .delay(1750).togColor({ border: '1px solid #e6ecf5' ,backgroundColor: 'white',  transition: 'background-color 1s linear' })
			//$('#htl-count').effect("highlight", {color: '#0ab596'}, 2000);
			return false;
		}
	}


});


/* TC*/

$(document).ready(function () {
$('.show-activities').hide();
var urlAppend = '';
var valueCoo = $('#seKeCoU').val();
if (typeof valueCoo != 'undefined') {
	urlAppend = '?cDis=' + valueCoo;
}
	var chartM;
	var cOpt = {
			series: {
				pie: { 
					innerRadius: 0.5,
					show: true
				}
			},
			legend: {
				show: false
			}
		};

	$('body').tooltip({
		selector : '[rel=tooltip]'
	});

	$('.required-icon').tooltip({
		placement : 'left',
		title : 'Required field'
	});

	$('.count-I').on('click', function () {
		var type = $(this).attr("id");
		type = type.substr(0, type.indexOf('-'));
		var minValue = 0;
		var value = parseInt($('#travellers-' + type).val());
		minValue = $('#travellers-' + type).attr('data-min');
		var newValue = value - 1;
		if (newValue < minValue) {
			newValue = minValue;
		}
		if (type === 'adults' && newValue === 0) {
			$('#travellers-form-free-children').hide();
			$('#travellers-freeChildren').val(0);
		}
		$('#travellers-' + type).val(newValue);
	});

	$('.count-D').on('click', function () {
		var type = $(this).attr("id");
		type = type.substr(0, type.indexOf('-'));
		var maxValue = 10;
		var value = parseInt($('#travellers-' + type).val());
		maxValue = $('#travellers-' + type).attr('data-max');
		if (type === 'adults') {
			$('#travellers-form-free-children').show();
		}
		var newValue = value + 1;
		if (newValue > maxValue) {
			newValue = maxValue;
		}
		$('#travellers-' + type).val(newValue);
	});

	var selected_month;
	$('.booking-months .choose-month-of-Trip').on('click', function () {
		//$('.booking-months .choose-month-of-Trip').removeClass('btn-primary');
		//$(this).addClass('btn-primary');
		selected_month = $(this).attr('value');
		$('#mo-c').val(selected_month);
	});

	var Five_Star_hotel,Four_Star_hotel ,Three_Star_hotel, Two_Star_hotel, One_Star_hotel, Hostel, cJ, cK,cL,cM,cN,tt,cu, picFBId, HoL, AcL,desCtyURL, vDW ;
	/*	$('#bookingFormB').on('click',function(){
		getC();
	});
	$('.slider-handle').mouseup(function(){
		getC();
	});
	*/

	//$('#bookingForm').on('click', function (e) {
	$("#bookingForm").submit(function(e) {
		if($("#ci_d").length && $("#ci_d").val().length < 1){
			$('#ci_d').css('box-shadow', '7px 5px 10px -5px rgb(255, 0, 0)');
			$('html, body').animate({
		        scrollTop: $("#ci_d").offset().top - 100 
		    }, 1000);
			return false;
		}else if($("#ci_o").val().length < 1){
			$('#ci_o').css('box-shadow', '7px 5px 10px -5px rgb(255, 0, 0)');
			$('html, body').animate({
		        scrollTop: $("#ci_o").offset().top - 100 
		    }, 1000);
			return false;
		}
		//$('.spinner').show();
		$('#preloader').fadeIn();
		//$.getJSON('/TC', function(response){
		$.ajax({
			type : 'POST',
			url : '/TC'+urlAppend,
			data : $('#bookingForm').serialize(), // serializes the form's elements.
			success : function (data) {
				var dC = $('#trip-day-count').val();
				var aC = $('#travellers-adults').val();
				var chC = $('#travellers-children').val();
				vDW = 'DO#'+ $('#cty_o').val()+'-AC#'+aC+'-CC#'+chC ;
				sc("aesTy_23", vDW, 10);
				var Trip_Cost_Estimate;
				if(chC != undefined && chC > 0){
					Trip_Cost_Estimate = ' '+ dC+' Day Stay Total for '+aC+' Adult and '+chC +' Child';
				}else{
					Trip_Cost_Estimate = ' '+ dC+' Day Stay Total for '+aC + ' Adult';
				}
				$('#result').show();
				var returnedData = JSON.parse(data);
				Five_Star_hotel = returnedData.cA;
				Four_Star_hotel = returnedData.cB;
				Three_Star_hotel = returnedData.cD;
				Two_Star_hotel = returnedData.cE;
				One_Star_hotel = returnedData.cF;
				Hostel = returnedData.cFA;
				cF = returnedData.cF;
				cK = returnedData.cK;
				cL = returnedData.cL;
				cM = returnedData.cM;
				cN = returnedData.cN;
				cu = returnedData.cu;
				HoL = returnedData.hotelChooseHTML;
				AcL = returnedData.activitiesChooseHTML;
				desCtyURL = returnedData.toCitURL;
				$('#Trip-Calculator-Details-a').attr('href', desCtyURL);
				$('#Trip-Calculator-Details-h').html('View ' + $('#ci_d').val() + ' Details');
				$('#Trip-Calculator-Details-p').html('Stay, Dining and Travel route choices for ' + $('#ci_d').val() );
				var sgeArr = returnedData.sgeArr;
				picFBId = returnedData.imgFileName;
				$('#pic-TCfb').val(picFBId);
				$('#t-sd').empty();
				$('#t-st').empty();
				$('#t-st').append('<small id="t-sd-cur">Approx '+cu +'</small>');
				$('#hotel-select-filter').empty();
				$('#hotel-select-filter').append(HoL);
				$('#activity-select-filter').empty();
				$('#activity-select-filter').append(AcL);
				$('#resAc').empty();
				$('.show-activities').hide();
				a_s_co = 0;
				if(AcL == undefined || AcL.length == 0){ $('#open-Activities').hide(); }else{ $('#open-Activities').show(); }
				if(Five_Star_hotel != undefined && Five_Star_hotel > 0){
					$('#t-sd').append('<img alt="Hotel Stay  Estimate" class="" src="//d26yoqr7n9yb2p.cloudfront.net/img/icons/HotelN.png" height="45" width="auto" style="padding-right: 10px;">'+Trip_Cost_Estimate+' at 5 Star Accommodation');
					$('#t-st').append(Five_Star_hotel);
				}else if(Four_Star_hotel != undefined && Four_Star_hotel > 0){
					$('#t-sd').append('<img alt="Hotel Stay  Estimate" class="" src="//d26yoqr7n9yb2p.cloudfront.net/img/icons/HotelN.png" height="45" width="auto" style="padding-right: 10px;">'+Trip_Cost_Estimate+' at  4 Star Accommodation');
					$('#t-st').append(Four_Star_hotel);
				}else if(Three_Star_hotel != undefined && Three_Star_hotel > 0){
					$('#t-sd').append('<img alt="Hotel Stay  Estimate" class="" src="//d26yoqr7n9yb2p.cloudfront.net/img/icons/HotelN.png" height="45" width="auto" style="padding-right: 10px;">'+Trip_Cost_Estimate+' at 3 Star Accommodation');
					$('#t-st').append(Three_Star_hotel);
				}else if(Two_Star_hotel != undefined && Two_Star_hotel > 0){
					$('#t-sd').append('<img alt="Hotel Stay  Estimate" class="" src="//d26yoqr7n9yb2p.cloudfront.net/img/icons/HotelN.png" height="45" width="auto" style="padding-right: 10px;">'+Trip_Cost_Estimate+' at 2 Star Accommodation');
					$('#t-st').append(Two_Star_hotel);
				}else if(One_Star_hotel != undefined && One_Star_hotel > 0){
					$('#t-sd').append('<img alt="Hotel Stay  Estimate" class="" src="//d26yoqr7n9yb2p.cloudfront.net/img/icons/HotelN.png" height="45" width="auto" style="padding-right: 10px;">'+Trip_Cost_Estimate+' at 1 Star Accommodation');
					$('#t-st').append(One_Star_hotel);
				}else if(Hostel != undefined && Hostel > 0){
					$('#t-sd').append('<img alt="Hotel Stay  Estimate" class="" src="//d26yoqr7n9yb2p.cloudfront.net/img/icons/HotelN.png" height="45" width="auto" style="padding-right: 10px;">'+Trip_Cost_Estimate+' at Hostel Accommodation');
					$('#t-st').append(Hostel);
				}
				$('#resFo').empty();
				var fC = "checked", rC = "checked", prCs = "price-h" ;
				if(cK != undefined && cK > 0){
					$('#resFo').parent().show();
					$('#resFo').append('<tr class="price-h" itemscope itemtype="http://schema.org/Restaurant"><td><input name="d_mode_sel" class="d_mode_sel" type="radio" '+fC+' /></td><td><img alt="Dining  Estimate" class="" src="//d26yoqr7n9yb2p.cloudfront.net/img/icons/eatoutN.png" height="45" width="auto" style="padding-right: 10px;">Lunch & Dinner for '+ dC+' days at Eatout</td><td id="Di-Ea" class="t-a text-center"><span class="price price-h"><small>Approx '+cu+' </small>'+cK+'</span></td></tr>');
					fC = ""; 
				}if(cL != undefined && cL > 0){
					$('#resFo').append('<tr><td><input name="d_mode_sel" class="d_mode_sel" type="radio"'+fC+' /></td><td><img alt="Dining  Estimate" class="" src="//d26yoqr7n9yb2p.cloudfront.net/img/icons/restN.png" height="45" width="auto" style="padding-right: 10px;">Lunch & Dinner for '+ dC+' days at Restaurant</td><td id="Di-Re" class="t-a text-center"><span class="price"><small>Approx '+cu+' </small>'+cL+'</span></td></tr>');
					fC = ""; 
				}
				if(cM != undefined && cM > 0){
					$('#resFo').append('<tr><td>Taxi Fare Starts at</td><td></td><td id="Ta-St" class="t-a text-center"><span class="price"><small>Approx '+cu+' </small>'+cM+'</span></td></tr>');
				}
				if(cN != undefined && cN > 0){
					$('#resFo').append('<tr><td>Taxi Fare Per KM</td><td></td><td id="Ta-Pk" class="t-a text-center"><span class="price"><small>Approx '+cu+' </small>'+cN+'</span></td></tr>');
				}
				var key;
				$('#resCo').empty();
				for (key in sgeArr) {
					if (sgeArr.hasOwnProperty(key)) {
						var a = sgeArr[key];
						var a1, a2;
						a1 = a.split('::')[0];
						a2 = a.split('::')[1];
						$('#resCo').append('<tr class="'+prCs+'" data-toggle="tooltip"  data-container="body" data-original-title="'+ a2 +'"><td><input name="t_mode_sel" class="t_mode_sel" type="radio" '+rC+' /></td><td>'+key+'</td><td  class="t-a text-center"><span class="price '+prCs+'"><small>Approx '+cu+' </small>'+a1+'</span></td></tr>');
						rC = ""; prCs = "";
					}
				}
				$('body').tooltip({
				    selector: '[data-toggle="tooltip"]'
				});
				//var s_e = $("#t-st").closest('td').find('.price').text();
				var s_e = $("#t-st").text();
				s_e = parseInt(s_e.replace( /^\D+/g, ''));
				
				var t_e = $("#resCo tr:eq(0)").find('td:eq(2)').text();
				t_e = parseInt(t_e.replace( /^\D+/g, ''));
				
				var d_e = $("#resFo tr:eq(0)").find('td:eq(2)').text();
				d_e = parseInt(d_e.replace( /^\D+/g, ''));
				if(s_e !== s_e){ s_e = 0	}
				if(t_e !== t_e ){t_e = 0 }
				if(d_e !== d_e){ d_e = 0 }
				var initial_ttl = s_e + t_e + d_e+ " "+cu;
				$('.t_cal_cost').text(initial_ttl);
				var orig = $("#ci_o").val();
				var des = $("#ci_d").val();
				$('#result-heading').empty().append('Trip Expense Estimate from '+ orig + ' to ' + des );
				/*tt = 
				if(tt != undefined && tt > 0){
					$('#resTo').append('<tr><td>Total Estimated Expense is</td><td  class="text-center"><span class="price"><small>Approx '+cu+' </small>'+cM+'</span></td></tr>');
				}
				
				Object.keys(sgeArr).each(function () {
					resCo.append('<tr><td>'+key+'</td><td id="t-a" class="text-center">'+cu+sgeArr[key]+'</td></tr>');
					});*/
				$('.Trip-Calculator-Details').show();
				$('html, body').animate({
			        scrollTop: $("#result").offset().top - 100 
			    }, 1000);
				$('#Travel-cost-calculator-Input').removeClass('col-xl-6 col-lg-6');
				$('#Travel-cost-calculator-Input').addClass('col-xl-3 col-lg-3');
				$('#Travel-cost-calculator-Result').removeClass('col-xl-6 col-lg-6');
				$('#Travel-cost-calculator-Result').addClass('col-xl-9 col-lg-9');

				var chart_data = [
									{label: 'Stay',     data: s_e},
									{label: 'Travel',     data: t_e},
									{label: 'Dining',  data: d_e}
						  		];
				//$.plot('#piechart', chart_data, cOpt);
				//chartM = 
					/*new Morris.Donut({
					  element: 'piechart', parseTime:false,
					  data: [
								{label: 'Expense Type', value: 'Amount'},
								{label: 'Stay',     value: s_e},
								{label: 'Travel',     value: t_e},
								{label: 'Dining',  value: d_e}
					  ],xkey: 'label', ykeys: ['value'],labels: ['Value']
					});*/
				/*google.charts.load('current', {'packages':['corechart']});
				var chart_data = [
			  			['Expense Type', 'Amount'],
			  			['Stay',     s_e],
			  			['Travel',     t_e],
			  			['Dining',  d_e]
			  		];*/
			 // 	drawChart(chart_data);
			}
		});
		
		
		function sc(cn, cv, ex) {
		    var d = new Date();
		    d.setTime(d.getTime() + (ex * 24 * 60 * 60 * 1000));
		    var ex = "expires="+d.toUTCString();
		    document.cookie = cn + "=" + cv + ";" + ex + ";path=/";
		}
		
		//	$('#result').html(response);
		//$('.spinner').hide();
		$('#preloader').fadeOut();
		$('#result').show();
		$('#result').delay(750).togColor({ border: '2px solid #ff9432' , backgroundColor: '#e6fff2' ,  transition: 'background-color 0.7s linear'})
		  .delay(1750).togColor({ border: '1px solid #e6ecf5' ,backgroundColor: 'white',  transition: 'background-color 1s linear' })
		var pid =$('#pic-TCfb').val();
			$.ajax({
				url : '/ctcis',
				data : { q : 'CTCIDB', picId:pid },
				success : function (data) {
					//response(data);
					//$('#result').toggle("highlight", {color: '#FFF8DC'}, 2000);
					/*$('input[class=t_mode_sel]:checked').parent().parent().find('.t-a').children().addClass('price-h');
					$('input[class=t_mode_sel]:checked').parent().parent().addClass('price-h');
					$('input[class=d_mode_sel]:checked').parent().parent().find('.t-a').children().addClass('price-h');
					$('input[class=d_mode_sel]:checked').parent().parent().addClass('price-h');*/
				}
			});
		e.preventDefault();
	});

	$(document).ready(function () {
		$('.spinner').hide();
	});

	$('#trip_dates').css('box-shadow', '0px 5px 5px -5px rgb(123, 255, 97)');

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
	/*
	$(".btn-primary").click(function (e) {
	var relTriVal = $('#te').val();
	e.preventDefault();
	$.ajax({
	url : "/TC",
	type : 'POST',
	data : {back_a:"" ,back_l:"",relTriVal:relTriVal,form_id:"CMSte_f_0"}

	});
	var y = $(this).closest('.my_hide').is(':last-child');
	if (!y) {
	$(this).closest('.my_hide').fadeOut(500, function () {
	$(this).closest('.my_hide').next().fadeIn().addClass('active');
	});
	} else {
	$(this).closest('.my_hide').fadeOut(500, function () {
	$(this).parents().find('.my_hide_first').next().fadeIn().addClass('active');
	});
	location.reload();
	$("a[href='#" + 'been-places' + "']").tab('show');
	}

	});
	 */

	// changes need to be done against the last arrival of submit
	$(".submit-show-next").click(function (e) {
		var relTriVal = $('#te').val(); // $(this).parents('.been-places-Ent').find('#rel-trip-Id-edit').val();
		e.preventDefault();
		var formId = $(this).closest('form').attr('id');
		var fCh = $('#ufbt').length;
		var x = $(this).closest('.my_hide').is(':last-child');
		if ($(this).attr('id') == 'goto_stay_tab') {
			if (fCh == 0) {
				if ($("input[class^='cty-d']").length < 1) {
					$('#city_d').css('box-shadow', '0px 5px 5px -5px rgb(255, 0, 0)');
					return false;
				} else if ($('#trip_dates').val().length < 1) {
					$('#trip_dates').css('box-shadow', '0px 5px 5px -5px rgb(255, 0, 0)');
					return false;
				}
			}
			$('#spot_card_d').html($('#city_d').val());
			for (var i = 1; i < ($("input[class^='cty-d']").length + 1); i++) {
				if ($('#city_sp_' + i).val() != "") {
					$("#spot_cards").append(spot_card_template({
							name : $('#cty_d' + i).val(),
							count : i
						}));
				}
			}

		}
		if (!x) {
			$(this).closest('.my_hide').fadeOut(500, function () {
				$(this).closest('.my_hide').next().fadeIn().addClass('active');
			});
		} else {
			$(this).closest('.my_hide').fadeOut(500, function () {
				$(this).parents().find('.my_hide_first').next().fadeIn().addClass('active');
			});
			location.reload();
			$("a[href='#" + 'been-places' + "']").tab('show');
		}
		

	});
	

	$("#ci_o").click(function () {
		$(this).val('');
		$('.cty-o').remove();
		$('#cty_o').remove();
	});

	$("#ci_d").click(function () {
		$(this).val('');
		$('#result').hide();
		$('.cty-d').remove();
		$('#cty_d').remove();
	});
	var di = 1;
	$(function () {
		$("#ci_d").bind("keydown", function (event) {
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
						q : request.term, TCP:"TCP"
					},
					success : function (data) {
						response(data);
					}
				});
			},
			minLength : 2,
			select : function (event, ui) {
				var city_selected = $.trim(ui.item.value);
				$('#city_d').css('box-shadow', '0px 5px 5px -5px rgb(123, 255, 97)');
				//$('.des_result').append('<span  id="cty-d'+di+'" class="cty">' + city_selected + '<i class="fa fa-times bpcl"></i></span>');
				$('#d-ac').append('<input type=hidden name="cty_d" id="cty_d"  class="cty-d" value="' + city_selected + '">');
				//fnr(city_selected);
				//$(this).val('<span  id="cty-d'+di+'" class="cty">' + city_selected + '<i class="fa fa-times bpcl"></i></span>');
				$(this).val(city_selected);
				$('#ci_d').css('box-shadow', '0px 5px 5px -5px rgb(123, 255, 97)');
				//var inpts = $(this).closest('form').find(':input');
				$('#travellers-adults').focus();
				cs2 = city_selected;
			    pse();
				event.preventDefault();
			}
		})
	});

	var cs2;
	function pse() {
		if (cs2.length != 0) {
		$('#ps-hold').empty();
			$.ajax({
				url : '/AutoP'+urlAppend,
				dataType: 'text',
				data : {
					T : cs2, PS:'R'
				},
				success : function (data) {
					if(data.indexOf(" - ") >= 0){
						$('#ps-hold').html('Peak Season: ' + data);// JSON.parse(data)
					}
					
				}
			});
		}
		
	}
	
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

	var oi = 1;
	$(function () {
		var i = 1;
		$("#ci_o").bind("keydown", function (event) {
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
				});
			},
			minLength : 2,
			select : function (event, ui) {
				var city_selected = $.trim(ui.item.value);
				res = check_city_selected(city_selected);
				$('#city_o').css('box-shadow', '0px 5px 5px -5px rgb(123, 255, 97)');
				//$('.org_result').append('<span  id="cty-o'+oi+'" class="cty">' + city_selected + '<i class="fa fa-times bpcl"></i></span>');
				$('#d-ac').append('<input type="hidden" name="cty_o" id="cty_o" class="cty-o' + oi + '" value="' + city_selected + '">');
				//$(this).val('<span  id="cty-o'+oi+'" class="cty">' + city_selected + '<i class="fa fa-times bpcl"></i></span>');
				$(this).val(city_selected);
				$('#ci_o').css('box-shadow', '0px 5px 5px -5px rgb(123, 255, 97)');
				var inpts = $(this).closest('form').find(':input');
				inpts.eq( inpts.index(this)+ 1 ).focus();
				event.preventDefault();

			}
		});

	});
	
		//$(".select-area").click(function() {  	    $(this).find('input:radio').prop('checked', true); 	});
		
	
	
	
	$('#hotel_choose').on('click', '.htl-select-calc',function(){
		var dC = $('#trip-day-count').val();
		var aC = $('#travellers-adults').val();
		var chC = $('#travellers-children').val();
		var Trip_Cost_Estimate;

		$('#hotel_choose').modal('hide');
		//$('#t-sd').append();
		if(chC != undefined && chC > 0){
			Trip_Cost_Estimate = ' '+ dC+' Day Stay Total for '+aC+' Adult and '+chC +' Child at ' + $(this).next('.htl-sel-nm').val();
		}else{
			Trip_Cost_Estimate = ' '+ dC+' Day Stay Total for '+aC + ' Adult at ' + $(this).next('.htl-sel-nm').val();
		}
		$('#t-sd').html(Trip_Cost_Estimate);
		var h_s_co = $(this).parent().find('.htl-sel-cost').val(); //$('.htl-sel-cost').val(); 
		h_s_co = parseInt(h_s_co);
		//recalTrCo();
		//var s_e = $("#t-st").closest('td').find('.price').text();
		var s_e = $("#t-st").text();
		s_e = parseInt(s_e.replace( /^\D+/g, ''));
		$("#t-st").html('<small>Approx '+cu + '</small>' + h_s_co);
		var to_c_o = $('.t_cal_cost').text();
		to_c_o = parseInt(to_c_o.replace( /^\D+/g, ''));
		
		
		var changed_ttl = ((to_c_o - s_e) + h_s_co) + " "+cu;
		$('.t_cal_cost').html(changed_ttl);
		//$('.t_cal_cost').effect("highlight", {color: '#FFF8DC'}, 2000);
		
		//var t_e = $('#result').find('td:eq(2)').text();
		var t_e = 	$("#resCo tr").find('input[name=t_mode_sel]:checked').parent().parent().find('td:eq(2)').text();
		t_e = parseInt(t_e.replace( /^\D+/g, ''));

		//var d_e = $('#result').find('.t-a').text();
		var d_e = $("#resFo tr").find('input[name=d_mode_sel]:checked').parent().parent().find('td:eq(2)').text();
		d_e = parseInt(d_e.replace( /^\D+/g, ''));
		//$('#t-st').effect("highlight", {color: '#FFF8DC'}, 2000);
		chartM  = [
						{label: 'Stay',     data: s_e},
						{label: 'Travel',     data: t_e},
						{label: 'Dining',  data: d_e}
			  ];
		$.plot('#piechart', chartM, cOpt);
		$('html, body').animate({
	        scrollTop: $("#result").offset().top - 100 
	    }, 1000);
	});
	var a_s_co;
	
	$('#activity_choose').on('click', '.act-select-calc',function(){
		var dC = $('#trip-day-count').val();
		var aC = $('#travellers-adults').val();
		var chC = $('#travellers-children').val();
		var Trip_Cost_Estimate;

		$('#activity_choose').modal('hide');
		if(chC != undefined && chC > 0){
			Trip_Cost_Estimate = 'Cost for '+$(this).next('.act-sel-nm').val()+ ' considering '+aC+' Adult ' ;
		}else{
			Trip_Cost_Estimate = 'Cost for '+$(this).next('.act-sel-nm').val()+ ' considering '+aC+' Adult ' ;
		}
		var a_s_co_tmp = $(this).parent().find('.act-sel-cost').val(); //$('.act-sel-cost').val(); 
		a_s_co_tmp = parseInt(a_s_co_tmp);
		aC = parseInt(aC);
		a_s_co = a_s_co + (a_s_co_tmp*aC);
		$('#resAc').append('<tr class="" data-toggle="tooltip"  data-container="body" data-original-title="Chosen Tour/Activities Cost"><td></td><td>'+Trip_Cost_Estimate+'</td><td  class="t-a text-center"><span class="price"><small>Approx '+cu+' </small>'+a_s_co_tmp+'</span></td></tr>');
		var to_c_o = $('.t_cal_cost').text();
		to_c_o = parseInt(to_c_o.replace( /^\D+/g, ''));
		
		var changed_ttl = (to_c_o  + a_s_co) + " "+cu;
		$('.t_cal_cost').html(changed_ttl);
		//$('.t_cal_cost').effect("highlight", {color: '#FFF8DC'}, 2000);
		
		var t_e = 	$("#resCo tr").find('input[name=t_mode_sel]:checked').parent().parent().find('td:eq(2)').text();
		t_e = parseInt(t_e.replace( /^\D+/g, ''));

		var d_e = $("#resFo tr").find('input[name=d_mode_sel]:checked').parent().parent().find('td:eq(2)').text();
		d_e = parseInt(d_e.replace( /^\D+/g, ''));
		//$('#resAc').effect("highlight", {color: '#FFF8DC'}, 2000);
		$('.show-activities').show();
		var s_e = $("#t-st").text();
		s_e = parseInt(s_e.replace( /^\D+/g, ''));
		chartM  = [
						{label: 'Stay',     data: s_e},
						{label: 'Travel',     data: t_e},
						{label: 'Dining',  data: d_e},
						{label: 'Tour',  data: a_s_co}
			  ];
		$.plot('#piechart', chartM, cOpt);
		$('html, body').animate({
	        scrollTop: $(".t_cal_cost").offset().top - 200 
	    }, 1000);
	});

	
	$('#result').on('click', '#resCo tr',function(){
		//$('input[class=t_mode_sel]:checked').parent().parent().find('.t-a').children().removeClass( 'price-h');
		//$('input[class=t_mode_sel]:checked').parent().parent().removeClass( 'price-h');
		$('#resCo').children().removeClass( 'price-h');
		$('.t-a').children().removeClass( 'price-h');
		$(this).find('.t_mode_sel').prop('checked', true);
		$(this).find('.t_mode_sel').parent().parent().find('.t-a').children().addClass('price-h');
		$(this).find('.t_mode_sel').parent().parent().addClass('price-h');
		//recalTrCo();
		//var s_e = $("#t-st").closest('td').find('.price').text();
		var s_e = $("#t-st").text();
		s_e = parseInt(s_e.replace( /^\D+/g, ''));
		
		var t_e = $('input[name=t_mode_sel]:checked').parent().parent().find('td:eq(2)').text();
		t_e = parseInt(t_e.replace( /^\D+/g, ''));
		
		//var d_e = $(this).find('.t-a').text();
		var d_e = $("#resFo tr").find('input[name=d_mode_sel]:checked').parent().parent().find('td:eq(2)').text();
		d_e = parseInt(d_e.replace( /^\D+/g, ''));
		if(s_e !== s_e){ s_e = 0	}
		if(t_e !== t_e ){t_e = 0 }
		if(d_e !== d_e){ d_e = 0 }
		
		var changed_ttl = (s_e + t_e + d_e + a_s_co)+ " "+cu;
		$('.t_cal_cost').text(changed_ttl);
		//$('.t_cal_cost').effect("highlight", {color: '#FFF8DC'}, 2000);
		chartM  = [
						{label: 'Stay',     data: s_e},
						{label: 'Travel',     data: t_e},
						{label: 'Dining',  data: d_e}
			  ];
		$.plot('#piechart', chartM, cOpt);
	});

	$('#result').on('click', '#resFo tr',function(){
		//$('input[class=d_mode_sel]:checked').parent().parent().find('.t-a').children().removeClass( 'price-h');
		//$('input[class=d_mode_sel]:checked').parent().parent().removeClass( 'price-h');
		$('#resFo').children().removeClass( 'price-h');
		$('.t-a').children().removeClass( 'price-h');

		$(this).find('.d_mode_sel').prop('checked', true);
		$(this).find('.d_mode_sel').parent().parent().find('.t-a').children().addClass('price-h');
		$(this).find('.d_mode_sel').parent().parent().addClass('price-h');
		//recalDiCo();
		
	//var s_e = $("#t-st").closest('td').find('.price').text();
		var s_e = $('#t-st').text();
		s_e = parseInt(s_e.replace( /^\D+/g, ''));
		
		var d_e = $(this).find('.t-a').text();
		//var d_e = $(this).parent().parent().find('td:eq(2)').text();
		d_e = parseInt(d_e.replace( /^\D+/g, ''));
		
		var t_e = $('input[name=t_mode_sel]:checked').parent().parent().find('td:eq(2)').text();
		t_e = parseInt(t_e.replace( /^\D+/g, ''));
		if(s_e !== s_e){ s_e = 0	}
		if(t_e !== t_e ){t_e = 0 }
		if(d_e !== d_e){ d_e = 0 }

		var changed_ttl = (s_e + t_e + d_e + a_s_co)+ " "+cu;
		$('.t_cal_cost').text(changed_ttl);
		//$('.t_cal_cost').effect("highlight", {color: '#FFF8DC'}, 2000);
		chartM  = [
					{label: 'Stay',     data: s_e},
					{label: 'Travel',     data: t_e},
					{label: 'Dining',  data: d_e}
		  ];
		$.plot('#piechart', chartM, cOpt);
		
		/*
		var chart_data = [
			['Expense Type', 'Amount'],
			['Stay',     s_e],
			['Travel',     t_e],
			['Dining',  d_e]
		];
		drawChart(chart_data);*/
	});
	
	//$('#result').on('change', '.t_mode_sel',function(){  		recalTrCo(); 	});
	
	//$('#result').on('change','.d_mode_sel',function(){ 	   var th = $(this); 		recalDiCo(th); 	});
	
	function recalTrCo(){
	
		
		
	}

	function recalDiCo(th){
	}
	
	
	
	$('#submit-contact').click(function(e){
        e.preventDefault();
        var error = false;
        var fname = $('#f_name').val();
        var email = $('#f_email').val();
        var fText = $('#f_text').val();
        if(fname.length == 0){
            error = true;
            $('#f_name').parent('div').addClass('field-error');
        }else{
            $('#f_name').parent('div').removeClass('field-error');
        }
        if(email.length == 0 || email.indexOf('@') == '-1'){
            error = true;
            $('#f_email').parent('div').addClass('field-error');
        }else{
            $('#f_email').parent('div').removeClass('field-error');
        }
        if(fText.length == 0){
            error = true;
            $('#f_text').parent('div').addClass('field-error');
        }else{
            $('#f_text').parent('div').removeClass('field-error');
        }
        if(error == true){
        	$('#hero-error-notification').addClass('show-up');
        }else{
           $('#hero-error-notification').removeClass('show-up');
        }
        if(error == false){
            $.post("/sfe"+urlAppend, $("#contact-form").serialize(),function(result){
                if(result == 'sent'){
                    $('.contact-cn').hide();
                    $('#hero-success-notification').addClass('show-up');
                    $('#submit-contact').addClass('disabled');
                }
            });
        }
    });
	
	$('a.notification-close').click(function(){
		$(this).parent('div').fadeOut(200);
    });
	/*
	function drawChart(values) {
		  var data = google.visualization.arrayToDataTable(values);
		  var options = {
		    title: 'Total Estimated Expense'
		  };
		  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
		  if (chart == null) {
			  setTimeout(function() {
		  chart.draw(data, options);
				}, 3000);
		  }else{
			  chart.draw(data, options);
		  }
		}*/
});


function smoothlyScrollTo(ele){
    $('html, body').animate({
        scrollTop: ele.offset().top
    }, 1000);
    return false;
}

var dinLInd = true;
var itinLInd = true;
var routLInd = true;

function fetchRouteTab() {
    var ctyOVal = $('#Orig_city').val();
    var ctyDVal = $('#Des_city').val();
    var Nr_airP = $('#Nr_airP').val();
    var Nr_airPName = $('#Nr_airPName').val();

    var typ = $('#it-typ').val();
    if(ctyOVal != '' && routLInd){
        routLInd = false;
        $.post('/FRO', {
            typ : typ,
            ctyOVal : ctyOVal,
            ctyDVal : ctyDVal,
            Nr_airP : Nr_airP,
            Nr_airPName : Nr_airPName
        }, function (data) {
            $("#route_r_h").html(data);
        });
    }
}

function fetchPlacesToEatTab(){        
    var ctyDVal = $('#Des_city').val();
    var typ = $('#it-typ-d').val();
    if(dinLInd){
        loading("#spot-dining-options");
        dinLInd = false;
        $.post('/FDO', {
            typ : "PP",
            ctyDVal : ctyDVal
        }, function (data) {
            $("#dining_o_h").html(data);
        });
    }
}

function fetchItineraryTab() {
    var ctyDVal = $('#Des_city').val();
    //var typ = $(this).parent('#view-itin').find('#it-typ').val();
    if(itinLInd){
        loading("#spot-view-itin");
        itinLInd = false;
        $.post('/FUI', {
            typ : "VT",
            ctyDVal : ctyDVal
        }, function (data) {
            $("#itin_v_h").html(data);
        });
    }
}

function loading(elm) {
    $(elm).waitMe({
        effect : 'stretch',
        text : 'Just a Moment',
        bg : 'rgba(255,255,255,0.95)',
        color : '#6A0443',

    });
    my = setTimeout(function () {
            loading_remove(elm);
        }, 3000);

}

function loading_remove(elm) {
    $(elm).waitMe('hide');
}

function ut(e) {
	var val = $('#Des_city').val();
	$.post('/AutoCom', {
		q : val,
		typ : e
	}, function (data) {});
	
}
