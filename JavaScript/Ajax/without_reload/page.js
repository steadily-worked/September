$(document).ready(function () {
    $(document).on('click', '.control nav a', function (event) {
      history.pushState(null, null, event.target.href);
      $('article').load(event.target.href+' article>.content');
      event.preventDefault();
    })
    $(window).on('popstate', function(event){
      $('article').load(location.href+' article>.content');
    })
  });