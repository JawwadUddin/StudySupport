# StudySupport - Project Overview

> **Last Updated:** January 17, 2026
> **Purpose:** High-level technical documentation for developers working on this codebase

---

## Project Purpose

**StudySupport** is a full-stack education management system designed for tutoring centers and educational institutions. It manages:
- Student enrollment and academic tracking
- Test administration and scoring
- Family/contact information
- Session attendance and registration
- Invoicing and payment processing
- Curriculum (syllabus) management
- Financial reporting

---

## Technology Stack

### Backend
- **Runtime:** Node.js v18.x
- **Framework:** Express.js 4.18.1
- **Database:** Microsoft SQL Server with stored procedures
- **Authentication:** JWT (jsonwebtoken 9.0.0)
- **Password Security:** bcrypt 5.1.0
- **Environment:** dotenv for configuration

### Frontend
- **Framework:** React 18.1.0
- **Router:** React Router v6.4.2
- **UI Library:** Material-UI (MUI) v5.10.10
- **Authentication:** react-auth-kit v2.12.3 (cookie-based)
- **Data Grid:** MUI DataGrid v5.17.8
- **Charts:** MUI X-Charts v7.11.1
- **Excel/Spreadsheet:** xlsx v0.18.5, xlsx-js-style v1.2.0
- **PDF Generation:** jspdf v2.5.1
- **Printing:** react-to-print v2.14.10

### Deployment
- **Cloud Provider:** Microsoft Azure (Azure Web Apps)
- **CI/CD:** GitHub Actions
- **Frontend App:** `studysupport`
- **Backend API:** `studysupport-api`

---

## Architecture Overview

### Backend Architecture (MVC Pattern)

```
backend/
├── config/          # Database configuration (db.config.js)
├── controllers/     # Business logic (16 controllers)
├── models/          # Data models (17 classes)
├── routes/          # RESTful API routes (16 modules)
├── helper/          # Utilities (responseApi.js)
├── index.js         # Entry point
├── server.js        # Express app with middleware & routing
└── db.js            # MSSQL connection with retry logic
```

**Key Patterns:**
- **MVC Separation:** Controllers handle business logic, Models handle data, Routes define endpoints
- **Promise-based:** All async operations use async/await
- **Stored Procedures:** All database queries use SQL Server stored procedures
- **Standardized Responses:** All API responses use `responseApi` helper
- **Class-based Models:** OOP approach with static methods (all, findByID, create, edit, delete)

**Response Format:**
```javascript
Success: { message, error: false, code, results, timeElapsed }
Error:   { message, error: true, code }
Validation: { message: "Validation errors", error: true, code: 422, errors }
```

### Frontend Architecture (Component-based React)

```
frontend/src/
├── pages/           # 26 page components (business logic)
│   ├── dashboardPage/
│   ├── customerPage/
│   ├── studentPage/
│   ├── contactPage/
│   ├── invoicePages/
│   ├── paymentPages/
│   ├── registerPage/
│   ├── testPage/
│   ├── syllabusPage/
│   └── ...
├── components/      # 17 reusable components
│   ├── forms/       # 6 major forms (Invoice, Payment, Student, etc.)
│   ├── tables/      # Data display components
│   ├── excel/       # Excel export utilities
│   └── charts/      # Chart components
├── layout/          # Layout components (navbar, sidebar)
├── helpers/         # Utility functions
│   ├── apiFunctions.js    # CRUD API calls
│   ├── validateInput.js   # Form validation
│   ├── level.js           # Student level mappings
│   └── status.js          # Status definitions
├── App.jsx          # Main app with routing
├── Wrapper.jsx      # Protected route wrapper (auth)
└── index.jsx        # React entry point
```

**Key Patterns:**
- **Container/Presentational:** Pages contain business logic, components are reusable
- **Protected Routes:** `RequireAuth` wrapper redirects to `/login` if not authenticated
- **API Abstraction:** `apiFunctions.js` centralizes all API calls
- **Form Validation:** `validateInput.js` provides reusable validation utilities
- **CSS-in-JS:** Emotion for component styling
- **Cookie-based Auth:** JWT stored in secure HTTP cookie via react-auth-kit

---

## Database Schema

