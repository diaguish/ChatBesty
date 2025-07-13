'use strict';

     const express = require('express');
     const cors = require('cors');
     const { getAccessToken } = require('./auth');
     const { Message } = require('./models');
     const axios = require('axios');

     const app = express();

     app.use(cors());
     app.use(express.json());

     app.get('/', (req, res) => res.send('API Orange SMS Ready!'));

     app.get('/api/test-token', async (req, res) => {
       try {
         const { accessToken, expiresAt } = await getAccessToken();
         res.json({ accessToken, expiresAt });
       } catch (error) {
         res.status(500).json({ error: 'Erreur lors de la récupération du token' });
       }
     });

     app.post('/api/send-sms', async (req, res) => {
  const { recipientPhoneNumber, message } = req.body;

  if (!recipientPhoneNumber || !message) {
    return res.status(400).json({ error: 'Numéro de téléphone et message requis' });
  }

  try {
    const { accessToken } = await getAccessToken();
    const senderAddress = 'tel:+221776318441'; // Garde ESMT 92I ou essaie ESMT
    const response = await axios.post(
      `https://api.orange.com/smsmessaging/v1/outbound/${encodeURIComponent(senderAddress)}/requests`,
      {
        outboundSMSMessageRequest: {
          address: recipientPhoneNumber,
          senderAddress,
          outboundSMSTextMessage: { message }
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    let resourceId = null;
    if (response.data && response.data.outboundSMSMessageRequest && response.data.outboundSMSMessageRequest.resourceURL) {
      resourceId = response.data.outboundSMSMessageRequest.resourceURL.split('/').pop();
    } else {
      throw new Error('Réponse API invalide, aucun resourceId trouvé');
    }
    
    await Message.create({
      recipient_phone_number: recipientPhoneNumber,
      message,
      sender_address: senderAddress,
      resource_id: resourceId,
      created_at: new Date()
    });

    res.json({ message: 'SMS envoyé avec succès', resourceId });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du SMS:', error.response ? error.response.data : error.message);
    if (error.response && error.response.data && error.response.data.requestError) {
      return res.status(400).json({ error: error.response.data.requestError.serviceException.text });
    }
    res.status(500).json({ error: 'Erreur lors de l\'envoi du SMS' });
  }
});
     module.exports = app;