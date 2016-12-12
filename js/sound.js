
function checkMic() {
    if (typeof mic != 'undefined'  && !mic.isInitialized()) {
        setTimeout("checkMic();", 500);
        $('.mike_on_permission').show();
        //console.log("----" + isInitialized);
        return;
    } else if (typeof mic != 'undefined'){
    mic.startListening();
    $('.mike_on_permission').hide();
    $("mike_cover").fadeIn(500).delay(1000).slideUp("slow");
    $('.mike_on_permission').fadeIn(500).delay(1000).fadeOut("slow");
    play = true;
    $('.mike_on_permission').css('display', 'none');
    }
}


function startListening(){
    console.log("======= startListening")
    $('.listen').hide();
    $('.stop').show();  
    $('.mike_on_permission').css('display', 'none');
    play = true;
    if (typeof mic != 'undefined'){
    mic.startListening();
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



var mic = new Microphone();
var play = false;
mic.initialize();


// var frameBufferSize = 4096;
// // var bufferSize = frameBufferSize/2;
// var fft = new FFT(frameBufferSize, 44100);


// var soundIn = setInterval(function() {
// 	if (play != false){
// 	document.getElementById('autoNote').innerHTML = mic.getNote(1);
// 	document.getElementById('autoCents').innerHTML = mic.getNoteCents(1)[1];
// 	document.getElementById('fftNote').innerHTML = mic.getNote(2);
// 	document.getElementById('fftCents').innerHTML = mic.getNoteCents(2)[1];
// 	document.getElementById('fftFreq100').innerHTML = mic.getSprectrum(100);
// 	document.getElementById('fftFreq1000').innerHTML = mic.getSprectrum(200);
// 	//audioAvailable(mic);
// 	}
// }, 100);

$(document).ready (function () {


 checkMic();


if (play != true) {
startListening()
} else {
stopListening();
}

})

