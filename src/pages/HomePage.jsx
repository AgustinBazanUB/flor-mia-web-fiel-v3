import {
  BadgeCheck,
  CreditCard,
  Droplets,
  Gift,
  Grape,
  HeartHandshake,
  Leaf,
  MapPin,
  PackageCheck,
  Sprout,
  Truck,
  UsersRound,
} from "lucide-react";
import { Link } from "../router";
import { assetsManifest, getCategoryAsset } from "../data/assetsManifest";
import { brand } from "../data/brand";
import { categories } from "../data/categories";
import { oliveProfiles } from "../data/oliveProfiles";
import { products } from "../data/products";
import { promotions } from "../data/promotions";
import PageMeta from "../components/PageMeta";
import ProductCard from "../components/ProductCard";

const categoryIcons = {
  olive_oil: Droplets,
  nuts: Sprout,
  olives: Grape,
  jams: Leaf,
  seasoned_salts: PackageCheck,
  gifts: Gift,
};

const promotionIcons = {
  truck: Truck,
  "credit-card": CreditCard,
};

const storyValues = [
  { label: "Productos mendocinos", Icon: Grape },
  { label: "Selección cuidada", Icon: UsersRound },
  { label: "Tradición y calidad", Icon: Sprout },
  { label: "Pasión por lo natural", Icon: HeartHandshake },
];

const tableProducts = [
  [assetsManifest.products.oliveOil2L, "fm-table-scene__oil"],
  [assetsManifest.products.greekOlives, "fm-table-scene__olives"],
  [assetsManifest.products.almonds500g, "fm-table-scene__almonds"],
  [assetsManifest.products.bazanWine, "fm-table-scene__wine"],
  [assetsManifest.products.pearJam, "fm-table-scene__jam"],
  [assetsManifest.products.malbecSalt, "fm-table-scene__salt"],
];

