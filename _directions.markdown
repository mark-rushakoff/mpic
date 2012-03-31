## Directions

### How to use Chrome's memory profiler

First, open up Chrome's developer console :

* <kbd>CTRL</kbd>-<kbd>SHIFT</kbd>-<kbd>i</kbd> on Linux or Windows
* <kbd>&#8984;</kbd>-<kbd>&#8997;</kbd>-<kbd>i</kbd> on Mac
* Or just right-click on the page and choose "Inspect Element"

Next, head over to the Profiles tab.

### Your first heap snapshot

All three platforms for have subtly different interfaces to the profiling tools, so (currently) I won't be providing any screenshots -- hopefully this encourages you to actually follow along in your browser.

Take a snapshot right now, on this page.
On some platforms you have to click the icon that looks like an eye, and on others you have to choose a radio button that says something about "Heap Profiling" and then you have to click a button labeled "Start".

TODO: Elaborate on taking snapshots.

### Benchmarking

To help understand benchmarks when they matter, it helps to understand what "overhead" there is in the benchmarks.
The simplest thing to do first for benchmarking is take two snapshots in a row, then compare them.

If there was no overhead, the comparison would show no differences between the two snapshots; but we see that Chrome at least creates some strings that go along with the snapshot.

### Profiling

So you think you have a memory leak?
The quickest way to check is to:

* Take a heap snapshot
* "Do and Undo" an operation
* Take another heap snapshot

If the sizes of the two heap snapshots are the same, that's a good indicator that you don't have a leak, but you'll still have to compare the snapshots.

### Try it out

I've included several examples themed around adding and removing buttons from the DOM.

The first one, "Buttoner," is the only one that shouldn't cause any leaks.
The rest still retain the hidden button in memory somehow.

Try adding and removing buttons and figuring out why the buttons are still retained in memory.
If you need to make it a little easier to track down, check the box above the buttons to attach a Leak object to the created buttons.
Or if you're having trouble, you can always show the source code for the button generator.
