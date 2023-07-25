import WsClient from "./socket.js";
import { ChatForm, ChatMessageBox } from "./chat.js";
import LoginPopup from "./login.js";

window.addEventListener('load', function(){
    let login = new LoginPopup();

     

    let wsClient = new WsClient();
    let chatForm = new ChatForm(wsClient);
    let chatMessageBox = new ChatMessageBox(wsClient);
});