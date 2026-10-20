# Bloom Health AI

> **A Multilingual Healthcare Information Assistant** empowering patients to understand health inquiries and clinical documents in simple, reassuring language (English, Telugu, and Hindi).

---

## 1. Overview & Vision

**Bloom Health AI** is a production-ready, full-stack healthcare educational web application designed to bridge the gap between complex clinical terminology and everyday human understanding. It provides:
1. **Conversational Health Assistant**: Real-time AI chat for general wellness inquiries, symptoms, and medical questions with clinical safety guardrails.
2. **Medical Document Analysis**: Automated validation and structured 9-part breakdown of lab tests, blood reports, and prescriptions.
3. **True Multilingual Intelligence**: Native support for **English**, **Telugu (తెలుగు)**, and **Hindi (हिन्दी)**.
4. **Strict Patient Privacy**: Document uploads are validated and processed in volatile memory with zero permanent document storage.

> [!IMPORTANT]
> **Medical Disclaimer**: Bloom Health AI is an educational assistant and is **not** a licensed medical doctor. It never provides definitive medical diagnoses, prescribes treatments, or adjusts medication dosages. Acute symptoms or emergencies must immediately be directed to emergency medical services (112 / 911).

---

## 2. Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Bundler & Dev Server**: Vite 5
- **Styling**: Tailwind CSS (custom Forest Green, Soft Mint, and Ivory theme)
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **HTTP Client**: Native Fetch API with centralized request layer and JWT bearer interceptor

### Backend
- **Runtime**: Java 21 (LTS)
- **Framework**: Spring Boot 3.3.4
- **Persistence**: **Strict Spring JDBC (`JdbcTemplate`)** with parameterized SQL (Zero ORM/Hibernate/JPA)
- **Security**: Spring Security 6 with stateless HMAC-SHA256 JWT tokens & HTTP-only cookies
- **Migrations**: Flyway database migrations
- **Document Processing**: Apache PDFBox 3.0.3 (magic byte inspection & PDF text extraction)
- **Build Tool**: Apache Maven with Maven Wrapper (`mvnw.cmd`)
- **Testing**: JUnit 5, Mockito, Spring WebMvcTest

### Database
- **Engine**: PostgreSQL
- **Driver**: PostgreSQL JDBC Driver
- **Migrations**: `V1__init_schema.sql` (automatic Flyway schema creation)

### AI
- **Model**: Google Gemini 2.0 Flash / Gemini 1.5 Flash
- **API**: Google Generative AI REST API with resilient timeouts, error handling, and model fallback

---

## 3. Project Structure

```
bloom/
├── backend/
│   ├── .mvn/wrapper/                  # Maven Wrapper binaries & properties
│   ├── mvnw.cmd                       # Maven Windows runner
│   ├── pom.xml                        # Spring Boot 3.3.4 & dependencies
│   └── src/
│       ├── main/
│       │   ├── java/com/bloomhealth/
│       │   │   ├── config/            # SecurityConfig, SpaWebMvcConfig, FlywayMigrationConfig
│       │   │   ├── controller/        # ChatController, AuthController, DocumentController, HealthController
│       │   │   ├── dto/               # Validated request and response DTOs
│       │   │   ├── exception/         # GlobalExceptionHandler, Custom Exceptions
│       │   │   ├── model/             # Domain Records (User, Conversation, Message, MedicalDocument)
│       │   │   ├── repository/        # Pure JdbcTemplate repositories (parameterized SQL)
│       │   │   ├── security/          # JwtTokenProvider, JwtAuthenticationFilter, UserPrincipal
│       │   │   └── service/           # GeminiService, ChatService, AuthService, DocumentValidationService
│       │   └── resources/
│       │       ├── application.yml    # App configuration & environment mappings
│       │       ├── static/            # Pre-built React frontend assets
│       │       └── db/migration/
│       │           └── V1__init_schema.sql # PostgreSQL Flyway schema
│       └── test/java/com/bloomhealth/ # Unit & WebMvc integration tests
├── frontend/
│   ├── package.json                   # React, Vite, Tailwind, Lucide dependencies
│   ├── tailwind.config.js             # Forest, Mint, Ivory healthcare design tokens
│   ├── vite.config.ts                 # Dev server with /api proxy
│   └── src/
│       ├── components/                # Navbar, Footer, LanguageSelector, SafetyNotice
│       ├── hooks/                     # useLanguage, useAuth
│       ├── i18n/                      # Translations for EN, TE, HI
│       ├── pages/                     # LandingPage, ChatPage, ReportPage, LoginPage, RegisterPage, PrivacyPage
│       ├── services/                  # Centralized api service
│       └── types/                     # TypeScript definitions
├── .env.example                       # Environment variables template
├── .gitignore                         # Git exclusion rules
└── README.md                          # Master documentation
```

---

## 4. Prerequisites (Windows)

1. **Java Development Kit (JDK 21)**
   - Verify by running: `java -version`
