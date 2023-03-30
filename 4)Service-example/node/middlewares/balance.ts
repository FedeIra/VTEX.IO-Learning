import axios from 'axios'

export async function balance(ctx: Context, next: () => Promise<any>) {
  const {
    vtex: {
      route: { params },
    },
  } = ctx //? obtenemos el id de la giftcard que nos envia el request en el path del request (en este caso)

  const { id } = params

  console.log(id)

  const http = axios.create({
    headers: {
      VtexIdAuthCookie: ctx.vtex.authToken,
      'REST-Range': 'resources=0-1',
      'Cache-Control': 'no-cache',
      'X-Vtex-Use-Https': true,
    },
  })

  const { data } = await http.get(
    `http://${ctx.vtex.account}.myvtex.com/api/dataentities/itglobers/documents/${id}?_fields=all`
  )

  const today = new Date()
  const nextWeek = new Date(today)
  nextWeek.setDate(nextWeek.getDate() + 7)

  const response = {
    id: data.id,
    balance: data.balance,
    totalBalance: data.balance,
    emissionDate: data.createIn,
    expiringDate: `${nextWeek.toISOString()}`,
    provider: `itglobers`,
    discount: true,
    transaction: {
      href: `http://${ctx.vtex.account}giftcardproviders/itglobers`,
    },
  }

  console.log(response)

  ctx.status = 200
  ctx.body = response
  ctx.set('Cache-Control', `no-cache`)

  await next()
}
