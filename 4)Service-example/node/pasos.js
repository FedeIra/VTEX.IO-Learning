//! PASOS PARA ARMAR UNA API:
/*
*1) Ajustar el manifest.json (name, vendor y policies),
*2) Agregar axios al package json de la carperta node,
*3) Agregar a service.json las nuevas rutas a API que quiera usar: Ej:
"card": {
      "path": "/_v/itglobers/giftcards/:id",
      "public": true
    },
*4) Crear middleware de la función (search.ts)
Para eso importamos json y axion.
*5) Crear middleware de la función (search.ts)
*6) En el index.ts en node importamos los middlewares y definimos el servicio en new Service
*) Creo primero el middleware de search y luego el de transactions
*/
