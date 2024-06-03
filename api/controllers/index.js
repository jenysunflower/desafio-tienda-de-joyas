import {
  HATEOAS,
  filtrarData,
  orderData,
  paginationData,
} from "../queries/consultas.js";
import { joyas } from "../data/data.js";

// ---PASO 2 PUNTO 1---Para lo cual utilizo la siguiente función:
export function renderJoyasHATEOAS(req, res) {
  const { order, page, ...queryParams } = req.query;
  try {
    if (Object.keys(req.query).length == 0) {
      res.json(HATEOAS(joyas));
    } else {
      const joyasOrdenadas = orderData(joyas, order);
      const joyasPaginadas = paginationData(joyasOrdenadas, page);
      const joyasFiltradas = filtrarData(joyasPaginadas, queryParams);

//       4. Crear una ruta que devuelva como payload un JSON con un mensaje de error cuando el usuario consulte el id de una joya que no exista. (1 Punto)
// ---PASO 1 PUNTO 4---Cuando se consulta un id que no existe muestro lo siguiente:
      if (joyasFiltradas.length == 0) {
        res.json({
          error: "404 Not Found",
          message: "No hay joyas que coincidan con los parámetros de búsqueda",
        });
        return;
      }
      res.json(HATEOAS(joyasFiltradas, page));
    }
  } catch (error) {
    res.json(error);
  }
}

// ---PASO 2 PUNTO 2---Para lo cual utilizo la siguiente función getCategorias:
export function getCategorias(req, res) {
  try {
    const { categoria } = req.params;
    const categoriaFiltrada = joyas.filter(
      (joya) => joya.category === categoria,
    );
    res.json({ results: categoriaFiltrada });
  } catch (error) {
    res.send("Error", error);
  }
}

// ---PASO 2 PUNTO 4---El cual incluyo en el siguiente middleware:
export function getJoyabyId(req, res) {
  try {
    const { id } = req.params;

    const joya = joyas.find((joya) => joya.id === +id);
    if (Object.keys(joya) !== 0) {
      res.json({ results: joya });
    } else {
      throw new Error(
        "No hay joyas que coincidan con los parámetros de búsqueda",
      );
    }
  } catch (error) {
    res.json({
      error: "404 Not Found",
      message: "No hay joyas que coincidan con los parámetros de búsqueda",
    });
  }
}
