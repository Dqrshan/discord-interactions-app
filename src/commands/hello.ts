import { Request, Response } from 'express';
import {
    ApplicationCommand,
    ApplicationCommandOptionType
} from '../lib/interfaces';
import { InteractionResponseType } from '@dqrshan/discord-interactions';

const command: ApplicationCommand = {
    name: 'hello',
    description: 'Says hello to you',
    options: [
        {
            name: 'name',
            description: 'Your name',
            type: ApplicationCommandOptionType.STRING,
            required: true
        }
    ]
};

const run = (req: Request, res: Response) => {
    return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `Hello, ${req.body.data.options[0].value}`
        }
    });
};

export default { command, run };
