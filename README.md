# Discord Interactions App

This repository contains a template to build your discord bots following [this guide](https://discord.com/developers/docs/getting-started)

## Project Structure

```
├── src/
│   ├── commands/    -> commands folder
│   │   ├── hello.ts    -> sample chat input command with options
│   │   └── modal.ts    -> sample chat input + modal submit
│   ├── lib/
│   │   ├── interfaces.ts    -> interfaces, enums and types
│   │   └── utils.ts         -> utility functions
│   └── index.ts     -> main entrypoint for app
├── .env.example -> example .env file
├──.gitignore
├── package.json
├── README.md
└── tsconfig.json
```

## Running app locally

Before you start, you'll need to install [NodeJS](https://nodejs.org/en/download/) and [create a Discord app](https://discord.com/developers/applications) with the proper permissions:

-   `applications.commands`
-   `bot` (with Send Messages enabled)

Configuring the app is covered in detail in the [getting started guide](https://discord.com/developers/docs/getting-started).

### Setup project

First clone the project:

```
git clone https://github.com/Dqrshan/discord-interactions-app.git
```

Then navigate to its directory and install dependencies:

```
cd discord-interactions-app
npm install
```

### Fill `.env`

> [🔗 Developer Portal](https://discord.com/developers/applications)

-   `DISCORD_TOKEN=`: Your bot token (**Bot** tab)
-   `PUBLIC_KEY=`: App public key (**General Information** tab)
-   `APP_ID`: Application ID (**General Information** tab)

### Run the app

After you fill your `.env` file, run the following command:

```
npm run build
```

Then to start your app, run:

```
npm run start
```

### Set up interactivity

The project needs a public endpoint where Discord can send requests. To develop and test locally, you can use something like [`ngrok`](https://ngrok.com/) to tunnel HTTP traffic.

Install ngrok if you haven't already, then start listening on port `3000`:

```
ngrok http 3000
```

You should see your connection open:

```
Tunnel Status                 online
Version                       2.0/2.0
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://1234-someurl.ngrok.io -> localhost:3000
Forwarding                    https://1234-someurl.ngrok.io -> localhost:3000

Connections                  ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

Copy the forwarding address that starts with `https`, in this case `https://1234-someurl.ngrok.io`, then go to your [app's settings](https://discord.com/developers/applications).

On the **General Information** tab, there will be an **Interactions Endpoint URL**. Paste your ngrok address there, and append `/interactions` to it (`https://1234-someurl.ngrok.io/interactions` in the example).

Click **Save Changes**, and your app should be ready to run 🚀

## Developer

[`@l.orenz`](https://discord.com/users/838620835282812969) on discord
