# Property Registration System

A full‑stack MERN application to register property owners and their properties, manage document uploads, and provide an admin approval workflow. The backend exposes RESTful APIs for authentication, owner and property management, while the frontend (Vite + React + Redux Toolkit Query + Tailwind) consumes those APIs for a modern UX.

## Tech Stack
- Backend: Node.js, Express, Mongoose, JWT, Multer, Joi (validation), Mailtrap (emails)
- Frontend: React 18, Vite, Redux Toolkit Query, React Router, TailwindCSS, Radix UI, Recharts
- Database: MongoDB

## Monorepo Structure
```
backend/
  config/, controller/, middlewares/, models/, routes/, uploads/
frontend/
  src/components, pages, redux, services, ui, etc.
```

## Core Concepts
- Authentication (register, login, forgot/reset password) using JWT.
- Role-based access control (RBAC) with `user` and `admin` roles.
- Owner lifecycle: authenticated users create one owner profile; admin verifies owners.
- Property lifecycle: verified owners can register properties with document upload; admin approves properties.
- Document management: file uploads stored under `backend/uploads/documents` and served statically.

---

## Backend

### Environment Variables
Create `backend/.env` with:
```
PORT=3000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Install & Run
```
cd backend
npm install
npm run dev
```

### Server Entrypoint
- `backend/server.js`
  - CORS configured for local dev and Render demo origin
  - Serves static files at `/uploads/documents`
  - API prefixes: `/api/users`, `/api/owners`, `/api/propertyType`, `/api/properties`, `/api/documents`, `/api/admin`

### Database
- `backend/config/db.js` connects to MongoDB using `MONGO_URI`.

### Middlewares
- `verifyToken` attaches authenticated `User` to `req.user` via JWT.
- `roleMiddleware(roles)` enforces RBAC (e.g., `admin`).
- `upload` (Multer) handles single file under field name `document` or `file` depending on endpoint.

### Data Models
- `User`: username, email, password (bcrypt), role, reset token/expiry.
- `Owner`: fullName, phone, address, govIdProof, isVerified, userId (ref User).
- `PropertyType`: name (unique), description.
- `Property`: property_name, address, area_size, property_type (ref), owner (ref), is_approved, documents[].
- `PropertyDocument`: propertyId (ref), documentType, filePath.

### Auth & Users
- Route prefix: `/api/users`
- Endpoints:
  - POST `/register` – create account
  - POST `/login` – returns JWT token and user info
  - POST `/forgot-password` – send reset link email via Mailtrap
  - POST `/reset-password/:token` – update password
  - GET `/me` – current user info (requires `Authorization: Bearer <token>`)
  - Admin only:
    - GET `/all` – list users
    - PATCH `/role/:id` – update user role
    - PUT `/:id`, DELETE `/:id` – manage users

### Owners
- Route prefix: `/api/owners` (all require auth)
- Endpoints:
  - POST `/register` – create owner profile (1 per user)
  - GET `/` – paginated list, supports `page, limit, search, searchFields, sort`
  - GET `/:id`, PUT `/:id`, DELETE `/:id`
  - GET `/stats` – totals, recent (30d), monthly trend (6m)

### Properties
- Route prefix: `/api/properties`
- Public:
  - GET `/` – paginated list
  - GET `/search?property_type=&owner=&area_size=`
  - GET `/:id`
  - GET `/property-types` – property types list
- Authenticated:
  - POST `/` – create property (owner must be verified). Upload field: `document` (single). Body: `property_name, address, area_size, property_type, description?`
  - GET `/my/properties` – properties of current owner
  - GET `/my/owner-status` – presence and verification of owner profile
  - PUT `/:id`, DELETE `/:id`

### Documents
- Route prefix: `/api/documents`
- POST `/upload` – form-data fields: `file` (binary), `propertyId`, `documentType`

### Admin
- Route prefix: `/api/admin` (requires auth; consider admin-only via roleMiddleware if needed)
- GET `/owners` – list owners
- GET `/properties` – list properties
- PATCH `/approve-owner/:id` – set owner `isVerified=true`
- PATCH `/approve-property/:id` – set property `is_approved=true`

### File Uploads
- Multer stores files at `backend/uploads/documents/` with unique filenames.
- Files are accessible at `http://localhost:3000/uploads/documents/<filename>`.

