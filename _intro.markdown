## Introduction

This page has been developed as a reference for some of the ways that a memory may occur in a single page application, and is intended as a learning tool for using Chrome (or Chromium!) to track down Javascript memory leaks.

There are several demonstrations of code that is supposed to add and remove buttons from the DOM.
They are all implemented differently; first we look at one way to do it correctly, and then we look at several ways you can do it incorrectly.
