# Basic Django E-Commerce Store

A beginner-friendly e-commerce site using:
- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Django + SQLite
- Product management: Django admin
- Cart: browser localStorage (demo cart)

## Setup

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py seed_products
python manage.py createsuperuser
python manage.py runserver
```

Open http://127.0.0.1:8000/

Admin: http://127.0.0.1:8000/admin/

## Notes

This is a basic starter project. Checkout/payment, authentication, order persistence, inventory, and production security are intentionally left out.
