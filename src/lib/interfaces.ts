export interface ApplicationCommand {
    name: string;
    description: string;
    options?: ApplicationCommandOption[];
    default_member_permissions?: Permissions;
    dm_permission?: boolean;
    nsfw?: boolean;
    type?: ApplicationCommandType;
}

export enum ApplicationCommandType {
    CHAT_INPUT = 1,
    USER = 2,
    MESSAGE = 3
}

export interface ApplicationCommandOption {
    type: ApplicationCommandOptionType;
    name: string;
    description: string;
    required?: boolean;
    choices?: ApplicationCommandOptionChoice[];
    options?: ApplicationCommandOption[];
    channel_types?: ChannelType[];
}

export enum ApplicationCommandOptionType {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11
}

export interface ApplicationCommandOptionChoice {
    name: string;
    value: string | number;
}

export enum ChannelType {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_ANNOUNCEMENT = 5,
    ANNOUNCEMENT_THREAD = 10,
    PUBLIC_THREAD = 11,
    PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13,
    GUILD_DIRECTORY = 14,
    GUILD_FORUM = 15
}

export type Permissions =
    | 'CREATE_INSTANT_INVITE'
    | 'KICK_MEMBERS'
    | 'BAN_MEMBERS'
    | 'ADMINISTRATOR'
    | 'MANAGE_CHANNELS'
    | 'MANAGE_GUILD'
    | 'ADD_REACTIONS'
    | 'VIEW_AUDIT_LOG'
    | 'PRIORITY_SPEAKER'
    | 'STREAM'
    | 'VIEW_CHANNEL'
    | 'SEND_MESSAGES'
    | 'SEND_TTS_MESSAGES'
    | 'MANAGE_MESSAGES'
    | 'EMBED_LINKS'
    | 'ATTACH_FILES'
    | 'READ_MESSAGE_HISTORY'
    | 'MENTION_EVERYONE'
    | 'USE_EXTERNAL_EMOJIS'
    | 'VIEW_GUILD_INSIGHTS'
    | 'CONNECT'
    | 'SPEAK'
    | 'MUTE_MEMBERS'
    | 'DEAFEN_MEMBERS'
    | 'MOVE_MEMBERS'
    | 'USE_VAD'
    | 'CHANGE_NICKNAME'
    | 'MANAGE_NICKNAMES'
    | 'MANAGE_ROLES'
    | 'MANAGE_WEBHOOKS'
    | 'MANAGE_GUILD_EXPRESSIONS'
    | 'USE_APPLICATION_COMMANDS'
    | 'REQUEST_TO_SPEAK'
    | 'MANAGE_EVENTS'
    | 'MANAGE_THREADS'
    | 'CREATE_PUBLIC_THREADS'
    | 'CREATE_PRIVATE_THREADS'
    | 'USE_EXTERNAL_STICKERS'
    | 'SEND_MESSAGES_IN_THREAD'
    | 'USE_EMBEDDED_ACTIVITIES'
    | 'MODERATE_MEMBERS'
    | 'VIEW_CREATOR_MONETIZATION_ANALYTICS'
    | 'USE_SOUNDBOARD'
    | 'USE_EXTERNAL_SOUNDS'
    | 'SEND_VOICE_MESSAGES';
