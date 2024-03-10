import Message from "./message.js";

class ChatForm {
    messageInput = null;
    chatForm = null;

    constructor(wsClient){
        this.init(wsClient);
    }

    init(wsClient){
        this.chatForm = document.querySelector(".chat-form");
        this.messageInput = this.chatForm.querySelector("input");
        this.fileoUploadInput = document.querySelector("#imageFile");
        this.wsClient = wsClient;

        this.addEvent();
    }

    addEvent(){
        this.chatForm.addEventListener("submit", this.submit.bind(this));
        this.fileoUploadInput.addEventListener("change", this.uploadFile.bind(this));
    }

    submit = (e) => {
        e.preventDefault();
        let message = this.messageInput.value;

        if(message.trim() == ""){
            return false;
        }

        let user = JSON.parse(sessionStorage.getItem('user'));

        let data = new ChatMessage(message, user.userName, "chat");

        this.wsClient.send(data);

        this.reset();
    }

    uploadFile(e){
        
    }

    reset(){
        this.messageInput.value = "";
    }
}

class ChatMessageBox {
    
    messageList = [];
    messageListEl = null;

    constructor(wsClient){
        this.init(wsClient);
    }

    init(wsClient){
        this.messageListEl = document.querySelector(".message-list");
        this.outBtn = document.querySelector(".out-btn");
        this.wsClient = wsClient;
        this.messageList = [];

        this.addEvent();
    }

    addEvent(){
        this.wsClient.setMessageEvent(this.delivery);
        this.outBtn.addEventListener('click', this.outChat.bind(this));
    }

    delivery = (data) => {
        // let {message, sender, type} = JSON.parse(data.data);
        let body = JSON.parse(data.data);
        // let chatMessage = new ChatMessage(message, sender, type);
        let message = this.messageBuilder(body);
        if(!message) return false;
        this.messageList.push(message);
        this.render();
    }

    messageBuilder(data){
        let message;
    
        if(data.type === 'join' || data.type === 'leave'){
            let {userName, type} = data;
            message = new SystemMessage(userName, type);
        } else if(data.type === 'chat') {
            let {message:msg, sender, type, isMine} = data;
            message = new ChatMessage(msg, sender, type, isMine);
        } else {
            console.error("채팅 메시지 오류");
            message = false;
        }
    
        return message;
    }

    render(){
        this.messageListEl.innerHTML = "";
        
        let messageDom = this.messageList.map( m => m?.createMessageElement() );

        this.messageListEl.append(...messageDom);
    }

    outChat(){
        let user = JSON.parse(sessionStorage.getItem("user"));
        this.wsClient.send({userName: user.userName, type:"leave"});
        window.location.reload();
    }
}

class ChatMessage extends Message {
    constructor(message, sender, type, isMine){
        super(type);

        this.message = message;
        this.sender = sender;
        this.isMine = isMine;
    }

    getTemplate(){
        return `<div class="chat-message ${this.isMine ? 'mine' : 'thine'}">
                    ${!this.isMine ? '<p class="message-title">'+ this.sender +'</p>' : ''}
                    <p class="message-content">${this.message}</p>
                </div>`;
    }
}

class SystemMessage extends Message {
    userName = "";

    constructor(userName, type){
        super(type);
        this.userName = userName;
    }

    getTemplate(){
        return `<div class="system-message">
                    <p class="message-content">${this.getMessageContent()}</p>
                </div>`;
    }

    getMessageContent(){
        let content = "";
        if(this.type === 'join') {
            content = this.userName + "님이 접속하셨습니다.";
        } else if(this.type === 'leave') {
            content = this.userName + "님이 떠나셨습니다.";
        }

        return content;
    }
}

class Alert {
    content = "";
    title = "";
    STATE = "";
    duration = 2000;

    setAlert(state, title, content){
        this.state = state;
        this.title = title;
        this.content = content;
    }

    getTemplate(){
        return `<div></div>`;
    }
}

export {
    ChatForm,
    ChatMessageBox
};