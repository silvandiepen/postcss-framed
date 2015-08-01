
$(window).ready(function(){
	console.log('framed initialized');
	framed_Ratio();
	framed_Popup();
	framed_Accordion();
	framed_SubmitStyle();
	framed_Tabs();
});
$(window).resize(function(){
	framed_Ratio();
});



    
// POPUP 

function framed_Popup(){       
	$('.popup').click(function(e) {

		//prevent default action (hyperlink)
		e.preventDefault();
		
		
		
		//Get clicked link href
		var image_href = $(this).attr("href");
		
		/* 	
		If the lightbox window HTML already exists in document, 
		change the img src to to match the href of whatever link was clicked
		
		If the lightbox window HTML doesn't exists, create it and insert it.
		(This will only happen the first time around)
		*/
			
	



		var title = $(this).find('img').attr("title");
		if(title) { var titleElement = '<div class="popup-title">' + title + '</div>'; } else { var titleElement = ''; }	
		
		var alt = $(this).find('img').attr("alt");
		if(alt) { var altElement = '<div class="popup-alt">' + alt + '</div>'; } else { var altElement = ''; }	

		
		if ($('#popup').length > 0) { // #lightbox exists
			
			//place href as img src value
			$('.popup-content').html('<img src="' + image_href + '" />');
		   	
			//show lightbox window - you could use .show('fast') for a transition
			$('#popup').show('');
		}
		
		
		
		else { //#lightbox does not exist - create and insert (runs 1st time only)
			
			//create HTML markup for lightbox window
			var popup = 
			'<div id="popup">' +
				'<div class="popup-background closer"></div>' + 
				'<div class="popup-content">' + 
					'<a href="#close" class="popup-close closer"></a>' + 
					titleElement + 
					'<img src="' + image_href +'" />' +
					'<div class="popup-nav">' +
						'<a href="#previous" class="popup-prev"><span></span></a>' +
						'<a href="#next" class="popup-next"><span></span></a>' +
					'</div >' +
					altElement + 

				'</div>' +	
			'</div>';
				
			//insert lightbox HTML into page
			$('body').append(popup);
			width100();
		}
	});
	
	//Click anywhere on the page to get rid of lightbox window
	
	$('body').on('click', '.closer', function() { //must use live, as the lightbox element is inserted into the DOM
		$('#popup').fadeTo( "slow" , 0, function(){
 // 			$(this).css("opacity",0);
  			$(this).remove();
		});
	});
	
}


// TABS 

function framed_Tabs(){
	
	$( document ).find( ".tabs" ).each(function( index, value ) {
	
		var eName = 'tabs';
		var selectClass = 'selected';
		$(this).attr({ id : eName + index });
		var parent = this.id;		

	//	console.log(parent);
		
		$('#'+parent).children('dd,div').each(function(index, value) {	
			$(this).attr({ id : parent+'_child' + index });			
		}); 
		
		$('#'+parent).children('span dt,ul li').each(function(index, value) {	
			$(this).attr({ id : parent+'_head' + index });			
		}); 
		
		$('#'+parent+ " > dt").wrapAll( "<span></span>");
		
		$('#'+parent+' > span > dt,#'+parent+' > ul > li').click(function() {
	
			var childnr = $(this).index();
				
				$('#'+parent+' > ul li, #'+parent+' > span > dt').removeClass( selectClass );
				$('#'+parent+' > div, #'+parent+' > dd').removeClass( selectClass );
				
				if($(this).hasClass(selectClass)) {
					$(this).removeClass(selectClass);
				} else { 
					$(this).addClass(selectClass);
				}
				
			$('#'+parent+' #'+parent+'_child'+childnr).addClass( "selected" );
		

			return false;
			
		});
		
		if($('#'+parent+ '> .'+selectClass).length < 1) { 		
			$('#'+parent+ '_child0').addClass( "selected" );
			$('#'+parent+ '_head0').addClass( "selected" );
		} 			
		
	});
};


// SUBMIT STYLER

function framed_SubmitStyle(){

	$( document ).find( "input.submit" ).each(function( index, value ) {
		
		$(this).wrapAll( '<span class="submit"></span>');
		$(this).removeClass('submit');
		
	});
};

// ACCORDION 



function framed_Accordion(){

	
	$( document ).find( ".accordion" ).each(function( index, value ) {
	
	
	
		var eName = 'accordion';
		$(this).attr({ id : eName + index });
		var parent = this.id;
		
		//console.log(parent);
		
		
		$('#accordion' + index).children('ul li').each(function(index, value) {	

			$(this).attr({ id : parent +'_panel' + index });
			
			var thiselement = '#'+parent +'_panel' + index;
			
			//	console.log(this);
			//console.log($(this).attr('class'));
			
			if ( $(this).hasClass("selected")) {
				$(thiselement).find('li').css( "display", "block" );
			} else {
				$(thiselement + 'li').css( "display", "none" );
			}
			
			
		}); 
		

		$('#'+eName+index+' > li').click(function(e) {
			if(this.id == e.target.id || this.id == $(e.target).parent().attr('id') ) {

				if ($(this).hasClass('selected')) {
					$(this).removeClass( "selected" );
				} else {
					
					if($(this).parent().hasClass('justone')) {
						$(this).parent().find('li').removeClass( "selected" ); 
					}
					$(this).addClass( "selected" );
				}						
			}
		});		
	});
}





// RESIZE 
	
	function framed_Sizer(w,rw,rh) {
	// calculate ratio
		var ratio = rh / rw;
	// make height		
		var h = w / ratio; 	
	// return height
		return h;
	};
	
	function framed_Ratio() {
		
		console.log('do ratio');
		
	// get ratio elements
		$( document ).find( '[class*="ratio"]' ).each(function() {
	
		// get classes
			var classNames = $(this).attr('class');	
			var sizeElement = $(this);
			var classArray = classNames.split(' ');
				
		// for each classname
			$.each( classArray, function(i, value) {
			
			// split values
				className = value.split("-");
				
				if(className[0] == "ratio") {
						
				var rh = className[2];
				var rw = className[1];
					
			// return width
				var w = sizeElement.outerWidth();
			
					
			// return ratio height	
				var height = framed_Sizer(w, rh, rw);
				//alert(height);
					
			// set height	
				$(sizeElement).css("height", height +"px");	
				
				console.log('done ratio on' + sizeElement);
			}
			
		});
	});

}
		


