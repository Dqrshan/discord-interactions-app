import 'dotenv/config';
import express, { Request, Response } from 'express';
import {
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags
} from '@dqrshan/discord-interactions';
import { registerCommands, verifyDiscordRequest } from './lib/utils';
import { readdirSync } from 'fs';
import { ApplicationCommandType } from './lib/interfaces';

const app = express();
const PORT = process.env.PORT || 3000;

const commands = new Map<
    string,
    {
        run: (req: Request, res: Response) => Promise<unknown>;
        modalSubmit?: (req: Request, res: Response) => Promise<unknown>;
    }
>();

const globalCommands = [];

const files = readdirSync('dist/commands').filter((f) => f.endsWith('.js'));
for (const file of files) {
    const command = require(`./commands/${file}`).default;
    commands.set(command.command.name, {
        run: command.run,
        modalSubmit: command.modalSubmit
    });
    globalCommands.push(command.command);
}

app.use(express.json({ verify: verifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post('/interactions', async function (req, res) {
    const { type, data } = req.body;
    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }
    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name, type } = data;
        if (type === ApplicationCommandType.CHAT_INPUT) {
            const command = commands.get(name);
            if (command) {
                try {
                    await command.run(req, res);
                } catch (error) {
                    console.error(error);
                    res.send({
                        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                        data: {
                            content:
                                'An error occured while executing the command',
                            flags: InteractionResponseFlags.EPHEMERAL
                        }
                    });
                }
            }
        }
    }

    if (type === InteractionType.MODAL_SUBMIT) {
        const { custom_id } = data;
        const command = commands.get(custom_id);
        if (!command || !command?.modalSubmit) return;
        if (command) {
            try {
                await command.modalSubmit(req, res);
            } catch (error) {
                console.error(error);
                res.send({
                    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                    data: {
                        content: 'An error occured while executing the command',
                        flags: InteractionResponseFlags.EPHEMERAL
                    }
                });
            }
        }
    }
});

Promise.all([registerCommands(process.env.APP_ID, globalCommands)]).then(() => {
    app.listen(PORT, () => {
        console.log('Listening on port', PORT);
    });
});
