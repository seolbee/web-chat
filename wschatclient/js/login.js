class LoginPopup {
    constructor() {
        this.init();
    }

    init(){
        this._userId = "";
        this._password = "";
        
        this._loginForm = document.querySelector(".login-form");
        this._userIdInput = this._loginForm.querySelector("#userId");
        
        this.addEvent();
    }

    addEvent(){
        this._userIdInput.addEventListener("focus", (e) => this.addClass(e.target.parentElement, "active"));
        this._loginForm.addEventListener("submit", () => this.submit);
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
    }
}

export default LoginPopup;