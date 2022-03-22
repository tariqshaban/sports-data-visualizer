export class Plot {
    title: string
    caption: string
    descriptions: string[]
    url: string;

    constructor(title: string, caption: string, descriptions: string[], url: string) {
        this.title = title;
        this.caption = caption;
        this.descriptions = descriptions;
        this.url = url;
    }
}