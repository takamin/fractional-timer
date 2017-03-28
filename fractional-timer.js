(function() {
    "use strict";
    function FractionalTimer() {
        this._numOfTimer = 1;
        this._delay = 1;
        this._iteration = 1;
        this._func = null;
        this._timerIds = null;

        this._calcFreq = null;
        this._tickStart = (new Date()).getTime();
        this._count = 0;
        this._tickEnd = (new Date()).getTime();
    }
    FractionalTimer.prototype.setNumOfTimer = function(value) {
        this.updateTimer(function() {
            this._numOfTimer = value;
        });
    };
    FractionalTimer.prototype.setTimerInterval = function(value) {
        this.updateTimer(() => this._delay = value );
    };
    FractionalTimer.prototype.setProcCount = function(value) {
        this.updateTimer(() => this._iteration = value );
    };
    FractionalTimer.prototype.setProc = function(func) {
        this.updateTimer(() => this._func = func );
    };
    FractionalTimer.prototype.isRunning = function() {
        return this._timerIds != null;
    };
    FractionalTimer.prototype.start = function() {
        if(this.isRunning()) {
            return;
        }
        this._timerIds = [];
        this._tickStart = (new Date()).getTime();
        this._count = 0;
        this._tickEnd = (new Date()).getTime();
        for(let i = 0; i < this._numOfTimer; i++) {
            this._timerIds.push(setInterval(function(){
                if(this._timerIds == null) {
                    return;
                }
                for(let ii = 0; ii < this._iteration; ii++) {
                    if(this._timerIds != null) {
                        this._count++;
                        this._func();
                    }
                }
            }.bind(this), this._delay));
        }
    };
    FractionalTimer.prototype.stop = function() {
        if(!this.isRunning()) {
            return;
        }
        this._tickEnd = (new Date()).getTime();
        this._timerIds.forEach(tid => clearInterval(tid) );
        this._timerIds = null;
    };
    FractionalTimer.prototype.getElapse = function() {
        return this._tickEnd - this._tickStart;
    };
    FractionalTimer.prototype.getCalculatedFreq = function() {
        return this._calcFreq;
    };
    FractionalTimer.prototype.getActualFreq = function() {
        let elapse = this.getElapse();
        if(elapse == 0) {
            return null;
        }
        return this._count / (elapse / 1000);
    };
    FractionalTimer.prototype.getStat = function () {
        let calcFreq = this.getCalculatedFreq();
        let elapse = this.getElapse();
        let actualFreq = this.getActualFreq();
        return {
            parameter: {
                numOfTimer: this._numOfTimer,
                interval: this._delay,
                iteration: this._iteration,
                calcFreq: calcFreq
            },
            result: {
                elapse: elapse,
                actualFreq: actualFreq,
                actParCalc: actualFreq / calcFreq
            }
        };
    };
    FractionalTimer.prototype.updateTimer = function(modifier) {
        let timer_was_running = this.isRunning();
        if(timer_was_running) {
            this.stop();
        }
        modifier.call(this);
        if(this._delay != 0) {
            this._calcFreq = this._iteration * (1000 / this._delay) * this._numOfTimer;
        } else {
            this._calcFreq = null;
        }
        if(timer_was_running) {
            this.start();
        }
    };
    FractionalTimer.setInterval = function(proc, interval, numOfTimer, iteration) {
        numOfTimer = numOfTimer || 0;
        iteration = iteration || 0;
        if(numOfTimer == 0 && iteration == 0) {
            let freq = 1.0 / interval;
            while((interval * ++numOfTimer) < 20) {
                ;
            }
            interval = Math.round(interval * numOfTimer);

            while((numOfTimer / ++iteration) > 500) {
                ;
            }
            numOfTimer = Math.round(numOfTimer / iteration);
        }
        let ftid = new FractionalTimer();
        ftid.setProc(proc);
        ftid.setNumOfTimer(numOfTimer);
        ftid.setTimerInterval(interval);
        ftid.setProcCount(iteration);
        ftid.start();
        return ftid;
    };
    FractionalTimer.clearInterval = function(ftid) {
        ftid.stop();
    };
    try {
        module.exports = {
            setInterval: FractionalTimer.setInterval,
            clearInterval: FractionalTimer.clearInterval
        };
    } catch(err) {
        // For the Web browser, Export the class to global object
        (function(g) {
            g.FractionalTimer = FractionalTimer;
        }(Function("return this;")()));
    }
}());
