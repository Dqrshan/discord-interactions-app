/**
 * @see {@link https://github.com/discord/discord-example-app/blob/main/utils.js}
 */

import 'dotenv/config';
import fetch, { RequestInit } from 'node-fetch';
import { verifyKey } from '@dqrshan/discord-interactions';
import { Request, Response } from 'express';

export function verifyDiscordRequest(clientKey: string) {
    return function (
        req: Request,
        res: Response,
        buf: Buffer,
        _encoding: unknown
    ) {
        const signature = req.get('X-Signature-Ed25519')!;
        const timestamp = req.get('X-Signature-Timestamp')!;

        const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
        if (!isValidRequest) {
            res.status(401).send('Bad request signature');
            throw new Error('Bad request signature');
        }
    };
}

export async function discordRequest(endpoint: string, options: RequestInit) {
    const url = 'https://discord.com/api/v10/' + endpoint;
    if (options.body) options.body = JSON.stringify(options.body);
    const res = await fetch(url, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            'Content-Type': 'application/json; charset=UTF-8',
            'User-Agent': 'DiscordBot'
        },
        ...options
    });
    if (!res.ok) {
        const data = await res.json();
        console.log(res.status);
        throw new Error(JSON.stringify(data));
    }
    return res;
}

export async function registerCommands(appId: string, commands: any) {
    const endpoint = `applications/${appId}/commands`;

    try {
        await discordRequest(endpoint, { method: 'PUT', body: commands });
    } catch (err) {
        console.error(err);
    }
}

export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