function ResponsiveStorefront({ className = "", story = false }) {
  const asset = story ? assetsManifest.local.story : assetsManifest.local.hero;

  if (story) {
    return (
      <img
        className={className}
        src={asset.src}
        width={asset.width}
        height={asset.height}
        alt={asset.alt}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <picture className={className}>
      <source srcSet={asset.srcSet} sizes={asset.sizes} type="image/webp" />
      <img
        src={asset.fallback}
        width={asset.width}
        height={asset.height}
        alt={asset.alt}
        fetchpriority="high"
        decoding="async"
      />
    </picture>
  );
}

function CategoryArtwork({ category }) {
  const asset = getCategoryAsset(category.id);

  if (category.composition) {
    return (
      <span className="fm-category-card__gift-collage" aria-hidden="true">
        {category.compositionImages.map((image) => (
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt=""
            loading="lazy"
            decoding="async"
            key={image.src}
          />
        ))}
      </span>
    );
  }

  return asset ? (
    <img
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt={asset.alt}
      loading="lazy"
      decoding="async"
    />
  ) : (
    <span className="fm-category-card__missing" aria-hidden="true" />
  );
}

export default function HomePage() {
  const featuredProducts = products
    .filter((product) => product.editorialFeatured)
    .slice(0, 6);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: brand.name,
        url: window.location.origin,
        logo: `${window.location.origin}${assetsManifest.brand.logo.src}`,
        ...(brand.instagram ? { sameAs: [brand.instagram] } : {}),
      },
      {
        "@type": "WebSite",
        name: brand.name,
        url: window.location.origin,
        potentialAction: {
          "@type": "SearchAction",
          target: `${window.location.origin}/productos?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "CollectionPage",
        name: "Productos regionales de Mendoza",
        url: window.location.href,
      },
    ],
  };

  return (
    <>
      <PageMeta
        title="Flor Mía | Productos Regionales de Mendoza"
        description="Descubrí aceites de oliva, frutos secos, aceitunas, mermeladas, sales y otros productos regionales mendocinos seleccionados por Flor Mía."
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <main id="main-content" className="fm-home">
        <section className="fm-hero" aria-labelledby="hero-title">
          <ResponsiveStorefront className="fm-hero__media" />
          <div className="fm-hero__shade" aria-hidden="true" />
          <div className="fm-page fm-hero__inner">
            <div className="fm-hero__copy">
              <p className="fm-kicker fm-kicker--line">DE MENDOZA A TU MESA</p>
              <h1 id="hero-title">
                Los sabores de <span>Mendoza</span>, en un solo lugar.
              </h1>
              <p className="fm-hero__description">
                Seleccionamos lo mejor de nuestra tierra: aceites de oliva,
                frutos secos, aceitunas, mermeladas, sales y vinos para
                disfrutar la esencia de Mendoza todos los días.
              </p>
              <div className="fm-hero__actions">
                <Link className="fm-button fm-button--gold" to="/productos">
                  EXPLORAR TIENDA
                </Link>
                <Link
                  className="fm-button fm-button--outline"
                  to="/productos?categoria=olive_oil"
                >
                  VER ACEITES
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="fm-promotions" aria-labelledby="promotions-title">
          <h2 className="sr-only" id="promotions-title">
            Promociones vigentes
          </h2>
          <div className="fm-page fm-promotions__frame">
            {promotions.map(({ id, icon, title, subtitle }) => {
              const Icon = promotionIcons[icon];
              return (
                <article className="fm-promotion" key={id}>
                  <Icon aria-hidden="true" strokeWidth={1.35} />
                  <div>
                    <h3>{title}</h3>
                    <p>{subtitle}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          className="fm-categories"
          id="categorias"
          aria-labelledby="categories-title"
        >
          <div className="fm-page">
            <div className="fm-rule-heading">
              <span aria-hidden="true" />
              <h2 id="categories-title">DESCUBRÍ NUESTRAS CATEGORÍAS</h2>
              <span aria-hidden="true" />
            </div>
            <div className="fm-category-grid">
              {categories.map((category) => {
                const Icon = categoryIcons[category.id] ?? Leaf;
                return (
                  <Link
                    className="fm-category-card"
                    to={`/productos?categoria=${category.id}`}
                    key={category.id}
                  >
                    <span className="fm-category-card__media">
                      <CategoryArtwork category={category} />
                    </span>
                    <span className="fm-category-card__icon">
                      <Icon size={20} strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <span className="fm-category-card__label">
                      {category.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="fm-featured"
          id="destacados"
          aria-labelledby="featured-title"
        >
          <div className="fm-page">
            <div className="fm-rule-heading fm-rule-heading--dark">
              <span aria-hidden="true" />
              <h2 id="featured-title">PRODUCTOS DESTACADOS</h2>
              <span aria-hidden="true" />
            </div>
            <div className="fm-featured-grid">
              {featuredProducts.map((product) => (
                <ProductCard product={product} compact key={product.id} />
              ))}
            </div>
          </div>
        </section>

        <section
          className="fm-oil-guide"
          id="guia-aceites"
          aria-labelledby="oil-guide-title"
        >
          <div className="fm-page fm-oil-guide__layout">
            <div className="fm-oil-guide__intro">
              <img
                className="fm-oil-guide__decor"
                src={assetsManifest.products.oliveOilTrio500cc.src}
                width={assetsManifest.products.oliveOilTrio500cc.width}
                height={assetsManifest.products.oliveOilTrio500cc.height}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <div className="fm-oil-guide__copy">
                <p className="fm-kicker">ACEITES DE OLIVA SELECCIONADOS</p>
                <h2 id="oil-guide-title">
                  Elegí el aceite que mejor va con vos.
                </h2>
                <p>
                  Descubrí nuestras variedades y encontrá el perfil ideal para
                  cada momento.
                </p>
                <Link
                  className="fm-button fm-button--gold"
                  to="/productos?categoria=olive_oil"
                >
                  VER TODOS LOS ACEITES
                </Link>
              </div>
            </div>

            <div className="fm-oil-guide__selector">
              <div className="fm-guide-title">
                <span>GUÍA DE INTENSIDAD</span>
                <i aria-hidden="true" />
              </div>
              <div className="fm-intensity" aria-label="Escala de intensidad">
                <span><Leaf size={16} aria-hidden="true" /> SUAVE</span>
                <span><Sprout size={16} aria-hidden="true" /> MEDIO</span>
                <span><Grape size={16} aria-hidden="true" /> INTENSO</span>
              </div>
              <div className="fm-variety-grid">
                {oliveProfiles.map((profile) => (
                  <article className="fm-variety-card" key={profile.id}>
                    <img
                      src={profile.image}
                      alt={
                        profile.imageStatus === "verified-product"
                          ? `Botella real de aceite Flor Mía variedad ${profile.name}`
                          : `Fotografía editorial de aceites Flor Mía; imagen específica de ${profile.name} pendiente`
                      }
                      width="900"
                      height="1350"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <h3>{profile.name}</h3>
                      <p>{profile.descriptor ?? "Perfil por validar"}</p>
                    </div>
                  </article>
                ))}
              </div>
              <ul className="fm-guide-badges" aria-label="Características">
                <li><PackageCheck size={19} aria-hidden="true" /> Productos reales</li>
                <li><BadgeCheck size={19} aria-hidden="true" /> Perfiles editables</li>
                <li><MapPin size={19} aria-hidden="true" /> Selección mendocina</li>
              </ul>
            </div>
          </div>
        </section>

        <section
          className="fm-table"
          id="mesa-mendocina"
          aria-labelledby="table-title"
        >
          <div className="fm-page fm-table__layout">
            <div className="fm-table__copy">
              <h2 id="table-title">ARMÁ TU<br />MESA MENDOCINA</h2>
              <p>
                Combiná lo mejor de nuestra tierra y convertí cada comida en
                una experiencia única. Descubrí sabores que se disfrutan y se
                comparten.
              </p>
              <Link className="fm-button fm-button--dark" to="/productos">
                VER SUGERENCIAS
              </Link>
            </div>
            <div className="fm-table-scene" aria-label="Selección de productos reales Flor Mía">
              {tableProducts.map(([asset, className]) => (
                <img
                  className={className}
                  src={asset.src}
                  width={asset.width}
                  height={asset.height}
                  alt={asset.alt}
                  loading="lazy"
                  decoding="async"
                  key={className}
                />
              ))}
              <span className="fm-table-scene__branch" aria-hidden="true">❧</span>
            </div>
          </div>
        </section>

        <section
          className="fm-story"
          id="historia"
          aria-labelledby="story-title"
        >
          <div className="fm-page fm-story__layout">
            <ResponsiveStorefront className="fm-story__image" story />
            <div className="fm-story__copy">
              <p className="fm-kicker">NUESTRA HISTORIA</p>
              <h2 id="story-title">De nuestra tienda a tu mesa.</h2>
              <p>
                Flor Mía acerca los sabores de Mendoza a través de una
                selección cuidada de productos regionales.
              </p>
              <ul className="fm-story-values">
                {storyValues.map(({ label, Icon }) => (
                  <li key={label}>
                    <Icon size={31} strokeWidth={1.25} aria-hidden="true" />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
