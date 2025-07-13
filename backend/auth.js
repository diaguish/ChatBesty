'use strict';

const axios = require('axios');

// Variable pour stocker le token en mémoire
let cachedToken = null;

async function getAccessToken() {
  try {
    // Vérifier si le token existe et n'a pas expiré
    if (cachedToken && cachedToken.expiresAt > Date.now() + 60000) { // 60s de marge
      console.log('Utilisation du token en cache');
      return cachedToken;
    }

    // Sinon, récupérer un nouveau token
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await axios.post('https://api.orange.com/oauth/v3/token', 
      'grant_type=client_credentials', 
      {
        headers: {
          'Authorization': `Basic ${authString}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }
      }
    );

    const { access_token, expires_in } = response.data;
    cachedToken = {
      accessToken: access_token,
      expiresAt: Date.now() + expires_in * 1000 // Convertir secondes en millisecondes
    };
    console.log('Nouveau token obtenu');
    return cachedToken;
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = { getAccessToken };