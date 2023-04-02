import { EventContext } from '@vtex/api';
import { Clients } from '../clients/index';

export async function updateLiveUsers(ctx: EventContext<Clients>) {
  // console.log('EVENT HANDLER: received event');
  const liveUsersProducts = await ctx.clients.analytics.getLiveUsers();
  console.log('LIVE USERS: ', liveUsersProducts);
  return true;
}
