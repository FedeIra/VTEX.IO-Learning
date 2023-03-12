import axios from 'axios'

export async function transactions_update(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: {
      route: { params },
    },
  } = ctx //? obtenemos el id de la giftcard que nos envia el request en el path del request (en este caso)

  const { id } = params

  const balance =
    ctx.state.transactionData.balance -
    ctx.state.transactionData.transaction.balance

  console.log(balance)

  const http = axios.create({
    headers: {
      VtexIdAuthCookie: ctx.VtexIdAuthCookie,
      'REST-Range': 'resources=0-1',
      'Cache-Control': 'no-cache',
      'X-Vtex-Use-Https': true,
    },
  })

  const {
    data,
  } = await http.patch(
    `http://${ctx.vtex.account}.myvtex.com/api/dataentities/itglobers/documents/${id}`,
    { balance }
  )

  console.log(data)

  ctx.status = 200
  ctx.body = { balance }
  ctx.set('Cache-Control', `no-cache`)
  ctx.set('Content-type', `application/json`)

  await next()
}
