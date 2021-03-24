import _ from '../node_modules/lodash-es/lodash.js';

window._ = _;

class Calculator {

  collateMetrics(metricsArr) {
    let result = {
      // result format:

      // avgLaunchCost: 0,
      // pctSuccess: 0,
      // mostPopularMonth: "",
      // topThreeLaunchLocations: ["", "", ""],
    }

    result.avgLaunchCost = _.meanBy(metricsArr, 'avgLaunchCost')
    result.pctMissionSuccess = _.meanBy(metricsArr, 'pctMissionSuccess')

    // compute most popular month
    const monthCount = _.countBy(metricsArr.filter(m => m.topMonthByLaunchCount), 'topMonthByLaunchCount');

    result.mostPopularMonth = Object.keys(monthCount)
      .reduce((a, b) => monthCount[a] > monthCount[b] ? a : b);

    // compute top three 'launch_locations', just use siteName for now
    // TODO: some siteNames are undefined :(
    const locationArr = metricsArr
      .filter(x => x.topLocations)
      .map(x => x.topLocations)
      .flat()
      .map(x => { return {...x, computedName: x.siteName || x.platform} });

    const computedNameCount = _.countBy(locationArr, 'computedName');
    const countryCount = _.countBy(locationArr, 'countryName');

    result.topThreeLaunchLocations = _.toPairs(computedNameCount).sort((a, b) => b[1] - a[1]).slice(0, 3).map(arr => arr[0]);
    result.topThreeLaunchCountries = _.toPairs(countryCount).sort((a, b) => b[1] - a[1]).slice(0, 3).map(arr => arr[0]);

    console.log('result = ', result)

    return result;
  }

}

export default new Calculator();
