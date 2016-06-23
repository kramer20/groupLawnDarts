$( document ).ready(function() {

//image rotation
var ul;
var li_items;
var imageNumber;
var imageWidth;
var prev, next;
var currentPostion = 0;
var currentImage = 0;


function init(){
    ul = document.getElementById('image_slider');
    li_items = ul.children;
    imageNumber = li_items.length;
    imageWidth = li_items[0].children[0].clientWidth;
    ul.style.width = parseInt(imageWidth * imageNumber) + 'px';
    prev = document.getElementById("prev");
    next = document.getElementById("next");
    //.onclike = slide(-1) will be fired when onload;
    /*
    prev.onclick = function(){slide(-1);};
    next.onclick = function(){slide(1);};*/
    prev.onclick = function(){ onClickPrev();};
    next.onclick = function(){ onClickNext();};
}

function animate(opts){
    var start = new Date();
    var id = setInterval(function(){
        var timePassed = new Date() - start;
        var progress = timePassed / opts.duration;
        if (progress > 1){
            progress = 1;
        }
        var delta = opts.delta(progress);
        opts.step(delta);
        if (progress == 1){
            clearInterval(id);
            opts.callback();
        }
    }, opts.delay || 17);
    //return id;
}

function slideTo(imageToGo){
    var direction;
    var numOfImageToGo = Math.abs(imageToGo - currentImage);
    // slide toward left

    direction = currentImage > imageToGo ? 1 : -1;
    currentPostion = -1 * currentImage * imageWidth;
    var opts = {
        duration:1000,
        delta:function(p){return p;},
        step:function(delta){
            ul.style.left = parseInt(currentPostion + direction * delta * imageWidth * numOfImageToGo) + 'px';
        },
        callback:function(){currentImage = imageToGo;}  
    };
    animate(opts);
}

function onClickPrev(){
    if (currentImage === 0){
        slideTo(imageNumber - 1);
    }       
    else{
        slideTo(currentImage - 1);
    }       
}

function onClickNext(){
    if (currentImage == imageNumber - 1){
        slideTo(0);
    }       
    else{
        slideTo(currentImage + 1);
    }       
}

window.onload = init;

//getting the info for product
$.ajax({
		url: "https://json-data.herokuapp.com/darts/info",
		type:"GET",
		success: function(response)
		{
			console.log(response);
			var title = response.data.product.title;
			var descrip = response.data.product.description;
			$('.Title').append("<h2>"+title+"</h2>");
			$('.descripBox').append("<p>"+descrip+"</p>");
		}
	});

$.ajax ({
    url:'https://json-data.herokuapp.com/darts/testimonials',
    type:"GET",
    success: function(review){
         
    var userTestimonials = review.results;

    userTestimonials.forEach(function (people,index){
        var image = "<img src='images/person"+index+".jpg'>";
        $(".testimonial").append('<div class="col-md-4 testText"><div class="review"><div class="people">'+image+'</div><h2 class="customerName">'+people.name+'</h2></div><p class="customerReview">'+people.review+'</p></div>');
	});
  }
});


$.ajax({
    url: 'https://json-data.herokuapp.com/darts/companies',
    type:"GET",
    success: function(burrito) {

    var userCompanies = burrito.results;

   

        userCompanies.forEach(function (company){
        $(".companyRow").append('<div class="col-lg-3 fourCos"><div class="fourCosBox"><img class="companyPics" src="'+company.image_url+'"></div></div>');
    });

    }
});
 
});

function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 40.7128, lng: -74.0059},
        zoom: 8
    });
 } 