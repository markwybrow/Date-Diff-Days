(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _modules = require("./modules");

},{"./modules":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateHandler = function () {
    /**
    // find the number day of the year this date is
    // 2017-03-25 = (31+28) + 25 = 84
    // last day in this year dec 31; 365-84 = 281;
    // 2017-03-29 = (31+28) + 29 = 88
    // last day in this year dec 31; 365-88 = 277
    // 281-277 = 4;
    // calc how many days back to 1900 inc Leap Years ... add amount of days already used in the dates selected
    // run a difference check
    **/
    function DateHandler(dte) {
        var _this = this;

        _classCallCheck(this, DateHandler);

        this.sortDates = function () {
            var dateOrdered = [];
            _this.usrDates.forEach(function (d) {
                var s = parseInt(d.replace(/[.\/, -]/g, ''));
                dateOrdered.push({
                    s: s,
                    d: d
                });
            });

            var sorted = dateOrdered.sort(function (a, b) {
                return a.s - b.s;
            });
            _this.dateCollection = [sorted[0].d, sorted[1].d];
        };

        this.usrDates = dte;

        this.dateCollection = [];

        this.monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        this.sortDates();
    }

    _createClass(DateHandler, [{
        key: "getDates",
        value: function getDates(dateStr) {
            console.log("getDates: " + dateStr);
            var dt = dateStr.split(/[.\/, -]/);
            return {
                Year: parseInt(dt[0]),
                Month: parseInt(dt[1]),
                Day: parseInt(dt[2])
            };
        }
    }, {
        key: "isLeapYr",
        value: function isLeapYr(year) {
            if (year % 4 === 0 && year % 100 !== 0 || year % 100 === 0 && year % 400 === 0) {
                return 366;
            } else {
                return 365;
            }
        }
    }, {
        key: "daysInYears",
        value: function daysInYears(_year) {
            var _this2 = this;

            // check days between selected years
            var years = [];
            var year = _year;
            var total_days_in_years = 0;
            console.log("THIS YEAR: ", year);
            for (var i = 1900; i < year; i++) {
                years.push(i);
            }
            years.forEach(function (lyr) {
                total_days_in_years += _this2.isLeapYr(lyr);
            });
            console.log("days eqiv:", total_days_in_years);
            return total_days_in_years;
        }
    }, {
        key: "getDifference",
        value: function getDifference(a, b) {
            return parseInt(a - b) < 0 ? parseInt(a - b * -1) : parseInt(a - b);
        }
    }, {
        key: "monthsDaysLeftInYear",
        value: function monthsDaysLeftInYear(daysInYr, month, day) {
            // days till end of year
            var mthDays = this.monthDays.slice(1, month);
            return mthDays.reduce(function (m, val) {
                return m + val;
            }, 0) + day;
        }
    }, {
        key: "totalDaysDiffFromDate",
        value: function totalDaysDiffFromDate() {

            var date = this.dateCollection;
            var dte_01 = this.getDates(date[0]);
            var dte_02 = this.getDates(date[1]);

            var days_date01 = this.monthsDaysLeftInYear(dte_01.Year, dte_01.Month, dte_01.Day);
            console.log("------ date-01 :", days_date01 + "+" + this.daysInYears(dte_01.Year));
            var d1 = days_date01 + this.daysInYears(dte_01.Year);
            var days_date02 = this.monthsDaysLeftInYear(dte_02.Year, dte_02.Month, dte_02.Day);
            console.log("------ date-02 :", days_date02 + "+" + this.daysInYears(dte_02.Year));
            var d2 = days_date02 + this.daysInYears(dte_02.Year);

            return this.getDifference(d2, d1) - 1;
        }
    }]);

    return DateHandler;
}();

exports.default = DateHandler;

},{}],3:[function(require,module,exports){
'use strict';

var _DateHandler = require('./DateHandler');

var _DateHandler2 = _interopRequireDefault(_DateHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formFields = document.querySelectorAll('input[type="text"]');
var resultEl = document.getElementById('result');
if (resultEl.classList.contains('active')) {
    resultEl.classList.remove('active');
    resultEl.classList.add('inactive');
}
// interaction with input
formFields.forEach(function (ff) {
    ff.addEventListener('focus', function (e) {
        var el = e.target.parentElement.firstElementChild;
        if (!el.classList.contains('form-top')) {
            el.className += ' form-top';
            e.target.type = 'date';
        }
    });
});

formFields.forEach(function (ff) {
    ff.addEventListener('blur', function (e) {
        var el = e.target.parentElement.firstElementChild;
        if (el.classList.contains('form-top') && !e.target.value) {
            el.classList.remove('form-top');
            e.target.type = 'text';
        }
    });
});

// onSubmit
var sendDates = document.querySelectorAll('button');

sendDates[0].addEventListener('click', function (e) {
    var err = document.getElementById('errMsg');

    if (err.classList.contains('active')) {
        err.classList.remove('active');
        err.classList.add('inactive');
    }

    var dates = [],
        error = void 0;
    formFields.forEach(function (dte) {
        // validate to come
        if (dte.value.trim()) {
            dates.push(dte.value);
        } else {
            err.innerHTML = 'Both Dates are required to find a difference';
            err.classList.remove('inactive');
            err.classList += ' active';
            error = 1;
        }
    });

    if (!error) {

        var dte = new _DateHandler2.default(dates);

        if (resultEl.classList.contains('inactive')) {
            resultEl.classList += ' active';
            resultEl.classList.remove('inactive');
        }
        resultEl.innerHTML = dte.totalDaysDiffFromDate() + ' <span>days <small>non inc.</small></span>';
    }
});

},{"./DateHandler":2}],4:[function(require,module,exports){
'use strict';

var _formdisplay = require('./formdisplay');

var _formdisplay2 = _interopRequireDefault(_formdisplay);

var _DateHandler = require('./DateHandler');

var _DateHandler2 = _interopRequireDefault(_DateHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./DateHandler":2,"./formdisplay":3}]},{},[1]);
