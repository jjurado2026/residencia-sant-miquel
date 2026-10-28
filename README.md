# Residència Sant Miquel Arcàngel — Propuesta de nueva web (página única)

Prototipo de web en una sola página para la **Residència d'avis Sant Miquel Arcàngel** ([residenciasantmiquel.net](https://www.residenciasantmiquel.net/)), residencia de mayores de **25 plazas (18 colaboradoras con la Generalitat y 7 privadas)** en una torre con jardín de C/ d'Escipió 17, El Putxet (Barcelona).

**Prototipo:** https://jjurado2026.github.io/residencia-sant-miquel/

**El problema que resuelve:** su web es un Jimdo de 2010 con plantilla de flores de cerezo, texto de 12 px en cursiva, ningún teléfono que se pueda pulsar, el correo escondido y fotos de 150 px. En el móvil el título se corta y el aviso de cookies tapa el 74 % de la pantalla. No responde a lo que pregunta una familia (plaza pública o privada, cuidados, visita, cómo llegar) y no aparece en los buscadores ni por su nombre.

**Una sola página:** su contenido no da para cinco páginas. Todo (sus textos y sus 38 fotos de talleres, instalaciones y Navidad) está en la home, y el menú baja a cada sección.

## Dirección estética
La casa tal como es por dentro: **el amarillo de su toldo y de sus paredes** (zócalo amarillo y parte alta crema, como en sus salas) y **el verde de su jardín**. Titulares grandes y elegantes; sus fotos, enteras y a su proporción, colgadas como cuadros en esa pared.

- **Color:** amarillo `#F2C12E` (toldo y zócalo `#FBF1CC`), verde jardín `#1D3B31` para texto y bandas.
- **Tipografía:** **Zodiak** (Indian Type Foundry), una serif contemporánea de contraste alto, para los titulares, y **Commissioner**, una sans moderna muy legible, para el texto. Texto a 20 px.
- **Botones:** en reposo todos iguales, blancos con trazo verde y nada marcado. Bajo el cursor, el amarillo nace en el icono y se extiende en círculo, y el icono hace su gesto (el teléfono suena, el calendario salta, el sobre se abre). El de llamar suena solo de vez en cuando. El botón nunca se mueve bajo el cursor: se animan sus hijos.
- **Sin efecto «cortina»** (ronda 3): ni toldo con volante en el hero, ni bordes ondulados, ni rellenos que bajan como una persiana.

