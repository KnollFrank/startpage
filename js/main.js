"use strict";

let application = new Application(new StorageLocal());

$(document).ready(function () {
    $FK('#addPageCmd').on('click', () => addPageToModel(application.model));
    showModel(application.model);
    createEditPageDialog(); // in order to make dialog disappear
});

function addPageToModel(model) {
    createAddPageDialog()
        .data('model', model)
        .dialog('open');
}

function showModel(model) {
    $FK('#pagesContainer').appendChild(model.ul);
}