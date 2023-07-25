import { Request, Response } from 'express';
import { Command } from '../lib/command';
import { InteractionResponseType } from '@dqrshan/discord-interactions';
import { Embed } from '../lib/structures';

export default class EmbedCommand extends Command {
    constructor() {
        super({
            name: 'embed',
            description: 'Sends an embed',
            options: [],
            dm_permission: false
        });
    }

    async chatInputRun(req: Request, res: Response) {
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                embeds: [
                    new Embed({
                        title: `Hello ${req.body.member.user.username}!`,
                        type: 'video',
                        video: {
                            url: 'https://cdn.discordapp.com/attachments/929953693833527307/1115870364774440992/videoplayback.mp4'
                        },
                        color: 5793266
                    })
                ]
            }
        });
    }
}
