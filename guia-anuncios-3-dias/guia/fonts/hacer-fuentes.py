#!/usr/bin/env python3
"""Saca versiones fijas (no variables) de Fraunces e Instrument Sans.

    python3 guia/fonts/hacer-fuentes.py

Chrome mete las fuentes variables en el PDF como dibujos (Type 3): el
archivo pesa más de 20 MB y en algunos lectores las letras salen borrosas.
Con fuentes fijas las mete como texto normal y el PDF baja a 2–3 MB.

Fraunces cambia de forma según el tamaño (eje "opsz"). Para no perder eso
se sacan tres cortes, cada uno con su nombre de familia:
  Fraunces          texto, notas y títulos pequeños (opsz 16)
  Fraunces Titulo   los títulos de sección (opsz 36)
  Fraunces Display  la portada, las aperturas y los números gigantes (opsz 80)

Necesita: pip install fonttools brotli
Escribe los .woff2 en guia/fonts/fijas/ y rehace guia/fonts/fuentes.css.
"""

import io
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

AQUI = Path(__file__).resolve().parent
SALIDA = AQUI / 'fijas'

RANGO = ('U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, '
         'U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, '
         'U+2212, U+2215, U+FEFF, U+FFFD')

PESOS_FRAUNCES = [400, 500, 600, 650, 700]
PESOS_INSTRUMENT = [400, 500, 600, 650, 700]

CORTES = [
    # (familia en el CSS, archivo variable, prefijo, ejes fijos)
    *[('Fraunces', 'Fraunces-normal', 'Fraunces-Texto', 'normal', {'opsz': 16})],
    *[('Fraunces', 'Fraunces-italic', 'Fraunces-Texto', 'italic', {'opsz': 16})],
    *[('Fraunces Titulo', 'Fraunces-normal', 'Fraunces-Titulo', 'normal', {'opsz': 36})],
    *[('Fraunces Titulo', 'Fraunces-italic', 'Fraunces-Titulo', 'italic', {'opsz': 36})],
    *[('Fraunces Display', 'Fraunces-normal', 'Fraunces-Display', 'normal', {'opsz': 80})],
    *[('Fraunces Display', 'Fraunces-italic', 'Fraunces-Display', 'italic', {'opsz': 80})],
]


def fija(origen, ejes, nombre):
    """Devuelve el .woff2 de una instancia fija de la fuente variable."""
    fuente = TTFont(AQUI / f'{origen}.woff2')
    fuente = instantiateVariableFont(fuente, ejes, updateFontNames=False)
    # Nombre propio para cada instancia: así el PDF las distingue.
    for registro in fuente['name'].names:
        if registro.nameID in (4, 6):
            texto = nombre if registro.nameID == 4 else nombre.replace(' ', '')
            registro.string = texto
    fuente.flavor = 'woff2'
    destino = SALIDA / f'{nombre.replace(" ", "-")}.woff2'
    fuente.save(destino)
    return destino.name


def cara(familia, estilo, peso, archivo):
    return f"""@font-face {{
  font-family: '{familia}';
  font-style: {estilo};
  font-weight: {peso};
  font-display: block;
  src: url(fonts/fijas/{archivo}) format('woff2');
  unicode-range: {RANGO};
}}"""


def main():
    SALIDA.mkdir(exist_ok=True)
    caras = []
    for familia, origen, prefijo, estilo, opsz in CORTES:
        for peso in PESOS_FRAUNCES:
            nombre = f'{prefijo} {estilo} {peso}'
            archivo = fija(origen, {**opsz, 'wght': peso}, nombre)
            caras.append(cara(familia, estilo, peso, archivo))
    for estilo in ('normal', 'italic'):
        for peso in PESOS_INSTRUMENT:
            nombre = f'InstrumentSans {estilo} {peso}'
            archivo = fija(f'InstrumentSans-{estilo}', {'wght': peso}, nombre)
            caras.append(cara('Instrument Sans', estilo, peso, archivo))

    css = ('/* Fraunces e Instrument Sans, licencia SIL Open Font License 1.1 (ver OFL.txt).\n'
           '   Versiones fijas sacadas de las variables con hacer-fuentes.py. */\n\n'
           + '\n'.join(caras) + '\n')
    (AQUI / 'fuentes.css').write_text(css, encoding='utf8')
    total = sum(f.stat().st_size for f in SALIDA.glob('*.woff2'))
    print(f'{len(caras)} fuentes en {SALIDA.name}/ ({total // 1024} KB) y fuentes.css listo.')


if __name__ == '__main__':
    main()
