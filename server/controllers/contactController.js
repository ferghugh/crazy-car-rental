const ContactModel = require("../models/contactModel");

const ContactController = {

  sendMessage: function (req, res) {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required"
      });
    }

    ContactModel.createMessage(
      { name, email, subject, message },
      function (error, result) {

        if (error) {
          console.error("Contact error:", error);
          return res.status(500).json({
            success: false,
            message: "Server error"
          });
        }

        res.json({
          success: true,
          message: "Message sent successfully"
        });
      }
    );
  }

};

module.exports = ContactController;
