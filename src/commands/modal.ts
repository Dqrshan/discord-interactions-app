import { Request, Response } from 'express';
import { ApplicationCommand } from '../lib/interfaces';
import {
    ActionRow,
    InteractionResponseType,
    TextInput,
    TextStyle
} from '@dqrshan/discord-interactions';

const command: ApplicationCommand = {
    name: 'modal',
    description: 'Opens a modal',
    options: []
};

const run = async (_req: Request, res: Response) => {
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
};

const modalSubmit = async (req: Request, res: Response) => {
    const { data, member } = req.body;
    const modalId = data.custom_id;
    const userId = member.user.id;

    if (modalId === 'modal') {
        return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `<@${userId}> said: ${data.components[0].components[0].value}`
            }
        });
    }
};

export default { command, run, modalSubmit };
