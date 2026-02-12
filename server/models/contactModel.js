const db = require("../config/dbconnection");

const ContactModel = {

  createMessage: function (contact, callback) {
    const sql = `
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES (?, ?, ?, ?)`;

    db.query(
      sql,
      [contact.name, contact.email, contact.subject, contact.message],
      callback
    );
  }

};

module.exports = ContactModel;
