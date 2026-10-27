/* Sant Miquel Arcàngel — home: recorrido del jardín, 25 ventanas, equipo, la casa en una pila de fotos,
   exposición con luces, calendario de fiestas, mapa a pie y la visita que deja el correo escrito. */
(function () {
  'use strict';
  var d = document, SM = window.SM || { quieto: true, t: function (c) { return c; }, alCanviarIdioma: [], observa: function (e) { e.classList.add('visto'); }, enPantalla: function (e, f) { f(true); } };
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

  /* ================= 1 · Hero: los puntos recorren el jardín ================= */
  (function () {
    var fig = $('[data-punts]'); if (!fig) return;
    var punts = $$('[data-punt]', fig), i = 0;
    function marca(k) { punts.forEach(function (p, n) { p.classList.toggle('actiu', n === k); }); }
    var r = rellotge(fig, 2800, function () { marca(i); i = (i + 1) % punts.length; });
    if (!quieto) setTimeout(function () { marca(0); i = 1; }, 2600);
    fig.addEventListener('pointerenter', function () { marca(-1); r.atura(true); });
    fig.addEventListener('pointerleave', function () { r.atura(false); });
    punts.forEach(function (p) {
      p.addEventListener('click', function () { marca(punts.indexOf(p)); r.atura(true); setTimeout(function () { r.atura(false); }, 6000); });
      p.addEventListener('focus', function () { marca(-1); });
    });
  })();

  /* ================= 2 · Plazas: pestañas y ventanas ================= */
  (function () {
    var facana = $('[data-finestres]'); if (!facana) return;
    var tabs = $$('[data-tipus] [role="tab"]');
    var triada = tabs[0], tocada = false;   // hasta que alguien elige, las 25 encendidas
    function tria(tab, focus) {
      triada = tab; tocada = true;
      tabs.forEach(function (t) {
        var si = t === tab;
        t.setAttribute('aria-selected', String(si));
        t.tabIndex = si ? 0 : -1;
        var p = d.getElementById(t.getAttribute('aria-controls'));
        p.hidden = !si;
        if (si) reinicia(p, 'entra');
      });
      facana.setAttribute('data-grup-actiu', tab.getAttribute('data-grup'));
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, n) {
      t.addEventListener('click', function () { tria(t); });
      t.addEventListener('pointerenter', function () { facana.setAttribute('data-grup-actiu', t.getAttribute('data-grup')); });
      t.addEventListener('pointerleave', function () { facana.setAttribute('data-grup-actiu', tocada ? triada.getAttribute('data-grup') : 'tots'); });
      t.addEventListener('keydown', function (e) {
        var k = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (k) { e.preventDefault(); tria(tabs[(n + k + tabs.length) % tabs.length], true); }
      });
    });
    // Pulsar una ventana elige su tipo de plaza
    $$('.finestra', facana).forEach(function (f) {
      f.addEventListener('click', function () { tria(tabs.filter(function (t) { return t.getAttribute('data-grup') === f.getAttribute('data-g'); })[0]); });
    });

    // Se encienden al llegar; luego, de vez en cuando, alguien apaga y vuelve a encender una luz
    if (quieto) { facana.classList.add('visto', 'encesa', 'llesta'); return; }
    var finestres = $$('.finestra', facana);
    var io = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      facana.classList.add('visto');
      setTimeout(function () { facana.classList.add('encesa'); }, 900);
      setTimeout(function () { facana.classList.add('llesta'); }, 900 + 25 * 55 + 600);
    }, { threshold: 0.25 });
    io.observe(facana);
    rellotge(facana, 1700, function () {
      if (!facana.classList.contains('llesta')) return;
      var grup = facana.getAttribute('data-grup-actiu');
      var del = finestres.filter(function (f) { return grup === 'tots' || f.getAttribute('data-g') === grup; });
      var f = del[Math.floor(Math.random() * del.length)];
      f.classList.add('apagada');
      setTimeout(function () { f.classList.remove('apagada'); }, 650);
    });
  })();

  /* ================= 3 · Equipo: la frase nombra cada oficio ================= */
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
    var actual = 'metge', MS = 3600;
    function mostra(clau, anima) {
      actual = clau;
      var o = OFICIS[clau], es = SM.idioma === 'es';
      icona.setAttribute('href', '#' + o[0]);
      rol.textContent = es ? o[3] : o[1];
      que.textContent = es ? o[4] : o[2];
      $$('.ofici', bloc).forEach(function (b) { b.classList.toggle('actiu', b.getAttribute('data-ofici') === clau); b.setAttribute('aria-pressed', String(b.getAttribute('data-ofici') === clau)); });
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
    bloc.addEventListener('pointerleave', function () { r.atura(false); if (!quieto) reinicia(barra, 'corre'); });
    SM.alCanviarIdioma.push(function () { mostra(actual, false); });
    mostra('metge', false);
  })();

  /* ================= 4 · La casa: la pila de fotos ================= */
  (function () {
    var pila = $('[data-pila]'); if (!pila) return;
    var casa = pila.closest('.casa');
    var cartes = $$('[data-carta]', pila), n = cartes.length, actual = 0, ocupat = false;
    var botons = $$('[data-estanca]');
    var text = $('[data-pila-text]');
    var TEXTOS = [
      ['El jardí, amb pèrgola i ombra.', 'El jardín, con pérgola y sombra.'],
      ['Habitacions exteriors, que cadascú fa seva.', 'Habitaciones exteriores, que cada uno hace suya.'],
      ['Habitació doble, àmplia i exterior.', 'Habitación doble, amplia y exterior.'],
      ['Racons assolellats per seure i xerrar.', 'Rincones soleados para sentarse y charlar.'],
      ['Passadissos amplis, amb passamans.', 'Pasillos amplios, con pasamanos.'],
      ['Banys assistits, amb cadira de dutxa.', 'Baños asistidos, con silla de ducha.']
    ];
    function colloca() {
      cartes.forEach(function (c, i) {
        var k = (i - actual + n) % n;
        c.style.setProperty('--k', k);
        c.setAttribute('data-k', k);
        c.setAttribute('aria-hidden', String(k !== 0));
      });
      botons.forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-estanca') === actual)); });
      escriu(true);
      if (!quieto && casa.classList.contains('en-marxa')) reinicia(casa, 'en-marxa');
    }
    function escriu(anima) {
      text.innerHTML = '';
      ['ca', 'es'].forEach(function (l, j) {
        var s = d.createElement('span'); s.lang = l; s.textContent = TEXTOS[actual][j]; text.appendChild(s);
      });
      if (anima && !quieto) reinicia(text, 'canvi');
    }
    function va(nou, enrere) {
      if (ocupat || nou === actual) return;
      nou = (nou + n) % n;
      if (quieto) { actual = nou; colloca(); return; }
      ocupat = true;
      if (!enrere) {
        var surt = cartes[actual];
        surt.classList.add('surt');
        actual = nou;
        setTimeout(function () {
          surt.classList.add('torna'); surt.classList.remove('surt');
          colloca();
          void surt.offsetWidth; surt.classList.remove('torna');
          ocupat = false;
        }, 520);
        // las de detrás avanzan ya
        cartes.forEach(function (c, i) { if (c !== surt) { var k = (i - nou + n) % n; c.style.setProperty('--k', k); c.setAttribute('data-k', k); } });
        botons.forEach(function (b) { b.setAttribute('aria-pressed', String(+b.getAttribute('data-estanca') === nou)); });
        escriu(true);
      } else {
        var entra = cartes[nou];
        entra.classList.add('torna', 'surt');
        void entra.offsetWidth;
        entra.classList.remove('torna');
        actual = nou;
        requestAnimationFrame(function () { entra.classList.remove('surt'); colloca(); setTimeout(function () { ocupat = false; }, 500); });
      }
    }
    var r = rellotge(pila, 4600, function () { va(actual + 1); });
    SM.enPantalla(pila, function (si) { if (si && !quieto) casa.classList.add('en-marxa'); });
    $('[data-pila-seg]', pila).addEventListener('click', function () { va(actual + 1); r.reinicia(); });
    $('[data-pila-ant]', pila).addEventListener('click', function () { va(actual - 1, true); r.reinicia(); });
    $('[data-pila-cartes]', pila).addEventListener('click', function () { va(actual + 1); r.reinicia(); });
    botons.forEach(function (b) {
      b.addEventListener('click', function () { var i = +b.getAttribute('data-estanca'); va(i, i < actual); r.reinicia(); });
    });
    var zona = $('[data-pila-cartes]', pila);
    zona.addEventListener('pointerenter', function () { r.atura(true); casa.classList.remove('en-marxa'); });
    zona.addEventListener('pointerleave', function () { r.atura(false); if (!quieto) reinicia(casa, 'en-marxa'); });
    // Deslizar con el dedo
    var x0 = null;
    zona.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    zona.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) { e.stopPropagation(); va(dx < 0 ? actual + 1 : actual - 1, dx > 0); r.reinicia(); }
    });
    SM.observa(pila);
    colloca();
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
    function trossos(v, l) {
      var t = T[l], buit = '…';
      return l === 'es'
        ? [['Hola, Sra. Ana y Sra. Alba: me gustaría visitar la residencia ' + t.qui[v.qui][0]], [t.qui[v.qui][1], 'qui'], ['. '], [t.placa[v.placa], 'placa'], [' Me va bien ir '], [t.quan[v.quan], 'quan'], ['. Me llamo '], [v.nom || buit, 'nom'], [' y mi teléfono es '], [v.tel || buit, 'tel'], ['. Gracias.']]
        : [['Hola, Sra. Ana i Sra. Alba: voldria visitar la residència ' + t.qui[v.qui][0]], [t.qui[v.qui][1], 'qui'], ['. '], [t.placa[v.placa], 'placa'], [' Em va bé venir '], [t.quan[v.quan], 'quan'], ['. Em dic '], [v.nom || buit, 'nom'], [' i el meu telèfon és '], [v.tel || buit, 'tel'], ['. Gràcies.']];
    }
    var anterior = {};
    function pinta() {
      var v = valors(), l = SM.idioma;
      cos.textContent = '';
      trossos(v, l).forEach(function (tr) {
        if (!tr[1]) { cos.appendChild(d.createTextNode(tr[0])); return; }
        var m = d.createElement('mark');
        m.textContent = tr[0];
        if (anterior[tr[1]] !== undefined && anterior[tr[1]] !== tr[0]) m.className = 'nou';
        anterior[tr[1]] = tr[0];
        cos.appendChild(m);
      });
    }
    form.addEventListener('input', function () { pinta(); if (!err.hidden && err.dataset.tipus === 'error') valida(); });
    form.addEventListener('change', pinta);
    SM.alCanviarIdioma.push(function () {
      anterior = {}; pinta();
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
    pinta();
  })();

  window.SM = SM;
})();
