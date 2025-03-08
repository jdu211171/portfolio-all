const NotificationService = require('../services/notificationService');
const { getStudentById } = require('../services/studentService');
const { Op } = require("sequelize"); 

class NotificationController {
  static async createNotification(req, res) {
    try {
      const notification = await NotificationService.create(req.body);
      return res.status(201).json(notification);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async getNotificationsByUserId(req, res) {
    try {
        const { id, userType } = req.user;
        console.log(req.user);
        if (!id || !userType) {
            return res.status(400).json({ error: "User ID and user type are required" });
        }

        let user_id = id; 
        let user_role = userType.toLowerCase();
    
        const notifications = await NotificationService.getByUserId(user_id, user_role, { 
          status: { [Op.ne]: 'read' } 
        });


        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ message: "No notifications found for this user" });
        }

        return res.status(200).json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return res.status(500).json({ error: "Internal Server Error" });
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
      if (req.user.userType !== 'Admin'){
        return res.status(401).json({message: "Access denied "})
      }
      const notifications = await NotificationService.getAll();
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async historyNotification(req, res) {
    try {
        const { id, userType } = req.user;

        if (!id || !userType) {
            return res.status(400).json({ error: "User ID and user type are required" });
        }

        let user_id = id; 
        let user_role = userType.toLowerCase();

        const notifications = await NotificationService.getByUserId(user_id, user_role,  { status: "read" });

        return res.status(200).json({ 
            message: notifications.length ? "History notifications found" : "No history notifications found",
            notifications 
        });
    } catch (error) {
        console.error("Error fetching history notifications:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
  }


  static async markNotificationAsRead(req, res) {
    try {
        const { notificationId } = req.params; 
        const { id, userType } = req.user; 

        if (!notificationId) {
            return res.status(400).json({ error: "Notification ID is required" });
        }

        let user_id = id; 
        let user_role = userType.toLowerCase();

        const updatedNotification = await NotificationService.markOneAsRead(notificationId, user_id, user_role);

        if (!updatedNotification) {
            return res.status(404).json({ error: "Notification not found or access denied" });
        }

        return res.status(200).json({ message: "Notification marked as read", updatedNotification });
    } catch (error) {
        console.error("Error marking notification as read:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


}

module.exports = NotificationController;
