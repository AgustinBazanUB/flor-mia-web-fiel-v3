import { useState } from "react";
import { ArrowUpRight, Instagram } from "lucide-react";
import { Link } from "../router";
import { brand } from "../data/brand";

const columns = [
  {
    title: "Comprar",
    links: [
      ["Todos los productos", "/productos"],
      ["Aceites de oliva", "/productos?categoria=olive_oil"],
      ["Frutos secos", "/productos?categoria=nuts"],
      ["Aceitunas", "/productos?categoria=olives"],
      ["Mermeladas y sales", "/productos?categoria=jams"],
      ["Regalos", "/productos?categoria=gifts"],
    ],
  },
  {
    title: "Flor Mía",
    links: [
      ["Nuestra historia", "/nosotros"],
      ["El local", "/nosotros#local"],
      ["Origen y selección", "/nosotros#origen"],
      ["Opiniones", "/#opiniones"],
      ["Contacto", "/#contacto"],
    ],
  },
  {
    title: "Ayuda",
    links: [
      ["Envíos y retiros", "/#compra-clara"],
      ["Medios de pago", "/#compra-clara"],
      ["Cambios", "/#compra-clara"],
      ["Preguntas frecuentes", "/#faq"],
    ],
  },
];

export default function Footer() {
  const [newsletterStatus, setNewsletterStatus] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (!form.get("consent")) {
      setNewsletterStatus("Necesitamos tu consentimiento para suscribirte.");
      return;
    }
    setNewsletterStatus(
      "El formulario está preparado. La integración de newsletter sigue pendiente.",
    );
  };

  return (
    <footer className="site-footer" id="contacto">
      <div className="container site-footer__top">
        <div className="footer-intro">
          <Link className="wordmark" to="/">
            flor mía
          </Link>
          <p>{brand.tagline}</p>
          <a
            href={brand.instagram}
            target="_blank"
            rel="noreferrer"
            className="footer-social"
          >
            <Instagram size={19} aria-hidden="true" />
            Instagram
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <p className="footer-pending">
            WhatsApp, email, dirección y horarios pendientes de confirmación.
          </p>
        </div>

        <div className="footer-columns">
          {columns.map((column) => (
            <nav aria-label={column.title} key={column.title}>
              <h2>{column.title}</h2>
              {column.links.map(([label, href]) => (
                <Link to={href} key={label}>
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <form className="newsletter" onSubmit={onSubmit}>
          <h2>Novedades, productos y sabores de Mendoza.</h2>
          <label className="field-label" htmlFor="newsletter-email">
            Tu email
          </label>
          <div className="newsletter__field">
            <input
              id="newsletter-email"
              name="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              autoComplete="email"
              required
            />
            <button className="button button--gold" type="submit">
              Suscribirme
            </button>
          </div>
          <label className="checkbox-label">
            <input type="checkbox" name="consent" value="yes" />
            <span>Acepto recibir novedades de Flor Mía.</span>
          </label>
          <p className="form-status" role="status">
            {newsletterStatus}
          </p>
        </form>
      </div>

      <div className="container footer-legal">
        <span>© {new Date().getFullYear()} Flor Mía</span>
        <div aria-label="Información legal pendiente">
          <span>Términos</span>
          <span>Privacidad</span>
          <span>Defensa del consumidor</span>
        </div>
        <span>Contenido legal pendiente</span>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        FLOR MÍA
      </div>
    </footer>
  );
}
