export class Info {
    title: string;
    caption: string;
    descriptions: string[];
    qas: QA[];    
    url: string;
    image: string;

    constructor(title: string, caption: string, descriptions: string[], qas: QA[], url: string, image: string) {
        this.title = title;
        this.caption = caption;
        this.descriptions = descriptions;
        this.qas = qas;
        this.url = url;
        this.image = image;
    }
}

export class QA {
    question: string;
    answer: string;

    constructor(question: string, answer: string) {
        this.question = question;
        this.answer = answer;
    }
}

