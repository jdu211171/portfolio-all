const { Setting } = require('../models');

class SettingsService {
  async getSetting(key) {
    const setting = await Setting.findOne({ where: { key } });
    return setting ? setting.value : null;
  }

  async updateSetting(key, value) {
    const [setting, created] = await Setting.upsert(
      { key, value },
      { returning: true }
    );
    return { setting, created };
  }

  async getAllSettings() {
    const settings = await Setting.findAll();
    return settings.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});
  }

  /**
   * Retrieves settings for an array of keys
   * @param {Array<string>} keys - Array of setting keys to fetch
   * @returns {Object} - Object containing key-value pairs for the requested settings
   */
  async getSettingsByKeys(keys) {
    const settings = await Setting.findAll({
      where: { key: keys },
    });

    return settings.reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {});
  }
}

module.exports = new SettingsService();
