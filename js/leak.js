function Leak() {
  for (var i = 0; i < 1000; i++) {
    this["leakObj" + i.toString()] = i;
  }
}

// store one leak object early so that the prototype, etc. don't show up in later comparison snapshots
window.oneTimeLeak = new Leak();
