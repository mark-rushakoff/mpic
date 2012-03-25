// Bad implementation: only hides the button
function HidingButtoner($container) {
    var counter = 0;
    return function() {
        var $button = $("<button/>").text("HidingButtoner " + (++counter));
        $button.click(animateToHide);
        $container.append($button);

        function animateToHide() {
            $button.
                css('white-space', 'nowrap').
                animate({ width: 0 }, 400, function() { $button.hide(); });
        }
    }
};
