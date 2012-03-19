function initializeButton(buttonFuncName, buttonId) {
    var $buttonSection = $("#" + buttonId);
    var buttonClickFunc = window[buttonFuncName]($buttonSection.find(".output"));

    var $button = $("<button/>").addClass("adder").text(buttonFuncName);
    $button.click(buttonClickFunc);
    $buttonSection.find(".input").append($button);
}
