import { Request, Response } from 'express';
import {
    ActionRow,
    InteractionResponseType,
    TextInput,
    TextStyle
} from '@dqrshan/discord-interactions';
import { Command } from '../lib/command';

export default abstract class Modal extends Command {
    constructor() {
        super({
            name: 'modal',
            description: 'Sends a modal',
            options: [],
            dm_permission: false
        });
    }

    async chatInputRun(_req: Request, res: Response) {
        return res.send({
            type: InteractionResponseType.MODAL,
            data: {
                custom_id: 'modal', // same as command name, for (commands) Map.get
                title: 'Test Modal',
                components: [
                    new ActionRow([
                        new TextInput({
                            placeholder: 'Enter something',
                            custom_id: 'text',
                            max_length: 30,
                            min_length: 5,
                            label: 'Input',
                            required: true,
                            style: TextStyle.SHORT
                        })
                    ])
                ]
            }
        });
    }

    async modalSubmit(req: Request, res: Response) {
        const { data, member, user } = req.body;
        const modalId = data.custom_id;
        const name = member ? member.user.global_name : user.global_name;

        if (modalId === 'modal') {
            return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `${name} says: ${data.components[0].components[0].value}`
                }
            });
        }
    }
}
