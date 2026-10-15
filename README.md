Vision 2030 KPI Monitoring Agent
[Aivonex.webm](https://github.com/user-attachments/assets/03fc02a9-1bd3-4cf4-86e4-f30ab0a08e19)



An AI-powered KPI monitoring dashboard for tracking strategic
performance indicators, comparing actual values with targets,
identifying risks, visualizing trends, and providing executive-level
insights.

Project Overview

The Vision 2030 KPI Monitoring Agent is a full-stack web application
built with React and FastAPI.

The system allows an executive user to:

Monitor multiple KPIs from a central dashboard

Compare target values with current actual values

Calculate KPI progress and gaps

Categorize KPI performance as On Track, At Risk, or Below
Target

View historical KPI trends

Monitor alerts and risks

View forecasts

Ask the AI insight interface questions about monitored KPIs

Update KPI actual values through the backend

View executive reports

Manage a simple local user profile and login session

Note: The KPI values currently stored in the local database are
prototype/demo values for the application. They should not be
interpreted as official Vision 2030 statistics.

Main Features

1. KPI Monitoring

The application monitors strategic KPI records containing:

KPI name

Target value

Actual value

Unit

Status

Historical values

The frontend retrieves KPI information from the FastAPI backend instead
of relying only on hard-coded frontend data.

2. Target vs Actual Analysis

The dashboard compares each KPI's current actual value against its
target.

The system calculates:

Progress percentage

Gap between actual and target

Current performance status

3. Dashboard

The executive dashboard provides an overview of:

Total KPIs

On Track KPIs

At Risk KPIs

Below Target KPIs

Average KPI progress

Target vs Actual visualization

Overall progress

KPI performance list

Risk overview

Executive insights

4. Risk and Alert Monitoring

The Alerts & Risks section retrieves risk information from the FastAPI
backend and identifies KPIs that require attention.

5. Trend Visualization

Historical KPI values can be visualized to understand how performance
has changed over time.

6. Forecasting

The backend provides a forecast endpoint for individual KPIs:

GET /api/forecast/{kpi_id}

The frontend can use this endpoint to display forecast information.

7. AI Insights

The project includes an AI/RAG-oriented architecture for generating
understandable explanations from KPI information.

The backend contains:

backend/app/ai/
├── agent.py
├── graph.py
├── nodes.py
├── prompts.py
└── rag.py

The frontend provides an AI Insights page where KPI-related questions
can be entered.

8. KPI Updates

KPI actual values can be updated through the backend.

When a KPI is updated:

The FastAPI API receives the new actual value.

The database record is updated.

The new actual value is added to KPI history.

KPI status is recalculated.

Dashboard values are refreshed.

Alerts are refreshed.

Technology Stack

Frontend

React.js

Vite

React Router

Axios

Lucide React

Plotly.js

React Plotly

Backend

Python

FastAPI

Uvicorn

SQLAlchemy

SQLite

Pandas / analytics services

AI/RAG modules

Data and Processing

KPI database

Historical KPI data

KPI progress calculations

Risk/status calculations

Forecasting services

AI/RAG components

Project Structure

Vision2030-KPI-Agent/
│
├── backend/
│   └── backend/
│       ├── .env
│       ├── requirements.txt
│       ├── vision2030.db
│       │
│       └── app/
│           ├── __init__.py
│           ├── main.py
│           ├── database.py
│           ├── models.py
│           ├── schemas.py
│           │
│           ├── ai/
│           │   ├── agent.py
│           │   ├── graph.py
│           │   ├── nodes.py
│           │   ├── prompts.py
│           │   └── rag.py
│           │
│           ├── routes/
│           │   ├── alerts.py
│           │   ├── dashboard.py
│           │   ├── forecast.py
│           │   ├── insights.py
│           │   ├── kpis.py
│           │   └── reports.py
│           │
│           ├── services/
│           │   ├── analytics_service.py
│           │   ├── anomaly_service.py
│           │   ├── forecast_service.py
│           │   ├── kpi_service.py
│           │   ├── report_service.py
│           │   └── risk_service.py
│           │
│           └── utils/
│               ├── calculations.py
│               └── data_cleaning.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── charts/
│   │   ├── context/
│   │   ├── data/
│   │   └── services/
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── data/
├── reports/
├── tests/
├── .env.example
├── .gitignore
└── README.md

Backend API

The FastAPI backend runs on:

http://127.0.0.1:8001

Health Check

GET /api/health

Example response:

{
  "status": "ok"
}

Dashboard

GET /api/dashboard

Returns:

Total KPI count

On Track count

At Risk count

Below Target count

Average progress

KPI analysis data

KPIs

GET /api/kpis

Returns all KPIs.

Single KPI

GET /api/kpis/{kpi_id}

Update KPI

PATCH /api/kpis/{kpi_id}

Example request:

{
  "actual": 76
}

Alerts

GET /api/alerts

Returns KPI risk/alert information.

Forecast

GET /api/forecast/{kpi_id}

Returns forecast information for the selected KPI.

Running the Project

1. Start the Backend

Open a terminal and go to the backend directory:

cd "C:\Users\Mega Computers\Downloads\Aivonex\Vision2030-KPI-Agent\backend"

Activate the virtual environment if one is configured:

.\venv\Scripts\activate

Start FastAPI:

uvicorn app.main:app --reload --port 8001

The backend should be available at:

http://127.0.0.1:8001

Check:

http://127.0.0.1:8001/

Expected response:

{
  "message": "Vision 2030 KPI Monitoring Agent API is running"
}

2. Start the Frontend

Open a second terminal:

cd "C:\Users\Mega Computers\Downloads\Aivonex\Vision2030-KPI-Agent\frontend"

Install dependencies if required:

npm install

Start Vite:

npm run dev

Open the URL displayed by Vite, for example:

http://localhost:5173

Frontend to Backend Connection

The frontend communicates with FastAPI through Axios.

The API base URL is:

http://127.0.0.1:8001

The main data flow is:

React Frontend
      │
      ▼
Axios / api.js
      │
      ▼
FastAPI
      │
      ├── /api/dashboard
      ├── /api/kpis
      ├── /api/alerts
      └── /api/forecast
      │
      ▼
SQLAlchemy
      │
      ▼
vision2030.db

The React AppContext loads KPI, dashboard, and alert data and makes it
available to the dashboard and other pages.

Dashboard Data Flow

The dashboard receives backend data through the application context.

Example backend dashboard response:

{
  "total": 5,
  "on_track": 3,
  "at_risk": 2,
  "below_target": 0,
  "average_progress": 94.54
}

The frontend uses these values to populate the executive dashboard.

KPI Status Logic

The backend calculates KPI status using the actual and target values.

The application currently uses statuses such as:

On Track
At Risk
Below Target

The exact classification is handled by the backend calculation/service
layer.

Current Prototype KPI Data

The local prototype database currently contains five sample KPIs:

KPI                            Target   Actual Status

Renewable Energy Share             30       24 At Risk
Employment Rate                    80       76 On Track
Education Access                   90       88 On Track
Healthcare Coverage                85       91 On Track
Infrastructure Development         70       65 At Risk

These values are application demo data, not verified official
statistics.

Important Development Note

Port 8000 may already be used by another local application. Therefore,
this project is configured to run its FastAPI backend on:

8001

Make sure the frontend Axios configuration uses:

http://127.0.0.1:8001

instead of port 8000.

Troubleshooting

Backend is not responding

Check that FastAPI is running:

uvicorn app.main:app --reload --port 8001

Then open:

http://127.0.0.1:8001/api/health

Expected:

{
  "status": "ok"
}

Dashboard shows zero values

Check:

FastAPI is running on port 8001.

frontend/src/services/api.js uses port 8001.

Browser Developer Tools → Network shows requests to:

/api/dashboard
/api/kpis
/api/alerts

The API responses contain KPI data.

Refresh the frontend after starting the backend.

CORS error

The FastAPI application includes CORS middleware for local frontend
development.

If the Vite frontend runs on a different local port, update the backend
CORS configuration accordingly.

Development Architecture

                    ┌──────────────────────┐
                    │   React Dashboard    │
                    │   Executive UI       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │      Axios API       │
                    │    frontend/api.js   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │       FastAPI        │
                    │      REST APIs       │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        KPI Routes       Dashboard Routes   Risk Routes
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌──────────────────────┐
                    │      Services        │
                    │ Analytics / Risk /   │
                    │ Forecast / Reports   │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │     SQLAlchemy       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    vision2030.db     │
                    └──────────────────────┘

Future Enhancements

Possible future improvements include:

PostgreSQL deployment for production

Authentication and role-based access

More advanced time-series forecasting

Expanded anomaly detection

Production RAG document ingestion

Automated executive report generation

Live KPI data ingestion from verified sources

Deployment to a cloud platform

Automated tests and CI/CD

Project Status

The current prototype includes:

React/Vite frontend

FastAPI backend

Local SQLite database

KPI APIs

Dashboard API

Alerts API

Forecast API

KPI update API

KPI status calculations

Risk services

Analytics services

AI/RAG project structure

Interactive dashboard charts

Executive dashboard UI

Frontend/backend integration

Author / Maliha Hafeez

Project: Vision 2030 KPI Monitoring Agent

Purpose: Academic / prototype implementation of an agentic KPI
monitoring dashboard.
