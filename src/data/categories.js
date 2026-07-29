export const categories = [
  {
    id: "olive_oil",
    slug: "aceites",
    name: "Aceites de oliva",
    shortName: "Aceites",
    subtitle: "La gran especialidad de Flor Mía",
    description:
      "Varietales con perfiles diferentes para descubrir, comparar y disfrutar.",
    status: "principal",
    featured: true,
    image: "/images/placeholders/categoria-aceites-de-oliva.webp",
    imageLabel: "CATEGORÍA: botellas reales de aceite Flor Mía",
    facets: ["variedad", "intensidad", "uso", "tamaño"],
  },
  {
    id: "nuts",
    slug: "frutos-secos",
    name: "Frutos secos",
    shortName: "Frutos secos",
    subtitle: "Almendras, pistachos y pasas",
    description:
      "Opciones naturales, tostadas y saladas en formatos a confirmar.",
    status: "principal",
    image: "/images/placeholders/categoria-frutos-secos.webp",
    imageLabel: "CATEGORÍA: almendras, pistachos y pasas reales",
    facets: ["tipo", "preparación", "sal", "cáscara", "uso", "tamaño"],
  },
  {
    id: "olives",
    slug: "aceitunas",
    name: "Aceitunas",
    shortName: "Aceitunas",
    subtitle: "Verdes, negras, griegas y descarozadas",
    description:
      "Una selección para la mesa, la picada y preparaciones cotidianas.",
    status: "principal",
    image: "/images/placeholders/categoria-aceitunas.webp",
    imageLabel: "CATEGORÍA: aceitunas verdes, negras y griegas",
    facets: ["variedad", "color", "carozo", "uso", "tamaño"],
  },
  {
    id: "jams",
    slug: "mermeladas",
    name: "Mermeladas",
    shortName: "Mermeladas",
    subtitle: "Sabores para desayunos, tablas y regalos",
    description:
      "Los sabores reales del catálogo se incorporarán sin inventar variedades.",
    status: "principal",
    image: "/images/placeholders/categoria-mermeladas.webp",
    imageLabel: "CATEGORÍA: frascos reales de mermeladas",
    facets: ["sabor", "fruta", "uso", "tamaño"],
  },
  {
    id: "seasoned_salts",
    slug: "sales",
    name: "Sales condimentadas",
    shortName: "Sales",
    subtitle: "Malbec, ajo y variedades reales",
    description:
      "Condimentos mendocinos para terminar platos y sumar carácter.",
    status: "complementaria",
    image: "/images/placeholders/categoria-sales-condimentadas.webp",
    imageLabel: "CATEGORÍA: sales con Malbec, ajo y variedades reales",
    facets: ["sabor", "intensidad", "uso", "tamaño"],
  },
  {
    id: "gifts",
    slug: "regalos",
    name: "Regalos y combinaciones",
    shortName: "Regalos",
    subtitle: "Sabores mendocinos para compartir",
    description:
      "Este espacio mostrará únicamente packs y opciones realmente disponibles.",
    status: "estrategica",
    image: "/images/placeholders/categoria-regalos-mendocinos.webp",
    imageLabel: "CATEGORÍA: regalo o combinación real Flor Mía",
    facets: ["ocasión", "formato"],
  },
];

export const categoryById = Object.fromEntries(
  categories.map((category) => [category.id, category]),
);
