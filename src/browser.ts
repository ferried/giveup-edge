import "core-js";
import "regenerator-runtime/runtime";
require('core-js/features/object/define-property');
require('core-js/features/object/create');
require('core-js/features/object/assign');
require('core-js/features/array/for-each');
require('core-js/features/array/index-of');
require('core-js/features/function/bind');
require('core-js/features/promise');
import {Validator, validators} from "./validator";
import {insertCSS, insertDOM} from "./dom";

export function getUserBrowser(): Array<Validator> | null {
    const ua: string = navigator.userAgent.toLowerCase();
    const userBrowser = validators.filter((validator: Validator) => {
        return validator.validate(ua);
    })
    return userBrowser;
}

export function getMetaRenderer(): Element {
    return document.head.children.namedItem("renderer");
}

export function main() {
    // 可以检测出的浏览器
    if (getMetaRenderer() && getUserBrowser().length > 0) {
       getUserBrowser().forEach((browser)=>{
           if (browser.name.includes("ie") || browser.name.includes("edge") || browser.name.includes("cp")) {
               // 插入css
               insertCSS();
               // 插入dom
               insertDOM();
           }
       })
    }
}