2. **Node.js (v20+ or v26+) and npm**
   - Verify by running: `node -v` and `npm.cmd -v`
3. **Google Gemini API Key**
   - Obtain a key from [Google AI Studio](https://aistudio.google.com/).

---

## 5. PostgreSQL Installation & Setup (Windows)

If PostgreSQL is not yet installed on your system:

### Option A: Install via Official Installer (Recommended)
1. Download the Windows installer from [EnterpriseDB PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads).
2. Run the installer, select PostgreSQL 16 (or 15), and set the default superuser password (e.g. `postgres`).
3. Keep default port `5432`.

### Option B: Install via winget
Open PowerShell as Administrator:
```powershell
winget install PostgreSQL.PostgreSQL.16
```

### Create the Database
Open **psql** (or SQL Shell) and execute:
```sql
CREATE DATABASE bloom_health;
```

To verify the database exists:
```sql
\l
```

---

## 6. Environment Configuration

Copy the sample environment variables:
```cmd
copy .env.example .env
```

Set the following variables in your environment or launch script:

| Variable | Description | Default |
|---|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API Key | *(Required for live AI answers)* |
| `GEMINI_MODEL` | Gemini Model to target | `gemini-2.0-flash` |
| `DB_URL` | PostgreSQL JDBC Connection URL | `jdbc:postgresql://localhost:5432/bloom_health` |
| `DB_USERNAME` | PostgreSQL User | `postgres` |
| `DB_PASSWORD` | PostgreSQL Password | `postgres` |
| `JWT_SECRET` | Secret key for HMAC-SHA256 JWT signing | *Auto-configured secure 32+ char key* |

---

## 7. How to Run the Application

### Running the Backend (Spring Boot)

Navigate to the `backend` directory:
```cmd
cd backend
```

Set your Gemini API key (optional for health check, required for live AI responses):
```cmd
set GEMINI_API_KEY=your_actual_gemini_api_key
```

Run with the Maven Wrapper:
```cmd
mvnw.cmd spring-boot:run
```
The backend starts on `http://localhost:8080`.

### Running the Frontend (Vite React)

In a separate terminal, navigate to the `frontend` directory:
```cmd
cd frontend
npm.cmd run dev
```
The frontend dev server starts on `http://localhost:3000` with automated proxying of `/api` requests to `http://localhost:8080`.

### Unified Production Mode
The React frontend is already built and bundled directly inside `backend/src/main/resources/static/`. When running the backend server, visiting `http://localhost:8080` in your web browser immediately serves the complete full-stack application!

---

## 8. API Documentation

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | System status check & version |
| `POST` | `/api/chat` | Public / Guest | Health AI conversation endpoint |
| `POST` | `/api/auth/register` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & receive JWT token |
| `POST` | `/api/auth/logout` | Public | Clear authentication cookie |
| `GET` | `/api/auth/me` | Authenticated | Retrieve authenticated user profile |
| `POST` | `/api/documents/analyze` | **Authenticated** | Upload & analyze medical document |
| `GET` | `/api/conversations` | Authenticated | List user conversation history |
| `GET` | `/api/conversations/{id}` | Authenticated | Retrieve messages for a conversation |

### Sample Chat Request
```http
POST /api/chat
Content-Type: application/json

{
  "message": "What does a high blood sugar result mean?",
  "language": "en",
  "conversationId": null
}
```

### Sample Chat Response
```json
{
  "conversationId": "a1b2c3d4-...",
  "message": "Fasting blood sugar above normal ranges may indicate insulin resistance or hyperglycemia...",
  "language": "en",
  "timestamp": "2026-10-20T15:00:00Z"
}
```

---

## 9. Testing & Quality Assurance

Run the automated backend test suite:
```cmd
cd backend
mvnw.cmd test
```

Test coverage includes:
- **`ChatRequestValidationTest`**: Request validation, size bounds, non-blank checks.
- **`DocumentValidationServiceTest`**: Magic bytes signature verification (PDF, PNG, JPEG, WebP), file extension spoofing prevention, empty file rejection.
- **`ChatControllerTest`**: Spring WebMvc endpoint handling and mock integration.
- **`DocumentControllerSecurityTest`**: Strict authentication enforcement (401 Unauthorized for unauthenticated document submissions).
- **`AuthServiceTest`**: Password hashing (BCrypt), duplicate email prevention, login validation.

Run the frontend build and type-checking verification:
```cmd
cd frontend
npm.cmd run build
```

---

## 10. Security & Privacy Safeguards

- **Strict Database Security**: Parameterized SQL exclusively through Spring `JdbcTemplate` to completely eliminate SQL injection.
- **Credential Protection**: Gemini API keys and database credentials reside only on the server in environment variables; never exposed to browser clients.
- **Compulsory Authentication for Medical Uploads**: Guest users cannot submit medical documents; authentication is strictly enforced before processing.
- **Zero Permanent Storage for Medical Files**: Uploaded documents are analyzed in memory and immediately discarded; no persistent raw medical reports or unencrypted extracted records remain on disk.
