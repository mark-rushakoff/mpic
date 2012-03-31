function Leak() {
  for (var i = 0; i < 1000; i++) {
    this["leakObj" + i.toString()] = i;
  }
}
