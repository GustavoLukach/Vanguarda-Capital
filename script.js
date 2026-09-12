// Sombra no header ao rolar a página
  var header = document.getElementById('site-header');
  window.addEventListener('scroll', function(){
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }, { passive: true });

  // Entrada única do hero (respeita prefers-reduced-motion via CSS acima)
  window.addEventListener('DOMContentLoaded', function(){
    document.querySelector('.hero').classList.add('is-visible');
  });

  // Envio do formulário via Formspree (AJAX), com mensagem de sucesso/erro inline
  var form = document.getElementById('lead-form');
  var status = document.getElementById('form-status');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(function(res){
      if (res.ok) {
        form.reset();
        form.hidden = true;
        status.hidden = false;
        status.className = 'form-status form-status--success';
        status.textContent = 'Recebemos seus dados. Nossa equipe entrará em contato em breve.';
      } else {
        throw new Error('request-failed');
      }
    }).catch(function(){
      status.hidden = false;
      status.className = 'form-status form-status--error';
      status.textContent = 'Não foi possível enviar agora. Tente novamente ou fale conosco pelo WhatsApp.';
      btn.disabled = false;
      btn.textContent = originalText;
    });
  });