import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({
  image,
  name,
  price,
  currency = "USD",
  variants = [],
  inStock = true,
  onAddToCart = () => {},
  buyHref,
}) => {
  const [selectedVariant, setSelectedVariant] = React.useState(
    variants[0] ?? ""
  );

  const priceLabel = React.useMemo(() => {
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
      }).format(Number(price));
    } catch {
      return `$${Number(price).toFixed(2)}`;
    }
  }, [price, currency]);

  return (
    <div className="card h-100 shadow-sm d-flex">
      {/* Square image */}
      <div className="ratio ratio-1x1 bg-light d-flex align-items-center justify-content-center">
        <img
          src={image}
          alt={name}
          className="img-fluid p-3"
          style={{ objectFit: "contain", maxHeight: "100%", maxWidth: "100%" }}
          loading="lazy"
        />
      </div>

      <div className="card-body d-flex flex-column gap-2">
        <h5 className="card-title mb-0 text-truncate" title={name}>
          {name}
        </h5>

        <p className="text-secondary fw-semibold mb-2">{priceLabel}</p>

        {variants.length > 0 && (
          <select
            className="form-select mb-2"
            aria-label="Choose variant"
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            disabled={!inStock}
          >
            {variants.map((variant, idx) => (
              <option key={idx} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        )}

        {/* Actions pinned to bottom */}
        <div className="mt-auto d-grid gap-2">
          <button
            type="button"
            className={`btn ${
              inStock ? "btn-success" : "btn-outline-secondary disabled"
            }`}
            onClick={
              inStock ? () => onAddToCart(selectedVariant || null) : undefined
            }
            disabled={!inStock}
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>

          <Link
            to={inStock && buyHref ? buyHref : "#"}
            className={`btn btn-primary ${!inStock ? "disabled" : ""}`}
            aria-disabled={!inStock}
            onClick={(e) => {
              if (!inStock) e.preventDefault();
            }}
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  currency: PropTypes.string,
  variants: PropTypes.array,
  inStock: PropTypes.bool,
  onAddToCart: PropTypes.func,
  buyHref: PropTypes.string,
};

export default ProductCard;
