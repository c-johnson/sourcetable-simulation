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

    // CompanyID: 42
    const metrics1 = {
      "companyId": 42,
      "startDate": "1950-01-01T00:00:00Z",
      "endDate": "2021-01-01T00:00:00Z",
      "avgLaunchCost": 0,
      "pctMissionSuccess": 60,
      "topMonthByLaunchCount": "September",
      "topLocations": [
        {
          "platform": "Taiyuan Satellite Launch Center",
          "countryName": "China",
          "id": 101
        },
        {
          "platform": "Site 95",
          "siteName": "Jiuquan Satellite Launch Center",
          "countryName": "China",
          "id": 65
        },
        {
          "platform": "Jiuquan Satellite Launch Center",
          "countryName": "China",
          "id": 126
        }
      ],
      "topCountries": [
        "China"
      ]
    }

    // CompanyID: 21
    const metrics2 = {
      "companyId": 21,
      "startDate": "1950-01-01T00:00:00Z",
      "endDate": "2021-01-01T00:00:00Z",
      "avgLaunchCost": 47.3493975904,
      "pctMissionSuccess": 89.15663,
      "topMonthByLaunchCount": "April",
      "topLocations": [
        {
          "platform": "Stargazer",
          "siteName": "Vandenberg AFB",
          "regionName": "California",
          "countryName": "USA",
          "id": 28
        },
        {
          "platform": "LP-0A",
          "siteName": "Wallops Flight Facility",
          "regionName": "Virginia",
          "countryName": "USA",
          "id": 100
        },
        {
          "platform": "SLC-576E",
          "siteName": "Vandenberg AFB",
          "regionName": "California",
          "countryName": "USA",
          "id": 123
        }
      ],
      "topCountries": [
        "USA",
        "Gran Canaria"
      ]
    }

    // CompanyID: 12
    const metrics3 = {
      "companyId": 12,
      "startDate": "1950-01-01T00:00:00Z",
      "endDate": "2021-01-01T00:00:00Z",
      "avgLaunchCost": 32.4925373134,
      "pctMissionSuccess": 82.89474,
      "topMonthByLaunchCount": "April",
      "topLocations": [
        {
          "platform": "First Launch Pad",
          "siteName": "Satish Dhawan Space Centre",
          "countryName": "India",
          "id": 85
        },
        {
          "platform": "Second Launch Pad",
          "siteName": "Satish Dhawan Space Centre",
          "countryName": "India",
          "id": 50
        },
        {
          "platform": "SLV LP",
          "siteName": "Satish Dhawan Space Centre",
          "countryName": "India",
          "id": 48
        }
      ],
      "topCountries": [
        "India"
      ]
    }

    return [metrics1, metrics2, metrics3]
  }
}

export default new RocketAPI();
