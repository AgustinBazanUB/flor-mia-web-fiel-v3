import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { categories } from "../src/data/categories.js";
import { products } from "../src/data/products.js";
import { oliveProfiles } from "../src/data/oliveProfiles.js";
import { trustItems } from "../src/data/brand.js";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(currentDirectory, "..");

test("los identificadores y slugs del catálogo son únicos", () => {
  assert.equal(new Set(categories.map((item) => item.id)).size, categories.length);
  assert.equal(new Set(products.map((item) => item.id)).size, products.length);
  assert.equal(new Set(products.map((item) => item.slug)).size, products.length);
});

test("cada producto pertenece a una categoría existente", () => {
  const categoryIds = new Set(categories.map((category) => category.id));
  for (const product of products) {
    assert.equal(categoryIds.has(product.categoryId), true, product.id);
  }
});

test("los datos comerciales desconocidos permanecen explícitamente pendientes", () => {
  for (const product of products) {
    assert.equal(product.price, null, `${product.id} no debe inventar precio`);
    assert.equal(product.stock, "unknown", `${product.id} no debe inventar stock`);
    assert.equal(product.dataStatus, "pending");
  }
});

test("todos los productos y varietales tienen un placeholder local", () => {
  for (const item of [...products, ...oliveProfiles]) {
    const relative = item.image.replace(/^\//, "");
    assert.equal(
      existsSync(resolve(projectRoot, "public", relative.replace(/^images\//, "images/"))),
      true,
      relative,
    );
  }
});

test("las seis categorías y los seis varietales requeridos están presentes", () => {
  assert.equal(categories.length, 6);
  assert.deepEqual(
    oliveProfiles.map((profile) => profile.name),
    ["Arbequina", "Arbosana", "Blend", "Coratina", "Picual", "Arauco"],
  );
});

test("los cuatro beneficios comerciales tienen contenido desplegable", () => {
  assert.equal(trustItems.length, 4);
  assert.equal(trustItems[0].title, "Envío sin cargo");
  assert.equal(trustItems[0].subtitle, "En el AMBA");
  assert.equal(trustItems[1].title, "Hasta 3 cuotas sin interés");
  assert.equal(trustItems[1].subtitle, "Miércoles y sábados");

  for (const item of trustItems) {
    assert.ok(item.id);
    assert.ok(item.icon);
    assert.ok(item.title);
    assert.ok(item.subtitle);
    assert.ok(item.detail);
  }
});
