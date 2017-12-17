const chai = require('chai');
const assert = chai.assert;

// let dateHandler = require('../app/modules/DateHandler');
import DateHandler from '../app/modules/DateHandler'

describe('Date Handler :: ', () => {

        it('Should return a result of 19 days from 02/06/1983 - 22/06/1983 ', () => {
            const dates = ['1983-06-02', '1983-06-22'] // web browser sends dates as yyyy-mm-dd ['02/06/1983', '22/06/1983']
            const dt = new DateHandler(dates);
            let result = dt.totalDaysDiffFromDate()

            assert.equal(result, 19);
        })
        it('Should return a result of 146 days from 13/11/1997 - 08/04/1998 ', () => {
            const dates = ['1997-11-13', '1998-04-08'] // web browser sends dates as yyyy-mm-dd ['02/06/1983', '22/06/1983']
            const dt = new DateHandler(dates);
            let result = dt.totalDaysDiffFromDate()

            assert.equal(result, 145);
        })

        it('Should return a result of 19 days from 22/06/1983 - 02/06/1983 :: change of order', () => {
            const dates = ['1983-06-22', '1983-06-02'] // web browser sends dates as yyyy-mm-dd ['02/06/1983', '22/06/1983']
            const dt = new DateHandler(dates);
            let result = dt.totalDaysDiffFromDate()

            assert.equal(result, 19);
        })


        it('Should return a result of 173 days from 04/07/1984 - 25/12/1984 ', () => {
            const dates = ['1984-07-04', '1984-12-25'] // web browser sends dates as yyyy-mm-dd ['02/06/1983', '22/06/1983']
            const dt = new DateHandler(dates);
            let result = dt.totalDaysDiffFromDate()

            assert.equal(result, 173);
        })

        it('Should return a result of 1979 days from 03/01/1989 - 05/08/1983 ', () => {
            const dates = ['1989-01-03', '1983-08-05'] // web browser sends dates as yyyy-mm-dd ['02/06/1983', '22/06/1983']
            const dt = new DateHandler(dates);
            let result = dt.totalDaysDiffFromDate();


            assert.equal(result, 1979);
        })


        it('Should return a result of 1979 days from 05/08/1989 - 03/01/1989 ', () => {
            const dates = ['1989-08-01', '1980-08-01'] // web browser sends dates as yyyy-mm-dd ['02/06/1983', '22/06/1983']
            const dt = new DateHandler(dates);
            let result = dt.totalDaysDiffFromDate()

            assert.equal(result, 3287);
        })

         it('Should return a result of 1979 days from 01/08/1989 - 02/08/1989 ', () => {
            const dates = ['1989-08-01', '1989-08-02'] // web browser sends dates as yyyy-mm-dd ['02/06/1983', '22/06/1983']
            const dt = new DateHandler(dates);
            let result = dt.totalDaysDiffFromDate()

            assert.equal(result, 0);
        })

    })


// We can have more here ...