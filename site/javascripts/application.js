$(document).ready(function() {
  var nav = location.pathname.substr(1).split('/', 2)[0] || '/';
  if (nav)
    $('ul#navigation > li > a[href$="' + nav + '"]').parent().addClass('active');

  $('div#ponudba > div > h3').click(function() {
    if ($.browser.msie)
      $("ul#" + this.nextSibling.id).toggle();
    else
      $("ul#" + this.nextElementSibling.id).toggle();

    $(this.parentNode).toggleClass('active');
  });

  var images = $('div.slike').length;
  if (images) {
    $('div.slike > img').click(function() {
      $('div.velika-slika > img')[0].src = this.src.replace('thumbs', 'full');
    });
  };
});
