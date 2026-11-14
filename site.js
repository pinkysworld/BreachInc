(function () {
  var dialog = document.querySelector('.lightbox');
  var picture = dialog.querySelector('img');
  var opener;
  document.querySelectorAll('.shot').forEach(function (button) {
    button.addEventListener('click', function () {
      opener = button;
      var source = button.querySelector('img');
      picture.src = source.src;
      picture.alt = source.alt;
      dialog.showModal();
      dialog.querySelector('button').focus();
    });
  });
  dialog.querySelector('button').addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', function () { if (opener) opener.focus(); });

  var video = document.getElementById('trailer');
  var preview = document.getElementById('trailer-preview');
  var caption = document.getElementById('trailer-caption');
  var request = 0;
  function loadTrailer() {
    var current = ++request;
    var path = 'img/trailer_' + (document.documentElement.lang === 'de' ? 'de' : 'en') + '.mp4';
    video.pause();
    video.hidden = true;
    preview.hidden = false;
    caption.hidden = false;
    video.removeAttribute('src');
    video.load();
    fetch(path, { method: 'HEAD' }).then(function (response) {
      if (!response.ok || current !== request) return;
      video.src = path;
      video.load();
    }).catch(function () {});
  }
  video.addEventListener('loadeddata', function () { video.hidden = false; preview.hidden = true; caption.hidden = true; });
  video.addEventListener('error', function () { video.hidden = true; preview.hidden = false; caption.hidden = false; });
  new MutationObserver(loadTrailer).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  loadTrailer();
})();
