
# 🛡️ API Documentation & Security Standards

## Overview
This document outlines the API endpoints, authentication, usage guidelines, and the security measures implemented to protect the application and its users.

## 🔐 Security Measures Implemented
We adhere to corporate-grade security standards to ensure data integrity and user safety:

1.  **Rate Limiting**:
    *   Protect against DDoS and Brute-force attacks.
    *   Limit: 20 requests per 60 seconds per IP for all `/api/*` routes.
2.  **Input Sanitization (XSS Prevention)**:
    *   All incoming data (POST body, Query Params) is sanitized using `DOMPurify` to remove malicious scripts.
    *   Strict typing prevents unexpected data structures.
3.  **SQL/GROQ Injection Prevention**:
    *   Inputs are validated against strict regex patterns (e.g., slugs must match `^[a-z0-9-]+$`).
    *   Parameterized queries are used where applicable.
4.  **Secure Headers**:
    *   `Content-Security-Policy`: Restricts sources for scripts, images, and connections (Midtrans, Sanity).
    *   `X-XSS-Protection`: Block mode enabled.
    *   `X-Frame-Options`: DENY (Prevents Clickjacking).
    *   `X-Content-Type-Options`: nosniff.
5.  **Validation**:
    *   Email validation using `validator.js`.
    *   Strict type checking for Enums (e.g., Payment Types).

---

## 🚀 API Endpoints

### 1. List Campaigns
**GET** `/api/campaigns`

Fetches a list of active donation campaigns.

**Query Parameters:**
| Param | Type | Description |
| :--- | :--- | :--- |
| `category` | `string` | (Optional) Filter by category slug (e.g., `kemanusiaan`). Validated to be alphanumeric + hyphens only. |
| `limit` | `number` | (Optional) Max number of results. Default: 100. Max capped at 100. |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "title": "Bantu Korban Banjir",
      "slug": "bantu-korban-banjir",
      "currentAmount": 1500000,
      "targetAmount": 5000000,
      ...
    }
  ]
}
```

### 2. Create Donation (Transaction)
**POST** `/api/donations`

Initiates a donation transaction via Midtrans and records it in the database.

**Body (JSON):**
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `slug` | `string` | Yes | The slug of the campaign. Sanitized. |
| `amount` | `number` | Yes | Donation amount (IDR). Must be > 0. |
| `payment_type` | `string` | Yes | Enum: `qris` or `bank_transfer`. |
| `name` | `string` | No | Donor name. Defaults to "Anonim". Sanitized. |
| `email` | `string` | No | Donor email. Validated. Defaults to "donor@example.com". |
| `message` | `string` | No | Support message. Sanitized. |

**Response:**
Returns the Midtrans Transaction Token and Redirect URL.

```json
{
  "success": true,
  "data": {
    "token": "snap_token_...",
    "redirect_url": "https://app.sandbox.midtrans.com/..."
  }
}
```

### 3. Check Payment Status
**GET** `/api/payment/status`

Checks the real-time status of a transaction from Midtrans.

**Query Parameters:**
| Param | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `order_id` | `string` | Yes | The Order ID returned during creation. |

---

## 📦 Usage Examples

### Javascript (Fetch)

```javascript
// Fetch Campaigns
fetch('/api/campaigns?limit=5')
  .then(res => res.json())
  .then(data => console.log(data));

// Create Donation
fetch('/api/donations', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    slug: 'bantu-gempa',
    amount: 50000,
    payment_type: 'qris',
    name: 'John Doe',
    email: 'john@email.com'
  })
});
```
