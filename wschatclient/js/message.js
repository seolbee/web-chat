class Message {

    constructor(type){
        this.type = type;
        this.date = new Date();
    }

    createMessageElement(){
        let div = document.createElement("div");
        div.classList.add("message-container");
        div.innerHTML = this.getTemplate();
        return div;
    }

    getTemplate(){
        return `<p class="message"></p>`;
    }
}

export default Message;