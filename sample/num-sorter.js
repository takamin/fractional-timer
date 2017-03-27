(function() {
    "use strict";
    function NumSorter() {
        this._nums = [];
        this._i = 0;
        this._j = 0;
    }
    NumSorter.prototype.setNumbers = function(nums) {
        var n = nums.length;
        this._nums = new Array(n);
        for(var i = 0; i < n; i++) {
            this._nums[i] = nums[i];
        }
        this._i = 0;
        this._j = 1;
        this._n = n;
    };
    NumSorter.prototype.sort1 = function() {
        if(this._nums[this._i] >
            this._nums[this._j])
        {
            // Swap
            var temp = this._nums[this._i];
            this._nums[this._i] =
                this._nums[this._j];
            this._nums[this._j] = temp;
        }
        // Update indexies
        if(++this._j >= this._n) {
            if(++this._i >= this._n - 1) {
                return false;// complete
            }
            this._j = this._i + 1;
        }
        return true;// continue
    };
    module.exports = NumSorter;
}());