**22 Core Tables:**
- `family` - Family/guardian information
- `students` - Student records (linked to families)
- `level` - Student grade/level definitions
- `school` - School information
- `syllabus` - Curriculum definitions
- `topics` - Curriculum topics
- `tests` - Test definitions
- `questions` - Test questions
- `scores` - Student test scores
- `testComments` - Test feedback
- `sessionDates` - Session schedule
- `sessionSlots` - Time slots
- `sessionTables` - Session rooms/locations
- `studentSessions` - Student attendance
- `rate` - Pricing table
- `invoices` - Invoice records
- `invoicesMisc` - Additional invoice items
- `payment` - Payment transactions
- `compensation` - Compensation records
- `relation` - Relationship types
- `tempFoundation` & `tempHigher` - Temporary data

**70+ Stored Procedures** for all CRUD operations and complex queries

---

## API Routes

All backend routes follow RESTful conventions under `/api`:

```
POST   /login                    # Authentication (JWT)
GET    /                         # Health check

# Student routes
GET    /api/student              # Get all students
GET    /api/student/:id          # Get single student
POST   /api/student              # Create student
PATCH  /api/student/:id          # Update student
DELETE /api/student/:id          # Delete student

# Family/Contact routes
GET    /api/family               # Get all families
GET    /api/family/:id           # Get single family
POST   /api/family               # Create family
PATCH  /api/family/:id           # Update family
DELETE /api/family/:id           # Delete family

# Invoice routes
GET    /api/invoice              # Get all invoices
GET    /api/invoice/:id          # Get single invoice
POST   /api/invoice              # Create invoice
PATCH  /api/invoice/:id          # Update invoice
DELETE /api/invoice/:id          # Delete invoice

# Payment routes
GET    /api/payment              # Get all payments
GET    /api/payment/:familyID/:paymentDate  # Get single payment
POST   /api/payment              # Create payment
PATCH  /api/payment/:familyID/:paymentDate  # Update payment
DELETE /api/payment/:familyID/:paymentDate  # Delete payment

# Additional routes (similar patterns)
/api/test, /api/score, /api/syllabus, /api/topic, /api/question
/api/register, /api/sessionDate, /api/compensation, /api/customer
```

**Request/Response Wrapping:**
- Requests: `{ data: { ...fields } }`
- Responses: `{ message, error, code, results, timeElapsed }`

---

## Frontend Routes

```
/ (Protected - requires authentication)
├── / (Dashboard with reports & charts)
│
├── /customers
│   ├── (list view)
│   └── /detail/:customerID (customer detail)
│
├── /contacts
│   ├── (list view)
│   ├── /:contactID (detail)
│   ├── /:contactID/edit (edit form)
│   └── /new (create new)
│
├── /students
│   ├── (list view)
│   ├── /:studentID (detail)
│   ├── /:studentID/edit (edit form)
│   ├── /:studentID/:testName (test scores)
│   ├── /:studentID/newTest (create score)
│   └── /new (create new)
│
├── /syllabus
│   ├── (list view)
│   ├── /new (create new)
│   ├── /:syllabusID/topics (topics view)
│   ├── /:syllabusID/tests (tests view)
│   ├── /:syllabusID/tests/:testID (test detail)
│   └── /:syllabusID/tests/:testID/edit (test edit)
│
├── /register (session attendance)
│   └── /new (create register)
│
├── /invoices
│   ├── /new (create invoice)
│   └── /:invoiceID (invoice detail)
│
└── /payments
    ├── /new (create payment)
    └── /:familyID/:paymentDate (payment detail)

/login (Public)
```

---

## Development Guidelines

### When Implementing New Features

#### Backend Development

1. **Database First:**
   - Create/modify SQL Server tables in `sqlscripts/scripts/`
   - Create stored procedures for all database operations
   - Follow naming convention: `sp_[EntityName]_[Action]` (e.g., `sp_Student_GetAll`)

2. **Create Model Class:**
   - Location: `backend/models/[entity].js`
   - Structure:
     ```javascript
     class EntityName {
       constructor(data) { /* properties */ }

       static async all() { /* call stored procedure */ }
       static async findByID(id) { /* call stored procedure */ }
       static async create(data) { /* call stored procedure */ }
       static async edit(id, data) { /* call stored procedure */ }
       static async delete(id) { /* call stored procedure */ }
     }
     ```
   - Use `sql.Request()` for database queries
   - Return promises with async/await

