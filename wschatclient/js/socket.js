class WsClient{
    ws = null;

    constructor(){
        this.init();
    }

    init(){
        if(this.ws == null){
            this.ws = new WebSocket("ws://localhost:9090");
        }

        this.addEvent();
    }

    addEvent(){
        this.ws.addEventListener("open", (e) => console.log(e));
        this.ws.addEventListener("error", (e) => console.error(e));
        this.ws.addEventListener("close", (e) => console.log(e));
    }

    join(user) {
        this.send(user);
    }

    send(data){
        this.ws.send(JSON.stringify(data));
    }

    setMessageEvent(func){
        this.ws.addEventListener("message", func);
    }
}

export default WsClient;