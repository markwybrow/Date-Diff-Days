import DateHandler from './DateHandler'

let formFields = document.querySelectorAll('input[type="text"]');
const resultEl = document.getElementById('result');
if (resultEl.classList.contains('active')) {
    resultEl.classList.remove('active');
    resultEl.classList.add('inactive');
}
// interaction with input
formFields.forEach(ff => {
    ff.addEventListener('focus', (e) => {
        let el = e.target.parentElement.firstElementChild;
        if (!el.classList.contains('form-top')) {
            el.className += ' form-top';
            e.target.type = 'date';
        }
    })
});

formFields.forEach(ff => {
    ff.addEventListener('blur', (e) => {
        let el = e.target.parentElement.firstElementChild;
        if (el.classList.contains('form-top') && !e.target.value) {
            el.classList.remove('form-top');
            e.target.type = 'text';
        }
    })

});

// onSubmit
let sendDates = document.querySelectorAll('button');

sendDates[0].addEventListener('click', (e) => {
    const err = document.getElementById('errMsg');

    if (err.classList.contains('active')) {
        err.classList.remove('active');
        err.classList.add('inactive');
    }

    let dates = [],
        error;
    formFields.forEach(dte => {
        // validate to come
        if (dte.value.trim()) {
            dates.push(dte.value);
        } else {
            err.innerHTML = 'Both Dates are required to find a difference'
            err.classList.remove('inactive');
            err.classList += ' active';
            error = 1;
        }
    })

    if (!error) {

        let dte = new DateHandler(dates);

        if (resultEl.classList.contains('inactive')) {
            resultEl.classList +=' active';
            resultEl.classList.remove('inactive');
        }
        resultEl.innerHTML = `${dte.totalDaysDiffFromDate()} <span>days&nbsp;<small>&nbsp;&nbsp;non inc.</small></span>`;
    }
});