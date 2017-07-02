// FCC: Build a Personal Portfolio Website
// User Story: I can access all of the portfolio webpage's content just by scrolling.
// User Story: I can click different buttons that will take me to the portfolio creator's different social media pages.
// User Story: I can see thumbnail images of different projects the portfolio creator has built (if you haven't built any websites before, use placeholders.)
// User Story: I navigate to different sections of the webpage by clicking buttons in the navigation.



function drawLogo() {
  var lCanvas = document.getElementById('timolawl-logo');

  if(lCanvas.getContext) {
    var ctx = lCanvas.getContext('2d');
    var lw = lCanvas.width = '372';
    var lh = lCanvas.height = '252';
    
    var p1 = new Path2D('M366 6l-60 60H186l60-60h102z');
    var p2 = new Path2D('M186 66H66L6 6h120z');
    var p3 = new Path2D('M246 6l-60 60V42l36-36z');
    var p4 = new Path2D('M222.4 170l5.6 16-42 60v-24z');
    var p5 = new Path2D('M195 91.7l27.4 78.3-36.4 52v-1.7L162 186l5.6-16 18.4-52.6z');
    var p6 = new Path2D('M222 6l-36 36-36-36z');
    var p7 = new Path2D('M186 66l9 25.7-9 25.7z');
    var p8 = new Path2D('M186 222v24l-42-60 5.6-16L186 66v51.4L167.6 170l-5.6 16 24 34.3z');
    var p9 = new Path2D('M186 42v24L126 6h24z');
    var p10 = new Path2D('M246 6H126');
    var p11 = new Path2D('M126 6H6l60 60h120z');
    
    var p12 = new Path2D('M246 6h120l-60 60H186z');
    var p13 = new Path2D('M186 66l-36.4 104-5.6 16 42 60 42-60-5.6-16L195 91.7z');
    
    lCanvas.width /= 4;
    lCanvas.height /= 4;
    ctx.scale(0.25, 0.25);
    
    ctx.strokeStyle = 'transparent';
    
    ctx.stroke(p1);
    ctx.stroke(p2);
    ctx.stroke(p3);
    ctx.stroke(p4);
    ctx.stroke(p5);
    ctx.stroke(p6);
    ctx.stroke(p7);
    ctx.stroke(p8);
    ctx.stroke(p9);
    
    ctx.fillStyle = '#8d8c8e';
    ctx.fill(p1);
    ctx.fill(p2);
    ctx.fillStyle = '#357280';
    ctx.fill(p3);
    ctx.fill(p4);
    ctx.fillStyle = '#69e3ff';
    ctx.fill(p5);
    ctx.fill(p6);
    ctx.fillStyle = '#a5eeff';
    ctx.fill(p7);
    ctx.fill(p8);
    ctx.fill(p9);
    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 12;
    ctx.lineJoin = 'round';
    
    ctx.stroke(p10);
    ctx.stroke(p11);
    ctx.stroke(p12);
    ctx.stroke(p13);    
  }
}


function drawSky() {
  var sCanvas = document.getElementById('sky');
  if(sCanvas.getContext) {
    var sCtx = sCanvas.getContext('2d');
    var sw = sCanvas.width = window.innerWidth;
    var sh = sCanvas.height = window.innerHeight;
    sCtx.clearRect(0, 0, sw, sh);
    sCtx.fillStyle = 'skyblue';
    sCtx.fillRect(0, 0, sw, sh);
  }
}


function drawPlatform() {
  var pCanvas = document.getElementById('platform');
  if(pCanvas.getContext) {
    var pCtx = pCanvas.getContext('2d');
    var pw = pCanvas.width = window.innerWidth;
    var ph = pCanvas.height = window.innerHeight;
    
    var img = new Image();
    img.src = '//res.cloudinary.com/timolawl/image/upload/v1457415423/grass-tile.png';
    
    var groundTiles = [];
    var tileWidth = 55;
    var numberOfTilesNeeded = window.innerWidth;
    for (var i = 0; i < numberOfTilesNeeded; i++) {
      groundTiles.push(i * 55);
    }
  
    img.onload = function update() {
      window.requestAnimationFrame(update); 
        
      for (var j = 0; j < numberOfTilesNeeded; j++) {
        var ph = img.naturalHeight;

        pCtx.drawImage(img, 0, 0, 55, 58, groundTiles[j], pCanvas.height - ph, 55, ph);  
        groundTiles[j] -= 0.5;

        if (groundTiles[j] <= -55) {
          groundTiles[j] = pw;
        }
      }
    }; 
  }
}

