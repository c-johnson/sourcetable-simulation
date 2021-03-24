// import Datepicker from '../node_modules/vanillajs-datepicker/js/Datepicker.js';
import DateRangePicker from '../node_modules/vanillajs-datepicker/js/DateRangePicker.js';

var initializeApplication = () => {
  const datepickerElem = document.getElementById('datepicker');
  const rangepicker = new DateRangePicker(datepickerElem, {
    // ...options
  });

  const datepickerStartElem = document.getElementById('datepicker-start');
  const datepickerEndElem = document.getElementById('datepicker-end');
  datepickerStartElem.addEventListener('changeDate', (e) => { loadLaunches(e); }, false);
  datepickerEndElem.addEventListener('changeDate', (e) => { loadLaunches(e); }, false);
}

var loadLaunches = (e) => {
  console.log('date details: ', e.detail)
}

initializeApplication();
