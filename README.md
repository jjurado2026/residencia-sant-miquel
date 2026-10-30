# Residència Sant Miquel Arcàngel — Propuesta de nueva web (página única)

Prototipo de web en una sola página para la **Residència d'avis Sant Miquel Arcàngel** ([residenciasantmiquel.net](https://www.residenciasantmiquel.net/)), residencia de mayores con 18 plazas colaboradoras con la Generalitat y 7 privadas, en C/ d'Escipió 17 (Torre), El Putxet (Barcelona).

**Prototipo:** https://jjurado2026.github.io/residencia-sant-miquel/

**Una remaquetación (rondas 5 y 6):** sus textos, sus 38 fotos y su identidad, ordenados de nuevo. Nada inventado: los títulos, las frases, las listas de servicios, profesionales, talleres y actividades y los datos de contacto son los de su web, tal cual. **Solo en catalán, de momento** (la versión con castellano está en la etiqueta `r5-bilingue`). Su `title`, su meta descripción, su H1 y su favicon, literales.

**El problema que resuelve:** su web es un Jimdo de 2010: texto de 12 px en cursiva, ningún teléfono que se pueda pulsar, el correo escondido, fotos de 150 px y cinco páginas para muy poco contenido. En el móvil el título se corta y el aviso de cookies tapa el 74 % de la pantalla.

## Qué hacen las demás
Antes de maquetar se capturaron las homes de seis residencias (Sanitas Mayores, Colisée, Ballesol, Amavir, DomusVi, emeis). Lo que comparten: títulos de sección centrados, servicios y profesionales en rejillas iguales, cifras destacadas, contacto en dos columnas simétricas, banda de llamada a la acción. La propuesta toma ese orden y da un paso más con piezas propias: el contador de sus plazas, los oficios en órbita alrededor de su frase, la casa que gira como un cubo y las filas de fotos simétricas.

## Dirección estética
**Los colores de su web**: el carbón rayado de su fondo, el taupe de su caja de contenido, el rosa de la banda de su pie y las **flores de cerezo** de su cabecera, que ahora acompañan toda la página. Los fondos claros van del pétalo al rosa y al melocotón en un solo lavado, sin cortes; encima, un papel pintado de flores muy tenue y sus ramas en las esquinas, siempre una a cada lado. Titulares en **Zodiak**, serif contemporánea; texto en **Commissioner**, sans moderna y legible, a 19 px. Todo en el eje: cada sección con su título centrado y un adorno simétrico debajo; columnas del mismo ancho; filas de fotos que se reflejan.

- **Color:** carbón `#2A2624` · rosa `#B48797` / `#8E5F71` · flor `#E8B9C6` · pétalo `#FDF2F1` / `#FBE7E6` · rosa `#F6D6D8` · melocotón `#FCEBE0`.
- **Flores:** dibujadas a partir de las suyas (pétalo pálido con el corazón magenta, ramitas en zigzag), en SVG, en `assets/img/flors/` (generadas con `_interno/herramientas/flors.py`). También en el adorno bajo los títulos.
- **Botones «de marco»:** trazo fino y, desplazado unos píxeles, un segundo marco rosa, como el paspartú de un cuadro. Bajo el cursor el marco encaja en su sitio, el botón se rellena de rosa pálido y el icono hace su gesto (la flecha avanza, el teléfono suena). En reposo, ninguno relleno. El botón nunca se mueve bajo el cursor.
- **Sin efecto «cortina»**, sin parallax, sin escalones.

