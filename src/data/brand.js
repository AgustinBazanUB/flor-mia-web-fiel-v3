export const brand = {
  name: "Flor Mía",
  tagline: "De Mendoza a tu mesa.",
  description:
    "Tienda premium de productos regionales mendocinos, con el aceite de oliva como gran especialidad.",
  instagram: "https://www.instagram.com/flormia.mdz/",
  contact: {
    whatsapp: null,
    whatsappUrl: null,
    email: null,
    address: null,
    openingHours: null,
  },
};

export const navigation = [
  { label: "Aceites", to: "/productos?categoria=olive_oil" },
  { label: "Frutos secos", to: "/productos?categoria=nuts" },
  { label: "Aceitunas", to: "/productos?categoria=olives" },
  { label: "Mermeladas y sales", to: "/productos?categoria=jams" },
  { label: "Regalos", to: "/productos?categoria=gifts" },
  { label: "Nuestra historia", to: "/nosotros" },
];

export const trustItems = [
  "Origen Mendoza",
  "Aceite de oliva virgen extra",
  "Productos regionales seleccionados",
  "Atención personalizada",
];

export const purchaseInformation = [
  {
    icon: "truck",
    title: "Envíos",
    text: "Zonas, costos, plazos y restricciones pendientes de confirmación.",
    linkLabel: "Información pendiente",
  },
  {
    icon: "store",
    title: "Retiro en el local",
    text: "Dirección, horarios y tiempo de preparación pendientes de confirmación.",
    linkLabel: "Información pendiente",
  },
  {
    icon: "credit-card",
    title: "Medios de pago",
    text: "Los medios y condiciones se publicarán cuando estén integrados.",
    linkLabel: "Integración pendiente",
  },
  {
    icon: "package-check",
    title: "Estado y cuidado",
    text: "Las condiciones de cambios, roturas y faltantes se informarán aquí.",
    linkLabel: "Política pendiente",
  },
];
