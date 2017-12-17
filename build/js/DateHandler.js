export class DateHandler {

  constructor(dte) {

	  this.dateCollection = dte.sort();
	  this.date01 = this.dateCollection[0] || null;
	  this.date02 = this.dateCollection[1] || null;

	  this.monthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  	sortDates( ){

  	}
	getDates(dateStr) {
		console.log('dateStr', dateStr);

		let dt = dateStr.split(/[.\/, -]/);
		console.log("dt: ", dt)
		let dateObj = {
				Year:	parseInt(dt[0]),
				Month: 	parseInt(dt[1]),
				Day: 	parseInt(dt[2])
				
		}
		return dateObj;
	}

	isLeapYr (year) {
	if ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
			return year;
		} else {
			return false;
		}
	}

	startEndDates () {
		let dateSelection =  this.dateCollection.map(this.getDates);
		return dateSelection;
	}

	getDaysInMonth ( m ) {
		let mm = parseInt(m);
		return this.monthDays[mm];
	}

 
	daysInYears () {
		// check days between selected years
		let years = [];
		let year = this.startEndDates()[0].Year;
		while(year+1 <= this.startEndDates()[1].Year) {
			years.push(year++);
		}
		let total_days_in_years = 0;
			years.forEach(lyr => {
				total_days_in_years += (this.isLeapYr(lyr)) ? 366 : 365;
			})
		return total_days_in_years;
	}
	daysBetweenMonths () {
		let mthDays = [];
		let mth = this.startEndDates()[0].Month;
		let mth02 = this.startEndDates()[1].Month;

		while(mth+1 <= mth02){
			mthDays.push(mth++);
		}
		let m = 0;
		mthDays.forEach(month => {
			m += this.monthDays[month];
		})
		return m;
	}
	daysBetweenDays() {
		return (this.startEndDates()[1].Day)-(this.startEndDates()[0].Day+1);
	}

	diffYears() {
		return this.startEndDates()[1].Year - this.startEndDates()[0].Year;
	}

	totalDaysDiffFromDate() {
		let days_yy = this.daysInYears() || 0;
		let days_mm = this.daysBetweenMonths() || 0;
		let days_dd = this.daysBetweenDays() || 0;

		return days_yy + days_mm + days_dd;
	}
	
}

