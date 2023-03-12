import { json } from 'co-body'
import axios from 'axios'

export async function transactions(ctx: Context, next: () => Promise<any>) {
  const body = await json(ctx.req)

  const {
    vtex: {
      route: { params },
    },
  } = ctx

  const { id } = params //? obtenemos el id de la giftcard que nos envia el request en el path del request (en este caso)

  const http = axios.create({
    headers: {
      VtexIdAuthCookie: ctx.VtexIdAuthCookie,
      'REST-Range': 'resources=0-1',
      'Cache-Control': 'no-cache',
      'X-Vtex-Use-Https': true,
    },
  })

  const { data } = await http.get(
    `http://${ctx.vtex.account}.myvtex.com/api/dataentities/itglobers/documents/${id}?_fields=all`
  )

  ctx.state.transactionData = data //? se guarda la información de la giftcard en el state del contexto
  ctx.state.transactionData.transaction = body //? se guarda la información de la transacción en el state del contexto

  await next()
}
