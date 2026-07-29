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
  {
    id: "shipping-amba",
    icon: "truck",
    title: "Envío sin cargo",
    subtitle: "En el AMBA",
    detail:
      "El envío no tiene cargo dentro del AMBA. Al coordinar la compra, confirmamos que tu domicilio esté incluido en la zona de entrega.",
  },
  {
    id: "installments",
    icon: "credit-card",
    title: "Hasta 3 cuotas sin interés",
    subtitle: "Miércoles y sábados",
    detail:
      "Los miércoles y sábados podés abonar en hasta 3 cuotas sin interés. La modalidad de pago se coordina antes de confirmar el pedido.",
  },
  {
    id: "producer-to-table",
    icon: "sprout",
    title: "Del productor a tu mesa",
    subtitle: "Directo del productor a tu mesa",
    detail:
      "Acercamos a tu mesa una selección de productos mendocinos directamente de sus productores, cuidando el origen y la elección de cada producto.",
  },
  {
    id: "personal-service",
    icon: "heart-handshake",
    title: "Atención personalizada",
    subtitle: "Te ayudamos a elegir",
    detail:
      "Te acompañamos para elegir según tus gustos, el uso o la ocasión: consumo diario, picadas, regalos y más.",
  },
];

export const purchaseInformation = [
  {
    icon: "truck",
    title: "Envíos",
    text: "Sin cargo dentro del AMBA. La cobertura exacta se confirma antes de coordinar la entrega.",
    linkLabel: "Ver condiciones",
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
    text: "Hasta 3 cuotas sin interés los miércoles y sábados. El checkout online todavía no procesa cobros.",
    linkLabel: "Ver modalidad",
  },
  {
    icon: "package-check",
    title: "Estado y cuidado",
    text: "Las condiciones de cambios, roturas y faltantes se informarán aquí.",
    linkLabel: "Política pendiente",
  },
];
