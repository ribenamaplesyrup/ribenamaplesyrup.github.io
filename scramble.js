var coords = [];

function space(coords, bodyWidth, bodyHeight) {
  while (true) {
    var randPosX = Math.floor((Math.random() * (bodyWidth-(0.3*bodyWidth))+(0.05*bodyWidth)));
    var randPosY = Math.floor((Math.random() * (bodyHeight-(0.35*bodyHeight))+(0.05*bodyHeight)));
    let i;
    for (i=0; i < coords.length; i++) {
      if (Math.hypot(randPosX-coords[i][0], randPosY-coords[i][1]) < 200) {
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
  var bodyWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  var bodyHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  $('.random').each(function(idx, img) {
    if (coords == 0) {
      var randPosX = Math.floor((Math.random() * (bodyWidth-(0.3*bodyWidth))+(0.05*bodyWidth)));
      var randPosY = Math.floor((Math.random() * (bodyHeight-(0.35*bodyHeight))+(0.05*bodyHeight)));
      coords.push([randPosX, randPosY])
      $(img).css('left', randPosX);
      $(img).css('top', randPosY);
    }
    else {
      let positions = space(coords, bodyWidth, bodyHeight)
      $(img).css('left', positions[0]);
      $(img).css('top', positions[1]);
    }
  });
});
