"use strict";

class StorageLocal {
    constructor() {
        this.key = 'pages';
    }

    save(pages) {
        this._setItem(this.key, pages);
    }

    load() {
        return this._getItem(this.key);
    }

    _setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    _getItem(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}

class StorageInMemory {
    constructor() {
        this.pages = null;
    }

    save(pages) {
        this.pages = pages;
    }

    load() {
        return this.pages;
    }
}