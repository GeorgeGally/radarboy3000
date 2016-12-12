//$.backstretch("img/pinaokid.jpg");



function startListening(){
    console.log("======= do it")
    $('.listen').hide();
    $('.stop').show();  
    play = true;
    if (typeof mic != 'undefined'){
    mic.startListening();
    $("mike_cover").fadeIn(500).delay(1000).slideUp("slow");
    }
    //window.startInterval('soundIn');  
}

function stopListening(){
    console.log("======= stopListening")
    $('.listen').show();
    $('.stop').hide();  
    play = false;
    if (typeof mic != 'undefined'){
    mic.stopListening(); 
    }
    //window.clearInterval('soundIn'); 
}

$.backstretch("img/dogot4.jpg");

/*! A fix for the iOS orientationchange zoom bug.
Script by @scottjehl, rebound by @wilto.
MIT License.
*/
(function(w){

  // This fix addresses an iOS bug, so return early if the UA claims it's something else.
  if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){
    return;
  }

  var doc = w.document;

  if( !doc.querySelector ){ return; }

  var meta = doc.querySelector( "meta[name=viewport]" ),
  initialContent = meta && meta.getAttribute( "content" ),
  disabledZoom = initialContent + ",maximum-scale=1",
  enabledZoom = initialContent + ",maximum-scale=10",
  enabled = true,
  x, y, z, aig;

  if( !meta ){ return; }

  function restoreZoom(){
    meta.setAttribute( "content", enabledZoom );
    enabled = true;
  }

  function disableZoom(){
    meta.setAttribute( "content", disabledZoom );
    enabled = false;
  }

  function checkTilt( e ){
    aig = e.accelerationIncludingGravity;
    x = Math.abs( aig.x );
    y = Math.abs( aig.y );
    z = Math.abs( aig.z );

    // If portrait orientation and in one of the danger zones
    if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
      if( enabled ){
        disableZoom();
      }        	
    }
    else if( !enabled ){
      restoreZoom();
    }
  }

  w.addEventListener( "orientationchange", restoreZoom, false );
  w.addEventListener( "devicemotion", checkTilt, false );

  })( this );


  function checkMic() {
    if (typeof mic != 'undefined'  && !mic.isInitialized()) {
        setTimeout("checkMic();", 500);
        //$('.mike_on_permission').show();
        console.log("----" + isInitialized);
        return;
    } else if (typeof mic != 'undefined'){
  
    window.clearInterval('soundIn');
    $('.mike_on_permission').fadeIn(500).delay(1000).slideUp("slow");
    //$('.intro').fadeIn(500).delay(1000).fadeOut("slow");
    play = true;
    }
}
