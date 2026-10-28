# Residència Sant Miquel Arcàngel — Propuesta de nueva homepage

Prototipo de homepage para la **Residència d'avis Sant Miquel Arcàngel** ([residenciasantmiquel.net](https://www.residenciasantmiquel.net/)), residencia de mayores de **25 plazas (18 colaboradoras con la Generalitat y 7 privadas)** en una torre con jardín de C/ d'Escipió 17, El Putxet (Barcelona).

**Prototipo:** https://jjurado2026.github.io/residencia-sant-miquel/

**El problema que resuelve:** su web es un Jimdo de 2010 con plantilla de flores de cerezo, texto de 12 px en cursiva, ningún teléfono que se pueda pulsar, el correo escondido y fotos de 150 px. En el móvil el título se corta y el aviso de cookies tapa el 74 % de la pantalla. No responde a lo que pregunta una familia (plaza pública o privada, cuidados, visita, cómo llegar) y no aparece en los buscadores ni por su nombre.

## Dirección estética: «Tendal»

Lo primero que ve una familia al llegar al número 17 es **su toldo amarillo**, con el nombre de la residencia y el borde ondulado. La home lo abre: al cargar, el toldo baja bajo la cabecera y se extiende en perspectiva (la lona con sus costuras, la barra y el faldón con «Sant Miquel Arcàngel» en grande); el volante se mece solo y se agita cuando el ratón pasa cerca, como si soplara aire, y la foto real de su fachada cuelga del toldo balanceándose. Debajo, la casa: un titular grande con la palabra que cambia («Una casa al Putxet amb jardí · metge · infermeria · cuina pròpia · fisioteràpia»), las llamadas y la foto del jardín, que se recorre punto a punto unida por una línea de luz.

- **Color:** el amarillo de su toldo `#F2C12E` y de sus paredes (zócalo amarillo, parte alta crema), con el **verde de su jardín** `#1D3B31` para texto y bandas.
- **Tipografía:** **Zodiak** (Indian Type Foundry), una serif contemporánea de contraste alto, para el nombre y los titulares, y **Commissioner**, una sans moderna muy legible, para el texto. Texto a 20 px. (Ronda 2: sustituyen a Besley y Atkinson, que Pablo veía poco modernas.)
- **Botones:** en reposo todos iguales, blancos con trazo verde y nada marcado; bajo el cursor baja el toldo amarillo y el icono hace su gesto (el teléfono suena, el calendario salta, el sobre se abre). El de llamar suena solo de vez en cuando. El botón nunca se mueve bajo el cursor: se animan sus hijos.
- El motivo del toldo solo aparece en tres sitios: el hero, «Cómo llegar» («buscad el toldo amarillo») y el borde del pie.

## La home, de arriba abajo
1. **Cabecera fija** con enlaces a sus páginas reales, botón **«Text gran»**, **CA/ES** y el teléfono. En móvil, menú a pantalla completa y barra fija Llamar · Correo · Cómo llegar.
2. **Hero «Tendal»:** el toldo en perspectiva con su nombre y su fachada; el titular con la palabra que cambia; llamar, pedir visita, la Sra. Ana o la Sra. Alba; el jardín con puntos que se recorren solos, unidos por una línea de luz.
3. **Una casa pequeña: 25 plazas.** Título centrado, con «25 plazas» en su línea. La fachada de noche con 25 ventanas que se encienden; dos botones (ninguno abierto de inicio) explican la plaza colaboradora (con los tres pasos del grado de dependencia y el PIA) y la privada; el que está bajo el cursor enciende sus ventanas.
4. **Atención sanitaria y social, aquí mismo.** «El equipo de la casa: médico, enfermería, gerocultoras…»: cada oficio lleva un punteado fino y, al llegarle el turno o el cursor, un marcador amarillo que se dibuja despacio, sin saltos, y explica qué hace. Podología (los dedos del pie), peluquería (las tijeras cortan), acompañamiento (dos personas caminan juntas) y cocina propia (sube el vapor) hacen su gesto al pasar el cursor y, una vez, al llegar.
5. **La casa, por dentro.** Cada foto, colgada en la pared de dos tonos de sus salas; para pasar a la siguiente, la escena gira en lamas como una persiana (detrás asoma la persiana verde) y se queda en la estancia nueva: jardín, habitaciones, sala, pasillos y baños. Pasa sola, con las flechas, deslizando el dedo o eligiendo la estancia.
6. **Fet a Sant Miquel.** Las obras de sus talleres colgadas como en una exposición, con lámparas de cuadro que se encienden y visor; sus siete talleres y las manos pintando rosas de Sant Jordi.
7. **Les festes, a casa.** Un calendario que pasa las hojas por las fiestas del año y cuenta los días que faltan para la siguiente; fotos de su fiesta de Navidad.
8. **A seis minutos a pie del metro de Lesseps.** Mapa con sus calles reales (OpenStreetMap) y la ruta a pie más corta desde la boca de metro, en pisadas; bus 131 en la puerta, V17/22/87 en la esquina, FGC Pàdua.
9. **Pida una visita.** Nada marcado de inicio; se elige para quién, qué plaza y cuándo, y la carta se escribe sola; el botón abre el correo ya escrito. Debajo, las preguntas de las familias.

## Fotos
Las suyas, sin recortar ni retocar color: la fachada (la única foto de su home, en el hero), el jardín, la pérgola, las habitaciones, la sala, el pasillo, los baños, las obras de los talleres y la fiesta de Navidad. Las que se ven más grandes que su original se han ampliado con IA (Real-ESRGAN, mezcla x4plus y remacri) devolviéndoles el color exacto del original; las de personas, solo reescaladas.

## Comprobado, no asumido
Con el kit del taller (Chrome headless por DevTools): **el hero cabe entero en 17 tamaños**, de 320×568 a 2560×1440, en catalán y en castellano, también en móvil apaisado y descontando la barra fija · sin desbordamiento horizontal en ningún ancho · fotos a su proporción · 34 pruebas con ratón, clics y teclado reales (nada amarillo sin el cursor, idioma, texto grande, plazas, equipo, persiana, visor, calendario, formulario, menú del móvil) · ningún botón «pillado» con el cursor quieto (`_interno/herramientas/pillados.mjs`) · cero errores de JavaScript · con `prefers-reduced-motion` nada se mueve y todo se ve · solo se animan `transform` y `opacity`.

## Validar con el cliente
- Plazas libres y precio de las privadas (la home no los da: invita a llamar).
- Que su trabajador social orienta a las familias en el trámite de la plaza colaboradora.
- Fiestas del calendario: Navidad y Sant Jordi salen en sus fotos; Reyes, Sant Joan, la Mercè y la Castanyada son las tradicionales catalanas.
- Horario de visitas, y si quieren dar un WhatsApp (hoy solo tienen fijo y correo).
- El nombre en tipografía hace de marca hasta que tengan logotipo.

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
