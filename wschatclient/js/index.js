import WsClient from "./socket.js";
import { ChatForm, ChatMessageBox } from "./chat.js";
import LoginPopup from "./login.js";

window.addEventListener('load', function(){
    let wsClient = new WsClient();

    let login = new LoginPopup(wsClient);

    let chatForm = new ChatForm(wsClient);
    let chatMessageBox = new ChatMessageBox(wsClient);

    window.addEventListener("unload", function(){
        chatMessageBox.outChat();
    })
});