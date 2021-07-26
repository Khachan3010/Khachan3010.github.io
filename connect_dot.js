/*
*
* Game of 'Connect the dots' using jquery & CSS3
*
*/
let previousDot = -1;
$(document).ready(function() {

  //coordinates of the 'dots'
  var coords = [
  [195,195], 
  [195,2], [195,21], [195,41], [195,60], [195,79], [195,98], [195,117], [195,136], [195,156], [195,175],
  [195,214], [195,234], [195,253], [195,272], [195,291], [195,311], [195,330], [195,349], [195,368], [195,387],
  [2,195], [21,195], [41,195], [60,195], [79,195], [98,195], [117,195], [136,195], [156,195], [175,195],
  [214,195], [234,195], [253,195], [272,195], [291,195], [311,195], [330,195], [349,195], [368,195], [387,195],
  [60,60], [73,73], [87,87], [100,100], [113,113], [127,127], [140,140], [155,155], [168,168],  [183,183],
  [210,210], [224,224], [237,237], [250,250], [264,264], [277,277], [291,291], [304,304], [318,318],  [331,331],
  [60,331], [73,318], [87,304], [100,291], [113,277], [127,264], [140,250], [155,236], [168,223],  [182,209],
  [331,60], [318,73], [304,87], [291,100], [277,113], [264,127], [250,140], [236,155], [223,168],  [209,182],
  ];

  //draw all the dots
  for(i=0;i<coords.length;i++) {

    css = {
      left: coords[i][0]-6,
      top: coords[i][1]-17,
      zIndex: coords.length-i //to ensure lower numbers are on top of higher ones in case of overlap
    }
    
    //set the first dot active
    class_active = ' active';
    
    // html/css for the dot
    div = $('<div id="dot_container_'+i+'" order_value="'+i+'" class="dot_container'+class_active+'"><div class="dot"></div><div class="dot_number"></div></div>').css(css);
    
    //add the dot to the page
    $('#canvas').append(div);
  }
  
  
  // when a dot is clicked, join it with a line to the previous dot
  $('.dot_container').click(function(){

    if ($(this).hasClass('active')) { //check if active class has been added to the dot (note: can't move this into the .click event handler as it won't work there)

      var i = parseInt($(this).attr('order_value')); //its order in the dot series
      
      //if it's the first click, return
      if (previousDot == -1){
        previousDot = i;
        return false;
      }

      //draw line from previous dot to this dot
      x1 = coords[previousDot][0];
      y1 = coords[previousDot][1];
      x2 = coords[i][0];
      y2 = coords[i][1];
      
      var m = (y2-y1)/(x2-x1); //slope of the segment
      var angle = (Math.atan(m))*180/(Math.PI); //angle of the line
      var d = Math.sqrt(((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1))); //length of the segment
      var transform;

      // the (css) transform angle depends on the direction of movement of the line
      if (x2 >= x1){
        transform = (360 + angle) % 360;
      } else {
        transform = 180 + angle;
      }

      // add the (currently invisible) line to the page
      var id ='line_'+new Date().getTime();
      var line = "<div id='"+id+"'class='line'>&nbsp;</div>";
      $('#canvas').append(line);
      
      //rotate the line
      $('#'+id).css({
        'left': x1,
        'top': y1,
        'width': '0px',
        'transform' : 'rotate('+transform+'deg)',
        'transform-origin' : '0px 0px',
        '-ms-transform' : 'rotate('+transform+'deg)',
        '-ms-transform-origin' : '0px 0px',
        '-moz-transform' : 'rotate('+transform+'deg)',
        '-moz-transform-origin' : '0px 0px',
        '-webkit-transform' : 'rotate('+transform+'deg)',
        '-webkit-transform-origin' : '0px 0px',
        '-o-transform' : 'rotate('+transform+'deg)',
        '-o-transform-origin' : '0px 0px'
      });

      // 'draw' the line
      $('#'+id).animate({
        width: d,
      }, 400, "linear", function(){
        previousDot = i;
      });
    }

  });
  
});