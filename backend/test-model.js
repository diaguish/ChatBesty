'use strict';
require('dotenv').config();
const { sequelize, Message } = require('./models');

async function testInsert() {
  try {
    // Synchroniser Sequelize (pour s'assurer que la connexion est établie)
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');

    // Insérer un enregistrement fictif
    const newMessage = await Message.create({
      recipient_phone_number: 'tel:+22598765432',
      message: 'Test SMS via Sequelize',
      sender_address: 'tel:+2250000',
      resource_id: 'fake-uuid-9876-5432',
    });

    console.log('Message inséré :', newMessage.toJSON());
  } catch (error) {
    console.error('Erreur lors de l\'insertion :', error);
  } finally {
    await sequelize.close(); // Fermer la connexion
  }
}

testInsert();