fractional-timer
================

The _best effort_ sub-millisecond interval timer.

This module is confirmed to work on the Chrome and node.js.
But, the Firefox or the Microsoft Edge may confuse.

Simple Example
--------------

```javascript
let ft = require("fractional-timer");
let ftid = ft.setInterval(()=>{
        ft.clearInterval(ftid);
    }, 0.001); // 1 micro-seconds
```

Setup
-----

```bash
$ npm install fractional-timer
```

For using on the browser, use `browserify` or the static methods
named `setInterval` and `clearInterval` provided by the
`FractionalTimer` class.

APIs
----

* __setInterval( _func_ , _delay_ )__ starts the interval timer process.
This returns the timer id.
* __clearInterval(_fractional-timer-id_)__ stops the timer.

Both of above exported functions are almost same to the standard version
provided except for that the delay duration of `setInterval` could be
set as less than a milliseconds.

LICENSE
-------

This software is released under the MIT License, see [LICENSE](LICENSE)
