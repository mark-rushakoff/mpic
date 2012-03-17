// Base, reference implementation

// Provide a constructor
window.Buttoner = function Buttoner() {
    this.counter = 0;
};
window.Buttoner.prototype = {
    // Instance method add:
    // When called, should append a button to the provided container
    add: function($container) {
        var $button = $("<button/>").text("Buttoner " + (++this.counter));
        $button.click(function(){ $button.remove(); });
        $container.append($button);
    },
};
