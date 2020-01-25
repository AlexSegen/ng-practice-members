import {toastme, Toastme} from 'toastmejs'
import validator from 'validator'

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
            duplicates: false, 
            showCancel: true, // true or false
            type: type, // 'success', 'danger', 'warning', 'info' or 'question'
            dark: false, // Show dark theme? 'true' or 'false'
        })
    },
    validation : {
        isEmpty(str:any): Boolean {
            return str ? str.toString().trim().length == 0 : false
        },
        isEmail(str:String): Boolean {
            return str ? validator.isEmail(str) : false
        },
        isAlpha(str:any): Boolean {
            const containsLetters = /[a-zA-Z]/;
            const containsNumbers = /\d+/;
            return str ? containsLetters.test(str.toString()) && !containsNumbers.test(str.toString()) : false
        },
        isDataURI(str:String): Boolean {
            return str ? validator.isDataURI(str) : false
        },
        isLength(str:String): Boolean {
            return str ? str.toString().trim().length > 2 : false
        },
        isNumeric(str:any): Boolean {
            const regex = /^[0-9]+$/
            return str ? regex.test(str) : false
        }
    }
}

/* var rgularExp = {
    contains_alphaNumeric : /^(?!-)(?!.*-)[A-Za-z0-9-]+(?<!-)$/,
    containsNumber : /\d+/,
    containsAlphabet : /[a-zA-Z]/,

    onlyLetters : /^[A-Za-z]+$/,
    onlyNumbers : /^[0-9]+$/,
    onlyMixOfAlphaNumeric : /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/
} */