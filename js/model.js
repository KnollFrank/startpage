"use strict";

class Page {
    constructor(li) {
        this.li = li;
    }

    _getOpenPage() {
        return this.li.$FK('.openPage');
    }

    getUrl() {
        return this._getOpenPage().getAttribute("href");
    }

    setUrl(url) {
        this.li.$FK('a').setAttribute("href", url);
        this._getOpenPage().setAttribute("href", url);
        this.li.$FK('iframe').setAttribute("src", url);
    }

    _getFigcaption() {
        return this.li.$FK('figcaption');
    }

    getTitle() {
        return this._getFigcaption().textContent;
    }

    setTitle(title) {
        this._getFigcaption().textContent = title;
    }

    asJson() {
        return {
            title: this.getTitle(),
            url: this.getUrl()
        };
    }
}

class Model {
    constructor(ul) {
        this.ul = ul;
    }

    addPage(page) {
        this.ul.appendChild(page.li);
    }

    removePage(page) {
        this.ul.removeChild(page.li);
    }

    getPages() {
        return this.ul.$$FK('li').map(li => new Page(li));
    }

    asJson(model) {
        let pagesAsJson = this.getPages().map(page => page.asJson());
        return {
            pages: pagesAsJson
        };
    }
}

function jsonAsModel(json) {
    let model = new Model(document.createElement('ul'));
    json.pages
        .map(jsonPage => createPage(model, jsonPage.title, jsonPage.url))
        .forEach(page => model.addPage(page));
    return model;
}