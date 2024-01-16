import WsClient from "./socket.js";
import { ChatForm, ChatMessageBox } from "./chat.js";
import LoginPopup from "./login.js";
import { AlertBuilder } from "./alert.js";

window.addEventListener('load', function(){
    let wsClient = new WsClient();
    let alertBuilder = new AlertBuilder();

    let login = new LoginPopup(wsClient, alertBuilder);

    let chatForm = new ChatForm(wsClient);
    let chatMessageBox = new ChatMessageBox(wsClient);

    window.addEventListener("unload", function(){
        chatMessageBox.outChat();
    })
});