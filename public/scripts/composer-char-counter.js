$(document).ready(function() {
  let maxLength = 140;
  $(".text").on('keyup', function() {
    let chars = $(this).val().length;
    chars = maxLength-chars;
    if (chars < 0) {
      $('.counter').css('color', 'red').text(chars);
    } else {
        $('.counter').css('color', '#244751').text(chars);
    }
  });
});