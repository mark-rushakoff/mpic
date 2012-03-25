// Bad implementation: DOM event handler retains reference
function CallbackLeakButtoner($container) {
    var counter = 0;
    return function() {
        var $button = $("<button/>").text("Callback Leak Buttoner " + (++counter));
        $button.click(function(){ $button.remove(); });

        // callback is never unbound, and the function retains a closure reference to the button that we remove
        $container.hover(function() { $button.toggleClass("parent_hover"); });
        $container.append($button);
    }
};
