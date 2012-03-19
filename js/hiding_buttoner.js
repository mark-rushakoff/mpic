// Bad implementation: only hides the button
function HidingButtoner($container) {
    var counter = 0;
    return function() {
        var $button = $("<button/>").text("HidingButtoner " + (++counter));
        $button.click(function(){ $button.hide(); });
        $container.append($button);
    }
};
