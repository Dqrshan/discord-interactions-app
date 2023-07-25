import { Request, Response } from 'express';
import { Command } from '../lib/command';
import {
    ActionRow,
    InteractionResponseFlags,
    InteractionResponseType,
    StringSelectMenu
} from '@dqrshan/discord-interactions';
import { capitalize } from '../lib/utils';

export default class Menu extends Command {
    constructor() {
        super({
            name: 'menu',
            description: 'Sends a menu',
            options: [],
            dm_permission: false
        });
    }

    async chatInputRun(_req: Request, res: Response) {
        const menu = new StringSelectMenu({
            custom_id: 'menu',
            options: [
                {
                    label: 'Foo',
                    value: 'foo'
                },
                {
                    label: 'Bar',
                    value: 'bar'
                }
            ],
            placeholder: 'Select something'
        });

        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: 'Select from the menu below!',
                components: [new ActionRow([menu])]
            }
        });
    }

    async messageComponent(req: Request, res: Response) {
        const [value] = req.body.data.values;

        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `${
                    req.body.member.user.global_name
                } selected **${capitalize(value)}**`,
                flags: InteractionResponseFlags.EPHEMERAL
            }
        });
    }
}
