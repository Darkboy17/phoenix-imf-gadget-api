# 🔧 Phoenix: IMF Gadget API

This API allows an authenticated user to manage a collection of fictional IMF gadgets. Each gadget has a unique codename, a current status, and a decommission timestamp.

---

### You can access the API at the following URL:

🌐 [https://phoeniximfgadgetapi.duckdns.org](https://phoeniximfgadgetapi.duckdns.org)

---

## 🧾 Schema Overview

### 🔹 User Model ( used for authentication and authorization)

| Field             | Type     | Description                                           |
|------------------|----------|-------------------------------------------------------|
| `id`             | UUID     | Unique identifier for each user                   |
| `email`           | String   | E-mail of the client/user                               |
| `password`        | String| Password to login and receive the token for authorization                                 

### 🔹 Gadget Model

| Field             | Type     | Description                                           |
|------------------|----------|-------------------------------------------------------|
| `id`             | UUID     | Unique identifier for each gadget                    |
| `name`           | String   | Codename of the gadget                               |
| `status`         | GadgeStatus(enum)| Status of the gadget                                 |
| `decommissionedAt` | DateTime | Timestamp when gadget was decommissioned (nullable) |

### 🔹 Allowed `status` values

- `Available`
- `Deployed`
- `Destroyed`
- `Decommissioned`

---

## 🧪 API Endpoints

### `GET /gadgets`

#### ✅ Description:
Retrieve all gadgets or filter by status.

#### 🔍 Query Parameters:
| Param   | Type   | Description                       |
|---------|--------|-----------------------------------|
| `status` | String | Optional. Filter by status.       |

#### 🧪 Response:
```json
[
  {
    "id": "uuid",
    "name": "The Grim Scout",
    "status": "Available",
    "successProbability": "66% success probability"
  }
]
```

> ✅ If status is `Decommissioned`, `decommissionedAt` will be included.

---

### `POST /gadgets`

#### ✅ Description:
Create a new gadget with a unique codename and random status.

#### 🔐 Request Body:
```json
{}
```

> No body needed — name and status are generated automatically.

#### 🧪 Response:
```json
{
  "id": "uuid",
  "name": "The Soaring Wraith",
  "status": "Deployed"
}
```

---

### `PATCH /gadgets/:id`

#### ✅ Description:
Update name or status of a gadget.

#### 🔐 Restrictions:
- ❌ Cannot update a gadget if its status is `Decommissioned`
- ❌ Cannot set status to `Decommissioned` via PATCH
- ✅ Name and status must be valid ( no validation for now )
- ✅ An ID of the Gadget is mandatory
- ✅ At least one field (`name`, `status`) must be present

#### 🔍 Query Parameters:
| Param   | Type   | Description                       |
|---------|--------|-----------------------------------|
| `id` | String | Required. An id of a gadget to be updated     |

#### 🔍 Request Body:
```json
{
  "name": "The Grim Reaper",
  "status": "Deployed"
}
```

#### 🧪 Response:
```json
{
  "message": "Gadget updated successfully",
  "gadget": {
    "id": "uuid",
    "name": "The Grim Reaper",
    "status": "Destroyed"
  }
}
```

#### ❌ Error Responses:
- `404` - Gadget not found
- `400` - No fields to update / Cannot update decommissioned gadget / Invalid status

---

### `DELETE /gadgets/:id`

#### ✅ Description:
Soft-delete a gadget by setting its status to `Decommissioned`.

#### 🔐 Restrictions:
- ❌ Cannot decommission an already decommissioned gadget

#### 🔍 Request Body:
```json
{
  "id": "UUID of the gadget to be deleted/decommisioned",
}
```

#### 🧪 Response:
```json
{
  "message": "Gadget decommissioned successfully!",
  "gadget": {
    "id": "uuid",
    "name": "The Raven",
    "status": "Decommissioned",
    "decommissionedAt": "2025-04-10T12:00:00Z"
  }
}
```

---

### `POST /gadgets/:id/self-destruct`

#### ✅ Description:
Trigger a mock self-destruct sequence for the gadget.

#### 🧪 Response:
```json
{
  "message": "Self-destruct initiated. Code: Z9PXLV"
}
```

> 🔐 Just a simulation — does not affect the gadget in the DB.

---

## ❗ Business Logic Summary

| Rule                                                         | Enforced? |
|--------------------------------------------------------------|-----------|
| Decommissioned gadgets cannot be updated                     | ✅        |
| Gadgets can only be decommissioned via `DELETE /gadgets/:id`| ✅        |
| Duplicate gadget names are prevented via code                | ✅        |
| Success probability is generated per gadget on GET           | ✅        |
| Status value is validated against allowed list               | ✅        |

---

## 🛠 Tutorial on how to use the API Swagger


- Access **Swagger Docs** at `https://phoeniximfgadgetapi.duckdns.org/docs`

1. Getting the Token
	- Login to the API using the **/auth/login** endpoint.
		> Important Note: If you simply want to test the API and successfully received the token without registering, use these default credentials for logging in.
	
			email:admin
			password: admin
	
		> If you want to use the **/auth/register** endpoint which is protected, you will need an access code which you would have received through an email sent personally by me.
		
	- Copy the JWT token received from the response.
	- On your top-right, click the **Authorize** button.
	- Paste the JWT token in the "Value" input,  click **Authorize** and then **Close**.

2.  Now, you can start using the API endpoints to  do **CRUD** operations on the **IMF Gadgets**.
> Note that, I have already populated the database with 51 fictional gadgets to be precise for your convenience.
> 
> When you are in the project directory, you can run the following command to populate the db with more fictional data, one run is 50 gadgets. 
> 
>Make sure to update the `API_URL` inside `generateGadgets.js` which can be found under `\src\utils\` to point to the API link given at the top before executing the command below. The auto-naming algorithm of gadgets I wrote, can generate about 10,000 unique codenames for now.

```powershell
node .\src\utils\generateGadgets.js 
```


---






## 📦 Tech Stack

- **Node.js**
- **Express**
- **Prisma ORM**
- **PostgreSQL** (can also switch to **Supabase** for quick setup)
- **Swagger (OpenAPI 3.0)**
- **Docker**, **nginx** & **Oracle CLoud** for deployment (use this instead of the suggested platforms like Heroku, Render, or Railway mainly because of their imposed limitations and limited control)

---

## 🔐 Author & Credits

Developed as part of the **Phoenix: IMF Gadget API Challenge** 

Developed and Maintained by :

**Kordor Pyrbot**, former Software Engg. fellow at **Headstarter AI**

