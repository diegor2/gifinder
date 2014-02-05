//	Diego Ramos Ruggeri
//	2010-10-26
//	diego[at]quenerd[dot]com[dot]br
//	Find gif on Twitter and display like a mosaic

	function callback(d){

		var r=d.results;
		var url;
		var img;

		for(i=0; i<r.length; i++){

			url = r[i].text.match(/http:.+\.gif/im);
			
			//if the link points directly to image, display it, else open linked document and look for images
			if(url==null){
				//url = r[i].text.match(/http:\/\/[\w!:.?+=%@!\-\/]+/im);
				//if (url != null) findImg(url[0]);
			} else {
				addImg(url[0], r[i].text);
			}
		}
		
		//load the next pages from Twitter
		
		if(pg<20){
			updateCounter(15);
			setTimeout(function(){
				$.getJSON('http://search.twitter.com/search.json?q=gif&rpp=100&callback=?&page='+pg++, callback);
			}, 15000);
		}
		
	}
	
	function updateCounter(t){
		if(t){
			$('.more').html('Loading more in ' + t-- + ' s ...');
			setTimeout(function(){updateCounter(t--);}, 1000);				
		} else {
			$('.more').html('');
		}
	}
	
	function findImg(url){
		//download the document and parse for images
		$.get(url, crawl);
	}
	function crawl(d){
		var url;
		//find images inside the document
		url=d.match(/<img[^>]>/);
		if (url != null) 
			url=url[0].match(/src\s*\=\s*('[\w!:.?+=%@!\-\/]+'|"[\w!:.?+=%@!\-\/]+")/);
		if (url != null) 
			url=url[0].match(/http:\/\/[\w!:.?+=%@!\-\/]+\.gif/);
		if (url != null) 
			addImg(url[0], 2);
	}
	function addImg(url, title){

			//create anchors
			a = document.createElement('a');
			a.href=url;
			a.className='fancybox';
			a.rel='gallery';
			a.title=title;
			a.id=img_id++;
			
			//append tumbnails (first frame)
			img = document.createElement('img');
			img.src='thumb.php?img='+url;
			$(a).append(img);
			$('#container').append(a);
			
			//pre-load full images on hidden frame
 			//img = document.createElement('img');
 			//img.src=original;
 			//$('#cache').append(img);
			
			//config fancybox overlay
			$(a).fancybox({
										 'transitionIn'	:	'elastic',
										 'transitionOut'	:	'elastic',
										 'speedIn'		:	100, 
										 'speedOut'		:	100, 
										 'titlePosition'	:	'inside',
										 'onStart': checkFinish,
 										 'cyclic' : true,
 										 'overlayColor' : '#4099ff',
 										 'overlayOpacity': 0.3,
 										 'autoscale': false
	 								});
	}
	function checkFinish(){
		//alert('t');
	}

	var img_id=1;
	var pg=1;
	$.getJSON('http://search.twitter.com/search.json?q=gif&rpp=100&callback=?', callback);
	