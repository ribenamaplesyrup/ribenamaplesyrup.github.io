var coords = [];

function space(coords, bodyWidth, bodyHeight) {
  while (true) {
    ground = Math.min(bodyWidth,bodyHeight)
    console.log("looping")
    var randPosX = Math.floor((Math.random() * (bodyWidth-(0.3*bodyWidth))+(0.05*bodyWidth)));
    var randPosY = Math.floor((Math.random() * (bodyHeight-(0.35*bodyHeight))+(0.05*bodyHeight)));
    let i;
    for (i=0; i < coords.length; i++) {
      // if (Math.hypot(randPosX-coords[i][0], randPosY-coords[i][1]) < 200) {

      if (Math.hypot(randPosX-coords[i][0], randPosY-coords[i][1]) < ground/5) {
        break;
      }
      if (i == coords.length-1) {
        coords.push([randPosX, randPosY])
        return [randPosX, randPosY]
      }
    }
  }
}

$(document).ready(function() {
  // this runs ok
  var bodyWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  var bodyHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  $('.random').each(function(idx, img) {
    if (coords == 0) {
      console.log("calculating")
      var randPosX = Math.floor((Math.random() * (bodyWidth-(0.3*bodyWidth))+(0.05*bodyWidth)));
      var randPosY = Math.floor((Math.random() * (bodyHeight-(0.35*bodyHeight))+(0.05*bodyHeight)));
      console.log("calculated")
      console.log(randPosX, randPosY)
      coords.push([randPosX, randPosY])
      $(img).css('left', randPosX);
      $(img).css('top', randPosY);
      console.log("done")
    }
    else {
      console.log("spacing")
      let positions = space(coords, bodyWidth, bodyHeight)
      $(img).css('left', positions[0]);
      $(img).css('top', positions[1]);
    }
  });
});
