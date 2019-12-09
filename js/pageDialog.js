"use strict";

class PageDialogData {
    getPageDialog() {
        return $("#pageDialog")
    }

    getTitleField() {
        return $('#pageDialog #pageTitle');
    }

    getUrlField() {
        return $('#pageDialog #pageUrl');
    }

    copyTitle2PreviewFigcaption() {
        return $FK('#pageDialog .preview figcaption').textContent = this.getTitleField().val();
    }

    copyUrl2PreviewIframe() {
        $FK('#pageDialog .preview iframe').setAttribute("src", this.getUrlField().val());
    }
}

let pageDialogData = new PageDialogData();

function createPageDialog(title, open, buttons) {
    pageDialogData.getTitleField().on('input', () => pageDialogData.copyTitle2PreviewFigcaption());
    pageDialogData.getUrlField().on('input', () => pageDialogData.copyUrl2PreviewIframe());

    pageDialogData.getPageDialog().dialog({
        title: title,
        autoOpen: false,
        modal: true,
        width: 600,
        open: open,
        buttons: buttons
    });

    return pageDialogData.getPageDialog();
}

function setTitleAndUrlInPageDialog(title, url) {
    pageDialogData.getTitleField().val(title);
    pageDialogData.copyTitle2PreviewFigcaption();

    pageDialogData.getUrlField().val(url);
    pageDialogData.copyUrl2PreviewIframe();
}

function createEditPageDialog() {
    const open = function (event, ui) {
        let page = $(this).data('page');
        setTitleAndUrlInPageDialog(page.getTitle(), page.getUrl());
    };

    const buttons = [{
            text: "Speichern",
            click: function () {
                editPageAndSave($(this).data('page'), pageDialogData.getTitleField().val(), pageDialogData.getUrlField().val());
                $(this).dialog("close");
            }
        },
        {
            text: "Abbrechen",
            click: function () {
                $(this).dialog("close");
            }
        }
    ];

    return createPageDialog("Seite bearbeiten", open, buttons);
}

function editPageAndSave(page, title, url) {
    page.setTitle(title);
    page.setUrl(url);
    application.saveModel();
}

function createAddPageDialog() {
    const open = function (event, ui) {
        setTitleAndUrlInPageDialog('', '');
    };

    const buttons = [{
            text: "Hinzufügen",
            click: function () {
                addPageToModelAndSave($(this).data('model'), pageDialogData.getTitleField().val(), pageDialogData.getUrlField().val());
                $(this).dialog("close");
            }
        },
        {
            text: "Abbrechen",
            click: function () {
                $(this).dialog("close");
            }
        }
    ];

    return createPageDialog("Neue Seite", open, buttons);
}

function addPageToModelAndSave(model, title, url) {
    model.addPage(createPage(model, title, url));
    application.saveModel();
}