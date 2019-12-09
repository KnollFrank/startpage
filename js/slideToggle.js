"use strict";

$(document).ready(function () {
    showOrHide($(".option-heading"));

    $(".option-heading").click(function () {
        $(this).toggleClass('is-active');
        showOrHide($(this));
    });

    function showOrHide(optionHeading) {
        let optionContent = optionHeading.next(".option-content");
        if (optionHeading.hasClass('is-active')) {
            optionContent.slideDown('slow');
        } else {
            optionContent.slideUp('slow');
        }
    }
});