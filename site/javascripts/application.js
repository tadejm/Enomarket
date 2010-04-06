$(document).ready(function() {
  var nav = location.pathname.substr(1).split('/', 2)[0] || '/';
  if (nav)
    $('ul#navigation > li > a[href$="' + nav + '"]').parent().addClass('active');
    
  // $('#ponudba h3')
});
