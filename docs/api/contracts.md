# API Contracts

This document defines the API contracts for Poseidon.AI. All endpoints validate requests and responses using Zod schemas defined in `shared/routes.ts`.

## Base URL

- Development: `http://localhost:5000/api`
- Production: `https://api.poseidon.ai/api`

## Authentication

All endpoints require authentication unless marked as public.

| Header | Value |
|--------|-------|
| Cookie | `connect.sid=<session_id>` |

## Endpoints

### Dashboard

#### GET /api/dashboard

Returns aggregated dashboard data including all engines, recent transactions, forecasts, pending actions, and active alerts.

**Response**: `200 OK`

```json
{
  "engines": [
    {
      "id": 1,
      "name": "Protect",
      "type": "protect",
      "status": "active",
      "accuracy": 0.94,
      "lastUpdated": "2025-01-21T10:00:00Z"
    }
  ],
  "transactions": [
    {
      "id": 1,
      "type": "expense",
      "amount": 150.00,
      "description": "Office supplies",
      "category": "operations",
      "date": "2025-01-20T14:30:00Z",
      "status": "completed"
    }
  ],
  "forecasts": [
    {
      "id": 1,
      "type": "revenue",
      "period": "30d",
      "predictedValue": 125000.00,
      "confidenceLow": 118000.00,
      "confidenceHigh": 132000.00
    }
  ],
  "actions": [
    {
      "id": 1,
      "type": "payment",
      "title": "Pay vendor invoice",
      "description": "Invoice #1234 due in 3 days",
      "status": "pending",
      "impact": 500.00,
      "priority": "high"
    }
  ],
  "alerts": [
    {
      "id": 1,
      "type": "fraud",
      "severity": "high",
      "message": "Unusual transaction pattern detected",
      "riskScore": 85,
      "confidence": 0.92,
      "status": "active"
    }
  ]
}
```

---

### Engines

#### GET /api/engines

Returns status of all AI engines.

**Response**: `200 OK`

```json
[
  {
    "id": 1,
    "name": "Protect",
    "type": "protect",
    "status": "active",
    "accuracy": 0.94,
    "lastUpdated": "2025-01-21T10:00:00Z"
  },
  {
    "id": 2,
    "name": "Grow",
    "type": "grow",
    "status": "active",
    "accuracy": 0.87,
    "lastUpdated": "2025-01-21T09:00:00Z"
  },
  {
    "id": 3,
    "name": "Optimize",
    "type": "optimize",
    "status": "active",
    "accuracy": 0.91,
    "lastUpdated": "2025-01-21T10:30:00Z"
  }
]
```

---

### Actions

#### POST /api/actions/:id/execute

Execute a pending action.

**Path Parameters**:
| Name | Type | Description |
|------|------|-------------|
| id | integer | Action ID |

**Response**: `200 OK`

```json
{
  "id": 1,
  "type": "payment",
  "title": "Pay vendor invoice",
  "status": "completed",
  "executedAt": "2025-01-21T11:00:00Z"
}
```

**Error Responses**:

| Status | Description |
|--------|-------------|
| 404 | Action not found |
| 400 | Action already executed |
| 500 | Execution failed |

---

### Alerts

#### POST /api/alerts/:id/dismiss

Dismiss a false positive alert.

**Path Parameters**:
| Name | Type | Description |
|------|------|-------------|
| id | integer | Alert ID |

**Request Body**:

```json
{
  "reason": "Known vendor transaction"
}
```

**Response**: `200 OK`

```json
{
  "id": 1,
  "status": "dismissed",
  "dismissedAt": "2025-01-21T11:00:00Z",
  "dismissReason": "Known vendor transaction"
}
```

---

## Error Format

All errors follow this format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {}
}
```

| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | Not authenticated |
| FORBIDDEN | 403 | Not authorized |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 400 | Invalid request data |
| INTERNAL_ERROR | 500 | Server error |

---

## Rate Limiting

| Endpoint | Limit |
|----------|-------|
| All endpoints | 100 req/min per user |
| POST /api/actions/:id/execute | 10 req/min per user |

---

## Versioning

API version is implicit in the URL structure. Future breaking changes will use:
- `/api/v2/...` for version 2
