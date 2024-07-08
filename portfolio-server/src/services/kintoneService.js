const axios = require('axios');

const kintoneService = {
  async get(appId) {
    try {
      const response = await axios.get(`${process.env.KINTONE_BASE_URL}/k/v1/records.json`, {
        headers: {
          'X-Cybozu-API-Token': process.env.KINTONE_API_TOKEN,
        },
        params: {
          app: appId,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching records from Kintone:', error.message);
      console.error('Error details:', error);
      throw error;
    }
  },

  async create(appId, data) {
    try {
      const response = await axios.post(`${process.env.KINTONE_BASE_URL}/k/v1/record.json`, {
        app: appId,
        record: data,
      }, {
        headers: {
          'X-Cybozu-API-Token': process.env.KINTONE_API_TOKEN,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating record in Kintone:', error.message);
      console.error('Error details:', error);
      throw error;
    }
  },

  async update(appId, recordId, data) {
    try {
      const response = await axios.put(`${process.env.KINTONE_BASE_URL}/k/v1/record.json`, {
        app: appId,
        id: recordId,
        record: data,
      }, {
        headers: {
          'X-Cybozu-API-Token': process.env.KINTONE_API_TOKEN,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating record in Kintone:', error.message);
      console.error('Error details:', error);
      throw error;
    }
  },

  async delete(appId, recordId) {
    try {
      const response = await axios.delete(`${process.env.KINTONE_BASE_URL}/k/v1/record.json`, {
        headers: {
          'X-Cybozu-API-Token': process.env.KINTONE_API_TOKEN,
        },
        data: {
          app: appId,
          ids: [recordId],
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting record from Kintone:', error.message);
      console.error('Error details:', error);
      throw error;
    }
  },
};

module.exports = kintoneService;
