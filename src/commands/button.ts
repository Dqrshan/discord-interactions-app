import { Request, Response } from 'express';
import { Command } from '../lib/command';
import {
    ActionRow,
    Button,
    ButtonStyle,
    InteractionResponseFlags,
    InteractionResponseType
} from '@dqrshan/discord-interactions';
import { capitalize } from '../lib/utils';

export default class Btn extends Command {
    constructor() {
        super({
            name: 'button',
            description: 'Sends buttons',
            options: [],
            dm_permission: false
        });
    }

    async chatInputRun(_req: Request, res: Response) {
        const buttons = [
            new Button({
                label: 'Primary',
                style: ButtonStyle.PRIMARY,
                custom_id: 'button-primary'
            }),
            new Button({
                label: 'Secondary',
                style: ButtonStyle.SECONDARY,
                custom_id: 'button-secondary'
            }),
            new Button({
                label: 'Success',
                style: ButtonStyle.SUCCESS,
                custom_id: 'button-success'
            }),
            new Button({
                label: 'Danger',
                style: ButtonStyle.DANGER,
                custom_id: 'button-danger'
            }),
            new Button({
                label: 'Link',
                style: ButtonStyle.LINK,
                url: 'https://darshan.studio/'
            })
        ];

        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: 'Click the buttons below!',
                components: [new ActionRow(buttons)]
            }
        });
    }

    async messageComponent(req: Request, res: Response) {
        const { custom_id } = req.body.data;

        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `${
                    req.body.member.user.global_name
                } clicked a ${capitalize(
                    custom_id.replace('button-', '')
                )} button!`,
                flags: InteractionResponseFlags.EPHEMERAL
            }
        });
    }
}
