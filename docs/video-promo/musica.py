# Música de fondo del vídeo promocional, compuesta aquí mismo: suave y sin
# licencias de nadie (la pidió Frank el 19 nov 2026, «ligera»). Python puro,
# sin dependencias; ffmpeg le pone luego la reverberación, los fundidos y el
# volumen (en montar.py).
#
#   python3 docs/video-promo/musica.py docs/privado/video/musica.wav
#
# Do mayor a 96 pulsos por minuto, un acorde por compás (2,5 s):
# Do – Sol – Lam – Fa, dos vueltas y se acaba en Do. Un colchón de acordes y
# un bajo desde el principio; arpegio y un ritmo muy suave desde el segundo
# compás (cuando entra el primer plano); el último compás, sin ritmo, para el
# cierre con el teléfono.
import math
import random
import struct
import sys
import wave

SR = 44100
PULSO = 60 / 96
COMPAS = 4 * PULSO  # 2,5 s
DURACION = 22.7  # lo que dura el vídeo (montar.py)
N = int(DURACION * SR)

izq = [0.0] * N
der = [0.0] * N


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def tabla(armonicos, tam=4096):
    t = [
        sum(a * math.sin(2 * math.pi * (k + 1) * i / tam) for k, a in enumerate(armonicos))
        for i in range(tam)
    ]
    pico = max(abs(x) for x in t)
    return [x / pico for x in t]


T_COLCHON = tabla([1, 0.25, 0.08])
T_BAJO = tabla([1, 0.15])
T_PUNTEO = tabla([1, 0.3, 0.1, 0.04])
TAM = 4096


def nota(t_ini, dur, f, nivel, tab, ataque, caida, pan=0.0, decae=None, desafine=(0.0,)):
    """Suma una nota. `decae` (s): caída exponencial, como una cuerda pulsada."""
    i0 = int(t_ini * SR)
    n = int((dur + caida) * SR)
    gi = math.cos((pan + 1) * math.pi / 4)  # paneo de potencia constante
    gd = math.sin((pan + 1) * math.pi / 4)
    for c in desafine:
        paso = f * 2 ** (c / 1200) * TAM / SR
        fase = random.random() * TAM
        # Desafinado a la izquierda o a la derecha: da anchura.
        li, ld = (gi * 1.3, gd * 0.7) if c < 0 else (gi * 0.7, gd * 1.3) if c > 0 else (gi, gd)
        a = nivel / len(desafine)
        for k in range(n):
            j = i0 + k
            if j >= N:
                break
            t = k / SR
            env = min(1.0, t / ataque) if ataque else 1.0
            if t > dur:
                env *= max(0.0, 1 - (t - dur) / caida)
            if decae:
                env *= math.exp(-t / decae)
            m = a * env * tab[int(fase) & (TAM - 1)]
            izq[j] += m * li
            der[j] += m * ld
            fase += paso


def bombo(t_ini, nivel):
    i0 = int(t_ini * SR)
    fase = 0.0
    for k in range(int(0.35 * SR)):
        j = i0 + k
        if j >= N:
            break
        t = k / SR
        f = 45 + 65 * math.exp(-t / 0.04)
        fase += 2 * math.pi * f / SR
        m = nivel * math.exp(-t / 0.11) * math.sin(fase)
        izq[j] += m
        der[j] += m


def platillo(t_ini, nivel, pan):
    i0 = int(t_ini * SR)
    previo = 0.0
    gi, gd = math.cos((pan + 1) * math.pi / 4), math.sin((pan + 1) * math.pi / 4)
    for k in range(int(0.12 * SR)):
        j = i0 + k
        if j >= N:
            break
        r = random.uniform(-1, 1)
        m = nivel * math.exp(-k / SR / 0.025) * (r - previo)  # ruido con paso alto
        previo = r
        izq[j] += m * gi
        der[j] += m * gd


random.seed(5)  # siempre la misma pieza

# (bajo, colchón) en MIDI
# El bajo suena una octava más arriba (+12, en la octava 3): más abajo, el
# altavoz de un móvil no lo da.
acordes = [
    (36, [60, 64, 67, 74]),  # Do (add9)
    (43, [59, 62, 67, 74]),  # Sol
    (45, [57, 60, 64, 67]),  # Lam7
    (41, [57, 60, 65, 72]),  # Fa
]
arpegio = [0, 2, 3, 2, 1, 2, 3, 2]
compases = math.ceil(DURACION / COMPAS)  # 10: el último se corta con el fundido
ultimo = compases - 2  # el compás del cierre (empieza a los 20 s), en Do

for b in range(compases):
    bajo, colchon = acordes[0] if b >= ultimo else acordes[b % 4]
    t0 = b * COMPAS
    largo = DURACION - t0 if b >= ultimo else COMPAS
    if b > ultimo:
        break
    for m in colchon:
        nota(t0, largo, hz(m), 0.075, T_COLCHON, 0.6, 0.9, desafine=(-5, 0, 5))
    nota(t0, largo, hz(bajo + 12), 0.15, T_BAJO, 0.04, 0.4)
    if b >= 1:
        for i, idx in enumerate(arpegio):
            if b == ultimo and i >= 4:
                break  # el cierre se queda con medio arpegio
            nota(t0 + i * PULSO / 2, 0.0, hz(colchon[idx] + 12), 0.085, T_PUNTEO,
                 0.004, 0.6, pan=-0.35 if i % 2 else 0.35, decae=0.3)
    if 1 <= b < ultimo:
        for p in range(4):
            if p % 2 == 0:
                bombo(t0 + p * PULSO, 0.3)
            platillo(t0 + p * PULSO + PULSO / 2, 0.035, 0.3 if p % 2 else -0.3)

pico = max(max(abs(x) for x in izq), max(abs(x) for x in der))
g = 0.89 / pico  # −1 dB; el volumen final lo pone montar.py
with wave.open(sys.argv[1], "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(
        b"".join(struct.pack("<hh", int(izq[k] * g * 32767), int(der[k] * g * 32767)) for k in range(N))
    )
print(f"{sys.argv[1]}: {DURACION} s")
