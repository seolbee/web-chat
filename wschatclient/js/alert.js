class Alert {
    content = "";
    title = "";
    state = "";
    duration = 2000;
    close = false;

    setAlert(state, title, content){
        this.state = state;
        this.title = title;
        this.content = content;

        this.setCloseEvent();
        this.showAlert();
    }

    getTemplate(){
        return `<div class="alert alert-${this.state.name}">
                    <div class="alert-body">
                        <div class="alert-icon">
                            <i class="${this.state.icon}" style="color:${this.state.color}"></i>
                        </div>
                        <div class="alert-txt">
                            <p class="alert-title">${this.title}</p>
                            <div class="alert-content">${this.content}</div>
                        </div>
                    </div>
                    <div class="alert-close">
                        <p>&times;</p>
                    </div>
                </div>`;
    }

    createAlertElement(){
        let div = document.createElement("div");
        div.classList.add("alert-box");
        div.innerHTML = this.getTemplate();

        return div;
    }

    showAlert(){
        let alertEl = this.createAlertElement();
        document.querySelector("body").appendChild(alertEl);
    }

    setCloseEvent(){
        setTimeout(()=> {
            document.querySelector(".alert-box").remove();
            close = true;
        }, this.duration);
    }
};

class AlertBuilder {
    alertList = [];
    limit = 100;
    // isCreate = true;
    
    createAlert(alertObject){
        let alert = null;
        let {title, state, content} = alertObject;

        let isCreate = this.isCreateAlert();
        if(isCreate){
            alert = new Alert();
        } else {
            alert = this.alertList.find((e) => e.close);
        }

        alert.setAlert(state, title, content);

        if(isCreate){
            this.alertList.push(alert);
        }
    }

    isCreateAlert(){
        return this.alertList.length < this.limit;
    }
};

const AlertType = {
    INFO : {
        name : "info",
        icon : "fa-solid fa-circle-info",
        color : "#0062FF"
    },
    ERROR : {
        name : "error",
        icon : "fa-solid fa-circle-xmark",
        color : "#FF3D3D"
    },
    WRANING : {
        name : "warning",
        icon : "fa-solid fa-triangle-exclamation",
        color : "#FFD43B"
    },
    SUCCESS: {
        name : "success",
        icon : "fa-solid fa-circle-check",
        color : "#8BFF61"
    }
};

export {
    AlertBuilder,
    AlertType
};