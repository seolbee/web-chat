class User {
    _userName;
    _host;

    constructor(userName, host){
        this._userName = userName;
        this._host = host;
    }

    /**
     * @returns {any}
     */
    get userName(){
        return this._userName;
    }
    /**ß
         * @returns {any}
         */
    get host() {
        return this._host;
    }
}

module.exports = User;