#!/usr/bin/env python3
"""Genera Hoja-de-resultados.xlsx, el archivo que acompaña a la guía.

    python3 extras/hacer-hoja.py

Dos pestañas:
  1. Mi línea roja: cuánto puedes pagar por un interesado sin perder dinero.
  2. Mis anuncios: una fila por anuncio y semana, con el CTR, el costo por
     resultado y una decisión que se calcula sola.
"""
from pathlib import Path

from openpyxl import Workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.worksheet.datavalidation import DataValidation

SALIDA = Path(__file__).with_name('Hoja-de-resultados.xlsx')

TINTA = '0B1220'
CIAN = '0E7490'
AMARILLO = PatternFill('solid', fgColor='FFF3BF')
GRIS = PatternFill('solid', fgColor='F4F7FA')
OSCURO = PatternFill('solid', fgColor='05070D')
VERDE = PatternFill('solid', fgColor='DCFCE7')
ROJO = PatternFill('solid', fgColor='FEE2E2')
AMBAR = PatternFill('solid', fgColor='FFF7E6')
LINEA = Border(bottom=Side(style='thin', color='E3E7EE'))

TITULO = Font(name='Calibri', size=18, bold=True, color=TINTA)
SUB = Font(name='Calibri', size=11, color='5B6476')
ETQ = Font(name='Calibri', size=11, bold=True, color=TINTA)
NORMAL = Font(name='Calibri', size=11, color=TINTA)
GRANDE = Font(name='Calibri', size=14, bold=True, color=CIAN)
BLANCO = Font(name='Calibri', size=11, bold=True, color='FFFFFF')

DINERO = '"$"#,##0.00'
ENTERO = '#,##0'
PORCIENTO = '0.00%'

wb = Workbook()

# ─── Pestaña 1: Mi línea roja ───────────────────────────────────────
ws = wb.active
ws.title = 'Mi línea roja'
ws.sheet_view.showGridLines = False
ws.column_dimensions['A'].width = 3
ws.column_dimensions['B'].width = 58
ws.column_dimensions['C'].width = 18
ws.column_dimensions['D'].width = 50

ws['B2'] = 'Mi línea roja'
ws['B2'].font = TITULO
ws['B3'] = 'Llena solo las celdas amarillas. Lo demás se calcula solo.'
ws['B3'].font = SUB


def fila(r, etiqueta, valor, formato, nota='', entrada=False, grande=False):
    ws.cell(r, 2, etiqueta).font = ETQ if not grande else GRANDE
    c = ws.cell(r, 3, valor)
    c.number_format = formato
    c.font = GRANDE if grande else NORMAL
    c.alignment = Alignment(horizontal='right')
    if entrada:
        c.fill = AMARILLO
    ws.cell(r, 4, nota).font = SUB
    for col in (2, 3, 4):
        ws.cell(r, col).border = LINEA


ws['B5'] = 'Tu cliente'
ws['B5'].font = Font(name='Calibri', size=12, bold=True, color=CIAN)
fila(6, 'Lo que te deja un cliente cada vez que te compra', 25, DINERO,
     'Lo que te queda a ti, no el precio. Ejemplo: corte de $25.', entrada=True)
fila(7, 'Cuántas veces te compra al año', 6, ENTERO,
     'Si es un trabajo de una sola vez (un techo), pon 1.', entrada=True)
fila(8, 'De cada 10 personas que te escriben, cuántas te compran', 3, ENTERO,
     'Si no lo sabes, empieza con 2 y corrígelo después.', entrada=True)

ws['B10'] = 'Tu resultado'
ws['B10'].font = Font(name='Calibri', size=12, bold=True, color=CIAN)
fila(11, 'Lo que vale un cliente en un año', '=C6*C7', DINERO)
fila(12, 'LO MÁXIMO que puedes pagar por cada interesado', '=C11*C8/10', DINERO,
     'Tu línea roja. Por encima de esto, pierdes dinero.', grande=True)
fila(13, 'Tu meta sana por interesado (la mitad)', '=C12/2', DINERO,
     'Si pagas esto o menos, estás ganando bien.', grande=True)

