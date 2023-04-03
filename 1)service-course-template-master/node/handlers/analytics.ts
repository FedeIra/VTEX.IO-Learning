export async function analytics(ctx: Context, next: () => Promise<any>) {
  console.log('1) Handler: analytics');
  const {
    clients: { analytics }
  } = ctx;
  ctx.status = 200;
  ctx.body = await analytics.getLiveUsers();
  ctx.set('cache-control', 'no-cache');
  console.log('4) Handler: analytics');
  await next();
}
