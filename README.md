🎀 Nom du projet : ChatBesty
Une appli de chat stylée Bratz, pour envoyer/recevoir des SMS comme une vraie bestie 💅📱

🎨 Design frontend (React)
✅ Esthétique :
Palette de couleurs : rose, violet, doré, blanc 💖💜✨

Typo arrondie / scriptée (ex. "Pacifico", "Poppins", "Baloo")

Filtres, ombres douces, bulles de conversation à la Snapchat / Barbie / Bratz

| Composant       | Rôle                                   |
| --------------- | -------------------------------------- |
| `ChatWindow`    | Affiche les messages (envoyés + reçus) |
| `MessageInput`  | Champ pour taper et envoyer un SMS     |
| `Sidebar`       | Logo, nom de l’app, solde SMS 💎       |
| `MessageBubble` | Message stylisé avec icônes 💬         |

⚙️ Fonctionnalités (Backend Node.js + API Orange)
POST /api/send-sms ➜ envoie un message via Orange

POST /api/receive-sms ➜ reçoit les réponses ou DR

Base de données (MySQL/PostgreSQL) :

messages_envoyes : message, destinataire, date, statut

messages_recus : expéditeur, message, statut, date