---

## Frontend

### Install & Run
```
cd frontend
npm install
npm run dev
```

### Configuration
- Vite React app; Tailwind configured via `tailwind.config.js` and `postcss.config.js`.
- API base URLs default to `http://localhost:3000/api` during development.
- Token is stored in `localStorage` and attached as `Authorization: Bearer <token>` by RTK Query base queries.

### API Layer
- `src/services/api.js` – axios instance for auth flows; exposes `loginUser`, `registerUser`, `forgotPassword`, `resetPassword`, plus simple property/admin helpers.
- `src/redux/api/propertyApi.js` – RTK Query endpoints for property types, CRUD, search, document uploads, and owner status.
- `src/redux/api/ownerApi.js` – RTK Query endpoints for owner CRUD.

### Key Pages & Components
- Auth: `components/Login.jsx`, pages under `pages/auth/` for forgot/reset password.
- Owner: `components/OwnerRegistrationForm.jsx`, page `pages/OwnerRegistrationPage.jsx`.
- Property: `components/PropertyRegistrationForm.jsx`, pages `pages/RegisterProperty.jsx`, `pages/MyPropertiesPage.jsx`.
- Admin: dashboards and approval pages under `pages/AdminDashboard.jsx`, `pages/verify-owners.jsx`, `pages/ApproveProperties page.jsx`.
- UI: reusable components under `src/components/ui/` (Radix UI wrappers, table, etc.).

### Typical User Flows
1. Register & Login → store JWT in localStorage.
2. Create Owner Profile → wait for admin verification.
3. Register Property (upload required document) → wait for admin approval.
4. Manage/view own properties; search and browse public properties.

---

## Running the Project Locally
1. Start MongoDB (local or Atlas) and set `MONGO_URI`.
2. Backend: `cd backend && npm install && npm run dev`.
3. Frontend: `cd frontend && npm install && npm run dev`.
4. Visit `http://localhost:5173`.

### Creating an Admin User
- Register a user via `/api/users/register`, then update their role:
  - as admin, call `PATCH /api/users/role/:id` with `{ "role": "admin" }`; or
  - directly update in DB for initial bootstrap.

### Seeding Property Types (optional)
- Insert common types into `PropertyType` collection (e.g., Apartment, House, Land) via Mongo shell or a simple script.

---

## Deployment Notes
- Set proper CORS origins in `backend/server.js`.
- Set `baseUrl` to your deployed API in frontend RTK Query and axios service if not using environment variables.
- Serve uploads from your host; ensure persistent storage for `uploads/documents` if needed.

---

## API Quick Reference

Auth
- POST `/api/users/register`
- POST `/api/users/login`
- POST `/api/users/forgot-password`
- POST `/api/users/reset-password/:token`
- GET `/api/users/me`

Owners (auth)
- POST `/api/owners/register`
- GET `/api/owners` (query: `page,limit,search,searchFields,sort`)
- GET/PUT/DELETE `/api/owners/:id`
- GET `/api/owners/stats`

Properties
- GET `/api/properties`
- GET `/api/properties/search`
- GET `/api/properties/:id`
- GET `/api/properties/property-types`
- POST `/api/properties` (auth; multipart with `document`)
- GET `/api/properties/my/properties` (auth)
- GET `/api/properties/my/owner-status` (auth)
- PUT/DELETE `/api/properties/:id`

Documents
- POST `/api/documents/upload` (multipart: `file`, `propertyId`, `documentType`)

Admin (auth)
- GET `/api/admin/owners`
- GET `/api/admin/properties`
- PATCH `/api/admin/approve-owner/:id`
- PATCH `/api/admin/approve-property/:id`

---

## Notes & Caveats
- Ensure `uploads/documents` directory exists before uploading.
- The axios `approveProperty` helper in `src/services/api.js` points to a different route shape than backend (PATCH vs PUT and path). Use `/api/admin/approve-property/:id` with PATCH.
- Consider adding validation and sanitization for request bodies (Joi present in deps).
- Production should not log sensitive data; remove debug logs in middlewares.


