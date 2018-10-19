function creatProductList() {
  
    /* ManhTienpt: Creat script */     
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '/search?view=product-coundown';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

var engoAutoComplate = {
  initProductsRecently: function() {
    var self = this;
    if (!jQuery.cookie('brilliant_products_recently') || jQuery.cookie('brilliant_products_recently') == null) {      
        $(".engoj-recently-products-container").remove();  
    } else {
      var arr = jQuery.cookie('brilliant_products_recently').split('|'); // split string to array

      for ( var i = 0; i < arr.length; i++){
        var handle = arr[i]; 
        self.ajaxProductsRecently(handle);
      }
      $('.engoj-recently-products').slick({
        slidesToShow: 10,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2500,
        responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 9,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 6,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
          }
        }
        ]
      });
    }
  },
  ajaxProductsRecently: function(handle) {
    var ajaxUrl = '/products/'+handle+'.js',
        result     = new Array();
    jQuery.ajax({
      type: 'GET',
      dataType: "json",
      url: ajaxUrl,
      beforeSend: function() {
        jQuery(".engoj-recently-products").append('<div class="engoj-recently-'+handle+' col-md-2 col-sm-2 col-tn-6"><svg xml:space="preserve" style="enable-background:new 0 0 50 50;margin-top: -1px;" viewBox="0 0 24 30" height="20px" width="21px" y="0px" x="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Layer_1" version="1.1"><rect opacity="0.2" fill="#000" height="8" width="3" y="10" x="0"><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect><rect opacity="0.2" fill="#000" height="8" width="3" y="10" x="8">      <animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect><rect opacity="0.2" fill="#000" height="8" width="3" y="10" x="16"><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect></svg></div>');
      },
      success: function(product) {
        var title            = product.title,
            handle           = product.handle,
            image            = product.featured_image,
            template         = '<a class="search-item-img" href="/products/'+ handle +'" alt="'+title+'">'
                                + '<img src="' + image + '" />' 
                                +'</a>';       
        jQuery('.engoj-recently-'+handle).html(template);
      }
    });
  },
  ajaxProductItems : function( input_element, result_wrapper, result_element ){
    var ajaxUrl  = '/search',
        result     = new Array(),
        keyword   = input_element.val();

    jQuery.ajax({
        type: 'GET',
        data: {
            q: "*" + keyword + "*",
            type: "product",
            view: "json",
        },
        dataType: "json",      
        url: ajaxUrl,
        beforeSend: function() {
          result_wrapper.show();
          result_element.html('<li class="loading"><p><svg xml:space="preserve" style="enable-background:new 0 0 50 50;margin-top: -1px;" viewBox="0 0 24 30" height="20px" width="21px" y="0px" x="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Layer_1" version="1.1"><rect opacity="0.2" fill="#000" height="8" width="3" y="10" x="0"><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect><rect opacity="0.2" fill="#000" height="8" width="3" y="10" x="8">      <animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0.15s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect><rect opacity="0.2" fill="#000" height="8" width="3" y="10" x="16"><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="0.2; 1; .2" attributeType="XML" attributeName="opacity"/><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="10; 20; 10" attributeType="XML" attributeName="height"/><animate repeatCount="indefinite" dur="0.6s" begin="0.3s" values="10; 5; 10" attributeType="XML" attributeName="y"/></rect></svg> Loading...</p></li>');
        },
        complete:function(){
        },
        success: function ( reponse ) {
          var htmlbox = '';
          //result_element.html('');
          if( reponse.length > 0 ){
            for (var i = 0; i < reponse.length; i++) {

              var item              = reponse[i],
                  title            = item.title,
                  price            = item.price,
                  handle           = item.handle,
                  image            = item.featured_image,
                  compare_price    = item.compare_at_price  ? '<del>' + Shopify.formatMoney(item.compare_at_price, window.money_format) + '</del>' : "",
                  compare_class    = item.compare_at_price  ? "price-sale" : "price",
                  sold_out	       = item.available          ? "" : "<span class='item-sold-out'>Sold out</span> ",
                  price            = item.available          ? item.price : item.out_stock_nofication,
                  hightlight     = title.replace(new RegExp('(' + keyword + ')', 'gi'), '<span class="hightlight">$1</span>'),
                  template         = '<li class="result-item">'
                                      + '<a class="search-item-img" href="/products/'+ handle +'">'
                                      + '<img src="' + image + '" />' 
                                      +'</a>'
                                      +'<a class="search-item-title" href="/products/'+ handle +'">' + hightlight +'</a>'
                                      +'<span class="item-price '+ compare_class + '">'+ Shopify.formatMoney(price, window.money_format) + '</span>'
              						  + sold_out
                                      + compare_price
                                      +'</li>';
              htmlbox = htmlbox + template;
                 

            }
            result_element.html(htmlbox);
            
            if($('#productSearchResults .search-results li').length){
              $('#productSearchResults').show();
              currencyCallback('#productSearchResults span.money');
            }
          }else{
            result_element.html('<li class="result-item"><p>No result found for your search.</p></li>');
             $('#productSearchResults').show();
          }
       }     
    });

  },
  
  ajaxSearch : function( options ){    
    var     ajax_timeout,
    		ajax_lost_focus,
            self        = this,
            search_input_id    = options.search_input.length   > 0   ? options.search_input    : '#engo_autocomplate',
            wrapper_id         = options.result_wrapper.length > 0   ? options.result_wrapper  : '#productSearchResults',
            result_id          = options.result_element.length > 0   ? options.result_element  : '.search-results';

    jQuery( document ).delegate( search_input_id ,'keyup',function( event ){
      var keyword           = jQuery(this).val(),
          search_element    = jQuery(this),
          result_wrapper    = jQuery( wrapper_id ),
          result_element    = result_wrapper.children( result_id );
        
      if( ajax_timeout ){ 
        clearTimeout(ajax_timeout);
      } 

      ajax_timeout = setTimeout(function() {
        if( keyword.length >= 2 ){
            self.ajaxProductItems( search_element ,result_wrapper, result_element );
        }else{
            result_element.html('<li><p>You must enter at least 2 characters.</p></li>');
        } 
      },300);       
    }); 

  },
  
  init : function( options ){
    this.ajaxSearch( options );
  }
  
}

