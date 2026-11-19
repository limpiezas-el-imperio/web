# Vídeo promocional para redes (Reels, TikTok, estados): 1080×1920, ~23 s,
# sin música (Frank la pone desde la app al publicarlo, que así va con licencia).
#
# Los vídeos son de Frank (WhatsApp, 5 nov 2026): casas de clientes, así que
# NUNCA entran en git. Van en docs/privado/video/fuente/, renombrados v01…v11
# por orden alfabético del zip original («flyer-limpiezas-el-imperio.zip»).
# Sólo se usan habitaciones vacías y limpias: nada de fotos de familia, objetos
# personales, gente del equipo ni vistas largas por la ventana. v01 es un vídeo
# ya montado que acaba con un logo viejo (redondo, con dos dibujos): no se usa
# ese logo, sino public/logo.jpg.
#
# Cómo rehacerlo (desde la raíz del repositorio):
#   1. Chrome sin cabeza para pintar los rótulos:
#        google-chrome --headless=new --remote-debugging-port=9334 \
#          --allow-file-access-from-files --user-data-dir=/tmp/chrome-video about:blank &
#   2. node docs/video-promo/render.mjs docs/video-promo docs/privado/video/rotulos
#   3. python3 docs/video-promo/montar.py docs/privado/video/fuente \
#        docs/privado/video/rotulos docs/privado/video/limpiezas-el-imperio-promo.mp4
#
# Para cambiar planos o rótulos: la lista `planos` de abajo y la de `rotulos`
# en render.mjs van a la par (el plano 1 lleva r1.png, etc.).
import subprocess
import sys

fuente, rotulos, salida = sys.argv[1:4]

# (vídeo, segundo de inicio)
planos = [
    ("v04", 31.0),   # Salones (+ «Así dejamos las casas»)
    ("v04", 36.4),   # Cocinas
    ("v01", 55.0),   # Baños
    ("v03", 63.0),   # Duchas
    ("v03", 4.2),    # Dormitorios
    ("v05", 40.0),   # Comedores
    ("v04", 157.0),  # Habitaciones
    ("v04", 7.2),    # Terrazas
]
PLANO, FUNDIDO, ENTRADA, CIERRE = 2.4, 0.4, 2.6, 4.5

ins, f = [], []
ins += ["-loop", "1", "-t", str(ENTRADA), "-i", f"{rotulos}/intro.png"]
for i, (v, s) in enumerate(planos):
    ins += ["-ss", str(s), "-t", str(PLANO), "-i", f"{fuente}/{v}.mp4"]
    ins += ["-loop", "1", "-t", str(PLANO), "-i", f"{rotulos}/r{i + 1}.png"]
ins += ["-loop", "1", "-t", str(CIERRE), "-i", f"{rotulos}/final.png"]
n_cierre = 1 + 2 * len(planos)

comun = "fps=30,format=yuv420p,setsar=1,settb=AVTB"
f.append(f"[0]scale=1080:1920,{comun}[s0]")
for i in range(len(planos)):
    v, r = 1 + 2 * i, 2 + 2 * i
    f.append(
        f"[{v}:v]scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,"
        "crop=1080:1920,eq=saturation=1.08:brightness=0.015,unsharp=5:5:0.6,"
        f"fps=30,setpts=PTS-STARTPTS[b{i}]"
    )
    f.append(f"[{r}]format=rgba,fade=in:st=0.25:d=0.3:alpha=1,setpts=PTS-STARTPTS[o{i}]")
    f.append(f"[b{i}][o{i}]overlay=0:0:shortest=1,{comun}[s{i + 1}]")
f.append(f"[{n_cierre}]scale=1080:1920,{comun}[s{len(planos) + 1}]")

duraciones = [ENTRADA] + [PLANO] * len(planos) + [CIERRE]
anterior, acumulado = "s0", duraciones[0]
for k in range(1, len(duraciones)):
    desde = acumulado - FUNDIDO
    f.append(
        f"[{anterior}][s{k}]xfade=transition=fade:duration={FUNDIDO}:offset={desde:.3f}[x{k}]"
    )
    anterior, acumulado = f"x{k}", desde + duraciones[k]
f.append(f"[{anterior}]format=yuv420p[v]")

# Pista de audio en silencio: algunas apps no aceptan vídeo sin audio.
# -map_metadata -1: sin metadatos de los originales.
subprocess.run(
    [
        "ffmpeg", "-v", "error", "-y", *ins,
        "-f", "lavfi", "-t", f"{acumulado:.3f}", "-i", "anullsrc=r=44100:cl=stereo",
        "-filter_complex", ";".join(f),
        "-map", "[v]", "-map", f"{n_cierre + 1}:a",
        "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-profile:v", "high",
        "-pix_fmt", "yuv420p", "-r", "30", "-c:a", "aac", "-b:a", "128k", "-shortest",
        "-map_metadata", "-1", "-movflags", "+faststart", salida,
    ],
    check=True,
)
print(f"{salida}: {acumulado:.1f} s")
