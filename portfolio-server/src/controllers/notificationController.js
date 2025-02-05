const NotificationService = require('../services/notificationService');

class NotificationController {
  static async createNotification(req, res) {
    try {
      const notification = await NotificationService.create(req.body);
      return res.status(201).json(notification);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getNotificationById(req, res) {
    try {
      const { id } = req.params;
      const notification = await NotificationService.getById(id);
      if (!notification) {
        return res.status(404).json({ error: 'Notification not found' });
      }
      return res.status(200).json(notification);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async updateNotification(req, res) {
    try {
      const { id } = req.params;
      const notification = await NotificationService.update(id, req.body);
      return res.status(200).json(notification);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async deleteNotification(req, res) {
    try {
      const { id } = req.params;
      const notification = await NotificationService.delete(id);
      return res.status(200).json({ message: 'Notification deleted', notification });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getAllNotifications(req, res) {
    try {
      const notifications = await NotificationService.getAll();
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = NotificationController;
