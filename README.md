Community Board
===============

GitHub issues KanBan board

Before Running
======================
Create a `./user.json` file in the root of the application. Within this JSON file should be your client ID and client
 secret from your GitHub developer application. Without these, there is a stiff limit on the number of API requests 
 that can be made in a given period of time.

Running for Production
======================

```bash
npm install
NODE_ENV=production npm start # http://localhost:8091
```

Running for Development
=======================

When running in development, the server and client components will be hot-reloadable. Any changes made to the application should not require a restart of the server and should push to the client browser.

```bash
npm install
npm start # http://localhost:8091
```
