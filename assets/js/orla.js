
(function () {
  'use strict';

  const html = `
  <style>
    @keyframes orla-slideIn {
      from { transform: translateY(120px); opacity: 0; }
      to   { transform: translateY(0);    opacity: 1; }
    }
    @keyframes orla-breathe {
      0%, 100% { transform: scaleY(1); }
      50%       { transform: scaleY(1.03); }
    }
    @keyframes orla-blink {
      0%, 88%, 100% { transform: scaleY(1); }
      93%            { transform: scaleY(0.05); }
    }
    @keyframes orla-wave {
      0%, 100% { transform: rotate(0deg); }
      25%       { transform: rotate(18deg); }
      75%       { transform: rotate(-8deg); }
    }
    @keyframes orla-float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-5px); }
    }
    @keyframes orla-bubbleIn {
      0%   { transform: scale(0.85) translateY(6px); opacity: 0; }
      60%  { transform: scale(1.04) translateY(0);  opacity: 1; }
      100% { transform: scale(1)    translateY(0);  opacity: 1; }
    }
    @keyframes orla-glow {
      0%, 100% { filter: drop-shadow(0 8px 20px rgba(95,168,211,0.28)); }
      50%       { filter: drop-shadow(0 12px 32px rgba(95,168,211,0.50)); }
    }

    #orla-root {
      position: fixed;
      bottom: 80px;
      right: 16px;
      z-index: 9999;
      font-family: 'DM Sans', system-ui, sans-serif;
    }
    @media (min-width: 768px) {
      #orla-root { bottom: 32px; right: 24px; }
    }

    #orla-root.orla-visible {
      animation: orla-slideIn 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards;
    }

    #orla-svg-wrap {
      cursor: pointer;
      display: block;
      animation: orla-glow 3s ease-in-out infinite;
    }
    #orla-svg-wrap:hover #orla-svg {
      animation: orla-float 2s ease-in-out infinite;
    }

    #orla-body-anim {
      animation: orla-breathe 3.5s ease-in-out infinite;
      transform-origin: center bottom;
    }
    #orla-eyes-anim {
      animation: orla-blink 5s ease-in-out infinite;
    }
    #orla-hand-anim {
      animation: orla-wave 2.8s ease-in-out 1s infinite;
      transform-origin: 86px 100px;
    }

    #orla-bubble {
      position: absolute;
      bottom: 100%;
      right: 0;
      margin-bottom: 12px;
      width: 232px;
      background: white;
      border-radius: 18px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.12);
      border: 1px solid #e0f0ff;
      padding: 14px 16px;
      font-size: 13px;
      color: #334155;
      line-height: 1.5;
      animation: orla-bubbleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards;
    }
    #orla-bubble .orla-bubble-name {
      font-weight: 700;
      color: #0284c7;
      font-size: 12px;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    #orla-bubble .orla-cta {
      display: block;
      margin-top: 10px;
      text-align: center;
      background: #0284c7;
      color: white;
      border-radius: 8px;
      padding: 7px 12px;
      font-size: 12px;
      font-weight: 700;
      text-decoration: none;
      transition: background 0.2s;
    }
    #orla-bubble .orla-cta:hover { background: #0369a1; }
    #orla-bubble-arrow {
      position: absolute;
      bottom: -7px;
      right: 24px;
      width: 14px;
      height: 14px;
      background: white;
      transform: rotate(45deg);
      border-bottom: 1px solid #e0f0ff;
      border-right: 1px solid #e0f0ff;
    }

    #orla-minimize-btn {
      position: absolute;
      top: -6px;
      left: -6px;
      width: 22px;
      height: 22px;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 50%;
      color: #94a3b8;
      font-size: 14px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
      transition: color 0.2s;
    }
    #orla-minimize-btn:hover { color: #475569; }

    #orla-peek {
      cursor: pointer;
      display: none;
    }
    #orla-peek svg {
      filter: drop-shadow(0 4px 12px rgba(95,168,211,0.3));
      transition: transform 0.2s;
    }
    #orla-peek:hover svg { transform: scale(1.08); }
  </style>

  <div id="orla-root" style="display:none;" aria-label="Dr. Orla — Ghid Digital ORL">

    <!-- Bubble -->
    <div id="orla-bubble" style="display:none;">
      <div class="orla-bubble-name">
        <svg width="12" height="12" viewBox="0 0 20 20" fill="#0284c7"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>
        Dr. Orla
      </div>
      <span id="orla-msg-text">Bun venit! Cum vă pot ajuta astăzi?</span>
      <a href="contact.html#programare" class="orla-cta">Fă o programare →</a>
      <div id="orla-bubble-arrow"></div>
    </div>

    <!-- Mascot SVG -->
    <div style="position:relative;">
      <div id="orla-svg-wrap" onclick="OrlaToggle()" title="Dr. Orla">
        <svg id="orla-svg" width="108" height="138" viewBox="0 0 110 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Body / White Coat -->
          <g id="orla-body-anim">
            <rect x="22" y="82" width="66" height="52" rx="12" fill="#EFF6FF"/>
            <path d="M55 82 L42 100 L55 95 L68 100 Z" fill="white"/>
            <path d="M55 82 L40 96" stroke="#C8DCF0" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M55 82 L70 96" stroke="#C8DCF0" stroke-width="1.5" stroke-linecap="round"/>
            <!-- Stethoscope -->
            <path d="M48 94 Q44 102 48 108 Q54 116 60 108" stroke="#8ED1C8" stroke-width="2" fill="none" stroke-linecap="round"/>
            <circle cx="60" cy="108" r="3" fill="#5FA8D3" opacity="0.75"/>
            <!-- Pocket -->
            <rect x="62" y="100" width="16" height="10" rx="3" fill="white" stroke="#C8DCF0" stroke-width="1"/>
            <rect x="66" y="98" width="2" height="10" rx="1" fill="#5FA8D3"/>
            <rect x="70" y="98" width="2" height="10" rx="1" fill="#3A7CA5"/>
            <!-- Tablet -->
            <g id="orla-hand-anim">
              <rect x="74" y="95" width="24" height="32" rx="4" fill="#E0EEF8" stroke="#9DC5E0" stroke-width="1.5"/>
              <rect x="77" y="98" width="18" height="20" rx="2" fill="#5FA8D3" opacity="0.12"/>
              <line x1="79" y1="102" x2="93" y2="102" stroke="#5FA8D3" stroke-width="1.2" opacity="0.6"/>
              <line x1="79" y1="106" x2="90" y2="106" stroke="#5FA8D3" stroke-width="1.2" opacity="0.4"/>
              <line x1="79" y1="110" x2="87" y2="110" stroke="#5FA8D3" stroke-width="1.2" opacity="0.4"/>
              <circle cx="86" cy="123" r="2" fill="#9DC5E0"/>
            </g>
          </g>
          <!-- Hair -->
          <ellipse cx="55" cy="46" rx="26" ry="12" fill="#3D2B1F"/>
          <path d="M29 46 Q29 32 55 30 Q81 32 81 46" fill="#3D2B1F"/>
          <path d="M38 35 Q45 31 55 30" stroke="#5C4033" stroke-width="1.5" fill="none"/>
          <path d="M55 30 Q65 31 72 35" stroke="#5C4033" stroke-width="1.5" fill="none"/>
          <!-- Face -->
          <ellipse cx="55" cy="58" rx="24" ry="26" fill="#FAE5D3"/>
          <ellipse cx="38" cy="65" rx="6" ry="4" fill="#F4A0A0" opacity="0.32"/>
          <ellipse cx="72" cy="65" rx="6" ry="4" fill="#F4A0A0" opacity="0.32"/>
          <!-- Eyes -->
          <g id="orla-eyes-anim">
            <ellipse cx="45" cy="58" rx="4.5" ry="4.5" fill="white"/>
            <circle cx="45" cy="58" r="3" fill="#1E293B"/>
            <circle cx="46.2" cy="56.8" r="1" fill="white"/>
            <path d="M41 54 Q45 52 49 54" stroke="#3D2B1F" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <ellipse cx="65" cy="58" rx="4.5" ry="4.5" fill="white"/>
            <circle cx="65" cy="58" r="3" fill="#1E293B"/>
            <circle cx="66.2" cy="56.8" r="1" fill="white"/>
            <path d="M61 54 Q65 52 69 54" stroke="#3D2B1F" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          </g>
          <!-- Nose -->
          <path d="M53 64 Q55 68 57 64" stroke="#E8A882" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          <!-- Smile -->
          <path d="M46 71 Q55 78 64 71" stroke="#D4856A" stroke-width="2" fill="none" stroke-linecap="round"/>
          <!-- ENT Head mirror -->
          <circle cx="55" cy="41" r="6" fill="none" stroke="#9DC5E0" stroke-width="1.5" opacity="0.55"/>
          <circle cx="55" cy="41" r="2" fill="#C8DCF0" opacity="0.45"/>
          <path d="M49 38 Q55 36 61 38" stroke="#9DC5E0" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.5"/>
          <!-- Ears -->
          <ellipse cx="31" cy="60" rx="4" ry="5.5" fill="#FAE5D3"/>
          <ellipse cx="79" cy="60" rx="4" ry="5.5" fill="#FAE5D3"/>
          <!-- Name tag -->
          <rect x="30" y="128" width="50" height="13" rx="4" fill="#5FA8D3" opacity="0.14"/>
          <text x="55" y="138" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="7" font-weight="600" fill="#3A7CA5">Dr. Orla · ORL</text>
        </svg>
      </div>

      <!-- Minimize button -->
      <button id="orla-minimize-btn" onclick="OrlaMinimize()" title="Minimizează">×</button>
    </div>

    <!-- Peeking head when minimized -->
    <div id="orla-peek" onclick="OrlaExpand()" title="Dr. Orla">
      <svg width="52" height="52" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="26" fill="#EFF6FF" stroke="#9DC5E0" stroke-width="2"/>
        <ellipse cx="28" cy="28" rx="14" ry="15" fill="#FAE5D3"/>
        <ellipse cx="28" cy="20" rx="14" ry="7" fill="#3D2B1F"/>
        <circle cx="22" cy="28" r="2.5" fill="#1E293B"/>
        <circle cx="34" cy="28" r="2.5" fill="#1E293B"/>
        <path d="M23 35 Q28 39 33 35" stroke="#D4856A" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      </svg>
    </div>
  </div>`;

  // Inject into body
  document.body.insertAdjacentHTML('beforeend', html);

  // ── State ───────────────────────────────────────────────────────────────────
  const root      = document.getElementById('orla-root');
  const bubble    = document.getElementById('orla-bubble');
  const msgText   = document.getElementById('orla-msg-text');
  const svgWrap   = document.getElementById('orla-svg-wrap');
  const peek      = document.getElementById('orla-peek');
  const minimizeBtn = document.getElementById('orla-minimize-btn');

  let bubbleOpen  = false;
  let minimized   = false;
  let autoBubbleTimer = null;

  // ── Messages ────────────────────────────────────────────────────────────────
  const isReturning = !!localStorage.getItem('orla_visited');
  localStorage.setItem('orla_visited', '1');

  const PAGE_MESSAGES = {
    'index.html':    isReturning ? 'Bun revenit! Cu ce vă pot ajuta astăzi?' : 'Bun venit! Cum vă pot ajuta astăzi?',
    'despre.html':   'Aflați mai multe despre echipa și misiunea noastră.',
    'servicii.html': 'Descoperiți serviciile ORL specializate pe care le oferim.',
    'noutati.html':  'Citiți cele mai recente noutăți și realizări ale departamentului.',
    'contact.html':  'Suntem aici! Completați formularul sau sunați-ne direct.',
  };

  function currentPage() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path || 'index.html';
  }

  const defaultMsg = PAGE_MESSAGES[currentPage()] || PAGE_MESSAGES['index.html'];
  msgText.textContent = defaultMsg;

  // ── Show mascot after delay ─────────────────────────────────────────────────
  setTimeout(() => {
    root.style.display = 'block';
    root.classList.add('orla-visible');

    // Auto-show bubble briefly
    setTimeout(() => {
      showBubble();
      autoBubbleTimer = setTimeout(() => {
        if (bubbleOpen) hideBubble();
      }, 6000);
    }, 700);
  }, 3500);

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function showBubble() {
    bubble.style.display = 'block';
    bubbleOpen = true;
  }
  function hideBubble() {
    bubble.style.display = 'none';
    bubbleOpen = false;
  }

  window.OrlaToggle = function () {
    if (minimized) return;
    clearTimeout(autoBubbleTimer);
    if (bubbleOpen) hideBubble();
    else showBubble();
  };

  window.OrlaMinimize = function () {
    hideBubble();
    svgWrap.style.display = 'none';
    minimizeBtn.style.display = 'none';
    peek.style.display = 'block';
    minimized = true;
  };

  window.OrlaExpand = function () {
    svgWrap.style.display = 'block';
    minimizeBtn.style.display = 'flex';
    peek.style.display = 'none';
    minimized = false;
  };

  // ── Scroll-based messages (index.html only) ─────────────────────────────────
  if (currentPage() === 'index.html' || currentPage() === '') {
    const SCROLL_MSGS = [
      { id: 'services',    msg: 'Descoperiți toate serviciile noastre ORL specializate.' },
      { id: 'team',        msg: 'Echipa noastră de specialiști este gata să vă ajute.' },
      { id: 'noutati',     msg: 'Aflați ultimele noutăți și realizări ale departamentului.' },
      { id: 'appointment', msg: 'Completați formularul — vă contactăm în 2 ore!' },
    ];

    let lastSection = null;

    window.addEventListener('scroll', () => {
      const scrollMid = window.scrollY + window.innerHeight * 0.45;
      let active = null;

      for (let i = SCROLL_MSGS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SCROLL_MSGS[i].id);
        if (el && scrollMid >= el.offsetTop) {
          active = SCROLL_MSGS[i];
          break;
        }
      }

      const activeKey = active ? active.id : 'default';
      if (activeKey === lastSection) return;
      lastSection = activeKey;

      msgText.textContent = active ? active.msg : defaultMsg;

      // Flash bubble on section change
      if (!bubbleOpen && !minimized) {
        showBubble();
        clearTimeout(autoBubbleTimer);
        autoBubbleTimer = setTimeout(hideBubble, 4000);
      }
    }, { passive: true });
  }

})();