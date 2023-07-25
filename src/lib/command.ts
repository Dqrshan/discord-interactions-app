import { Request, Response } from 'express';
import {
    ApplicationCommand,
    ApplicationCommandOption,
    ApplicationCommandType,
    Permissions
} from './interfaces';
import { readdirSync } from 'fs';
import { registerCommands } from './utils';

export abstract class Command {
    type?: ApplicationCommandType;
    name: string;
    description: string;
    options?: ApplicationCommandOption[];
    default_member_permissions?: Permissions;
    dm_permission?: boolean;
    nsfw?: boolean;
    constructor(options: ApplicationCommand) {
        this.type = options.type;
        this.name = options.name;
        this.description = options.description;
        this.options = options.options;
        this.default_member_permissions = options.default_member_permissions;
        this.dm_permission = options.dm_permission;
        this.nsfw = options.nsfw;
    }
    abstract chatInputRun?(req: Request, res: Response): Promise<unknown>;

    abstract contextMenu?(req: Request, res: Response): Promise<unknown>;

    abstract modalSubmit?(req: Request, res: Response): Promise<unknown>;

    abstract autoComplete?(req: Request, res: Response): Promise<unknown>;

    abstract messageComponent?(req: Request, res: Response): Promise<unknown>;

    json() {
        return {
            type: this.type,
            name: this.name,
            description: this.description,
            options: this.options,
            default_member_permissions: this.default_member_permissions,
            dm_permission: this.dm_permission,
            nsfw: this.nsfw
        };
    }
}

const commands = new Map<string, Command>();

export const loadCommands = () => {
    const globalCommands = [];

    const files = readdirSync('dist/commands').filter((f) => f.endsWith('.js'));
    for (const file of files) {
        const command: Command = require(`./commands/${file}`).default;
        commands.set(command.name, command);
        globalCommands.push(command.json());
    }

    registerCommands(process.env.APP_ID, globalCommands).then(() =>
        console.log(`Loaded ${commands.size} commands`)
    );
};

export default commands;
