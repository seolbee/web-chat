class LoginPopup {
    constructor(wsClient) {
        this.init(wsClient);
    }

    init(wsClient){
        this._userId = "";
        this._password = "";

        this._loginPopup = document.querySelector(".login");
        this._loginForm = document.querySelector(".login-form");
        this._userIdInput = this._loginForm.querySelector("#userId");

        this._wsClient = wsClient;
        
        this.addEvent();
    }

    addEvent(){
        this._userIdInput.addEventListener("focus", (e) => this.addClass(e.target.parentElement, "active"));
        this._userIdInput.addEventListener("blur", (e) => e.target.parentElement.classList.remove("active"));
        this._loginForm.addEventListener("submit", (e) => this.submit(e));
    }

    addClass(el, className){
        el.classList.add(className);
    }

    submit(e){
        e.preventDefault();
        
        if(this._userIdInput.value.trim() === ""){
            return false;
        }

        this._userId = this._userIdInput.value;
        
        let user = {userName : this._userId, type : "join"};
        this.loginReqt(user);

        // this._wsClient.join(user);

        // this._loginPopup.style.display = "none";
    }

    async loginReqt(body){
        let headers = new Headers();
        headers.append("Content-Type", "application/json;charset=UTF-8");
        // headers.append("Content-Length", content.length.toString());
        headers.append("X-Custom-Header", "ProcessThisImmediately");

        let response = await fetch("http://localhost:8080/signin", {
            method: "POST", // 또는 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
        
          if(response.status == 200) {
            this._loginPopup.style.display = "none";
            this._wsClient.join(body);
            sessionStorage.setItem('user', JSON.stringify(body));
          }
    }
}

export default LoginPopup;