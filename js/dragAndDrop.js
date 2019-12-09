// adapted from https://codepen.io/retrofuturistic/pen/tlbHE

function setDragSourceId(e) {
    e.dataTransfer.setData("text", e.currentTarget.id);
}

function getDragSourceId(e) {
    return e.dataTransfer.getData("text");
}

function getDragSource(e) {
    return $FK('#' + getDragSourceId(e));
}

function onDragStart(e) {
    setDragSourceId(e);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.classList.add('dragElem');
}

function onDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('over');
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function onDragEnter(e) { }

function onDragLeave(e) {
    e.currentTarget.classList.remove('over');
}

function onDrop(e) {
    e.preventDefault();

    let dragSource = getDragSource(e);
    dragSource.classList.remove('dragElem');

    let dropTarget = e.currentTarget;
    dropTarget.classList.remove('over');

    let isActualDragAndDrop = dropTarget.id != dragSource.id;
    if (isActualDragAndDrop) {
        dropTarget.insertAdjacentElement('beforebegin', dragSource);
        application.saveModel();
    }

    return false;
}

function onDragEnd(e) {
    e.currentTarget.classList.remove('over');
}

function addDragHandlers(page) {
    page.addEventListener('dragstart', onDragStart, false);
    page.addEventListener('dragenter', onDragEnter, false)
    page.addEventListener('dragover', onDragOver, false);
    page.addEventListener('dragleave', onDragLeave, false);
    page.addEventListener('drop', onDrop, false);
    page.addEventListener('dragend', onDragEnd, false);
}

$(document).ready(function () {
    $$FK('#pagesContainer .page').forEach(addDragHandlers);
});