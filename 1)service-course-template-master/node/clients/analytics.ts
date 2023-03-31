import { AppClient, InstanceOptions, IOContext } from '@vtex/api';

export default class Analytics extends AppClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('vtex.mocked-analytics@0.0.4', context, options);
  }

  public async getLiveUsers(): Promise<LiveUsersProduct[]> {
    return this.http.get('_v/live-products');
    //   return [
    //     {
    //       slug: 'product1',
    //       liveUsers: 10
    //     },
    //     {
    //       slug: 'product2',
    //       liveUsers: 20
    //     }
    //   ];
    // }

    //will get the necessary data for this application: an array of objects that have two fields: slug, a string that represents the product ID and liveUsers, a number that is the quantity of users visualizing this product - which are the fields in the interface.
  }
}

interface LiveUsersProduct {
  slug: string;
  liveUsers: number;
}
