# Trait Scoring API (NestJS)

This is a simple RESTful API built with [NestJS](https://nestjs.com/) that calculates a compatibility **score** between a job's ranked traits and an applicant's ranked traits.

---

## 📦 Features

- Accepts two ranked arrays of personality traits.
- Computes a score using absolute positional difference.
- RESTful POST endpoint: `/score`
- Fully tested with Jest (unit + e2e)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/po1206/trait-ranker-api.git
cd trait-ranker-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app in development mode

```bash
npm run start:dev
```

App will be running at: `http://localhost:3000`

---

## 📮 API Endpoint

### `POST /score`

**Description:** Computes a numeric score based on how closely the applicant's ranked traits match the job's.

#### 📥 Request Body

```json
{
  "jobRanking": ["Adaptability", "Empathy", "Harmony", "Discipline", "Focus"],
  "applicantRanking": ["Empathy", "Harmony", "Adaptability", "Focus", "Discipline"]
}
```

#### 📤 Response

```json
{
  "score": 6
}
```

- A **lower score** indicates a **closer match**.
- Valid traits: `Adaptability`, `Empathy`, `Harmony`, `Discipline`, `Focus`

---

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### End-to-End Tests (e2e)

```bash
npm run test:e2e
```

---

## 📁 Project Structure

```
src/
├── app.controller.ts        # REST controller
├── app.module.ts            # App module
├── dto/
│   ├── score.dto.ts         # Request DTO
│   └── score.util.ts        # Scoring logic
test/
└── app.e2e-spec.ts          # e2e test
```

---

## ⚙️ Technologies

- **NestJS** - Framework
- **TypeScript** - Language
- **Jest** - Testing
- **Supertest** - e2e HTTP testing

---

## 📌 Notes

- This API assumes both arrays contain exactly 5 unique valid traits.
- If input is malformed (e.g., too short or invalid traits), a 500 error is returned. You can enhance validation using class-validator.

---

## 📤 Deployment

To run in production:

```bash
npm run build
node dist/main
```

For Docker deployment, you can create a `Dockerfile` (ask if you want help with that too).

---