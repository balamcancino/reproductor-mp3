export class Node {
    #data;
    #next;
    #previous;

    constructor(data) {
        this.#data = data;
        this.#next = undefined;
        this.#previous = undefined;
    }

    getData() {
        return this.#data;
    }
}
