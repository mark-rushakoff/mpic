// Base, reference implementation

// input: jQuery selector for where to put a new button
// returns: Function that, when called, appends a button to the input container.
//          When THAT button is clicked, it removes itself (properly in this case).
function Buttoner($container) {
    var counter = 0;
    return function() {
        var $button = $("<button/>").text("Buttoner " + (++counter));
        $button.click(function(){ $button.remove(); });
        $container.append($button);
        onButtonAdded($button);
    }
};
