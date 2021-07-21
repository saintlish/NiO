export class Keywords {
    keywords;
    type;
    constructor({ keywords, type }) {
        this.keywords = keywords;
        this.type = type;
    }
    check(text) {
        if (this.keywords.length) {
            if (text) {
                const match = this.keywords.some((keyword) => (text.match(new RegExp(keyword, "gi"))));
                return this.reverse(match);
            }
            return this.reverse(false);
        }
        return true;
    }
    reverse(value) {
        return this.type === "keywords" ?
            value
            :
                !value;
    }
}
