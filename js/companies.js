$( document ).ready(function() {

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