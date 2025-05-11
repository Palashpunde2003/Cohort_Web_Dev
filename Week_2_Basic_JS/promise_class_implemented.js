class Promise_Class{
    constructor(func){
        function afterDone(){
            this.resolve();
        }
        func(afterDone);
    }
    then(callback){
        this.resolve = callback;
    }
}

function setTheTime(resolve){
    setTimeout(resolve,5000);
}

function setTimeoutPromisfied(){
    return new Promise(setTheTime);
}

function callback(){
    console.log("Callback has been called.");
}

setTimeoutPromisfied().then(callback);

