const { getDb } = require("../util/database");

class User{
    constructor(userName, email, password){
        this.name = userName;
        this.email = email;
        this.password = password;
    }

    save(){
       const db = getDb();
       db.collect
    }

    static findById(){

    }
}