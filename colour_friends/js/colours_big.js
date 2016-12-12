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

function takePhoto(c)
{
    $("body").append($("<canvas width='240' height='240' id=" + c + "></canvas>"));         
    var canvas = document.getElementById(c);
    ctx = canvas.getContext('2d');
    var cc = document.getElementById(c + 'x');
  //console.log(cc)
  //var v = document.getElementById('camFeed');
  //ctx.drawImage(v, 0, 0, 320, 240);
  //colorThief.getColor(c);
	//var myImage = new Image();
  //myImage.src = "gareth1600.png";
   var cols = colorThief.getPalette(cc, 20);
    //console.log(cols);
    for (var i = 0; i < cols.length; i++) {
      hsl_cols.push(rgbToHsl(cols[i][0],cols[i][1],cols[i][2]));
    }
    makeBlocks(cols);
    //console.log(hsl_cols);

   
}

function makeBlocks(cols){
  cols.sort(function(a,b) { return parseFloat(a[2]) - parseFloat(b[2]) } );
  var blocksize = 60;
    var y = 0;
    var x = 0;
    for (var i = 0; i < cols.length; i++) {
      if (x==5)  {y+=1; x = 0; }
      //if (x > width/blocksize)  {y+=1; x = 0; }
      //if (y > height)  {x_shift+= 2*blocksize; y = 0; }
      // ctx.fillStyle = rgb(cols[i][0],cols[i][1],cols[i][2]);
      ctx.fillStyle = rgb(cols[i][0],cols[i][1],cols[i][2]);
      ctx.fillRect(x*blocksize, y*blocksize, blocksize, blocksize);
      x++;
    };
    x_shift += 0;
    //y_shift += 1.2*blocksize; x =0;
}

//takePhoto();

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

        //Lsit all png file names in the page
        $(data).find("td > a").each(function(){

        //$(data).find("a:contains(" + fileextension + ")").each(function () {
          
          var filename = this.href.replace(window.location, "")
          if (filename != "") {
          //console.log(" - "+filename)
            $("#photo").attr("src", dir + filename);
             images[xx] = new Image();
             images[xx].onload = function () {
               //console.info("Image loaded !");
               //do something...
            $("body").append($("<img width='120' height='120' style ='display:none;' id=" + filename + "x src=" + dir + filename + "> "));
            takePhoto(filename);
            }
            images[xx].onerror = function () {
               console.error("Cannot load image");
               //do something else...
            }
            images[xx].src = dir + filename;
            xx++;
            //setTimeout(alert("Hello " + filename), 2000);
            //($("<img src=" + dir + filename + "></img>"));
    
            //takePhoto(filename);
          }
        });
        //makeBlocks();
    }
});
