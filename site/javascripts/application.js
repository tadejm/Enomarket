$(document).ready(function() {
  var nav = location.pathname.substr(1).split('/', 2)[0] || '/';
  if (nav)
    $('ul#navigation > li > a[href$="' + nav + '"]').parent().addClass('active');
    
  $('div#ponudba > div > h3').click(function() {
    $("ul#" + this.nextElementSibling.id).toggle()
    $(this.parentNode).toggleClass('active');
  });


});
