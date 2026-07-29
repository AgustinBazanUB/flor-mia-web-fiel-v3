import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CreditCard,
  HeartHandshake,
  Instagram,
  MapPin,
  PackageCheck,
  ShoppingBag,
  Sprout,
  Store,
  Truck,
} from "lucide-react";
import { Link } from "../router";
import { categories } from "../data/categories";
import { faqItems, gallerySlots, regionalShowcase } from "../data/content";
import { oliveProfiles } from "../data/oliveProfiles";
import { products } from "../data/products";
import { brand, purchaseInformation, trustItems } from "../data/brand";
import OccasionBuilder from "../components/OccasionBuilder";
import PlaceholderImage from "../components/PlaceholderImage";
import ProductCard from "../components/ProductCard";
import SearchExperience from "../components/SearchExperience";
import SectionHeading from "../components/SectionHeading";
import SensoryComparison from "../components/SensoryComparison";

const purchaseIcons = {
  truck: Truck,
  store: Store,
  "credit-card": CreditCard,
  "package-check": PackageCheck,
};

const trustIcons = {
  truck: Truck,
  "credit-card": CreditCard,
  sprout: Sprout,
  "heart-handshake": HeartHandshake,
};

export default function HomePage() {
  const productRowRef = useRef(null);
  const [activeTrustItem, setActiveTrustItem] = useState(null);
  const selectedTrustItem = trustItems.find(
    (item) => item.id === activeTrustItem,
  );

  const scrollProducts = (direction) => {
    productRowRef.current?.scrollBy({
      left: direction * Math.min(window.innerWidth * 0.8, 430),
      behavior: "smooth",
    });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Flor Mía",
        url: window.location.origin,
        sameAs: [brand.instagram],
      },
      {
        "@type": "WebSite",
        name: "Flor Mía",
        url: window.location.origin,
        potentialAction: {
          "@type": "SearchAction",
          target: `${window.location.origin}/productos?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <PlaceholderImage
            src="/images/placeholders/hero-flor-mia-productos-mendoza.webp"
            alt="Espacio reservado para una selección de productos Flor Mía con una botella de aceite como protagonista"
            label="HERO: aceite protagonista + selección regional mendocina"
            aspectRatio="16 / 9"
            eager
            sizes="100vw"
            className="hero__image"
            showCaption
          />
          <div className="hero__overlay" />
          <div className="container hero__content">
            <p className="eyebrow">PRODUCTOS REGIONALES · MENDOZA</p>
            <h1 id="hero-title">Los sabores de Mendoza, en un solo lugar.</h1>
            <p className="hero__subheadline">
              Aceites de oliva, frutos secos, aceitunas, mermeladas, sales y
              productos seleccionados para disfrutar, compartir y regalar.
            </p>
            <div className="hero__actions">
              <a className="button" href="#categories">
                Explorar productos
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="button button--secondary" href="#olive-oil-feature">
                Descubrir nuestros aceites
              </a>
            </div>
            <ul className="hero__proof" aria-label="Características de Flor Mía">
              <li>
                <MapPin size={16} aria-hidden="true" />
                Origen mendocino
              </li>
              <li>
                Aceite de oliva virgen extra, con primera extracción en frío
              </li>
              <li>Productos de alto valor nutricional</li>
            </ul>
          </div>
          <a href="#categories" className="hero__scroll-cue">
            Recorrer
            <span aria-hidden="true" />
          </a>
        </section>

        <section className="trust-strip" aria-labelledby="trust-title">
          <div className="container">
            <h2 id="trust-title" className="sr-only">
              Beneficios de comprar en Flor Mía
            </h2>
            <div className="trust-strip__items">
              {trustItems.map((item) => {
                const Icon = trustIcons[item.icon];
                const isActive = item.id === activeTrustItem;

                return (
                  <button
                    id={`trust-${item.id}-trigger`}
                    className={`trust-strip__item${isActive ? " is-active" : ""}`}
                    key={item.id}
                    type="button"
                    aria-expanded={isActive}
                    aria-controls="trust-detail-panel"
                    onClick={() =>
                      setActiveTrustItem((current) =>
                        current === item.id ? null : item.id,
                      )
                    }
                  >
                    <Icon
                      className="trust-strip__icon"
                      size={24}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="trust-strip__copy">
                      <strong>{item.title}</strong>
                      <small>{item.subtitle}</small>
                    </span>
                    <ChevronDown
                      className="trust-strip__chevron"
                      size={18}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
            <div
              id="trust-detail-panel"
              className="trust-strip__detail"
              role={selectedTrustItem ? "region" : undefined}
              aria-labelledby={
                selectedTrustItem
                  ? `trust-${selectedTrustItem.id}-trigger`
                  : undefined
              }
              hidden={!selectedTrustItem}
            >
              {selectedTrustItem ? (
                <>
                  <span>Más información</span>
                  <div>
                    <h3>{selectedTrustItem.title}</h3>
                    <p>{selectedTrustItem.detail}</p>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section category-section" id="categories">
          <div className="container">
            <SectionHeading
              eyebrow="TODO MENDOZA EN FLOR MÍA"
              title="Elegí por categoría."
              body="Entrá directo a lo que buscás o recorré una selección pensada para combinar productos."
            />
            <div className="category-grid">
              {categories.map((category) => (
                <Link
                  to={`/productos?categoria=${category.id}`}
                  className={`category-card ${category.featured ? "category-card--featured" : ""}`}
                  key={category.id}
                >
                  <PlaceholderImage
                    src={category.image}
                    alt=""
                    label={category.imageLabel}
                    aspectRatio={category.featured ? "16 / 10" : "4 / 5"}
                    sizes={
                      category.featured
                        ? "(max-width: 767px) 88vw, 60vw"
                        : "(max-width: 767px) 76vw, 30vw"
                    }
                  />
                  <div className="category-card__overlay" />
                  <div className="category-card__content">
                    {category.featured ? (
                      <span className="badge">Producto estrella</span>
                    ) : null}
                    <h3>{category.name}</h3>
                    <p>{category.subtitle}</p>
                    <span className="category-card__link">
                      Explorar
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section discovery-section" id="guided-discovery">
          <div className="container container--narrow">
            <SectionHeading
              eyebrow="ENCONTRÁ LO QUE BUSCÁS"
              title="Un sabor mendocino para cada momento."
              body="Buscá por producto, categoría, sabor, intensidad, uso u ocasión. No hace falta conocer todos los productos para encontrar el indicado."
              align="center"
            />
            <SearchExperience />
          </div>
        </section>

        <section className="section product-selection" id="best-sellers">
          <div className="container">
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="SELECCIÓN EDITORIAL · CATÁLOGO PENDIENTE"
                title="Favoritos de toda la tienda."
                body="Una selección rápida que combina las principales categorías. No representa un ranking de ventas."
              />
              <div className="carousel-controls" aria-label="Mover productos">
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => scrollProducts(-1)}
                  aria-label="Ver productos anteriores"
                >
                  <ArrowLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => scrollProducts(1)}
                  aria-label="Ver productos siguientes"
                >
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="container product-row" ref={productRowRef}>
            {products
              .filter((product) => product.editorialFeatured)
              .map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
          </div>
        </section>

        <section className="section oil-feature" id="olive-oil-feature">
          <div className="container oil-feature__grid">
            <PlaceholderImage
              src="/images/placeholders/destacado-aceites-flor-mia.webp"
              alt="Espacio reservado para botellas reales de distintas variedades de aceite Flor Mía"
              label="DESTACADO: colección de aceites Flor Mía"
              aspectRatio="16 / 10"
              sizes="(max-width: 900px) 100vw, 56vw"
            />
            <div className="oil-feature__content">
              <p className="eyebrow">NUESTRO PRODUCTO ESTRELLA</p>
              <h2>Aceites de oliva para distintas formas de disfrutar.</h2>
              <p>
                El aceite de oliva ocupa un lugar central en Flor Mía. Conocé
                sus varietales y perfiles para elegir con mayor claridad.
              </p>
              <ul className="proof-list">
                <li>Aceite de oliva virgen extra</li>
                <li>Seis varietales contemplados</li>
                <li>Perfiles técnicos sujetos a verificación real</li>
              </ul>
              <div className="button-row">
                <Link className="button" to="/productos?categoria=olive_oil">
                  Ver todos los aceites
                </Link>
                <a className="button button--secondary" href="#variety-explorer">
                  Encontrar mi variedad
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section variety-section" id="variety-explorer">
          <div className="container">
            <SectionHeading
              eyebrow="VARIETALES DE ACEITE"
              title="Distintos perfiles. La misma búsqueda de excelencia."
              body="Cada variedad puede expresar combinaciones diferentes de frutado, amargor y picor. Los perfiles publicados aquí son preliminares y están pendientes de validación."
            />
            <div className="variety-row">
              {oliveProfiles.map((profile) => (
                <article className="variety-card" key={profile.id}>
                  <PlaceholderImage
                    src={profile.image}
                    alt=""
                    label={`ACEITE: ${profile.name} + uso gastronómico`}
                    aspectRatio="4 / 5"
                    sizes="(max-width: 767px) 78vw, 31vw"
                  />
                  <div className="variety-card__content">
                    <span className="badge">Perfil por validar</span>
                    <h3>{profile.name}</h3>
                    <strong>{profile.descriptor}</strong>
                    <p>{profile.summary}</p>
                    <Link to={`/productos?q=${profile.name}`}>
                      Ver variedad
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section regional-showcase">
          <div className="container">
            <SectionHeading
              eyebrow="MÁS SABORES DE MENDOZA"
              title="Mucho más que aceite de oliva."
              body="Completá tu selección con frutos secos, aceitunas, mermeladas y sales."
            />
            <div className="regional-grid">
              {regionalShowcase.map((item) => (
                <Link
                  to={`/productos?categoria=${item.categoryId}`}
                  className="regional-card"
                  key={item.categoryId}
                >
                  <PlaceholderImage
                    src={item.image}
                    alt=""
                    label={`EDITORIAL: ${item.title.toLowerCase()} reales`}
                    aspectRatio="4 / 5"
                    sizes="(max-width: 767px) 86vw, 28vw"
                  />
                  <div className="regional-card__content">
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <span>{item.examples.join(" · ")}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section occasion-section">
          <div className="container">
            <SectionHeading
              eyebrow="ARMÁ TU SELECCIÓN"
              title="Productos que se disfrutan mejor juntos."
              body="Descubrí combinaciones por ocasión y agregá cada producto por separado, sin packs ni descuentos inventados."
            />
            <div className="occasion-layout">
              <PlaceholderImage
                src="/images/placeholders/mesa-mendocina-flor-mia.webp"
                alt="Espacio reservado para una mesa real con una selección de productos Flor Mía"
                label="OCASIÓN: mesa con combinación de productos Flor Mía"
                aspectRatio="16 / 10"
                sizes="(max-width: 900px) 100vw, 48vw"
              />
              <OccasionBuilder />
            </div>
          </div>
        </section>

        <section className="section story-section">
          <div className="container story-grid">
            <PlaceholderImage
              src="/images/placeholders/local-flor-mia-productos-mendocinos.webp"
              alt="Espacio reservado para una fotografía real del interior del local Flor Mía"
              label="LOCAL REAL: estanterías y productos Flor Mía"
              aspectRatio="4 / 5"
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <div className="story-content">
              <p className="eyebrow">DE MENDOZA A TU MESA</p>
              <h2>Una selección que representa nuestro origen.</h2>
              <p>
                Flor Mía reúne productos regionales mendocinos elegidos para
                acercar sabores de la provincia a la vida cotidiana, al local y
                a cada compra online.
              </p>
              <ul className="proof-list">
                <li>Productos regionales de Mendoza</li>
                <li>Selección cuidada</li>
                <li>Aceite de oliva como especialidad</li>
                <li>Fotografías e historia real pendientes de carga</li>
              </ul>
              <Link className="button button--secondary" to="/nosotros">
                Conocer Flor Mía
              </Link>
            </div>
          </div>
        </section>

        <section className="section comparison-section">
          <div className="container">
            <SectionHeading
              eyebrow="ELEGÍ TU ACEITE POR PERFIL"
              title="Compará los varietales antes de decidir."
              body="Elegí hasta tres aceites. Los valores técnicos se mostrarán cuando Flor Mía los valide."
            />
            <SensoryComparison />
          </div>
        </section>

        <section className="section reviews-section" id="opiniones">
          <div className="container">
            <SectionHeading
              eyebrow="OPINIONES REALES"
              title="Lo que dicen quienes ya eligieron Flor Mía."
              body="Este espacio está preparado para opiniones reales sobre productos, atención y experiencia en el local."
              align="center"
            />
            <div className="reviews-empty">
              <span className="badge">SIN CONTENIDO DEMO</span>
              <h3>Las reseñas todavía no fueron cargadas.</h3>
              <p>
                No publicamos testimonios de relleno. Se mostrarán aquí cuando
                Flor Mía comparta opiniones reales y autorizadas.
              </p>
            </div>
          </div>
        </section>

        <section className="section gallery-section">
          <div className="container">
            <div className="section-heading-row">
              <SectionHeading
                eyebrow="FLOR MÍA EN TU MESA"
                title="El local, los productos y las formas de disfrutarlos."
                body="La galería indica exactamente qué fotografías reales necesita cada espacio."
              />
              <a
                href={brand.instagram}
                className="button button--secondary"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={18} aria-hidden="true" />
                Ver Instagram
              </a>
            </div>
            <div className="gallery-grid">
              {gallerySlots.map((slot, index) => (
                <PlaceholderImage
                  key={slot.image}
                  src={slot.image}
                  alt={`Espacio reservado para fotografía real: ${slot.label}`}
                  label={`GALERÍA REAL: ${slot.label}`}
                  aspectRatio={
                    index % 3 === 0 ? "4 / 5" : index % 3 === 1 ? "1 / 1" : "3 / 4"
                  }
                  className={`gallery-item gallery-item--${index + 1}`}
                  sizes="(max-width: 767px) 46vw, 25vw"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section purchase-section" id="compra-clara">
          <div className="container">
            <SectionHeading
              eyebrow="COMPRA CLARA"
              title="Toda la información antes de pagar."
              body="La estructura está lista. Ninguna política comercial se publica hasta estar confirmada."
            />
            <div className="purchase-grid">
              {purchaseInformation.map((item) => {
                const Icon = purchaseIcons[item.icon];
                return (
                  <article className="purchase-card" key={item.title}>
                    <Icon aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <span>{item.linkLabel}</span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section recovery-section">
          <div className="container recovery-card">
            <div className="recovery-content">
              <p className="eyebrow">TU SELECCIÓN QUEDA GUARDADA</p>
              <h2>Combiná productos con calma. Tu carrito te espera.</h2>
              <p>
                Aceites, frutos secos, aceitunas, mermeladas y sales quedan
                guardados en este dispositivo para que continúes sin empezar de
                nuevo.
              </p>
              <ul className="proof-list">
                <li>Carrito persistente y multcategoría</li>
                <li>Producto, categoría, variante, formato y cantidad</li>
                <li>Checkout con progreso visible</li>
                <li>Sin recuperaciones ni mensajes sin consentimiento</li>
              </ul>
              <button
                type="button"
                className="button button--gold"
                onClick={() =>
                  document.querySelector(".cart-action")?.click()
                }
              >
                <ShoppingBag size={18} aria-hidden="true" />
                Ver mi selección
              </button>
            </div>
            <PlaceholderImage
              src="/images/placeholders/pack-flor-mia-regionales.webp"
              alt="Espacio reservado para una selección real de productos regionales Flor Mía"
              label="PACK REAL: combinación disponible de productos"
              aspectRatio="16 / 10"
              sizes="(max-width: 900px) 100vw, 46vw"
            />
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="container container--narrow">
            <SectionHeading
              eyebrow="PREGUNTAS FRECUENTES"
              title="Antes de elegir."
            />
            <div className="faq-list">
              {faqItems.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta">
          <PlaceholderImage
            src="/images/placeholders/cta-mesa-productos-mendoza.webp"
            alt="Espacio reservado para una mesa real con productos regionales Flor Mía"
            label="CTA: mesa regional mendocina con aceite protagonista"
            aspectRatio="21 / 9"
            sizes="100vw"
            className="final-cta__image"
            showCaption
          />
          <div className="final-cta__overlay" />
          <div className="container final-cta__content">
            <p className="eyebrow">DESCUBRÍ FLOR MÍA</p>
            <h2>Llevá los sabores de Mendoza a tu mesa.</h2>
            <div className="button-row">
              <Link className="button" to="/productos">
                Explorar productos
              </Link>
              {brand.contact.whatsappUrl ? (
                <a
                  className="button button--secondary"
                  href={brand.contact.whatsappUrl}
                >
                  Hablar por WhatsApp
                </a>
              ) : (
                <span className="button button--secondary is-disabled">
                  WhatsApp pendiente
                </span>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
