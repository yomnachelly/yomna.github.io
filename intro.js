/**
 * intro.js — Butterfly Intro Animation
 * Portfolio Yomna Chelly
 *
 * Usage: ajoute dans index.html, juste avant </body> :
 *   <script src="intro.js"></script>
 *
 * Le script injecte tout lui-même, aucun HTML supplémentaire n'est requis.
 */

(function () {
  // ── Ne joue qu'une fois par session ──
  if (sessionStorage.getItem('intro_done')) return;

  // ── Variables de style ──
  const GOLD       = '#b8832e';
  const GOLD_LIGHT = '#d4a85c';
  const CREAM      = '#f9f7f2';
  const INK        = '#0d0c0a';
  const DURATION   = 1000; // ms avant que l'intro disparaisse

  // ── Bloquer le scroll pendant l'intro ──
  document.documentElement.style.overflow = 'hidden';

  // ── Overlay ──
  const overlay = document.createElement('div');
  overlay.id = 'yc-intro';
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 99999;
    background: ${CREAM};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    pointer-events: all;
  `;

  // ── SVG Papillon ──
  // On dessine un grand papillon décoratif centré
  const butterflyWrap = document.createElement('div');
  butterflyWrap.style.cssText = `
    position: relative;
    width: 260px;
    height: 200px;
    margin-bottom: 2rem;
    animation: yc-butterfly-enter 1s cubic-bezier(0.22,1,0.36,1) forwards;
  `;

  butterflyWrap.innerHTML = `
    <svg id="yc-butterfly-svg" viewBox="0 0 260 200" width="260" height="200"
         xmlns="http://www.w3.org/2000/svg" style="overflow:visible;">
      <defs>
        <radialGradient id="wgL" cx="60%" cy="40%" r="60%">
          <stop offset="0%" stop-color="${GOLD_LIGHT}" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="${GOLD}" stop-opacity="0.5"/>
        </radialGradient>
        <radialGradient id="wgR" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="${GOLD_LIGHT}" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="${GOLD}" stop-opacity="0.5"/>
        </radialGradient>
        <filter id="blur-wings">
          <feGaussianBlur stdDeviation="2"/>
        </filter>
      </defs>

      <!-- Aile gauche supérieure -->
      <path id="wLS" d="M130,100 C105,65 50,15 8,45 C-8,75 45,125 130,112 Z"
            fill="url(#wgL)" stroke="${GOLD}" stroke-width="1.2" opacity="0.9">
        <animateTransform attributeName="transform" type="rotate"
          values="0 130 100; -25 130 100; 0 130 100"
          dur="0.7s" repeatCount="indefinite" calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"/>
      </path>

      <!-- Aile gauche inférieure -->
      <path id="wLI" d="M130,108 C95,115 30,150 48,178 C62,200 118,178 130,128 Z"
            fill="url(#wgL)" stroke="${GOLD}" stroke-width="1.2" opacity="0.8">
        <animateTransform attributeName="transform" type="rotate"
          values="0 130 100; -18 130 100; 0 130 100"
          dur="0.7s" repeatCount="indefinite" calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"/>
      </path>

      <!-- Aile droite supérieure -->
      <path id="wRS" d="M130,100 C155,65 210,15 252,45 C268,75 215,125 130,112 Z"
            fill="url(#wgR)" stroke="${GOLD}" stroke-width="1.2" opacity="0.9">
        <animateTransform attributeName="transform" type="rotate"
          values="0 130 100; 25 130 100; 0 130 100"
          dur="0.7s" repeatCount="indefinite" calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"/>
      </path>

      <!-- Aile droite inférieure -->
      <path id="wRI" d="M130,108 C165,115 230,150 212,178 C198,200 142,178 130,128 Z"
            fill="url(#wgR)" stroke="${GOLD}" stroke-width="1.2" opacity="0.8">
        <animateTransform attributeName="transform" type="rotate"
          values="0 130 100; 18 130 100; 0 130 100"
          dur="0.7s" repeatCount="indefinite" calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"/>
      </path>

      <!-- Motifs sur les ailes -->
      <circle cx="80" cy="80" r="12" fill="${GOLD}" opacity="0.25"/>
      <circle cx="180" cy="80" r="12" fill="${GOLD}" opacity="0.25"/>
      <circle cx="70" cy="120" r="7" fill="${GOLD}" opacity="0.2"/>
      <circle cx="190" cy="120" r="7" fill="${GOLD}" opacity="0.2"/>

      <!-- Corps -->
      <ellipse cx="130" cy="108" rx="4" ry="35" fill="${INK}" opacity="0.85"/>
      <!-- Tête -->
      <circle cx="130" cy="70" r="6" fill="${INK}" opacity="0.85"/>
      <!-- Antennes -->
      <line x1="130" y1="65" x2="112" y2="42" stroke="${INK}" stroke-width="1.5" opacity="0.7"/>
      <circle cx="111" cy="41" r="3" fill="${GOLD}"/>
      <line x1="130" y1="65" x2="148" y2="42" stroke="${INK}" stroke-width="1.5" opacity="0.7"/>
      <circle cx="149" cy="41" r="3" fill="${GOLD}"/>
    </svg>
  `;

  // ── Texte ──
  const textWrap = document.createElement('div');
  textWrap.style.cssText = `
    text-align: center;
    animation: yc-text-fadein 0.9s 0.6s cubic-bezier(0.22,1,0.36,1) both;
  `;
  textWrap.innerHTML = `
    <p style="
      font-family: 'JetBrains Mono', 'Courier New', monospace;
      font-size: 0.72rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: ${GOLD};
      margin-bottom: 0.6rem;
      opacity: 0.85;
    ">Portfolio</p>
    <h1 style="
      font-family: 'DM Serif Display', Georgia, serif;
      font-size: clamp(2rem, 6vw, 3.4rem);
      font-weight: 400;
      color: ${INK};
      letter-spacing: -0.02em;
      line-height: 1.1;
      margin-bottom: 0.5rem;
    ">Yomna <em style="color:${GOLD};font-style:italic;">Chelly</em></h1>
    <div style="
      width: 48px;
      height: 2px;
      background: linear-gradient(90deg, ${GOLD}, ${GOLD_LIGHT});
      margin: 0 auto;
      border-radius: 2px;
      animation: yc-line-expand 0.6s 1.1s cubic-bezier(0.22,1,0.36,1) both;
      transform-origin: center;
    "></div>
  `;

  // ── Petits papillons décoratifs en arrière-plan ──
  const makeSmallButterfly = (x, y, scale, delay, dur) => {
    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      transform: scale(${scale});
      opacity: 0;
      animation: yc-float-in ${dur}s ${delay}s ease-out forwards;
      pointer-events: none;
    `;
    el.innerHTML = `
      <svg viewBox="0 0 80 60" width="80" height="60" xmlns="http://www.w3.org/2000/svg">
        <path d="M40,30 C28,22 8,10 2,18 C-4,26 14,38 40,34 Z" fill="${GOLD}" opacity="0.35"/>
        <path d="M40,32 C28,35 8,44 14,52 C20,60 36,53 40,38 Z" fill="${GOLD}" opacity="0.3"/>
        <path d="M40,30 C52,22 72,10 78,18 C84,26 66,38 40,34 Z" fill="${GOLD}" opacity="0.35"/>
        <path d="M40,32 C52,35 72,44 66,52 C60,60 44,53 40,38 Z" fill="${GOLD}" opacity="0.3"/>
        <ellipse cx="40" cy="32" rx="2" ry="10" fill="${INK}" opacity="0.6"/>
      </svg>
    `;
    return el;
  };

  overlay.appendChild(makeSmallButterfly(8,  15, 0.6, 0.2, 1.2));
  overlay.appendChild(makeSmallButterfly(85, 10, 0.5, 0.4, 1.0));
  overlay.appendChild(makeSmallButterfly(5,  75, 0.45,0.6, 1.1));
  overlay.appendChild(makeSmallButterfly(90, 70, 0.55,0.3, 1.3));
  overlay.appendChild(makeSmallButterfly(50, 5,  0.4, 0.5, 1.0));

  overlay.appendChild(butterflyWrap);
  overlay.appendChild(textWrap);

  // ── Keyframes CSS ──
  const style = document.createElement('style');
  style.textContent = `
    @keyframes yc-butterfly-enter {
      from { opacity: 0; transform: translateY(-60px) scale(0.6); }
      to   { opacity: 1; transform: translateY(0)     scale(1); }
    }
    @keyframes yc-text-fadein {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes yc-line-expand {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes yc-float-in {
      from { opacity: 0; transform: scale(var(--s,1)) translateY(10px); }
      to   { opacity: 1; transform: scale(var(--s,1)) translateY(0); }
    }
    @keyframes yc-intro-exit {
      0%   { opacity: 1; transform: scale(1); }
      60%  { opacity: 1; transform: scale(1.04); }
      100% { opacity: 0; transform: scale(1.08); }
    }
    @keyframes yc-butterfly-fly-out {
      0%   { transform: scale(1) translateY(0); opacity: 1; }
      100% { transform: scale(0.3) translateY(-180px) rotate(15deg); opacity: 0; }
    }
    @keyframes yc-text-fly-out {
      0%   { opacity: 1; transform: translateY(0); }
      100% { opacity: 0; transform: translateY(30px); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(overlay);

  // ── Dismiss : après DURATION ms, tout s'envole et disparaît ──
  setTimeout(() => {
    butterflyWrap.style.animation = 'yc-butterfly-fly-out 0.9s cubic-bezier(0.4,0,1,1) forwards';
    textWrap.style.animation      = 'yc-text-fly-out 0.7s 0.15s cubic-bezier(0.4,0,1,1) forwards';
    overlay.style.animation       = 'yc-intro-exit 0.9s 0.3s cubic-bezier(0.4,0,1,1) forwards';

    overlay.addEventListener('animationend', (e) => {
      if (e.target !== overlay) return;
      overlay.remove();
      style.remove();
      document.documentElement.style.overflow = '';
      sessionStorage.setItem('intro_done', '1');
    });
  }, DURATION);

  // ── Clic pour skip ──
  overlay.addEventListener('click', () => {
    overlay.style.animation = 'yc-intro-exit 0.5s cubic-bezier(0.4,0,1,1) forwards';
    overlay.addEventListener('animationend', () => {
      overlay.remove();
      style.remove();
      document.documentElement.style.overflow = '';
      sessionStorage.setItem('intro_done', '1');
    }, { once: true });
  });

})();
