$(document).ready(function () {
    const noPagesFound = application.model.asJson().pages.length == 0;
    if (noPagesFound) {
        application.model.addPage(createPage(application.model, 'Tagesschau', 'https://www.tagesschau.de/'));
        application.model.addPage(createPage(application.model, 'ZDF', 'https://www.zdf.de/'));
        application.model.addPage(createPage(application.model, 'DKMS', 'https://www.dkms.de/de'));
        application.model.addPage(createPage(application.model, 'Phoenix', 'https://www.phoenix.de/'));
        application.saveModel();
    }
});