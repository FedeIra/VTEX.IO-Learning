import { COURSE_ENTITY } from "../utils/constants";

export async function updateLiveUsers(ctx: EventContext<Clients>) {
  const liveUsersProducts = await ctx.clients.analytics.getLiveUsers();
  console.log("LIVE USERS ", liveUsersProducts);
  await Promise.all(
    liveUsersProducts.map(async ({ slug, liveUsers }) => {
      const [savedProduct] = await ctx.clients.masterdata.searchDocuments<{
        id: string;
        count: number;
        slug: string;
      }>({
        dataEntity: COURSE_ENTITY,
        fields: ["count", "id", "slug"],
        pagination: {
          page: 1,
          pageSize: 1
        },
        schema: "v1",
        where: `slug=${slug}`
      });
      console.log("SAVED PRODUCT", savedProduct);
    })
  );
  return true;
}
