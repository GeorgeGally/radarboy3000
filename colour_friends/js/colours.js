/////////
var width = window.innerWidth;
var height = window.innerHeight;
var w = window.innerWidth;
var h = window.innerHeight;
var ctx;
var colorThief = new ColorThief();

var x_shift = 0;
var y_shift = 0;
var idx = 0;
var filters = ['grayscale', 'sepia', 'blur', 'brightness', 'contrast', 'hue-rotate',
               'hue-rotate2', 'hue-rotate3', 'saturate', 'invert', ''];

function changeFilter(e) {
    //console.log("filter");
  var el = e.target;
  el.className = '';
  var effect = filters[idx++ % filters.length]; // loop through filters.
  if (effect) {
    el.classList.add(effect);
  }
}

var hsl_cols = [];
var total_cols = [];

function takePhoto(c)
{
    $("#holder").append($("<canvas width='100' height='100' style='margin-right: 5px' id=" + c + "></canvas>"));         
    var canvas = document.getElementById(c);
    ctx = canvas.getContext('2d');
    var cc = document.getElementById(c + 'x');
   var cols = colorThief.getPalette(cc, 25);
    for (var i = 0; i < cols.length; i++) {
     	hsl_cols.push(rgbToHsl(cols[i][0],cols[i][1],cols[i][2]));
     	total_cols.push([cols[i][0],cols[i][1],cols[i][2]]); 
    }
    makeBlocks(cols);
    var ave = getAve(total_cols);
    $('#ave_holder').css('background', ave);
    $('#ave_holder').text(ave);
    //console.log(hsl_cols);

   
}

function getAve(cols){
	var r = g = b = 0;

	 for (var i = 0; i < cols.length; i++) {
	 	r +=cols[i][0], g+=cols[i][1], b+=cols[i][2];
	 }
	 r = r/(cols.length-1);
	 g = g/(cols.length-1);
	 b = b/(cols.length-1);
	 // console.log(r);
	 // console.log(g);
	 // console.log(b);
	 var c = rgbToHex(Math.floor(r), Math.floor(g), Math.floor(b));
	 return c;
}

function makeBlocks(cols){
	
  //cols.sort(function(a,b) { return parseFloat(a[2]) - parseFloat(b[2]) } );
  var blocksize = 20;
    var y = 0;
    var x = 0;
    for (var i = 0; i < cols.length; i++) {
      if (x==5)  {y+=1; x = 0; }
      //ctx.fillStyle = rgb(cols[i][0],cols[i][0],cols[i][0]);
      ctx.fillStyle = rgb(cols[i][0],cols[i][1],cols[i][2]);
      ctx.fillRect(x*blocksize, y*blocksize, blocksize, blocksize);
      
      x++;
    };
  
}


function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

var images = [];
var xx = 0;
var dir = "friends/";

var fileextension = ".jpg";
$.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: dir,
    success: function (data) {
      //console.log(data)
        //Lsit all png file names in the page
        //$(data).find("td > a").each(function(){
          $(data).find("a").each(function(){
        //$(data).find("a:contains(" + fileextension + ")").each(function () {
          
          var filename = this.href.replace(window.location, "")
          //console.log(" - "+filename)
          if (filename != "") {
            
            $("#photo").attr("src", dir + filename);
             images[xx] = new Image();
             images[xx].onload = function () {
            $("body").append($("<img width='100' height='120' style ='display:none;' id=" + filename + "x src=" + dir + filename + "> "));
            takePhoto(filename);
            }
            images[xx].onerror = function () {
               console.error("Cannot load image");
            }
            images[xx].src = dir + filename;
            xx++;

          }
        });
         

    }
});



function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
