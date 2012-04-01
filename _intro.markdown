## Introduction

This page has been developed as a reference for some of the ways that a memory may occur in a single page application, and is intended as a learning tool for using Chrome (or Chromium!) to track down Javascript memory leaks.

There are several demonstrations of code that is supposed to add and remove buttons from the DOM.
They are all implemented differently; the first one doesn't completely cleans up after itself (thereby not creating a leak), and the rest leak memory.
It's your task to track down why the leaks are happening.
