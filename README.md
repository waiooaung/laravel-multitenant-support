Here is a professional `README.md` file tailored exactly to the **Laravel 12 Multi-Database Ticket System** we just built. It follows the structure and style of the "Daily Buddies" example you provided.

---

# Multitenant Support 💎

Multitenant Support is an intelligent multi-tenant support system. It features a public-facing ticket form that dynamically routes data into **separate MySQL databases** based on the department selected, and a unified Admin Panel built with Inertia+React to manage them all.

[Image of Ticket System Dashboard]

## Features

- **Multi-Database Architecture:** Tickets are physically stored in different databases (Sharding) based on issue type (Technical, Billing, etc.).
- **Dynamic Routing:** Smart Enum-based routing that switches database connections on the fly.
- **Unified Admin Dashboard:** A single view that aggregates data from 5+ distinct databases into one React interface.
- **Rich Text Editing:** Integrated CKEditor 5 for professional admin responses.
- **Modern Stack:** Built on Laravel 12, Inertia.js, React, and Tailwind CSS.

## Requirements

- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+

## Project Structure

```
.
├── app/
│   ├── Http/Controllers/   # Admin & Ticket Controllers
│   ├── Models/             # Smart Models with dynamic connection switching
│   └── Enums/              # TicketType Enum (The routing logic)
├── config/
│   └── database.php        # Multi-connection configuration
├── database/
│   └── migrations/         # Shared schema for all department DBs
└── resources/
    └── js/
        ├── Pages/          # React Views (Support Form, Admin Dashboard)
        └── app.tsx         # Main React entry point
```

## Getting Started

```bash
git clone https://github.com/waiooaung/laravel-multitenant-support
cd laravel-multitenant-support
```

### 1\. Backend Setup

```bash
# Install PHP dependencies
composer install

# Environment Configuration
cp .env.example .env
php artisan key:generate
```

**Important:** You must create 5 empty databases in your MySQL server (`db_technical`, `db_billing`, `db_product`, `db_general`, `db_feedback`) and configure them in your `.env` file:

```ini
# .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
# ... main connection ...

# Define the department databases
DB_TECH_DATABASE=db_technical
DB_BILLING_DATABASE=db_billing
DB_PRODUCT_DATABASE=db_product
DB_GENERAL_DATABASE=db_general
DB_FEEDBACK_DATABASE=db_feedback
```

### 2\. Database Migration

Since this project uses multiple databases, you cannot just run `migrate`. You must migrate the schema into **each** department's database:

```bash
# Migrate the Main DB (Users/Admins)
php artisan migrate

# Migrate the Department DBs (Tickets)
php artisan migrate --database=technical
php artisan migrate --database=billing
php artisan migrate --database=product
php artisan migrate --database=general
php artisan migrate --database=feedback

# Seed the Admin User
php artisan db:seed
```

### 3\. Frontend Setup

```bash
# Install JS dependencies (React, Tailwind, CKEditor)
npm install

# Start the Vite development server
npm run dev
```

Visit `http://localhost:8000` to see the Support page.
Visit `http://localhost:8000/dashboard` to see the Dashboard page.

## Usage

### Public Support Form

Visit `/support` to log a ticket.

- Select **"Technical Issues"** -\> Saves to `db_technical`.
- Select **"Account & Billing"** -\> Saves to `db_billing`.

### Admin Panel

Visit `/login` and access the Dashboard.

- The dashboard pulls data from **all 5 databases** and merges them into one table.
- Click **View** on a ticket to see the specific database source and add a Rich Text note.

## Test Accounts (Seed Data)

| Role            | Email             | Password | Access                 |
| --------------- | ----------------- | -------- | ---------------------- |
| **Super Admin** | admin@example.com | password | Full Access to all DBs |

## Tech Stack

- **Backend:** Laravel 12
- **Frontend:** React (TypeScript) + Inertia.js
- **Styling:** Tailwind CSS
- **Editor:** CKEditor 5 (Classic Build)
- **Database:** MySQL (Multi-Connection)

## License

MIT – see [LICENSE.md](LICENSE.md).