3. **Create Controller:**
   - Location: `backend/controllers/[entity].js`
   - Handle business logic and validation
   - Use `responseApi` for consistent responses:
     ```javascript
     const responseApi = require('../helper/responseApi');

     exports.getAll = async (req, res) => {
       try {
         const results = await Model.all();
         res.json(responseApi.success("Success", results));
       } catch (error) {
         res.status(500).json(responseApi.error(error.message, 500));
       }
     };
     ```

4. **Create Routes:**
   - Location: `backend/routes/[entity].js`
   - Follow RESTful conventions (GET, POST, PATCH, DELETE)
   - Register routes in `backend/server.js`:
     ```javascript
     const entityRoutes = require('./routes/entity');
     app.use('/api/entity', entityRoutes);
     ```

#### Frontend Development

1. **Create Component/Page:**
   - **Pages** (business logic): `frontend/src/pages/[feature]Page/`
   - **Components** (reusable): `frontend/src/components/[category]/`
   - Use functional components with hooks (useState, useEffect)
   - Follow MUI styling patterns

2. **API Integration:**
   - Use helpers from `frontend/src/helpers/apiFunctions.js`:
     ```javascript
     import { getData, saveData, updateData, deleteData } from '../../helpers/apiFunctions';

     // Get data
     const response = await getData('/api/entity');

     // Create
     const response = await saveData('/api/entity', { data: formData });

     // Update
     const response = await updateData('/api/entity/123', { data: formData });

     // Delete
     const response = await deleteData('/api/entity/123');
     ```

3. **Form Validation:**
   - Use `frontend/src/helpers/validateInput.js`
   - Validate before submission
   - Display errors using MUI components

4. **Routing:**
   - Add routes in `frontend/src/App.jsx`
   - Use `RequireAuth` wrapper for protected routes:
     ```javascript
     <Route path="/entity" element={<RequireAuth><EntityPage /></RequireAuth>} />
     ```

5. **Navigation:**
   - Update sidebar in `frontend/src/layout/sidebar/Sidebar.jsx` if needed

### Code Style & Conventions

**Backend:**
- Use camelCase for JavaScript variables/functions
- Use PascalCase for class names
- Use snake_case for database fields (SQL Server convention)
- Always use async/await (not raw promises)
- Always use try/catch for error handling
- Use `responseApi` for all responses

**Frontend:**
- Use PascalCase for component names and files
- Use camelCase for props, state, and functions
- Use arrow functions for components
- Destructure props
- Keep components focused (single responsibility)
- Extract reusable logic into helper functions

**Database:**
- Use snake_case for table and column names
- Always create stored procedures (no inline SQL)
- Include appropriate indexes
- Use transactions for multi-step operations

### Security Best Practices

- **Backend:**
  - JWT tokens for authentication
  - bcrypt for password hashing
  - Validate all inputs
  - Use parameterized queries (stored procedures prevent SQL injection)
  - CORS configured for frontend domain only

- **Frontend:**
  - Cookie-based secure token storage
  - Protected routes with RequireAuth
  - Input validation before API calls
  - Never store sensitive data in localStorage

---

## Deployment & CI/CD

### GitHub Actions Workflows

**Frontend Deployment** (`.github/workflows/main_studysupport.yml`):
- Triggers on push to `main` branch (path: `frontend/**`)
- Steps: Install dependencies → Build → Upload artifact → Deploy to Azure

**Backend Deployment** (`.github/workflows/main_studysupport-api.yml`):
- Triggers on push to `main` branch (path: `backend/**`)
- Steps: Install dependencies → Upload → Deploy to Azure

### Environment Variables

**Backend (.env):**
```
DB_SERVER=your-server.database.windows.net
DB_DATABASE=your-database
DB_USER=your-username
DB_PASSWORD=your-password
JWT_SECRET=your-secret
PORT=3001
```

**Frontend:**
```
REACT_APP_API_URL=https://studysupport-api.azurewebsites.net
```

### Branching Strategy

- `main` - Production branch (auto-deploys to Azure)
- `feature` - Active development branch
- Create feature branches from `feature` for new work

---

## Common Modules & Their Purposes

### Most Important Backend Models

1. **Student** (`models/student.js`) - Student CRUD with family relationships
2. **Family** (`models/family.js`) - Family/contact information management
3. **Invoice** (`models/invoice.js`) - Invoice creation with session rate calculations
4. **Payment** (`models/payment.js`) - Payment processing and outstanding invoice reconciliation
5. **Test** (`models/test.js`) - Test definitions and question management
6. **Score** (`models/score.js`) - Student test scoring
7. **Register** (`models/register.js`) - Session attendance tracking

