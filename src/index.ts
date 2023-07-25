import 'dotenv/config';
import express from 'express';
import {
    InteractionType,
    InteractionResponseType,
    InteractionResponseFlags
} from '@dqrshan/discord-interactions';
import { verifyDiscordRequest } from './lib/utils';

import { ApplicationCommandType } from './lib/interfaces';
import commands, { loadCommands } from './lib/command';

const app = express();
const PORT = process.env.PORT || 3000;

loadCommands();

app.use(express.json({ verify: verifyDiscordRequest(process.env.PUBLIC_KEY) }));

app.post('/interactions', async function (req, res) {
    const { type, data } = req.body;
    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }
    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name, type } = data;
        const command = commands.get(name);
        if (type === ApplicationCommandType.CHAT_INPUT) {
            if (command && command.chatInputRun) {
                try {
                    await command.chatInputRun(req, res);
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
        } else if (
            [
                ApplicationCommandType.MESSAGE,
                ApplicationCommandType.USER
            ].includes(type)
        ) {
            if (command && command.contextMenu) {
                try {
                    await command.contextMenu(req, res);
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
        if (command && command.modalSubmit) {
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

    if (type === InteractionType.MESSAGE_COMPONENT) {
        const { custom_id } = data;
        const main = custom_id.split('-')[0];
        const command = commands.get(main);
        if (command && command.messageComponent) {
            try {
                await command.messageComponent(req, res);
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

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