ws['B15'] = 'Tu presupuesto'
ws['B15'].font = Font(name='Calibri', size=12, bold=True, color=CIAN)
fila(16, 'Presupuesto diario de anuncios', 15, DINERO, 'Lo recomendado para empezar: de $15 a $20.', entrada=True)
fila(17, 'Lo que gastas en una semana', '=C16*7', DINERO)
fila(18, 'Interesados por semana si pagas tu meta sana', '=IFERROR(C17/C13,0)', '0.0',
     'Es una cuenta de ejemplo, no una promesa.')
fila(19, 'Clientes nuevos por semana', '=C18*C8/10', '0.0')
fila(20, 'Lo que te dejan esos clientes en un año', '=C19*C11', DINERO)

# ─── Pestaña 2: Mis anuncios ────────────────────────────────────────
wa = wb.create_sheet('Mis anuncios')
wa.sheet_view.showGridLines = False
wa.freeze_panes = 'A4'

wa['A1'] = 'Mis anuncios'
wa['A1'].font = TITULO
wa['A2'] = ('Cada lunes: una fila por anuncio con los números de la semana pasada. '
            'Llena las columnas amarillas; las grises se calculan solas. '
            'Las 3 primeras filas son un ejemplo: bórralas cuando empieces.')
wa['A2'].font = SUB

columnas = [
    ('Semana (lunes)', 14, 'entrada'),
    ('Anuncio', 28, 'entrada'),
    ('Importe gastado', 15, 'entrada'),
    ('Impresiones', 13, 'entrada'),
    ('Clics en el enlace', 13, 'entrada'),
    ('Resultados', 12, 'entrada'),
    ('Clientes que te compraron', 15, 'entrada'),
    ('CTR del enlace', 12, 'calc'),
    ('Costo por resultado', 14, 'calc'),
    ('Costo por cliente', 14, 'calc'),
    ('Ganancia en un año (aprox.)', 16, 'calc'),
    ('Qué hacer', 30, 'calc'),
]

for i, (nombre, ancho, tipo) in enumerate(columnas, start=1):
    c = wa.cell(3, i, nombre)
    c.font = BLANCO
    c.fill = OSCURO
    c.alignment = Alignment(wrap_text=True, vertical='center')
    wa.column_dimensions[c.column_letter].width = ancho
wa.row_dimensions[3].height = 32

ejemplos = [
    ('2026-10-12', 'R1 · Foto del corte', 70.20, 5840, 93, 9, 2),
    ('2026-10-12', 'R1 · Oferta en grande', 45.00, 4120, 45, 4, 1),
    ('2026-10-12', 'R1 · Video 20 segundos', 12.30, 1950, 8, 0, 0),
]

PRIMERA, ULTIMA = 4, 203
MAXIMO = "'Mi línea roja'!$C$12"
META = "'Mi línea roja'!$C$13"
VALOR_ANUAL = "'Mi línea roja'!$C$11"

for r in range(PRIMERA, ULTIMA + 1):
    if r - PRIMERA < len(ejemplos):
        for col, v in enumerate(ejemplos[r - PRIMERA], start=1):
            wa.cell(r, col, v).font = Font(name='Calibri', size=11, color='8B93A7', italic=True)
    for col in range(1, 8):
        wa.cell(r, col).fill = AMARILLO if r - PRIMERA >= len(ejemplos) else GRIS
    wa.cell(r, 3).number_format = DINERO
    wa.cell(r, 4).number_format = ENTERO
    wa.cell(r, 5).number_format = ENTERO

    wa.cell(r, 8, f'=IF(OR(D{r}="",D{r}=0),"",E{r}/D{r})').number_format = PORCIENTO
    wa.cell(r, 9, f'=IF(OR(C{r}="",F{r}="",F{r}=0),"",C{r}/F{r})').number_format = DINERO
    wa.cell(r, 10, f'=IF(OR(C{r}="",G{r}="",G{r}=0),"",C{r}/G{r})').number_format = DINERO
    wa.cell(r, 11, f'=IF(C{r}="","",G{r}*{VALOR_ANUAL}-C{r})').number_format = DINERO
    wa.cell(r, 12, (
        f'=IF(B{r}="","",'
        f'IF(D{r}<1000,"Muy pronto: espera",'
        f'IF(H{r}<0.005,"Apagar: nadie lo toca",'
        f'IF(AND(F{r}=0,C{r}>=2*{MAXIMO}),"Apagar: no trae resultados",'
        f'IF(F{r}=0,"Espera: aún sin resultados",'
        f'IF(I{r}<={META},"Ganador: déjalo",'
        f'IF(I{r}<={MAXIMO},"Bien: sigue mirando",'
        f'"Caro: cambia la imagen o el gancho")))))))'
    ))
    for col in range(8, 13):
        wa.cell(r, col).font = NORMAL if r - PRIMERA >= len(ejemplos) else Font(name='Calibri', size=11, color='8B93A7', italic=True)
    for col in range(1, 13):
        wa.cell(r, col).border = LINEA

