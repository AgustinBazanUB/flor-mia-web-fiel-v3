export default function AnnouncementBar() {
  return (
    <div className="announcement-bar" aria-label="Información de la tienda">
      <p>
        Productos regionales de Mendoza
        <span aria-hidden="true"> · </span>
        <span className="announcement-detail">
          Aceites, frutos secos y sabores seleccionados
        </span>
      </p>
    </div>
  );
}
