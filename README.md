WIP simple discord bot template, for hosting on Cloudflare Workers!

#### Why?

As noted in Discord's [API reference](https://discord.com/developers/docs/reference):

> Discord's API is based around two core layers, a HTTPS/REST API for general operations, and persistent secure WebSocket based connection for sending and subscribing to real-time events.

Most javascript/typescript bot examples use [discord.js](https://github.com/discordjs/discord.js), which uses the WebSocket connection mode. This is necessary for a lot of advanced functionality as far as I know, but requires a persistent server, and free ones seem hard to come by these days.

Instead, like the Cloudflare Workers tutorial in the Discord docs, this uses the HTTPS/REST API only, using a serverless model (run the javascript code in response to each request, with no persistant server/VM). This has lower infrastructure cost (I assume) and means the free tiers are a lot more generous.

To reduce boilerplate, this template uses [discord.cf](https://github.com/discordcf/discordcf), though at the time of writing it's very limited in features and looks like it might be abandoned(?).

It seems like most serverless hosts (Cloudflare, Netlify/Vercel, AWS, Azure, Google, whatever) use somewhat different code structures so I don't know how portable this is.

#### To set up:

```
npm install
```

- make an app at https://discord.com/developers/applications
- obtain application id and public key from https://discord.com/developers/applications/c/information
- obtain bot token from https://discord.com/developers/applications/[whatever]/bot

To add the bot to a server:

- go to oath2 -> url generator
- enable scopes: `bot` and `applications.commands` and bot: `Send Messages` and `Use Slash Commands`
- navigate to the generated url in a browser that's logged into discord with an account with admin

To be able to test on Discord from your local machine, make a `.dev.vars` file with

```
DISCORD_APPLICATION_ID: [fill this in]
DISCORD_PUBLIC_KEY: [fill this in]
DISCORD_TOKEN: [fill this in]
DISCORD_TEST_GUILD_ID: [fill this in]
```

(Guild ID is optional, and is used to make test commands only in one server. Discord lets you update these faster than global commands, so it's useful for testing quickly.)

#### To test on your local machine and link to Discord:

This will work for a limited time, after which you must restart ngrok and update your interactions endpoint URL.

Open two terminal windows:

```
npm run dev
```

```
npm run ngrok
```

At `https://discord.com/developers/applications/[whatever]/information`, set your interactions endpoint URL to https://[unique string from ngrok].ngrok.io/interaction.

Trigger the app's script to register your commands with discord's servers by navigating in a web browser to e.g. http://127.0.0.1:8787/setup. Repeat this if you change a command name/description.

#### To run on Cloudflare:

Set up secrets interactively via the web interface or:

```
npx wrangler secret put DISCORD_TOKEN
```

```
npx wrangler secret put DISCORD_PUBLIC_KEY
```

```
npx wrangler secret put DISCORD_APPLICATION_ID
```

```
npx wrangler secret put DISCORD_TEST_GUILD_ID
```

Deploy via:

```
npm run deploy
```

At `https://discord.com/developers/applications/[whatever]/information`, set your interactions endpoint URL to `[your app url]/interaction`.

Trigger the app's script to register your commands with discord's servers by navigating in a web browser to `[your app url]/setup`. Repeat this if you change a command name/description.

(Possible todo: deployment and command registration could be done automatically via a GitHub action and Cloudflare's direct deploy mode. Alternately, deployment could be done via Cloudflare's GitHub integration; not sure if command registration could be done easily in that case.)
