import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { enlaceWhatsApp, horario, negocio } from "@/datos/negocio";
import s from "./Contacto.module.css";

// El cierre de cada página: todas las formas de contactar juntas.
export default function Contacto() {
  return (
    <section id="contacto" className={`seccion ${s.contacto}`}>
      <div className={`contenedor ${s.contacto__rejilla}`}>
        <header>
          <p className="antetitulo antetitulo--claro">Contacto</p>
          <h2 className={s.titulo}>¿Hablamos?</h2>
          <p className="seccion__entradilla">
            Cuéntanos qué necesitas y te respondemos con tu presupuesto.
          </p>
          <a
            className="boton boton--whatsapp boton--grande"
            href={enlaceWhatsApp()}
          >
            <MessageCircle aria-hidden="true" size={20} />
            Escríbenos por WhatsApp
          </a>
        </header>

        <ul className={s.contacto__lista}>
          <li>
            <Phone aria-hidden="true" size={20} />
            <div>
              <span className="antetitulo antetitulo--claro">Teléfono</span>
              <a href={`tel:${negocio.telefono}`}>{negocio.telefonoVisible}</a>
            </div>
          </li>
          <li>
            <Mail aria-hidden="true" size={20} />
            <div>
              <span className="antetitulo antetitulo--claro">Correo</span>
              <a href={`mailto:${negocio.correo}`}>{negocio.correo}</a>
            </div>
          </li>
          <li>
            <Clock aria-hidden="true" size={20} />
            <div>
              <span className="antetitulo antetitulo--claro">Horario</span>
              <p>
                {horario.semana}
                <br />
                {horario.finDeSemana}
              </p>
            </div>
          </li>
          <li>
            <MapPin aria-hidden="true" size={20} />
            <div>
              <span className="antetitulo antetitulo--claro">Dónde estamos</span>
              <a href={negocio.mapa}>
                {negocio.localidad} ({negocio.provincia})
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
