import Moment from '../node_modules/moment/dist/moment.js';

const NUM_COMPANIES = 56;

class RocketAPI {
  constructor() {

  }

  async getMetrics(startDate, endDate) {
    const stDateFormat = Moment(startDate).format("YYYY-MM-DD");
    const endDateFormat = Moment(endDate).format("YYYY-MM-DD");

    const metrics = await this.getMetricsAllCompanies(stDateFormat, endDateFormat);

    return metrics;
  }

  async getMetricsAllCompanies(stDateFormat, endDateFormat) {
    // Until CORS is enabled on the server, just hardcode a couple values here:

    let promises = [];

    for (let index = 0; index < NUM_COMPANIES; index++) {
      promises.push(fetch(`/metrics?companyId=${index}&startDate=${stDateFormat}&endDate=${endDateFormat}`))
    }

    const results = await Promise.all(promises);
    const resultBodies = await Promise.all(results.map(r => r.json()));
    const returnResults = resultBodies.map(r => r.result);

    return returnResults;
  }
}

export default new RocketAPI();
