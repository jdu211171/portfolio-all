const axios = require('axios');
const kintoneConfig = require('../config/kintoneConfig');

class KintoneService {
  static baseUrl = process.env.KINTONE_API_BASE_URL;

  static getAppConfig(appName) {
    const appConfig = kintoneConfig[appName];
    if (!appConfig) {
      throw new Error(`App configuration for ${appName} not found.`);
    }
    return appConfig;
  }

  // Service method to retrieve all records
  static async getAllRecords(appName) {
    try {
      const { appId, token } = this.getAppConfig(appName);
      const response = await axios.get(`${this.baseUrl}/k/v1/records.json`, {
        headers: {
          'X-Cybozu-API-Token': token,
        },
        params: {
          app: appId,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching records from Kintone:', error.message);
      console.error('Error details:', error.response ? error.response.data : error);
      throw error;
    }
  }

  // Service method to retrieve records by column name and value
  static async getRecordBy(appName, colName, colValue) {
    try {
      const { appId, token } = this.getAppConfig(appName);
      const query = `${colName} = "${colValue}"`;

      const response = await axios.get(`${this.baseUrl}/k/v1/records.json`, {
        headers: {
          'X-Cybozu-API-Token': token,
        },
        params: {
          app: appId,
          query: query,
        },
      });

      return response.data;
    } catch (error) {
      console.error(`Error fetching record by ${colName} from Kintone:`, error.message);
      console.error('Error details:', error.response ? error.response.data : error);
      throw error;
    }
  }

  // Service method to create a new record
  static async createRecord(appName, data) {
    try {
      const { appId, token } = this.getAppConfig(appName);
      console.log(`Creating record in app ${appId} with data:`, data);

      const response = await axios.post(`${this.baseUrl}/k/v1/record.json`, {
        app: appId,
        record: data,
      }, {
        headers: {
          'X-Cybozu-API-Token': token,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error creating record in Kintone:', error.message);
      console.error('Error details:', error.response ? error.response.data : error);
      throw error;
    }
  }

  // Service method to update a record
  static async updateRecord(appName, recordId, data) {
    try {
      const { appId, token } = this.getAppConfig(appName);
      console.log(`Updating record ${recordId} in app ${appId} with data:`, data);

      const response = await axios.put(`${this.baseUrl}/k/v1/record.json`, {
        app: appId,
        id: recordId,
        record: data,
      }, {
        headers: {
          'X-Cybozu-API-Token': token,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error updating record in Kintone:', error.message);
      console.error('Error details:', error.response ? error.response.data : error);
      throw error;
    }
  }

  // Service method to delete a record
  static async deleteRecord(appName, recordId) {
    try {
      const { appId, token } = this.getAppConfig(appName);
      console.log(`Deleting record ${recordId} from app ${appId}`);

      const response = await axios.delete(`${this.baseUrl}/k/v1/record.json`, {
        headers: {
          'X-Cybozu-API-Token': token,
        },
        data: {
          app: appId,
          ids: [recordId],
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error deleting record from Kintone:', error.message);
      console.error('Error details:', error.response ? error.response.data : error);
      throw error;
    }
  }
}

module.exports = KintoneService;
