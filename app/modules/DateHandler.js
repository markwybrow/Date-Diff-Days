export default class DateHandler {
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
    constructor(dte) {
        this.usrDates = dte;

        this.dateCollection = [];

        this.monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        this.sortDates();
    }

    sortDates() {
        let dateOrdered = [];
        this.usrDates.forEach(d => {
            let s = parseInt(d.replace(/[.\/, -]/g, ''));
            dateOrdered.push({
                s,
                d
            });
        });

        let sorted = dateOrdered.sort((a, b) => {
            return a.s - b.s
        })
        this.dateCollection = [sorted[0].d, sorted[1].d];
    }

    getDates(dateStr) {
        console.log("getDates: " + dateStr);
        let dt = dateStr.split(/[.\/, -]/);
        return {
            Year: parseInt(dt[0]),
            Month: parseInt(dt[1]),
            Day: parseInt(dt[2])
        }
    }

    isLeapYr(year) {
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
            return 366;
        } else {
            return 365;
        }
    }

    daysInYears(_year) {
        // check days between selected years
        let years = [];
        let year = _year;
        let total_days_in_years = 0;
        console.log("THIS YEAR: ", year);
        for (let i = 1900; i < year; i++) {
            years.push(i)
        }
        years.forEach(lyr => {
            total_days_in_years += this.isLeapYr(lyr);
        })
        console.log("days eqiv:", total_days_in_years);
        return total_days_in_years;
    }

    getDifference(a, b) {
        return parseInt(a - b) < 0 ? parseInt(a - b * -1) : parseInt(a - b);
    }

    monthsDaysLeftInYear(daysInYr, month, day) {
        // days till end of year
        let mthDays = this.monthDays.slice(1, month);
        return mthDays.reduce((m, val) => {
            return m + val;
        }, 0) + day;
    }

    totalDaysDiffFromDate() {

        let date = this.dateCollection;
        let dte_01 = this.getDates(date[0]);
        let dte_02 = this.getDates(date[1]);

        let days_date01 = this.monthsDaysLeftInYear(dte_01.Year, dte_01.Month, dte_01.Day);
        console.log("------ date-01 :", `${days_date01}+${this.daysInYears(dte_01.Year)}`);
        let d1 = days_date01 + this.daysInYears(dte_01.Year);
        let days_date02 = this.monthsDaysLeftInYear(dte_02.Year, dte_02.Month, dte_02.Day);
        console.log("------ date-02 :", `${days_date02}+${this.daysInYears(dte_02.Year)}`);
        let d2 = days_date02 + this.daysInYears(dte_02.Year);

        return this.getDifference(d2, d1)-1;
    }

}