// Bad implementation: only hides the button

// Provide a constructor
window.BadButtoner = function BadButtoner() {
    this.counter = 0;
};
window.BadButtoner.prototype = {
    // Instance method add:
    // When called, should append a button to the provided container
    add: function($container) {
        var $button = $("<button/>").text("BadButtoner " + (++this.counter));
        $button.click(function(){ $button.hide(); });
        $container.append($button);
    },
};