## La página, de arriba abajo
1. **Cabecera fija** con el menú a las secciones (Inici · Instal·lacions i serveis · Tallers i activitats · Fotos de Nadal · Contacte, sus mismas páginas), que subraya la sección que se está leyendo; «Text gran» y teléfono. En móvil, menú a pantalla completa y barra fija Trucar · Correu · Contacte.
2. **Inici:** su H1 «RESIDENCIA SAN MIGUEL ARCÁNGEL», «Benvinguts!» y su texto de bienvenida, en el eje, con la foto de su fachada enmarcada como un cuadro. Una rama de cerezo a cada lado: las flores se abren al cargar, la rama se mece y caen pétalos por los lados.
3. **Instal·lacions i serveis:** sus plazas en dos cifras, 18 y 7, que ruedan como un contador mecánico hasta pararse; su frase de las habitaciones; sus seis servicios en tarjetas iguales (ampli jardí, cuina pròpia, podologia, perruqueria, acompanyament, banys assistits).
4. **«La residència disposa de professionals»:** su frase en un círculo y los ocho oficios en órbita, cada uno con su pareja al otro lado; al llegar, salen del centro a su sitio y los radios crecen.
5. **«Disposem de totes les condicions de confort…»:** sus ocho fotos de instalaciones; de una estancia a otra, la sala gira como un cubo. Pasa sola, con las flechas, con las miniaturas o deslizando el dedo.
6. **Tallers i activitats:** su texto; sus siete talleres y sus tres actividades en dos cartas iguales; sus 18 fotos del taller en filas simétricas (apaisada · vertical · apaisada y al revés), con visor.
7. **Nadal:** sus 12 fotos de Navidad en filas simétricas, con visor.
8. **«Veniu a visitar-nos.»** (la frase de su bienvenida) con la Sra. Ana y la Sra. Alba, llamar o escribir.
9. **Contacte:** sus datos tal cual y el mapa de su calle (OpenStreetMap, con la boca de metro de Lesseps), en dos columnas iguales; debajo, un formulario que abre el correo con el mensaje escrito.

## Comprobado, no asumido
Con el kit del taller (Chrome headless por DevTools): **el hero cabe entero en 17 tamaños**, de 320×568 a 2560×1440, sin desbordamiento horizontal · las 39 fotos sin recortar a 1440 y a 390 px · **51 pruebas** con ratón, clics, teclado y dedo reales (SEO literal, nada inventado, solo catalán, flores en todas las secciones, ramas simétricas, eje común del hero, ningún botón encendido sin cursor, contador 18 y 7, órbita simétrica, cubo, miniaturas, filas simétricas, cartas iguales, visor, menú que marca la sección, columnas de contacto iguales, marcas del mapa, formulario, texto grande, movimiento reducido, móvil) · ningún botón «pillado» (23 casos) · cero errores de JavaScript · con `prefers-reduced-motion` nada se mueve y todo se ve · solo se animan `transform` y `opacity`.

## Validar con el cliente
- Plazas libres y precio de las privadas (su web no los da: la home invita a llamar).
- Horario de visitas, y si quieren dar un WhatsApp (hoy solo tienen fijo y correo).
- El nombre en tipografía hace de marca hasta que tengan logotipo; el favicon, el suyo (vacío).
- Los textos legales siguen en sus páginas aparte.

## Stack
HTML, CSS y JavaScript puro. Cero dependencias, cero build. Zodiak (licencia ITF de Fontshare) y Commissioner (OFL) autoalojadas. Mapa en SVG generado desde OpenStreetMap (`_interno/mapa/hacer_mapa.py`).

Parámetros útiles: `?ss` (sin animaciones, para capturas) · `?caducada` (simula la caducidad).

## Caducidad
**Enviada el 31-oct-2026** (el día de envío cuenta): la propuesta se ve hasta el **lunes 9 de noviembre de 2026 a las 23:59** (hora de Madrid). Desde el 10, `index.html` lleva a `caducada.html`: «No puedes ver esta página porque han pasado más de 10 días desde su envío. Si sigues con interés, escríbeme a jjuradogarciadelrio@gmail.com.» y la home entera en miniatura. La fecha está en el primer `<script>` de `index.html` (`Date.UTC(2026, 10, 9, 23, 0)`). En local no caduca; `?caducada` lo simula.

## Ver en local
```bash
cd prototype && python -m http.server 8000
```

## Publicar
```bash
git subtree push --prefix=prototype origin gh-pages
```

---
Diseño y desarrollo: **Juan Jurado** · [jjuradogarciadelrio.com](https://jjuradogarciadelrio.com)
