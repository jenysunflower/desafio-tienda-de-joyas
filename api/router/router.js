import { Router } from "express";
import {
  renderJoyasHATEOAS,
  getCategorias,
  getJoyabyId,
} from "../controllers/index.js";

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/joyas");
});

// 1. Crear una ruta GET /joyas que devuelva la estructura HATEOAS de todas las joyas almacenadas en la base de datos. (1 Punto)
// ---PASO1 PUNTO 1---He creado la siguiente ruta que cumple con lo solicitado:
router.get("/joyas", renderJoyasHATEOAS);

// 2. Crear una ruta GET /joyas/categoria/:categoria que devuelva solo las joyas correspondientes a la categoría obtenida. (2 Puntos)
// ---PASO 1 PUNTO 2---He creado la siguiente ruta que cumple con lo solicitado:
router.get("/joyas/categoria/:categoria", getCategorias);

router.get("/joyas/categoria", (req, res) => {
  res.send("Debes ingresar una categoria en /joyas/categoria/:categoria");
});

router.get("/joyas/id/:id", getJoyabyId);
export default router;
