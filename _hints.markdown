## Hints

### Does my app leak?

A very quick and ad-hoc way to detect whether your single-page app has a memory leak is to:

* Start on the simplest page of your app and take a heap snapshot
* Use your app for a few minutes
 * Navigate through several pages
 * Interact with "widgets" in your app
 * Feel free to repeat actions more than once
* Return to the page where you took the previous heap snapshot and take another heap snapshot

(I recommended taking your snapshot on the simplest page to minimize what gets double-counted.)

You don't even have to compare the two snapshots; just look at the memory usage.
If you used your app (in a semi-realistic way) for 5 minutes and you went from 2.50MB to 2.53MB, you probably don't have any significant memory leaks.
However, if you find that your memory usage jumped from 2.50MB to 3.88MB, you need to figure out what's causing the leak sooner rather than later.
You don't want to require your users to do a hard refresh of your app because it's using too much memory.

### Tracking down the cause of the leak

#### Named constructors
When comparing heap snapshots, you'll often have a lot of "overhead objects" (e.g. Strings, Arrays) that are usually not of interest when trying to fix memory leaks.
Chrome displays the construct functions' names in the heap snapshot, so it's extremely valuable for your constructor functions to be named functions; that means:

    // bad
    var MyObject = function() { /* ... */ }

    // better
    var MyObject = function MyObject() { /* ... */ }

When you're just getting an overview of whether there are memory leaks, Chrome's default sort of retained size is usually fine; but when you know there's a memory leak and you're trying to track down which part of your application is causing the leak, you'll often find that those "overhead objects" clutter up the results.
I've found that it's very helpful to use "pseudo-namespacing" for your constructor functions and then sort by name so that all your objects are grouped together.

    // best (when possible, use pseudo-namespacing)
    var MyObject = function ProjectNs$MyObject() { /* ... */ }

With some libraries that provide a class system, it can be difficult to set up constructor names; but in my experience it's worth the effort to understand how to get at the constructor names.
We even had to make a hacky extension into an old version of Backbone.js that used `eval` to make a named function for constructor methods, but it was easily disabled for production mode.
Nobody felt great about it, but it made tracking down memory leaks an order of magnitude easier.

#### Make an accessible cleanup function in your single-page app

If you're using a single-page app, you probably have some kind of global router object that controls loading the individual page objects in your app.
You should have a cleanup function that, at the very least, clears out the DOM and removes any callbacks from your objects to the `document` and `window` objects.
**Make sure you can access this function from the console during development.**

If you have a suspicion of a particular page causing a memory leak, you should drop into the console and:

* Call the cleanup function
* Take a heap snapshot (we'll call it Snapshot 1)
* Load the new page (also from the console)
* Call the cleanup function again
* Take another heap snapshot (we'll call it Snapshot 2)
* Compare snapshots 1 and 2

If the snapshot comparison indicates any difference (other than the couple of small internal objects you observed in benchmarking), you have either found a page that has a memory leak, or your cleanup function isn't cleaning up everything that it should.

#### Navigating the retaining tree

Once you've selected an object in the top pane of the heap snapshot, you can use the retaining tree in the bottom pane to figure out exactly why it's still in memory.
In other words, the retaining tree for a given object *x* shows you which other objects retain references to *x*.

Navigating the retaining tree is easy, but if you don't already have a good understanding of how objects in your app should relate, it can be very difficult to extract useful information from retaining tree.
This is when it really pays off to be patient and methodical.

Each level of indentation in the retaining tree corresponds with a "level of retention".
By expanding the retaining tree, you can see which object and which property or function are keeping another object in memory.

You might see that a `FooModel` is still in memory while you're on the `BarPage`.
Expanding the `FooModel` might show that the `FooModel` is being retained by the `FooTitleView` and the `FooDetailsView`, which are both retained by the `FooPage`, which is finally retained by the `document` object due to an event binding.

But it isn't always quite that simple.
There might be dozens of subviews that reference the `FooModel`, and they might be a varying number of levels of retention away from the real culprit (in this case the `FooPage`).
So, most of the time, it's better to search depth-first when trying to understand a retaining tree.
