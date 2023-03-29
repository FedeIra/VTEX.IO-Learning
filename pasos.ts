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
