# Chat API (Challenge deel 3)

Een JSON-API voor chatberichten met Express en MongoDB (Mongoose). Alle antwoorden volgen de [JSend](https://github.com/omniti-labs/jsend)-standaard.

## Installatie

```bash
npm install
cp .env.example .env   # vul je MONGODB_URI in
npm run dev
```

De API draait op `http://localhost:3000/`.

## Routes

| Methode | Route                              | Beschrijving                  |
| ------- | ---------------------------------- | ----------------------------- |
| GET     | `/api/v1/messages`                 | alle berichten                |
| GET     | `/api/v1/messages?user=username`   | berichten van één user        |
| GET     | `/api/v1/messages/:id`             | één bericht                   |
| POST    | `/api/v1/messages`                 | nieuw bericht                 |
| PUT     | `/api/v1/messages/:id`             | bericht aanpassen             |
| DELETE  | `/api/v1/messages/:id`             | bericht verwijderen           |

Body voor POST en PUT:

```json
{ "message": { "user": "Pikachu", "text": "nodejs isn't hard, or is it?" } }
```
