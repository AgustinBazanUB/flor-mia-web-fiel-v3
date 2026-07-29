import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import SearchExperience from "./SearchExperience";

export default function SearchModal({ open, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousFocus = document.activeElement;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("no-scroll");

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("no-scroll");
      previousFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-layer search-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Buscar en Flor Mía"
      ref={dialogRef}
    >
      <button
        type="button"
        className="modal-backdrop"
        onClick={onClose}
        aria-label="Cerrar buscador"
      />
      <div className="search-modal__panel">
        <div className="search-modal__header">
          <div>
            <p className="eyebrow">BÚSQUEDA GLOBAL</p>
            <h2>Encontrá tu sabor.</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Cerrar buscador"
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <SearchExperience
          autofocus
          showQuickFilters={false}
          onNavigate={onClose}
        />
      </div>
    </div>
  );
}
