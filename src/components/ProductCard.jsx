import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Plus } from "lucide-react";
import { Link } from "../router";
import { categoryById } from "../data/categories";
import { useCart } from "../context/CartContext";
import PlaceholderImage from "./PlaceholderImage";

function formatPrice(price) {
  if (typeof price !== "number") return "Precio pendiente";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ProductCard({ product, compact = false }) {
  const { addItem } = useCart();
  const [format, setFormat] = useState(product.formats?.[0] ?? "");
  const [added, setAdded] = useState(false);
  const category = categoryById[product.categoryId];

  useEffect(() => {
    if (!added) return undefined;
    const timeout = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [added]);

  const onAdd = () => {
    addItem(product, {
      format,
      variant:
        product.attributes?.variety ?? product.attributes?.flavor ?? "",
    });
    setAdded(true);
  };

  return (
    <article className={`product-card ${compact ? "product-card--compact" : ""}`}>
      <Link
        to={`/producto/${product.slug}`}
        className="product-card__image-link"
        aria-label={`Ver ${product.name}`}
      >
        <PlaceholderImage
          src={product.image}
          alt={`Espacio reservado para la fotografía real de ${product.name}`}
          label={`PRODUCTO REAL: ${category?.shortName ?? "Categoría"} · ${product.name}`}
          aspectRatio="4 / 5"
          sizes="(max-width: 767px) 82vw, (max-width: 1099px) 42vw, 29vw"
        />
      </Link>

      <div className="product-card__content">
        <div className="product-card__meta">
          <span>{category?.name}</span>
          {product.badge ? <span className="badge">{product.badge}</span> : null}
        </div>

        <div>
          <h3>
            <Link to={`/producto/${product.slug}`}>
              {product.name}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </h3>
          <p>{product.description}</p>
        </div>

        {!compact && product.formats?.length ? (
          <label className="field-label product-card__format">
            Presentación
            <select
              value={format}
              onChange={(event) => setFormat(event.target.value)}
              aria-label={`Presentación de ${product.name}`}
            >
              {product.formats.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <span className="product-card__format-text">{format}</span>
        )}

        <div className="product-card__purchase">
          <div>
            <strong>{formatPrice(product.price)}</strong>
            <small>Stock a confirmar</small>
          </div>
          <button
            className={`icon-button product-card__add ${added ? "is-added" : ""}`}
            type="button"
            onClick={onAdd}
            aria-label={`Agregar ${product.name} a la selección`}
          >
            {added ? (
              <Check size={19} aria-hidden="true" />
            ) : (
              <Plus size={19} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
