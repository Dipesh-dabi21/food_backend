# Food Order API — Express + MongoDB

## Requirements
- Node.js 20+
- MongoDB local or Atlas

## Setup
1. `npm install`
2. Copy `.env.example` to `.env`.
3. Set `MONGODB_URI`, `JWT_SECRET` (at least 32 characters), `ADMIN_EMAIL`, and a strong `ADMIN_PASSWORD` (at least 12 characters).
4. `npm run dev`

The first start creates the admin account if it does not exist and seeds six demo menu items if the menu collection is empty. Changing `ADMIN_PASSWORD` after account creation does not automatically reset the stored hash; use a controlled admin-password reset workflow in production.

## API
- `GET /api/health`
- `GET /api/menu`
- `POST /api/auth/login`
- `POST /api/orders` — place order (customer)
- `GET /api/orders/:id/track` — public status tracking
- `GET /api/orders` — admin JWT required, paginated
- `GET /api/orders/:id` — admin JWT required
- `PATCH /api/orders/:id/status` — admin JWT required
- `DELETE /api/orders/:id` — admin JWT required

Order payload example:
```json
{
  "customer": {"name":"Customer Name","phone":"+91 9876543210","address":"12 Main Road, Indore"},
  "items": [{"name":"Margherita Pizza","quantity":2}]
}
```
The backend resolves prices from MongoDB; client-submitted prices are never trusted. Prefer sending `menuItem` Mongo IDs when available.

## Notes
- `CLIENT_ORIGINS` is a comma-separated allowlist for customer and admin origins.
- `.env` is ignored by git. Never commit real secrets.
- Public tracking by order ID is suitable for this assessment; production should use a high-entropy tracking token or customer authentication to prevent ID guessing.
- Tests: `npm test`
- Use HTTPS, secret rotation, monitoring, backups, and stricter auth/session controls before real production use.
