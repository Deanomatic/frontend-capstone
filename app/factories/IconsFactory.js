"use strict";
console.log("icon factory connected");
app.factory("IconsFactory", function(){
    let saved_info;
    return {
            setsavedinfo (information) {
              console.log(information);
                saved_info = information;
            },
            getsavedinfo () {
                return saved_info;
            }
        };
})