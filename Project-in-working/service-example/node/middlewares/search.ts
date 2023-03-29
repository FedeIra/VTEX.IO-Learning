import { json } from 'co-body' // para parsear el body de neustro request
import axios from 'axios'

export async function search(ctx: Context, next: () => Promise<any>) {
  const body = await json(ctx.req) //? parseamos el body del request a json para poder acceder a sus propiedades y valores

  const {
    client: { email },
  } = body //? obtenemos el email del cliente que nos envia el request en el body del request (en este caso)

  console.log(email)

  const http = axios.create({
    headers: {
      VtexIdAuthCookie: ctx.vtex.authToken,
      'REST-Range': 'resources=0-1',
      'Cache-Control': 'no-cache',
      'X-Vtex-Use-Https': true,
    },
  })

  const { data } = await http.get(
    `http://${ctx.vtex.account}.myvtex.com/api/dataentities/itglobers/search?_schema=itglobers_schema&_fields=_all&email=${email}`
  ) //? se realiza una petición a la API de vtex (API de giftcardproviders) para obtener el balance de la giftcard del cliente que nos envia el request en el body del request (en este caso) y se parsea el response a json para poder acceder a sus propiedades y valores (data)

  const response = [
    {
      id: `${data[0].id}`,
      provider: `itglobers`,
      balance: data[0].balance,
      totalBalance: data[0].balance,
      groupName: `itglobers`,
      _self: { href: `${ctx.vtex.account}giftcardproviders/itglobers` },
    },
  ]

  console.log(response)

  ctx.status = 200
  ctx.body = response
  ctx.set('Cache-Control', `no-cache`) //? se establece el header de cache-control para que no se almacene en cache el response de la petición a la API de vtex (API de giftcardproviders)

  await next() //? se ejecuta el siguiente middleware
}