### Most Important Frontend Components

1. **InvoiceForm** (`components/invoiceForm/InvoiceForm.jsx` - 1,216 lines)
   - Complex invoice creation
   - Session selection with rate calculation
   - Student selection from family

2. **PaymentForm** (`components/paymentForm/PaymentForm.jsx` - 799 lines)
   - Payment entry with type selection
   - Outstanding invoice reconciliation
   - Credit tracking

3. **StudentForm** (`components/studentForm/StudentForm.jsx` - 388 lines)
   - Student information with medical details
   - School year and level selection
   - Family relationship

4. **ContactForm** (`components/contactForm/ContactForm.jsx` - 405 lines)
   - Family contact information
   - Emergency contact details

5. **RegisterTable** (`components/registerTable/RegisterTable.jsx` - 513 lines)
   - Session attendance with MUI DataGrid
   - Excel export functionality

---

## Key Features by Module

### Academic Management
- Student profiles with medical info, school, level
- Syllabus and curriculum (topics) management
- Test creation with questions
- Student scoring and test history
- Performance tracking

### Administrative
- Family/contact management with emergency contacts
- Session attendance registers
- Student-to-session mapping
- Excel export for registers

### Billing & Finance
- Invoice generation with automatic rate calculations
- Payment processing with multiple payment types
- Outstanding invoice reconciliation
- Balance tracking and credit management
- PDF generation for invoices and payments

### Reporting
- Dashboard with charts and summaries
- Excel export for reports and registers
- Monthly payment summaries
- Financial reporting

---

## Testing & Debugging

### Backend Testing
- Test API endpoints using tools like Postman or curl
- Check `backend/index.js` console logs for errors
- Verify stored procedures return expected data
- Check database connections in `backend/db.js`

### Frontend Testing
- Use browser DevTools console for errors
- Check Network tab for API response issues
- Verify authentication cookie exists
- Test protected routes redirect to login when unauthenticated

### Common Issues
- **CORS errors:** Check backend CORS configuration in `server.js`
- **Auth failures:** Verify JWT token in cookie, check expiration
- **Database errors:** Check stored procedure syntax, connection string
- **Build errors:** Verify environment variables are set correctly

---

## Project Statistics

- **Backend Controllers:** 16 modules (~861 lines)
- **Backend Models:** 17 classes
- **Backend Routes:** 16 modules
- **Frontend Pages:** 26 components (~5,961 lines)
- **Frontend Components:** 17 reusable modules
- **Database Tables:** 22 tables
- **Stored Procedures:** 70+
- **Total Development:** Active with 40+ commits

---

## Quick Reference

### Start Development Servers

**Backend:**
```bash
cd backend
npm install
npm run dev  # Uses nodemon for hot-reload
```

**Frontend:**
```bash
cd frontend
npm install
npm start  # Starts on port 3000
```

### Common Tasks

**Add New Entity:**
1. Create stored procedures in `sqlscripts/`
2. Create model in `backend/models/`
3. Create controller in `backend/controllers/`
4. Create routes in `backend/routes/`
5. Register routes in `backend/server.js`
6. Create frontend page in `frontend/src/pages/`
7. Create form component in `frontend/src/components/`
8. Add routes in `frontend/src/App.jsx`
9. Update sidebar navigation if needed

**Deploy to Production:**
1. Merge to `main` branch
2. GitHub Actions automatically builds and deploys
3. Verify deployment in Azure portal

---

## Important File Paths

### Backend Entry Points
- `backend/index.js` - Application entry
- `backend/server.js` - Express configuration
- `backend/db.js` - Database connection

### Frontend Entry Points
- `frontend/src/index.jsx` - React entry
- `frontend/src/App.jsx` - Main routing
- `frontend/src/Wrapper.jsx` - Auth wrapper

### Configuration Files
- `backend/.env` - Environment variables (not in git)
- `backend/config/db.config.js` - Database config
- `frontend/package.json` - Frontend dependencies
- `backend/package.json` - Backend dependencies

### Currently Open Files (Context)
- `frontend/src/components/paymentForm/PaymentForm.jsx` - Payment form component
- `backend/models/invoice.js` - Invoice model

---

**End of Overview** | For questions or updates, modify this document as the project evolves.
