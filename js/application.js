"use strict";

class Application {
    constructor(storage) {
        this.storage = storage;
        this._prepareModel();
    }

    _prepareModel() {
        if (!this.storage.load()) {
            this.storage.save({
                pages: []
            });
        }
        this.model = jsonAsModel(this.storage.load());
    }

    saveModel() {
        this.storage.save(this.model.asJson());
    }
}