rango_decision = f'L{PRIMERA}:L{ULTIMA}'
wa.conditional_formatting.add(rango_decision, FormulaRule(formula=[f'LEFT(L{PRIMERA},7)="Ganador"'], fill=VERDE))
wa.conditional_formatting.add(rango_decision, FormulaRule(formula=[f'LEFT(L{PRIMERA},6)="Apagar"'], fill=ROJO))
wa.conditional_formatting.add(rango_decision, FormulaRule(formula=[f'LEFT(L{PRIMERA},4)="Caro"'], fill=AMBAR))
rango_costo = f'I{PRIMERA}:I{ULTIMA}'
wa.conditional_formatting.add(rango_costo, FormulaRule(formula=[f'AND(I{PRIMERA}<>"",I{PRIMERA}<={META})'], fill=VERDE))
wa.conditional_formatting.add(rango_costo, FormulaRule(formula=[f'AND(I{PRIMERA}<>"",I{PRIMERA}>{MAXIMO})'], fill=ROJO))

numeros = DataValidation(type='decimal', operator='greaterThanOrEqual', formula1='0', allow_blank=True,
                         error='Pon un número de 0 en adelante.', errorTitle='Solo números')
wa.add_data_validation(numeros)
numeros.add(f'C{PRIMERA}:G{ULTIMA}')

# ─── Pestaña 3: Cómo se usa ─────────────────────────────────────────
wg = wb.create_sheet('Cómo se usa')
wg.sheet_view.showGridLines = False
wg.column_dimensions['A'].width = 3
wg.column_dimensions['B'].width = 110
pasos = [
    ('Cómo se usa esta hoja', TITULO),
    ('', NORMAL),
    ('1. Pestaña "Mi línea roja": llena las 3 celdas amarillas de tu cliente y tu presupuesto diario.', NORMAL),
    ('   Te dice lo máximo que puedes pagar por cada persona que te escribe sin perder dinero.', SUB),
    ('2. Cada lunes, abre el Administrador de anuncios, pestaña "Anuncios", y escoge las fechas de la semana pasada.', NORMAL),
    ('3. En "Mis anuncios", una fila por anuncio: copia el gasto, las impresiones, los clics en el enlace y los resultados.', NORMAL),
    ('4. Apunta tú cuántos de esos interesados te compraron. Ese número no lo sabe Meta: solo tú.', NORMAL),
    ('5. Mira la columna "Qué hacer". Verde: déjalo. Rojo: apágalo. Ámbar: cambia la imagen o el gancho.', NORMAL),
    ('', NORMAL),
    ('Las reglas que usa la columna "Qué hacer" son las del capítulo 4.4 de la guía:', ETQ),
    ('· Con menos de 1,000 impresiones es muy pronto para decidir.', NORMAL),
    ('· CTR menor de 0.5%: a nadie le interesa. Apágalo.', NORMAL),
    ('· Sin resultados después de gastar el doble de tu línea roja: apágalo.', NORMAL),
    ('· Costo por resultado igual o menor que tu meta sana: ganador.', NORMAL),
    ('', NORMAL),
    ('Se abre con Excel, con Google Sheets (gratis: Archivo → Importar) o con Numbers.', SUB),
]
for i, (texto, fuente) in enumerate(pasos, start=2):
    c = wg.cell(i, 2, texto)
    c.font = fuente

wb.move_sheet('Cómo se usa', offset=-2)
wb.active = 1
wb.save(SALIDA)
print('Listo:', SALIDA.name)
