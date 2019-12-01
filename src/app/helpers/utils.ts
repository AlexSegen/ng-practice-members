import {toastme, Toastme} from 'toastmejs'

const config = {
    timeout: 5000,
    positionY: "bottom", // top or bottom
    positionX: "right", // right left, center
    distanceY: 20, // Integer value
    distanceX: 20, // Integer value
    zIndex: 100, // Integer value
    theme: "default", // default, ligh or  dark (leave empty for "default" theme)
    duplicates: false // true or false - by default it's false
};

//Create a new Toastmejs class instance
const mytoast = new Toastme(config);

export default {
    notification(type:String, text:String): void {
        mytoast[type](text)
    },
    dialog(type:String, text:String, ) {
        return toastme.yesNoDialog({
            title: "",
            text: text,
            textConfirm: "Confirm",
            textCancel: "Cancel", 
            showCancel: true, // true or false
            type: type, // 'success', 'danger', 'warning', 'info' or 'question'
            dark: false, // Show dark theme? 'true' or 'false'
        })
    }
}