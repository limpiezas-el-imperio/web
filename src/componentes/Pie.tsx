import Link from "next/link";
import Marca from "./Marca";
import { horario, negocio, redes } from "@/datos/negocio";

export default function Pie() {
  const año = new Date().getFullYear();

  return (
    <footer className="pie">
      <div className="contenedor pie__rejilla">
        <div className="pie__marca">
          <Marca claro />
          <p>{negocio.lema}.</p>
        </div>

        <div>
          <h2 className="pie__titulo">Contacto</h2>
          <ul className="pie__lista">
            <li>
              <a href={`tel:${negocio.telefono}`}>{negocio.telefonoVisible}</a>
            </li>
            <li>
              <a href={`mailto:${negocio.correo}`}>{negocio.correo}</a>
            </li>
            <li>
              <a href={negocio.mapa}>
                {negocio.localidad} ({negocio.provincia})
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="pie__titulo">Horario</h2>
          <ul className="pie__lista">
            <li>{horario.semana}</li>
            <li>{horario.finDeSemana}</li>
          </ul>
        </div>

        <div>
          <h2 className="pie__titulo">Síguenos</h2>
          <ul className="pie__lista">
            {redes.map((r) => (
              <li key={r.nombre}>
                <a href={r.url} rel="me noopener">
                  {r.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="contenedor pie__legal">
        <p>
          © {año} {negocio.nombre} · {negocio.titular}
        </p>
        <nav aria-label="Pie">
          <ul>
            <li>
              <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
