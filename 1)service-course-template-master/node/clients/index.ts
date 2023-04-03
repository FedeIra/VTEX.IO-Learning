import { IOClients } from '@vtex/api';
import Analytics from './analyticsClient';

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get analytics() {
    console.log('2) Clients index.ts getOrSet');
    return this.getOrSet('analytics', Analytics);
  }
} //? This is the type of the clients that we are using in this application. It is a class that extends the type IOClients, which is a type that is imported from the @vtex/api package. It is a type that has the following fields: getOrSet, which is a function that returns a function.
