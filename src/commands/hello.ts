import { Request, Response } from 'express';
import { ApplicationCommandOptionType } from '../lib/interfaces';
import { InteractionResponseType } from '@dqrshan/discord-interactions';
import { Command } from '../lib/command';

export default class Hello extends Command {
    constructor() {
        super({
            name: 'hello',
            description: 'Says hello to you',
            options: [
                {
                    name: 'name',
                    description: 'Your name',
                    type: ApplicationCommandOptionType.STRING,
                    required: true
                }
            ],
            dm_permission: false
        });
    }

    async chatInputRun(req: Request, res: Response) {
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `Hello, ${req.body.data.options[0].value}`
            }
        });
        return;
    }
}
