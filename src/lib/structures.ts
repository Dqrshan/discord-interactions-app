import {
    EmbedAuthor,
    EmbedField,
    EmbedFooter,
    EmbedImage,
    EmbedProvider,
    EmbedThumbnail,
    EmbedType,
    EmbedVideo
} from './interfaces';

export class Embed {
    title?: string;
    type?: EmbedType;
    description?: string;
    url?: string;
    timestamp?: number;
    color?: number;
    footer?: EmbedFooter;
    image?: EmbedImage;
    thumbnail?: EmbedThumbnail;
    video?: EmbedVideo;
    provider?: EmbedProvider;
    author?: EmbedAuthor;
    fields?: EmbedField[];
    constructor(options: Embed) {
        this.title = options.title;
        this.type = options.type;
        this.description = options.description;
        this.url = options.url;
        this.timestamp = options.timestamp;
        this.color = options.color;
        this.footer = options.footer;
        this.image = options.image;
        this.thumbnail = options.thumbnail;
        this.video = options.video;
        this.provider = options.provider;
        this.author = options.author;
        this.fields = options.fields;
    }
}
