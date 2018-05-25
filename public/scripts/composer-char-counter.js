$(document).ready(function() {
  //counts characters typed
  let maxLength = 140;
  $(".text").on('keyup', function() {
    let chars = $(this).val().length;
    chars = maxLength-chars;
    if (chars < 0) {
      $('.counter').css('color', 'red').text(chars);
    } else {
        $('.counter').css('color', '#244751').text(chars);
    }
    //resets character count to 140 on tweet submission
    $( "#form" ).on( "submit", function( event ) {
      if (chars < 0) {
        $(".counter").text(chars);
      } else if (chars >= 0) {
        $('.counter').text("140");
      }
    });
  });
});