'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      // Définir les associations ici si nécessaire (ex. : avec DeliveryReceipts plus tard)
    }
  }
  Message.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    recipient_phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING(160),
      allowNull: false,
    },
    sender_address: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    resource_id: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'Messages',
    timestamps: false, // Pas de timestamps automatiques car created_at est géré manuellement
  });
  return Message;
};