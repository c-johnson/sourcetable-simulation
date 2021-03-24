import DateRangePicker from '../node_modules/vanillajs-datepicker/js/DateRangePicker.js';

import rocketAPI from './api.js'
import calculator from './calculate.js';
import { USDFormatter } from './formatters.js'
import { geocoordsMap, mapboxAccessToken } from './constants.js'

let launchMap;
let markers = [];

var initializeApplication = () => {
  const datepickerElem = document.getElementById('datepicker');
  const rangepicker = new DateRangePicker(datepickerElem, {
    autohide: true
  });

  const datepickerStartElem = document.getElementById('datepicker-start');
  const datepickerEndElem = document.getElementById('datepicker-end');
  datepickerStartElem.addEventListener('changeDate', (e) => { loadLaunches(e, rangepicker); }, false);
  datepickerEndElem.addEventListener('changeDate', (e) => { loadLaunches(e, rangepicker); }, false);

  launchMap = L.map('leaflet-map').setView([51.505, -0.09], 1);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapboxAccessToken
  }).addTo(launchMap);
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

  markers.forEach(m => m.remove());
  markers = [];

  markers.push(L.marker(geocoordsMap[computedMetrics.topThreeLaunchCountries[0]]).addTo(launchMap))
  markers.push(L.marker(geocoordsMap[computedMetrics.topThreeLaunchCountries[1]]).addTo(launchMap))
  markers.push(L.marker(geocoordsMap[computedMetrics.topThreeLaunchCountries[2]]).addTo(launchMap))
}

initializeApplication();
