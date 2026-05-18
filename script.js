// ══════════════════════════════════════════════════════
//  Pagina personal | script.js
// ══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  /* ── CARRUSEL ────────────────────────────────────── */
  const pagesContainer = document.querySelector('.carousel-pages');
  const pages          = document.querySelectorAll('.page');
  const prevBtn        = document.getElementById('prevBtn');
  const nextBtn        = document.getElementById('nextBtn');
  const dotsContainer  = document.getElementById('dotsContainer');
  const total          = pages.length;
  let current          = 0;

  // Crear dots dinámicamente según el número de páginas
  pages.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Ir a sección ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = ((index % total) + total) % total;
    pagesContainer.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  /* ── SWIPE TÁCTIL ───────────────────────────────── */
  let startX = 0;
  const container = document.querySelector('.carousel-container');

  container.addEventListener('touchstart', e => {
    startX = e.changedTouches[0].clientX;
  }, { passive: true });

  container.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  }, { passive: true });

  /* ── MODAL ──────────────────────────────────────── */
  const overlay    = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalNombre = document.getElementById('modalNombre');
  const modalDetalle = document.getElementById('modalDetalle');
  const modalNotas  = document.getElementById('modalNotas');
  const modalImg    = document.getElementById('modalImg');
  const modalImgPh  = document.getElementById('modalImgPlaceholder');

  function openModal(item) {
    const nombre = item.dataset.nombre    || '—';
    const detalle = item.dataset.detalle  || '-';
    const notas   = item.dataset.notas    || '';
    const foto   = item.dataset.foto      || '';
    const icono  = item.dataset.icono     || '🍽️';

    modalNombre.textContent = nombre;
    modalDetalle.textContent = detalle;

    // Imagen real o placeholder con emoji
    if (foto) {
      modalImg.src          = foto;
      modalImg.alt          = nombre;
      modalImg.style.display = 'block';
      modalImgPh.style.display = 'none';
    } else {
      modalImg.style.display   = 'none';
      modalImgPh.style.display = 'flex';
      modalImgPh.textContent   = icono;
    }

    // Chips de notas
    modalNotas.innerHTML = '';
    if (notas) {
      notas.split(',')
        .map(a => a.trim())
        .filter(Boolean)
        .forEach(tag => {
          const chip = document.createElement('span');
          chip.className   = 'note-tag';
          chip.textContent = tag;
          modalNotas.appendChild(chip);
        });
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Abrir modal al hacer click en cualquier recuerdo de la galeria
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => openModal(item));
  });

  // Cerrar modal
  modalClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

});

/* ── REDES SOCIALES / CONTACTO ──────────────────────── */

function enviarMensaje() {
  const tel = '524661201326'; // ✏️ Cambia por el número real
  const msg = encodeURIComponent(
    'Hola, vi tu pagina y me gustaria contactarte.\n\n' +
    '¡Gracias!'
  );
  window.open(`https://wa.me/${tel}?text=${msg}`, '_blank');
}

function irAInstagram() {
  window.open(
    'https://www.instagram.com/',
    '_blank'
  );
}

function irAFacebook() {
  window.open(
    'https://www.facebook.com/',
    '_blank'
  );
}