!function() {
  var character, character2, character3, character4,
      cCanvas, cCanvas2, cCanvas3, cCanvas4,
      characterImage, characterImage2, characterImage3, characterImage4;
  
  function characterAnimationLoop() {    
    window.requestAnimationFrame(characterAnimationLoop);
    character.update();
    character.render(64);

    character3.update();
    character3.render(0);
  }
  
  function sprite(options) {
    var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1,
        properHeight = window.innerHeight - 58 - 32;
    
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
      
    that.update = function() {
      tickCount += 1;
      if (tickCount > ticksPerFrame) {
        tickCount = 0;
        
        if (frameIndex < numberOfFrames - 1) {
          frameIndex += 1;
          /*
          if(frameIndex == 0) frameIndex += 2;
          else frameIndex += 1;
          */
        }
        else {
          frameIndex = 0;
        }
      }
    };

    that.render = function(location) {
      that.context.clearRect(0, 0, that.width, that.height);
      
      //that.context.translate(0, 0);
      that.context.drawImage(
        that.image,
        frameIndex * that.width / numberOfFrames,
        location,
        that.width / numberOfFrames,
        that.height,
        0,
        0,
        that.width / numberOfFrames,
        that.height);
    };
    
    return that;
  }
  
  cCanvas = document.getElementById('character--journey');
  cCanvas.width = 32;
  cCanvas.height = 58 + 32; // 58 being the height of the platform
  
  characterImage = new Image();
  
  character = sprite({
    context: cCanvas.getContext('2d'),
    width: 96,
    height: 32,
    image: characterImage,
    numberOfFrames: 3,
    ticksPerFrame: 15  
  });
  
  characterImage.addEventListener('load', characterAnimationLoop);
  characterImage.src = '//res.cloudinary.com/timolawl/image/upload/v1457415498/csprite-journey.png';
  
  // character 2 -- white mage
  
  cCanvas2 = document.getElementById('character--whitemage');
  cCanvas2.width = 128;
  cCanvas2.height = 32; // 58 being the height of the platform
  
  characterImage2 = new Image();
  
  character2 = sprite({
    context: cCanvas2.getContext('2d'),
    width: 96,
    height: 32,
    image: characterImage2,
    numberOfFrames: 3,
    ticksPerFrame: 15  
  });

  characterImage2.src = '//res.cloudinary.com/timolawl/image/upload/v1457415569/csprite-whitemage.png';
  
  characterImage2.onload = function() {
    character2.context.globalAlpha = 1;
    character2.context.drawImage(characterImage2, 32, 0, 32, 32, 0, 0, 32, 32);
    character2.context.globalAlpha = 0.75;
    character2.context.drawImage(characterImage2, 32, 0, 32, 32, 32, 0, 32, 32);
    character2.context.globalAlpha = 0.5;
    character2.context.drawImage(characterImage2, 32, 0, 32, 32, 64, 0, 32, 32);
    character2.context.globalAlpha = 0.25;
    character2.context.drawImage(characterImage2, 32, 0, 32, 32, 96, 0, 32, 32);
    
  };
    
  
  // character sprite 3 -- walking
  
  cCanvas3 = document.getElementById('character--walking');
  cCanvas3.width = 32;
  cCanvas3.height = 32; // 58 being the height of the platform
  
  characterImage3 = new Image();
  
  character3 = sprite({
    context: cCanvas3.getContext('2d'),
    width: 96,
    height: 32,
    image: characterImage3,
    numberOfFrames: 3,
    ticksPerFrame: 15
  });
  
 // characterImage3.addEventListener('load', characterAnimationLoop); // don't need this as the characterAnimationLoop already updates it.
  characterImage3.src = '//res.cloudinary.com/timolawl/image/upload/v1457415622/csprite-dark.png';
  
  
  // character 4 -- contact view
  
  cCanvas4 = document.getElementById('character--contact');
  cCanvas4.width = 32;
  cCanvas4.height = 32; // 58 being the height of the platform
  
  characterImage4 = new Image();
  
  character4 = sprite({
    context: cCanvas4.getContext('2d'),
    width: 32,
    height: 32,
    image: characterImage4,
    numberOfFrames: 3,
    ticksPerFrame: 15
  });
  
  characterImage4.src = '//res.cloudinary.com/timolawl/image/upload/v1457415498/csprite-journey.png';
  
  characterImage4.onload = function() {
    character4.context.drawImage(characterImage4, 32, 0, 32, 32, 0, 0, 32, 32);
  };
    

}();



window.onload = function() {
  drawSky();
  drawPlatform();
  drawLogo();
};

window.addEventListener('resize', redraw);

function redraw() {
  drawPlatform();
  drawSky();
}

