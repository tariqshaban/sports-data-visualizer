export class Info {
    title: string
    caption: string
    descriptions: string[]
    url: string;
    image: string;

    constructor(title: string, caption: string, descriptions: string[], url: string, image: string) {
        this.title = title;
        this.caption = caption;
        this.descriptions = descriptions;
        this.url = url;
        this.image = image;
    }
}