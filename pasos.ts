/*
! Services in VTEX IO

? Introduction:
It’s possible to create frontend blocks for Store Framework, backend services exposing REST or GraphQL APIs, and combine a series of VTEX modules into a complete solution, packaging it into an app.

As VTEX IO powers big ecommerce operations, they require running code on a server. Services are how we run Node.js or .NET code on VTEX IO infrastructure, backed by API abstractions to improve developer experience.

? Services:
A Service must be exported from a VTEX IO app, just like themes or store blocks, using builders node or dotnet. With these, you are able to develop a REST API without having to set up a server, GraphQL APIs and routes.

Inside the /node folder of a service lives service.json, where it´s possible to declare routes that the service must respond to and other configurations like timeout and memory.

!Overview: Understanding the Boilerplate

?Introduction
There are two directories (/node and /graphql) and the manifest.json file, which is an important file to your VTEX IO app because it will be the first communication point with the VTEX IO.

?Manifest Overview
In the manifest.json file, you will find the app's name, vendor, version, and other information to pay attention to: builders, policies and dependencies.

*1) Builders: what builders your app will need.
*2) policies: if the app being built needs to access some external services or get some specific data from other places, it needs to declare so, even for external APIs.
*3) dependencies: if your app needs to use another app, you need to declare it as a dependency.

? /node Directory
The /node directory is where the service code lives.
*1) /node/clients
*2) /node/handlers
*3) /node/utils: file containing global constants declarations (/node/constants.ts).
*4) /node/index.ts: file containing the service's main configuration. It is also possible to export resolver functions implementations (for GraphQL).
*5) /node/service.json: describes your REST API and some characteristics that will directly impact your app's infrastructure attributes.

? service.json
{
"memory": 256,
"timeout": 2,
"minReplicas": 2,
"maxReplicas": 4,
"routes": {
  "status": {
    "path": "/_v/status/:code",
    "public": true
  }
}

*/

/*
!CLIENTS:
Clients, on VTEX IO, are abstractions to other services. Whenever you need to set up a connection with an external API or another VTEX service, you should create a client for it.
*/

/*
!PASOS PARA LEVANTAR SERVIDOR:
*1) vtex login
*2) vtex whoami
On VTEX IO, accounts have three main workspace types, namely master, production, and development.
*3) vtex use {workspace} // vtex use fedeira
https://fedeira--itglobers.myvtex.com/admin
https://fedeira--itglobers.myvtex.com
*4) replace the vendor and account values in the manifest.json file
vendor is the account name you are working on and account is anything you want to name your theme.
{
  "vendor": "storecomponents",
  "name": "my-test-theme",
}
*5) vtex list: to see the list of apps installed in your account
*/

/*
!Clients: Using Master Data
Every time we retrieve new data we want to update it using Master Data (a database-as-a-service product from VTEX).

Master Data is a VTEX service. By default, it's used to store and organize customer data, but it's also widely used by VTEX stores to make business rule customizations and create applications for your virtual store. You can configure applications that use the module as a data repository to create a system on top of Master Data, just by modeling new data.

In the current version of Master Data, we use the concept of data entities and use JSON Schema to validate and index documents.

The JSON Schema is not required for all endpoints. If you don't need to validate your data, you may save your documents without any setup, just indicate the data entity and some access credential.
*/
