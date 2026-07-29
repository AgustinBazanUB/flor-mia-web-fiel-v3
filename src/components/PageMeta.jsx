import { useEffect } from "react";

const defaultDescription =
  "Descubrí aceites de oliva, frutos secos, aceitunas, mermeladas, sales y productos regionales seleccionados de Mendoza en Flor Mía.";

export default function PageMeta({ title, description = defaultDescription }) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content");
    meta?.setAttribute("content", description);

    return () => {
      document.title = previousTitle;
      if (previousDescription) meta?.setAttribute("content", previousDescription);
    };
  }, [title, description]);

  return null;
}
