import { useCallback, useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { Link, useLocation } from "../router";
import { navigation } from "../data/brand";
import { useCart } from "../context/CartContext";
import SearchModal from "./SearchModal";

export default function Header() {
  const location = useLocation();
  const { unitCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <header
        className={`site-header ${isHome ? "site-header--overlay" : "site-header--solid"} ${scrolled ? "is-scrolled" : ""}`}
      >
        <div className="site-header__inner">
          <Link className="wordmark" to="/" aria-label="Flor Mía, inicio">
            flor mía
          </Link>

          <nav className="desktop-nav" aria-label="Navegación principal">
            {navigation.map((item) => (
              <Link to={item.to} key={item.label}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="header-action"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar productos"
            >
              <Search aria-hidden="true" />
              <span className="desktop-only">Buscar</span>
            </button>
            <button
              type="button"
              className="header-action cart-action"
              onClick={openCart}
              aria-label={`Abrir carrito, ${unitCount} ${unitCount === 1 ? "producto" : "productos"}`}
            >
              <ShoppingBag aria-hidden="true" />
              <span className="cart-count">{unitCount}</span>
            </button>
            <Link className="button button--small desktop-only" to="/productos">
              Comprar
            </Link>
            <button
              type="button"
              className="header-action mobile-menu-button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav
            className="mobile-nav"
            id="mobile-navigation"
            aria-label="Navegación móvil"
          >
            {navigation.map((item) => (
              <Link to={item.to} key={item.label}>
                {item.label}
              </Link>
            ))}
            <Link className="button" to="/productos">
              Explorar todos los productos
            </Link>
          </nav>
        ) : null}
      </header>
      <SearchModal open={searchOpen} onClose={closeSearch} />
    </>
  );
}
