const { Notification } = require('../models');

class NotificationService {
  static async create(data) {
    return Notification.create(data);
  }

  static async getById(id) {
    return Notification.findByPk(id);
  }

  static async update(id, data) {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    return notification.update(data);
  }

  static async delete(id) {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    return notification.destroy();
  }

  static async getAll() {
    return Notification.findAll();
  }
}

module.exports = NotificationService;
