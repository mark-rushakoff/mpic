function initializeButton(buttonFuncName, buttonId) {
    var $buttonSection = $("#" + buttonId);
    var buttonClickFunc = window[buttonFuncName]($buttonSection.find(".output"));

    var $button = $("<button/>").addClass("adder").text(buttonFuncName);
    $button.click(buttonClickFunc);
    $buttonSection.find(".input").append($button);
}

function onButtonAdded($button) {
   if ($("#attach_leak").prop("checked")) {
     $button.get(0).leak = new Leak();
   }
}

$(function initializeCodeToggling() {
    $(".CodeRay").hide();
    $(document).on("click", "a.toggle", function(e) {
        $(e.target).siblings(".CodeRay").toggle(400);
    });
});
