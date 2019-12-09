"use strict";

const $FK = document.querySelector.bind(document);
const $$FK = document.querySelectorAll.bind(document);

NodeList.prototype.__proto__ = Array.prototype;
HTMLCollection.prototype.__proto__ = Array.prototype;

Node.prototype.on = function(name, fn) {
    this.addEventListener(name, fn);
    return this;
};

Node.prototype.$FK = function(selector) {
    return this.querySelector(selector);
};

Node.prototype.$$FK = function(selector) {
    return this.querySelectorAll(selector);
};

NodeList.prototype.on = NodeList.prototype.addEventListener = function(name, fn) {
    this.forEach(elem => elem.on(name, fn));
    return this;
};

if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}

var createFunctions = [
    function() { return new XMLHttpRequest() },
    function() { return new ActiveXObject("Msxml2.XMLHTTP") },
    function() { return new ActiveXObject("Msxml3.XMLHTTP") },
    function() { return new ActiveXObject("Microsoft.XMLHTTP") }
];

function createXMLHttpObject() {
    var xmlhttp = null;
    for (var i = 0; i < createFunctions.length; i++) {
        try {
            xmlhttp = createFunctions[i]();
        } catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}