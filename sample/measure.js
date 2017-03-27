(() => {
    "use strict";
    let ft = require("../fractional-timer");
    let NumSorter = require("./num-sorter");

    let N = 2000;
    let taskList = [
        [0, 1.0/1000, 0],
        [0, 1.0/10000, 0],
        [0, 1.0/20000, 0],
        [0, 1.0/40000, 0],
        [0, 1.0/50000, 0],

        [1, 1, 10000],
        [10, 1, 1000],
        [20, 1, 500],
        [50, 1, 200],
        [100, 1, 100],
        [200, 1, 50],
        [500, 1, 20],
        [1000, 1, 10],

        [1, 10, 100000],
        [10, 10, 10000],
        [20, 10, 5000],
        [100, 10, 1000],
        [200, 10, 500],
        [500, 10, 200],
        [1000, 10, 100],

        [1, 20, 200000],
        [10, 20, 20000],
        [20, 20, 10000],
        [100, 20, 2000],
        [200, 20, 1000],
        [500, 20, 400],
        [1000, 20, 200],

        [1, 50, 500000],
        [10, 50, 50000],
        [20, 50, 25000],
        [100, 50, 5000],
        [200, 50, 2500],
        [500, 50, 1000],
        [1000, 50, 500],
    ].map(item => {
        return () => {
            return new Promise( (resolv, reject) => {
                try {
                    let numSorter = new NumSorter();
                    numSorter.setNumbers(nums);
                    let timer = ft.setInterval(() => {
                        if(!numSorter.sort1()) {
                            ft.clearInterval(timer);
                            console.log(JSON.stringify(timer.getStat()));
                            resolv();
                        }
                    }, item[1], item[0], item[2]);
                } catch(ex) {
                    reject(ex);
                }
            });
        }
    });

    // Create random numbers
    let nums = new Array(N);
    for(let i = 0; i < N; i++) {
        nums[i] = Math.random();
    }

    // Execute all test
    taskList.reduce(
            (p,c) => p.then(c).catch(function(err){console.error(err.message + " " + err.stack);}),
            Promise.resolve(100)
    ).then(() => {
        console.log("complete");
    }).catch(err => {
        console.log(err);
        console.log(JSON.stringify(err, null, "    "));
    });
}());
