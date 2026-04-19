# UNITE HERE! — Website Clone

A personal project recreating the [UNITE HERE!](https://unitehere.org) union website. Built with Django and React. It's pretty similar to the original site but if you alt+tab between the two you can tell it's a little uncanny. I tried to stay pretty true to the original though! No affiliation with UNITE HERE!, I just like what they do.

---

## Stack

| Layer     | Tech                                    |
| --------- | --------------------------------------- |
| Front end | React 18, Vite, MUI (Material UI), i18n |
| Back end  | Django, Django REST Framework           |

---

## Project Structure

```
/
├── backend/
│   ├── api/                        ← Django app
│   ├── config/                     ← Django project config
│   ├── venv/
│   ├── db.sqlite3
│   └── manage.py
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/             ← all UI components
    │   ├── hooks/                  ← custom React hooks
    │   ├── i18n/                   ← internationalization config and translation files
    │   ├── services/               ← API call logic
    │   ├── App.jsx
    │   ├── main.jsx                ← entry point, wraps app in providers
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── eslint.config.js
    └── package.json
```

---

## Getting Started

### Prerequisites

- Python 3.11+
- Node.js 18+
- pip & virtualenv (or your preferred Python env manager)

---

### Back End

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Runs at `http://localhost:8000`

---

### Front End

```bash
cd frontend
npm install
npm run dev
```

Runs at `http://localhost:5173`

---

## Notes

- Content is currently hardcoded / mock data. The plan is to migrate it to the Django database and serve it via DRF API endpoints.
- The back end is intentionally minimal for now. Auth is set up but the front end does not yet consume it.

---

## Status

Work in progress, just practing web and organizing the working class.

_Solidarity forever_