jQuery(document).ready(function($) {  
  engoAutoComplate.init({
      "search_input"      :   "#engo_autocomplate",
      "result_wrapper"   :   "#productSearchResults",
      "result_element"   :   ".search-results"
  });

function createCountdown() {
    $(".engoj-product-handle").each(function(){
      var this_handle = $(this).data("handle");
      if($.inArray(this_handle,products_handle_list) !== -1) {
        for(var x = 0; x < products_countdown.length; x ++) {
          if(products_countdown[x].id== this_handle)
            var countdown_html = '<div class="br-product__countdown"><div class="time" data-countdown="engoj_product_countdown" data-date="'+ products_countdown[x].time +'"></div></div>'
        }        
        $(this).find(".br-product__media").append(countdown_html);
        
      }
    });
  		$('[data-countdown="engoj_product_countdown"]').each(function(index, el) {
            var $this = $(this);
            var $date = $this.data('date').split("-");
            $this.ENGO_CountDown({
                TargetDate:$date[0]+"/"+$date[1]+"/"+$date[2]+" "+$date[3]+":"+$date[4]+":"+$date[5],
                DisplayFormat:"<div class=\"countdown-times\"><div class=\"day distance\"><div class='number'>%%D%%</div> <div class='text'>days </div></div><div class=\"hours distance\"><div class='number'>%%H%%</div><div class='text'> <div class='text'>hours </div></div></div><div class=\"minutes distance\"><div class='number'>%%M%%</div><div class='text'> mins</div> </div><div class=\"seconds distance\"><div class='number'>%%S%%</div> <div class='text'>secs</div> </div></div>",
                FinishMessage: "Expired"
            });
        });
  }
createCountdown();
});
      
jQuery(document).ready(function($) {  
  /*	Product show color, change image when click color */
    $('.engoj_select_color a').each(function(){
      
      $(this).on("mouseover",function(){
        var engoImage = $(this).data('engojvariant-img');
        $(this).parents('.engoj_grid_parent').find('.engoj_find_img img').attr({ src: engoImage }); 
        return false;
      });
    });

});