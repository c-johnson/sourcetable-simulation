// import Datepicker from '../node_modules/vanillajs-datepicker/js/Datepicker.js';
import DateRangePicker from '../node_modules/vanillajs-datepicker/js/DateRangePicker.js';

import rocketAPI from './api.js'
import calculator from './calculate.js';
import { USDFormatter } from './formatters.js'

var initializeApplication = () => {
  const datepickerElem = document.getElementById('datepicker');
  const rangepicker = new DateRangePicker(datepickerElem, {
    autohide: true
  });

  const datepickerStartElem = document.getElementById('datepicker-start');
  const datepickerEndElem = document.getElementById('datepicker-end');
  datepickerStartElem.addEventListener('changeDate', (e) => { loadLaunches(e, rangepicker); }, false);
  datepickerEndElem.addEventListener('changeDate', (e) => { loadLaunches(e, rangepicker); }, false);
}

var loadLaunches = async (e, rangepicker) => {
  const dates = rangepicker.getDates();

  const metricsArr = await rocketAPI.getMetrics(dates[0], dates[1]);
  const computedMetrics = calculator.collateMetrics(metricsArr);

  renderData(computedMetrics);
}

var renderData = (computedMetrics) => {
  const avgCostFormat = USDFormatter.format(computedMetrics.avgLaunchCost);
  const pctSuccessFormat = parseFloat(computedMetrics.pctMissionSuccess).toFixed(2);

  document.querySelectorAll('#avg-launch-cost')[0].innerHTML = `${avgCostFormat} million`;
  document.querySelectorAll('#pct-launch-success')[0].innerHTML = `${pctSuccessFormat}%`;
  document.querySelectorAll('#most-popular-month')[0].innerHTML = computedMetrics.mostPopularMonth;
  document.querySelectorAll('#top-three-launch-locations')[0].innerHTML = computedMetrics.topThreeLaunchLocations.join(", ")
}

initializeApplication();
