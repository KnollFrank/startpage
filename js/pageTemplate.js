"use strict";

function createPage(model, title, url) {
    return createPageFrom(model, newId(), title, url);
}

function createPageFrom(model, newId, title, url) {
    let dropdownContentId = `dropdownContent${newId}`;
    let liId = `li${newId}`;
    let li = getHtml('pageTemplate.html');
    li.id = liId;
    let page = new Page(li);
    page.setUrl(url);
    page.setTitle(title);

    li.$FK('button').on('click', () => toggleDropdownContent(dropdownContentId));
    li.$FK('.dropdown-content').setAttribute("id", dropdownContentId);
    li.$FK('a[href="#removePage"]').on('click', () => removePage(model, page));
    li.$FK('a[href="#editPage"]').on('click', () => editPage(page));
    addDragHandlers(li);

    return page;
}

function getHtml(url) {
    let capturedHtml;

    jQuery.ajax({
        url: url,
        dataType: 'html',
        success: function (html) {
            capturedHtml = html;
        },
        async: false
    });

    return $.parseHTML(capturedHtml)[0];
}

function removePage(model, page) {
    model.removePage(page);
    application.saveModel();
}

function editPage(page) {
    createEditPageDialog()
        .data('page', page)
        .dialog('open');
}