## La página, de arriba abajo
1. **Cabecera fija** con el menú a las secciones (Places · L'equip · La casa · Tallers · Festes · Com arribar · Contacte), botón **«Text gran»**, botón de idioma y el teléfono. En móvil, menú a pantalla completa y barra fija Llamar · Correo · Cómo llegar.
2. **Hero:** «Una casa al Putxet amb **jardí**.» La palabra cambia con la foto de un carrusel en 3D que pasa solo (jardí · habitacions exteriors · pèrgola · tallers · festes); las fotos cuelgan en la pared de dos tonos de sus salas. Llamar, pedir visita, la Sra. Ana o la Sra. Alba.
3. **Una casa pequeña: 25 plazas.** Título centrado, con «25 plazas» en su línea. La fachada de noche con 25 ventanas que se encienden; dos botones (ninguno abierto de inicio) explican la plaza colaboradora (con los tres pasos del grado de dependencia y el PIA) y la privada; el que está bajo el cursor enciende sus ventanas.
4. **Atención sanitaria y social, aquí mismo.** «El equipo de la casa: médico, enfermería, gerocultoras…»: cada oficio lleva un punteado fino y, al llegarle el turno o el cursor, un marcador amarillo que se dibuja despacio y explica qué hace. Podología, peluquería, acompañamiento y cocina propia hacen su gesto al pasar el cursor y, una vez, al llegar.
5. **La casa, por dentro.** Sus ocho fotos de instalaciones (jardín, pérgola, habitaciones, sala, pasillos, baño asistido y aseo), cada una colgada en la pared de sus salas; para pasar a la siguiente estancia, la sala gira como un cubo. Pasa sola, con las flechas, deslizando el dedo o eligiendo la estancia.
6. **Hecho en Sant Miquel.** Los talleres (dirigidos por profesionales) y sus obras colgadas como en una exposición, con lámparas de cuadro que se encienden; debajo, «En el taller, con las manos»: las doce fotos del taller en filas que respetan su proporción, con visor.
7. **Las fiestas, en casa.** Un calendario que pasa las hojas y cuenta los días que faltan para la siguiente fiesta; debajo, «Navidad en Sant Miquel»: sus doce fotos de Navidad en una tira que se desliza sola, con visor.
8. **A seis minutos a pie del metro de Lesseps.** Mapa con sus calles reales (OpenStreetMap) y la ruta a pie desde la boca de metro, en pisadas; la casa marcada con su icono; bus 131 en la puerta, V17/22/87 en la esquina, FGC Pàdua.
9. **Pida una visita.** Nada marcado de inicio; se elige para quién, qué plaza y cuándo, y la carta se escribe sola; el botón abre el correo ya escrito. Debajo, las preguntas de las familias.

## Fotos
Las 38 de su web, sin recortar ni retocar color: la fachada, 8 de instalaciones, 18 de talleres y 12 de la fiesta de Navidad. Las que se ven más grandes que su original se han ampliado con IA (Real-ESRGAN, mezcla x4plus y remacri) devolviéndoles el color exacto del original; las de personas y las que se ven a su tamaño, solo reescaladas.

## Comprobado, no asumido
Con el kit del taller (Chrome headless por DevTools): **el hero cabe entero en 17 tamaños**, de 320×568 a 2560×1440, en catalán y en castellano, también en móvil apaisado y descontando la barra fija · sin desbordamiento horizontal en ningún ancho · las 39 fotos a su proporción · 39 pruebas con ratón, clics y teclado reales (sin efecto cortina, menú a las secciones, nada amarillo sin el cursor, carrusel y palabra, idioma, texto grande, plazas, equipo, cubo, visor, galería, tira, calendario, formulario, menú del móvil) · ningún botón «pillado» con el cursor quieto (`_interno/herramientas/pillados.mjs`) · cero errores de JavaScript · con `prefers-reduced-motion` nada se mueve y todo se ve · solo se animan `transform` y `opacity`.

## Validar con el cliente
- Plazas libres y precio de las privadas (la web no los da: invita a llamar).
- Que su trabajador social orienta a las familias en el trámite de la plaza colaboradora.
- Fiestas del calendario: Navidad y Sant Jordi salen en sus fotos; Reyes, Sant Joan, la Mercè y la Castanyada son las tradicionales catalanas.
- Horario de visitas, y si quieren dar un WhatsApp (hoy solo tienen fijo y correo).
- El nombre en tipografía hace de marca hasta que tengan logotipo.
- Los textos legales (aviso legal, privacidad, cookies) siguen en páginas aparte, como pide la ley.

## Stack
HTML, CSS y JavaScript puro. Cero dependencias, cero build. Zodiak (licencia ITF de Fontshare) y Commissioner (OFL) autoalojadas (74 KB). Mapa en SVG generado desde OpenStreetMap (`_interno/mapa/hacer_mapa.py`).

Parámetros útiles: `?ss` (sin animaciones, para capturas) · `?idioma=es` (abre en castellano) · `?avui=2026-12-20` (fija el día del calendario) · `?caducada` (simula la caducidad).

## Caducidad
**Provisional, como si se enviara el 27-oct-2026:** la propuesta se ve hasta el **jueves 5 de noviembre de 2026 a las 23:59** (hora de Madrid). Desde el 6, `index.html` lleva a `caducada.html`: «No puedes ver esta página porque han pasado más de 10 días desde su envío. Si sigues con interés, escríbeme a jjuradogarciadelrio@gmail.com.» y la home entera en miniatura. La fecha está en el primer `<script>` de `index.html` (`Date.UTC(2026, 10, 5, 23, 0)`): se ajusta al día real de envío. En local no caduca.

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
