# Residència Sant Miquel Arcàngel — Propuesta de nueva homepage

Prototipo de homepage para la **Residència d'avis Sant Miquel Arcàngel** ([residenciasantmiquel.net](https://www.residenciasantmiquel.net/)), residencia de mayores de **25 plazas (18 colaboradoras con la Generalitat y 7 privadas)** en una torre con jardín de C/ d'Escipió 17, El Putxet (Barcelona).

**Prototipo:** https://jjurado2026.github.io/residencia-sant-miquel/

**El problema que resuelve:** su web es un Jimdo de 2010 con plantilla de flores de cerezo, texto de 12 px en cursiva, ningún teléfono que se pueda pulsar, el correo escondido y fotos de 150 px. En el móvil el título se corta y el aviso de cookies tapa el 74 % de la pantalla. No responde a lo que pregunta una familia (plaza pública o privada, cuidados, visita, cómo llegar) y no aparece en los buscadores ni por su nombre.

## Dirección estética: «Tendal»

Lo primero que ve una familia al llegar al número 17 es **su toldo amarillo**, con el nombre de la residencia y el borde ondulado. La home lo despliega: al abrirla, el toldo baja bajo la cabecera con «Sant Miquel Arcàngel» en grande, el volante se mece con la brisa y, colgada del toldo, la foto real de su fachada. Debajo, la casa: el lema, las llamadas y la foto del jardín, que se recorre con etiquetas.

- **Color:** el amarillo de su toldo `#F2C12E` y de sus paredes (zócalo amarillo, parte alta crema), con el **verde de su jardín** `#1D3B31` para texto y bandas.
- **Tipografía:** **Besley**, una Clarendon (la letra de los rótulos y toldos de tienda de principios del siglo XX), y **Atkinson Hyperlegible Next**, diseñada por el Braille Institute para personas con baja visión. Texto a 20 px.
- El motivo del toldo solo aparece en tres sitios: el hero, «Cómo llegar» («buscad el toldo amarillo») y el borde del pie.

## La home, de arriba abajo
1. **Cabecera fija** con enlaces a sus páginas reales, botón **«Text gran»**, **CA/ES** y el teléfono. En móvil, menú a pantalla completa y barra fija Llamar · Correo · Cómo llegar.
2. **Hero «Tendal»:** el toldo con su nombre y su fachada; «Una casa amb jardí al Putxet, per a 25 avis»; llamar, pedir visita, la Sra. Ana o la Sra. Alba; el jardín con puntos que se recorren solos.
3. **Una casa pequeña: 25 plazas.** La fachada de noche con 25 ventanas que se encienden; dos pestañas explican la plaza colaboradora (con los tres pasos del grado de dependencia y el PIA) y la privada.
4. **Atención sanitaria y social, aquí mismo.** Una frase grande nombra a su equipo (médico, enfermería, gerocultoras, fisioterapeuta, psicólogo, terapeuta ocupacional, trabajador social y animador sociocultural); cada oficio se subraya y explica qué hace. Podología, peluquería, acompañamiento y cocina propia.
5. **La casa, por dentro.** Sus fotos en una pila que avanza sola sobre la pared de dos tonos de sus salas: jardín, habitaciones, sala, pasillos y baños.
6. **Fet a Sant Miquel.** Las obras de sus talleres colgadas como en una exposición, con lámparas de cuadro que se encienden y visor; sus siete talleres y las manos pintando rosas de Sant Jordi.
7. **Les festes, a casa.** Un calendario que pasa las hojas por las fiestas del año y cuenta los días que faltan para la siguiente; fotos de su fiesta de Navidad.
8. **A seis minutos a pie del metro de Lesseps.** Mapa con sus calles reales (OpenStreetMap) y la ruta a pie más corta desde la boca de metro, en pisadas; bus 131 en la puerta, V17/22/87 en la esquina, FGC Pàdua.
9. **Pida una visita.** Se elige para quién, qué plaza y cuándo, y la carta se escribe sola; el botón abre el correo ya escrito. Debajo, las preguntas de las familias.

## Fotos
Las suyas, sin recortar ni retocar color: la fachada (la única foto de su home, en el hero), el jardín, la pérgola, las habitaciones, la sala, el pasillo, los baños, las obras de los talleres y la fiesta de Navidad. Las que se ven más grandes que su original se han ampliado con IA (Real-ESRGAN, mezcla x4plus y remacri) devolviéndoles el color exacto del original; las de personas, solo reescaladas.

## Comprobado, no asumido
Con el kit del taller (Chrome headless por DevTools): **el hero cabe entero en 17 tamaños**, de 320×568 a 2560×1440, también en móvil apaisado y descontando la barra fija · sin desbordamiento horizontal en ningún ancho · fotos a su proporción · interacciones probadas con ratón, clics y teclado reales (idioma, texto grande, pestañas, equipo, pila de fotos, visor, calendario, formulario, menú del móvil) · cero errores de JavaScript · con `prefers-reduced-motion` nada se mueve y todo se ve · solo se animan `transform` y `opacity`.

## Validar con el cliente
- Plazas libres y precio de las privadas (la home no los da: invita a llamar).
- Que su trabajador social orienta a las familias en el trámite de la plaza colaboradora.
- Fiestas del calendario: Navidad y Sant Jordi salen en sus fotos; Reyes, Sant Joan, la Mercè y la Castanyada son las tradicionales catalanas.
- Horario de visitas, y si quieren dar un WhatsApp (hoy solo tienen fijo y correo).
- El nombre en tipografía hace de marca hasta que tengan logotipo.

## Stack
HTML, CSS y JavaScript puro. Cero dependencias, cero build. Besley y Atkinson Hyperlegible Next autoalojadas (69 KB). Mapa en SVG generado desde OpenStreetMap (`_interno/mapa/hacer_mapa.py`).

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
