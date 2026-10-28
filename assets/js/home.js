/* Sant Miquel Arcàngel — home: el toldo y la palabra que cambia, el recorrido del jardín, 25 ventanas,
   equipo, la casa en una persiana que gira sus lamas, exposición con luces, calendario de fiestas,
   mapa a pie y la visita que deja el correo escrito. */
(function () {
  'use strict';
  var d = document, SM = window.SM || { quieto: true, t: function (c) { return c; }, idioma: 'ca', alCanviarIdioma: [], observa: function (e) { e.classList.add('visto'); }, enPantalla: function (e, f) { f(true); } };
  var quieto = SM.quieto;
  function $(s, c) { return (c || d).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); }
  function reinicia(el, classe) { el.classList.remove(classe); void el.offsetWidth; el.classList.add(classe); }

  /* Un temporizador que solo corre cuando su bloque se ve y nadie lo está tocando */
  function rellotge(bloc, ms, pas) {
    var visible = false, aturat = false, t = null;
    function arrenca() { para(); if (visible && !aturat && !quieto && !d.hidden) t = setInterval(pas, ms); }
    function para() { if (t) { clearInterval(t); t = null; } }
    SM.enPantalla(bloc, function (si) { visible = si; arrenca(); });
    d.addEventListener('visibilitychange', arrenca);
    return {
      atura: function (si) { aturat = si; arrenca(); },
      reinicia: arrenca
    };
  }
  /* Una sola vez, cuando el bloque se ve de verdad */
  function quanEsVegi(el, f, llindar) {
    if (!('IntersectionObserver' in window)) { f(); return; }
    var io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      io.disconnect(); f();
    }, { threshold: llindar || 0.5 });
    io.observe(el);
  }

  /* ================= 1 · Hero: la palabra que cambia, el recorrido del jardín y el aire en el volante ================= */
  (function () {
    var hero = $('[data-hero]'); if (!hero) return;

    // La palabra que cambia, letra a letra, con el subrayado amarillo que se dibuja debajo
    var roda = $('[data-roda]', hero);
    var PARAULES = {
      ca: ['jardí.', 'metge.', 'infermeria.', 'cuina pròpia.', 'fisioteràpia.'],
      es: ['jardín.', 'médico.', 'enfermería.', 'cocina propia.', 'fisioterapia.']
    };
    var ip = 0;
    function paraula(text, classe) {
      var s = d.createElement('span');
      s.className = 'roda__p ' + classe;
      Array.from(text).forEach(function (c, k) {
        var l = d.createElement('span');
        l.className = 'roda__l'; l.style.setProperty('--k', k); l.textContent = c;
        s.appendChild(l);
      });
      return s;
    }
    function pinta(anima) {
      var vella = $('.roda__p.ara', roda);
      var nova = paraula(PARAULES[SM.idioma === 'es' ? 'es' : 'ca'][ip], anima ? 'ara entra' : 'ara');
      if (vella) {
        vella.classList.remove('ara');
        if (anima) { vella.classList.add('surt'); setTimeout(function () { if (vella.parentNode) vella.parentNode.removeChild(vella); }, 800); }
        else vella.parentNode.removeChild(vella);
      }
      roda.appendChild(nova);
      if (anima) reinicia(roda, 'canvi');
    }
    if (roda) {
      pinta(false);
      SM.alCanviarIdioma.push(function () { $$('.roda__p', roda).forEach(function (p) { p.parentNode.removeChild(p); }); pinta(false); });
      rellotge(roda, 2600, function () { ip = (ip + 1) % PARAULES.ca.length; pinta(true); });
    }

    // El recorrido del jardín: un punto tras otro, unidos por una línea de luz
    var fig = $('[data-punts]', hero);
    if (fig) {
      var punts = $$('[data-punt]', fig), trams = $$('[data-tram]', fig), pasRuta = -1;
      var posa = function () {
        var w = fig.clientWidth, h = fig.clientHeight;
        trams.forEach(function (t, k) {
          var a = punts[k], b = punts[k + 1]; if (!b) return;
          var ax = parseFloat(a.style.getPropertyValue('--x')) / 100 * w, ay = parseFloat(a.style.getPropertyValue('--y')) / 100 * h;
          var bx = parseFloat(b.style.getPropertyValue('--x')) / 100 * w, by = parseFloat(b.style.getPropertyValue('--y')) / 100 * h;
          t.style.left = ax + 'px'; t.style.top = ay + 'px';
          t.style.width = Math.hypot(bx - ax, by - ay) + 'px';
          t.style.setProperty('--ang', Math.atan2(by - ay, bx - ax) + 'rad');
        });
      };
      posa();
      if ('ResizeObserver' in window) new ResizeObserver(posa).observe(fig);
      var marca = function (k) {
        punts.forEach(function (p, n) { p.classList.toggle('actiu', n === k); });
        trams.forEach(function (t, n) { t.classList.toggle('fet', n < k); });
      };
      var r = rellotge(fig, 2700, function () {
        pasRuta = (pasRuta + 1) % (punts.length + 1);
        if (pasRuta === punts.length) { fig.classList.add('esvaeix'); punts.forEach(function (p) { p.classList.remove('actiu'); }); }
        else { if (pasRuta === 0) { fig.classList.remove('esvaeix'); marca(-1); } marca(pasRuta); }
      });
      fig.addEventListener('pointerenter', function () { r.atura(true); fig.classList.remove('esvaeix'); marca(-1); pasRuta = -1; });
      fig.addEventListener('pointerleave', function () { r.atura(false); });
      punts.forEach(function (p, k) {
        p.addEventListener('click', function () { fig.classList.remove('esvaeix'); marca(k); pasRuta = k; r.atura(true); clearTimeout(fig._t); fig._t = setTimeout(function () { r.atura(false); }, 6000); });
        p.addEventListener('focus', function () { marca(-1); });
      });
    }

    // El volante: además de mecerse solo, se agita cuando el ratón pasa cerca, como si soplara aire
    var volant = $('[data-volant]', hero);
    if (volant && !quieto && window.matchMedia && matchMedia('(hover: hover)').matches) {
      var fs = $$('i', volant), N = fs.length, vel = new Float32Array(N), ang = new Float32Array(N), px = null, bufant = false;
      var bufa = function () {
        var viu = false;
        for (var i = 0; i < N; i++) {
          vel[i] = (vel[i] - ang[i] * .06) * .9;
          ang[i] = Math.max(-22, Math.min(22, ang[i] + vel[i]));
          if (Math.abs(ang[i]) > .04 || Math.abs(vel[i]) > .04) viu = true;
          fs[i].style.rotate = ang[i].toFixed(2) + 'deg';
        }
        if (viu) requestAnimationFrame(bufa);
        else { bufant = false; for (var j = 0; j < N; j++) { ang[j] = 0; vel[j] = 0; fs[j].style.rotate = ''; } }
      };
      hero.addEventListener('pointermove', function (e) {
        if (e.pointerType && e.pointerType !== 'mouse') return;
        var dx = px === null ? 0 : e.clientX - px; px = e.clientX;
        if (!dx) return;
        // Las ondas miden 48 px y el volante sigue más allá del borde: se toma la posición real de la primera
        var rc = fs[0].getBoundingClientRect();
        var dy = Math.abs(e.clientY - (rc.top + rc.height / 2));
        if (dy > 240) return;
        var forca = Math.max(-1, Math.min(1, dx / 24)) * (1 - dy / 240), w = rc.width;
        for (var i = 0; i < N; i++) {
          var dd = Math.abs(rc.left + (i + .5) * w - e.clientX);
          if (dd < 220) vel[i] -= forca * (1 - dd / 220) * 3;
        }
        if (!bufant) { bufant = true; requestAnimationFrame(bufa); }
      });
      hero.addEventListener('pointerleave', function () { px = null; });
    }
  })();

  /* ================= 2 · Plazas: ninguna elegida de inicio; la del cursor enciende sus ventanas ================= */
  (function () {
    var facana = $('[data-finestres]'); if (!facana) return;
    var botons = $$('[data-tipus] .tipus__boto'), pista = $('[data-tipus-pista]');
    var triat = null;
    function grup() { return triat ? triat.getAttribute('data-grup') : 'tots'; }
    function tria(b, obre) {
      if (obre === undefined) obre = b.getAttribute('aria-expanded') !== 'true';
      botons.forEach(function (x) {
        var si = x === b && obre;
        x.setAttribute('aria-expanded', String(si));
        var p = d.getElementById(x.getAttribute('aria-controls'));
        p.hidden = !si;
        if (si) reinicia(p, 'entra');
      });
      triat = obre ? b : null;
      if (pista) pista.hidden = !!triat;
      facana.setAttribute('data-grup-actiu', grup());
    }
    botons.forEach(function (b) {
      b.addEventListener('click', function () { tria(b); });
      b.addEventListener('pointerenter', function () { facana.setAttribute('data-grup-actiu', b.getAttribute('data-grup')); });
      b.addEventListener('pointerleave', function () { facana.setAttribute('data-grup-actiu', grup()); });
    });
    // Pulsar una ventana abre su tipo de plaza
    $$('.finestra', facana).forEach(function (f) {
      f.addEventListener('click', function () {
        var b = botons.filter(function (x) { return x.getAttribute('data-grup') === f.getAttribute('data-g'); })[0];
        if (b) tria(b, true);
      });
    });

    // Se encienden al llegar; luego, de vez en cuando, alguien apaga y vuelve a encender una luz
    if (quieto) { facana.classList.add('visto', 'encesa', 'llesta'); return; }
    var finestres = $$('.finestra', facana);
    quanEsVegi(facana, function () {
      facana.classList.add('visto');
      setTimeout(function () { facana.classList.add('encesa'); }, 900);
      setTimeout(function () { facana.classList.add('llesta'); }, 900 + 25 * 55 + 600);
    }, 0.25);
    rellotge(facana, 1700, function () {
      if (!facana.classList.contains('llesta')) return;
      var g = facana.getAttribute('data-grup-actiu');
      var del = finestres.filter(function (f) { return g === 'tots' || f.getAttribute('data-g') === g; });
      var f = del[Math.floor(Math.random() * del.length)];
      f.classList.add('apagada');
      setTimeout(function () { f.classList.remove('apagada'); }, 650);
    });
  })();

  /* ================= 3 · Equipo: la frase nombra cada oficio; los servicios hacen su gesto ================= */
  (function () {
    var bloc = $('[data-equip]'); if (!bloc) return;
    var OFICIS = {
      metge: ['i-metge', 'Metge', 'Segueix la salut de cada resident, la medicació i els controls.', 'Médico', 'Sigue la salud de cada residente, la medicación y los controles.'],
      infermeria: ['i-infermeria', 'Infermeria', 'Cures, medicació i controls, cada dia.', 'Enfermería', 'Curas, medicación y controles, cada día.'],
      gerocultores: ['i-gerocultora', 'Gerocultores', 'Acompanyen el dia a dia: llevar-se, la higiene, els àpats, el descans.', 'Gerocultoras', 'Acompañan el día a día: levantarse, la higiene, las comidas, el descanso.'],
      fisio: ['i-fisio', 'Fisioterapeuta', 'Exercici i rehabilitació per mantenir la mobilitat i prevenir caigudes.', 'Fisioterapeuta', 'Ejercicio y rehabilitación para mantener la movilidad y prevenir caídas.'],
      psico: ['i-psico', 'Psicòleg', 'Acompanyament emocional i estimulació de la memòria.', 'Psicólogo', 'Acompañamiento emocional y estimulación de la memoria.'],
      to: ['i-to', 'Terapeuta ocupacional', "Ajuda a mantenir l'autonomia en les coses de cada dia.", 'Terapeuta ocupacional', 'Ayuda a mantener la autonomía en las cosas de cada día.'],
      social: ['i-social', 'Treballador social', 'Orienta les famílies en tràmits, ajudes i la plaça col·laboradora.', 'Trabajador social', 'Orienta a las familias en trámites, ayudas y la plaza colaboradora.'],
      animador: ['i-animador', 'Animador sociocultural', 'Prepara els tallers, les festes i les sortides.', 'Animador sociocultural', 'Prepara los talleres, las fiestas y las salidas.']
    };
    var ORDRE = Object.keys(OFICIS);
    var dins = $('[data-fitxa-dins]'), icona = $('use', dins), rol = $('[data-fitxa-rol]'), que = $('[data-fitxa-que]'), barra = $('[data-fitxa-barra]');
    // Un oficio cada 5,2 s: el marcador se dibuja despacio, sin saltos
    var actual = null, MS = 5200;
    function mostra(clau, anima) {
      actual = clau;
      var o = OFICIS[clau], es = SM.idioma === 'es';
      icona.setAttribute('href', '#' + o[0]);
      rol.textContent = es ? o[3] : o[1];
      que.textContent = es ? o[4] : o[2];
      $$('.ofici', bloc).forEach(function (b) { var si = b.getAttribute('data-ofici') === clau; b.classList.toggle('actiu', si); b.setAttribute('aria-pressed', String(si)); });
      if (anima && !quieto) reinicia(dins, 'canvi');
      if (!quieto) { barra.style.setProperty('--durada', MS + 'ms'); reinicia(barra, 'corre'); }
    }
    var r = rellotge(bloc, MS, function () { mostra(ORDRE[(ORDRE.indexOf(actual) + 1) % ORDRE.length], true); });
    bloc.addEventListener('click', function (e) {
      var b = e.target.closest('.ofici'); if (!b) return;
      mostra(b.getAttribute('data-ofici'), true);
      r.atura(true); barra.classList.remove('corre');
      clearTimeout(bloc._t); bloc._t = setTimeout(function () { r.atura(false); }, 9000);
    });
    bloc.addEventListener('pointerover', function (e) {
      var b = e.target.closest('.ofici'); if (!b || b.getAttribute('data-ofici') === actual) return;
      mostra(b.getAttribute('data-ofici'), true); r.atura(true); barra.classList.remove('corre');
    });
    bloc.addEventListener('pointerleave', function () { r.atura(false); if (!quieto && actual) reinicia(barra, 'corre'); });
    SM.alCanviarIdioma.push(function () { if (actual) mostra(actual, false); });
    if (quieto) mostra('metge', false);
    else quanEsVegi(bloc, function () { if (!actual) setTimeout(function () { mostra('metge', true); }, 500); }, 0.3);

    // Servicios: al llegar, cada uno hace su gesto una vez (en el móvil no hay cursor que los despierte)
    var serveis = $('[data-serveis]');
    if (serveis && !quieto) {
      quanEsVegi(serveis, function () {
        $$('.servei', serveis).forEach(function (li, k) {
          setTimeout(function () { li.classList.add('mostra'); setTimeout(function () { li.classList.remove('mostra'); }, 1600); }, 500 + k * 700);
        });
      }, 0.8);
    }
  })();

  /* ================= 4 · La casa: la persiana gira sus lamas y pasa a la estancia siguiente ================= */
  (function () {
    var pers = $('[data-persiana]'); if (!pers) return;
    var esc = $('[data-escenari]', pers), lames = $('[data-lames]', pers), text = $('[data-persiana-text]', pers);
    var escenes = $$('[data-escena]', esc), n = escenes.length, actual = 0, ocupat = false;
    var botons = $$('[data-estanca]');
    var TEXTOS = [
      ['El jardí, amb pèrgola i ombra.', 'El jardín, con pérgola y sombra.'],
      ['Habitacions exteriors, que cadascú fa seva.', 'Habitaciones exteriores, que cada uno hace suya.'],
      ['Habitació doble, àmplia i exterior.', 'Habitación doble, amplia y exterior.'],
      ['Racons assolellats per seure i xerrar.', 'Rincones soleados para sentarse y charlar.'],
      ['Passadissos amplis, amb passamans.', 'Pasillos amplios, con pasamanos.'],
      ['Banys assistits, amb cadira de dutxa.', 'Baños asistidos, con silla de ducha.']
    ];
    var LAMES = 9, PAS = 60, GIR = 1000;
    function escriu(anima) {
      text.innerHTML = '';
      ['ca', 'es'].forEach(function (l, j) { var s = d.createElement('span'); s.lang = l; s.textContent = TEXTOS[actual][j]; text.appendChild(s); });
      if (anima && !quieto) reinicia(text, 'canvi');
    }
    function marca(k) {
      escenes.forEach(function (e, i) { e.classList.toggle('actual', i === k); e.setAttribute('aria-hidden', String(i !== k)); });
    }
    // Copia de una escena para la cara de una lama: la misma foto ya cargada, sin atributos que dupliquen
    function copia(e) {
      var c = e.cloneNode(true), img = $('img', c), orig = $('img', e);
      c.removeAttribute('data-escena'); c.removeAttribute('aria-hidden'); c.classList.add('actual');
      ['data-foto', 'srcset', 'sizes', 'loading', 'data-alt-es', 'data-ca-alt'].forEach(function (a) { img.removeAttribute(a); });
      img.src = orig.currentSrc || orig.src; img.alt = ''; img.decoding = 'sync';
      return c;
    }
    function gira(nou, enrere) {
      var n2 = innerWidth < 600 ? 7 : LAMES, alt = esc.clientHeight, h = alt / n2;
      esc.style.setProperty('--h', h + 'px');
      esc.style.setProperty('--alt', alt + 'px');
      lames.innerHTML = '';
      var davant = escenes[actual], darrere = escenes[nou];
      for (var i = 0; i < n2; i++) {
        var l = d.createElement('div'); l.className = 'lama';
        l.style.setProperty('--i', i); l.style.setProperty('--o', enrere ? n2 - 1 - i : i);
        var c1 = d.createElement('div'); c1.className = 'lama__cara'; c1.appendChild(copia(davant));
        var c2 = d.createElement('div'); c2.className = 'lama__cara lama__cara--dors'; c2.appendChild(copia(darrere));
        l.appendChild(c1); l.appendChild(c2); lames.appendChild(l);
      }
      lames.classList.remove('gira', 'gira-enrere');
      lames.hidden = false;
      void lames.offsetWidth;
      marca(-1);                       // detrás de las lamas, solo la persiana verde
      actual = nou; escriu(true);
      requestAnimationFrame(function () { requestAnimationFrame(function () { lames.classList.add(enrere ? 'gira-enrere' : 'gira'); }); });
      setTimeout(function () {
        marca(actual);
        lames.hidden = true; lames.classList.remove('gira', 'gira-enrere'); lames.innerHTML = '';
        ocupat = false;
      }, GIR + (n2 - 1) * PAS + 120);
    }
    function va(nou, enrere) {
      nou = (nou + n) % n;
      if (ocupat || nou === actual) return;
      if (quieto) { actual = nou; marca(actual); escriu(false); return; }
      ocupat = true;
      var img = $('img', escenes[nou]);
      img.loading = 'eager';
      var llesta = img.complete && img.naturalWidth ? Promise.resolve() : new Promise(function (ok) {
        img.addEventListener('load', ok, { once: true }); img.addEventListener('error', ok, { once: true }); setTimeout(ok, 2500);
      });
      llesta.then(function () { return img.decode ? img.decode().catch(function () {}) : null; }).then(function () { gira(nou, enrere); });
    }
    var r = rellotge(pers, 5200, function () { va(actual + 1); });
    // Las fotos se piden antes de llegar, para que la persiana no espere
    SM.enPantalla(pers, function (si) { if (si) escenes.forEach(function (e) { $('img', e).loading = 'eager'; }); });
    $('[data-persiana-seg]', pers).addEventListener('click', function () { va(actual + 1); r.reinicia(); });
    $('[data-persiana-ant]', pers).addEventListener('click', function () { va(actual - 1, true); r.reinicia(); });
    esc.addEventListener('click', function () { va(actual + 1); r.reinicia(); });
    botons.forEach(function (b) {
      b.addEventListener('click', function () { var i = +b.getAttribute('data-estanca'); va(i, i < actual); r.reinicia(); });
    });
    esc.addEventListener('pointerenter', function () { r.atura(true); });
    esc.addEventListener('pointerleave', function () { r.atura(false); });
    // Deslizar con el dedo
    var x0 = null;
    esc.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    esc.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { e.stopPropagation(); esc._llisca = true; va(dx < 0 ? actual + 1 : actual - 1, dx > 0); r.reinicia(); }
    });
    esc.addEventListener('click', function (e) { if (esc._llisca) { esc._llisca = false; e.stopImmediatePropagation(); } }, true);
    SM.observa(pers);
    marca(0);
  })();

  /* ================= 5 · Exposición: luces de cuadro y visor ================= */
  (function () {
    var expo = $('[data-expo]'); if (!expo) return;
    var obres = $$('.obra', expo), i = 0;
    if (quieto) { expo.classList.add('visto', 'encesa'); }
    else {
      var io = new IntersectionObserver(function (es) {
        if (!es[0].isIntersecting) return;
        io.disconnect(); expo.classList.add('visto');
        setTimeout(function () { expo.classList.add('encesa'); }, 700);
      }, { threshold: 0.2 });
      io.observe(expo);
      rellotge(expo, 2600, function () {
        if (!expo.classList.contains('encesa')) return;
        obres.forEach(function (o, k) { o.classList.toggle('destacada', k === i); });
        i = (i + 1) % obres.length;
      });
      expo.addEventListener('pointerover', function () { obres.forEach(function (o) { o.classList.remove('destacada'); }); });
    }

    // Visor sin rebote: precarga la siguiente y funde corto
    var visor = $('[data-visor]'), vImg = $('[data-visor-img]'), vPeu = $('[data-visor-peu]');
    if (!visor || !visor.showModal) return;
    var botons = $$('[data-obra]'), iv = 0;
    function gran(img) {
      var s = (img.getAttribute('srcset') || '').split(',').map(function (x) { return x.trim().split(/\s+/); });
      s.sort(function (a, b) { return parseInt(b[1], 10) - parseInt(a[1], 10); });
      return s.length ? s[0][0] : img.src;
    }
    function peu(b) {
      var c = b.closest('.obra').querySelector('.cartela'), l = SM.idioma;
      var t = c.querySelector('strong [lang="' + l + '"]'), m = c.querySelector(':scope > [lang="' + l + '"]');
      return (t ? t.textContent : '') + (m ? '. ' + m.textContent : '');
    }
    function mostra(k) {
      iv = (k + botons.length) % botons.length;
      var b = botons[iv], img = $('img', b), src = gran(img);
      var nova = new Image(); nova.src = src;
      vImg.classList.add('carrega');
      (nova.decode ? nova.decode() : Promise.resolve()).catch(function () {}).then(function () {
        vImg.src = src; vImg.alt = img.alt; vImg.classList.remove('carrega');
        var seg = new Image(); seg.src = gran($('img', botons[(iv + 1) % botons.length]));
      });
      vPeu.textContent = peu(b);
      if (!visor.open) visor.showModal();
    }
    botons.forEach(function (b, k) { b.addEventListener('click', function () { mostra(k); }); });
    $('[data-visor-tanca]').addEventListener('click', function () { visor.close(); });
    $('[data-visor-ant]').addEventListener('click', function () { mostra(iv - 1); });
    $('[data-visor-seg]').addEventListener('click', function () { mostra(iv + 1); });
    visor.addEventListener('click', function (e) { if (e.target === visor) visor.close(); });
    visor.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') mostra(iv + 1);
      if (e.key === 'ArrowLeft') mostra(iv - 1);
    });
  })();

  /* ================= 6 · Calendario de fiestas ================= */
  (function () {
    var cal = $('[data-calendari]'); if (!cal) return;
    var FESTES = [
      { m: 0, d: 6, ca: ['Gener', 'Reis', "La nit més il·lusionant de l'any."], es: ['Enero', 'Reyes', 'La noche más ilusionante del año.'] },
      { m: 3, d: 23, ca: ['Abril', 'Sant Jordi', 'Roses fetes al taller.'], es: ['Abril', 'Sant Jordi', 'Rosas hechas en el taller.'] },
      { m: 5, d: 23, ca: ['Juny', 'Sant Joan', "La revetlla de l'estiu."], es: ['Junio', 'Sant Joan', 'La verbena del verano.'] },
      { m: 8, d: 24, ca: ['Setembre', 'La Mercè', 'La festa major de Barcelona.'], es: ['Septiembre', 'La Mercè', 'La fiesta mayor de Barcelona.'] },
      { m: 9, d: 31, ca: ['Octubre', 'La Castanyada', 'Castanyes i panellets.'], es: ['Octubre', 'La Castanyada', 'Castañas y panellets.'] },
      { m: 11, d: 25, ca: ['Desembre', 'Nadal', 'Concert, ball i el Pare Noel.'], es: ['Diciembre', 'Navidad', 'Concierto, baile y Papá Noel.'] }
    ];
    var caixa = $('[data-fulls]', cal), ara = $('[data-ara]');
    // Hoy en Barcelona (?avui=2026-12-20 lo fija para probar)
    var q = location.search.match(/[?&]avui=(\d{4})-(\d{2})-(\d{2})/);
    var avui;
    if (q) avui = new Date(+q[1], +q[2] - 1, +q[3]);
    else {
      try {
        var p = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date()).split('-');
        avui = new Date(+p[0], +p[1] - 1, +p[2]);
      } catch (e) { avui = new Date(); avui.setHours(0, 0, 0, 0); }
    }
    var propera = 0, dies = 0;
    for (var k = 0; k < FESTES.length * 2; k++) {
      var f = FESTES[k % FESTES.length], any = avui.getFullYear() + (k >= FESTES.length ? 1 : 0);
      var data = new Date(any, f.m, f.d);
      if (data >= avui) { propera = k % FESTES.length; dies = Math.round((data - avui) / 864e5); break; }
    }
    var fulls = FESTES.map(function (f) {
      var a = d.createElement('article');
      a.className = 'full';
      a.innerHTML = '<p class="full__mes"></p><p class="full__dia">' + f.d + '</p><h3 class="full__festa"></h3><p class="full__que"></p>';
      caixa.appendChild(a);
      return a;
    });
    var actual = propera, ocupat = false;
    function textos() {
      var l = SM.idioma;
      fulls.forEach(function (a, i) {
        var t = FESTES[i][l];
        a.querySelector('.full__mes').textContent = t[0];
        a.querySelector('.full__festa').textContent = t[1];
        a.querySelector('.full__que').textContent = t[2];
        a.setAttribute('aria-label', FESTES[i].d + ' ' + t[0] + ': ' + t[1]);
      });
      var nom = FESTES[propera][l][1];
      var nomCa = /^(La|Les|El|Els) /.test(nom) ? nom.charAt(0).toLowerCase() + nom.slice(1) : nom;
      var frase = l === 'es'
        ? (dies === 0 ? 'Hoy: ' : dies === 1 ? 'Mañana: ' : 'Dentro de ' + dies + ' días: ') + nomCa
        : (dies === 0 ? 'Avui: ' : dies === 1 ? 'Demà: ' : "D'aquí a " + dies + ' dies: ') + nomCa;
      ara.textContent = frase;
      ara.hidden = false;
    }
    function estat() {
      fulls.forEach(function (a, i) {
        a.classList.toggle('actual', i === actual);
        a.classList.toggle('seguent', i === (actual + 1) % fulls.length);
        a.style.visibility = (i === actual || i === (actual + 1) % fulls.length) ? '' : 'hidden';
        a.setAttribute('aria-hidden', String(i !== actual));
      });
    }
    function endavant() {
      if (ocupat) return;
      if (quieto) { actual = (actual + 1) % fulls.length; estat(); return; }
      ocupat = true;
      var vell = fulls[actual];
      vell.classList.add('gira');
      actual = (actual + 1) % fulls.length;
      fulls[(actual + 1) % fulls.length].style.visibility = '';
      fulls[actual].classList.add('actual');
      setTimeout(function () { vell.classList.remove('gira'); estat(); ocupat = false; }, 1000);
    }
    function enrere() {
      if (ocupat) return;
      var nou = (actual - 1 + fulls.length) % fulls.length;
      if (quieto) { actual = nou; estat(); return; }
      ocupat = true;
      var a = fulls[nou];
      a.style.visibility = '';
      a.classList.add('torna');
      setTimeout(function () { a.classList.remove('torna'); actual = nou; estat(); ocupat = false; }, 1000);
    }
    var r = rellotge(cal, 3800, endavant);
    $('[data-full-seg]', cal).addEventListener('click', function () { endavant(); r.reinicia(); });
    $('[data-full-ant]', cal).addEventListener('click', function () { enrere(); r.reinicia(); });
    cal.addEventListener('pointerenter', function () { r.atura(true); });
    cal.addEventListener('pointerleave', function () { r.atura(false); });
    SM.alCanviarIdioma.push(textos);
    textos(); estat();
  })();

  /* ================= 7 · Mapa: los pasos empiezan a andar al verlo ================= */
  (function () { var m = $('[data-mapa]'); if (m) SM.observa(m); })();


  /* ================= 8 · Visita: el correo se escribe mientras se elige ================= */
  (function () {
    var form = $('[data-form]'); if (!form) return;
    var cos = $('[data-carta-cos]'), err = $('[data-form-error]');
    var EMAIL = 'residencia_sant_miquel@hotmail.com';
    var T = {
      ca: { qui: { mare: ['per a ', 'la meva mare'], pare: ['per al ', 'meu pare'], parella: ['per a ', 'la meva parella'], altra: ['per a ', 'un familiar'] },
            placa: { col: "M'interessa una plaça col·laboradora.", priv: "M'interessa una plaça privada.", nose: 'Encara no sé quin tipus de plaça ens convé.' },
            quan: { mati: 'al matí', tarda: 'a la tarda' } },
      es: { qui: { mare: ['para ', 'mi madre'], pare: ['para ', 'mi padre'], parella: ['para ', 'mi pareja'], altra: ['para ', 'un familiar'] },
            placa: { col: 'Me interesa una plaza colaboradora.', priv: 'Me interesa una plaza privada.', nose: 'Aún no sé qué tipo de plaza nos conviene.' },
            quan: { mati: 'por la mañana', tarda: 'por la tarde' } }
    };
    function valors() {
      var f = new FormData(form);
      return { qui: f.get('qui'), placa: f.get('placa'), quan: f.get('quan'), nom: String(f.get('nom') || '').trim(), tel: String(f.get('tel') || '').trim() };
    }
    // Nada marcado de inicio: la carta se lee completa igualmente y cada elección se subraya al llegar
    function trossos(v, l) {
      var t = T[l], buit = '…', qui = t.qui[v.qui || 'altra'], es = l === 'es';
      var out = [[(es ? 'Hola, Sra. Ana y Sra. Alba: me gustaría visitar la residencia ' : 'Hola, Sra. Ana i Sra. Alba: voldria visitar la residència ') + qui[0]], [qui[1], 'qui'], ['.']];
      if (v.placa) out.push([' '], [t.placa[v.placa], 'placa']);
      if (v.quan) out.push([es ? ' Me va bien ir ' : ' Em va bé venir '], [t.quan[v.quan], 'quan'], ['.']);
      out.push([es ? ' Me llamo ' : ' Em dic '], [v.nom || buit, 'nom'], [es ? ' y mi teléfono es ' : ' i el meu telèfon és '], [v.tel || buit, 'tel'], [es ? '. Gracias.' : '. Gràcies.']);
      return out;
    }
    var anterior = {}, iniciat = false;
    function pinta() {
      var v = valors(), l = SM.idioma;
      cos.textContent = '';
      trossos(v, l).forEach(function (tr) {
        if (!tr[1]) { cos.appendChild(d.createTextNode(tr[0])); return; }
        var m = d.createElement('mark');
        m.textContent = tr[0];
        if (iniciat && anterior[tr[1]] !== tr[0]) m.className = 'nou';
        anterior[tr[1]] = tr[0];
        cos.appendChild(m);
      });
    }
    form.addEventListener('input', function () { pinta(); if (!err.hidden && err.dataset.tipus === 'error') valida(); });
    form.addEventListener('change', pinta);
    SM.alCanviarIdioma.push(function () {
      anterior = {}; iniciat = false; pinta(); iniciat = true;
      if (err.dataset.tipus === 'error') valida();
      else if (err.dataset.tipus === 'enviat') err.textContent = SM.t("S'obre el vostre correu amb el missatge. Si no s'obre, truqueu al 934 170 582.", 'Se abre su correo con el mensaje. Si no se abre, llame al 934 170 582.');
    });
    function valida() {
      var v = valors(), mal = [];
      var nom = form.elements.nom, tel = form.elements.tel;
      nom.setAttribute('aria-invalid', String(!v.nom)); if (!v.nom) mal.push(nom);
      var ok = (v.tel.match(/\d/g) || []).length >= 9;
      tel.setAttribute('aria-invalid', String(!ok)); if (!ok) mal.push(tel);
      if (mal.length) {
        err.textContent = SM.t('Escriviu el vostre nom i un telèfon de 9 xifres per poder trucar-vos.', 'Escriba su nombre y un teléfono de 9 cifras para poder llamarle.');
        err.hidden = false; err.dataset.tipus = 'error'; err.style.color = '';
      } else { err.hidden = true; err.dataset.tipus = ''; }
      return mal;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var mal = valida();
      if (mal.length) { mal[0].focus(); return; }
      var v = valors(), l = SM.idioma;
      var text = trossos(v, l).map(function (t) { return t[0]; }).join('');
      var assumpte = (l === 'es' ? 'Visita a la residencia: ' : 'Visita a la residència: ') + v.nom;
      err.hidden = false; err.dataset.tipus = 'enviat';
      err.textContent = SM.t("S'obre el vostre correu amb el missatge. Si no s'obre, truqueu al 934 170 582.", 'Se abre su correo con el mensaje. Si no se abre, llame al 934 170 582.');
      err.style.color = 'var(--verd)';
      location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(assumpte) + '&body=' + encodeURIComponent(text);
    });
    pinta(); iniciat = true;
  })();

  window.SM = SM;
})();
