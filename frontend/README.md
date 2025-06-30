# SPA Records Manager

A Single Page Application for managing records, built with React, Vite, and Recoil.

## Features

- Create, read, update, and delete records
- Form validation
- Responsive design
- State management with Recoil
- RESTful API integration

## Tech Stack

- React 18
- Vite
- Recoil (State Management)
- Axios (API Client)
- Formik & Yup (Form Handling & Validation)
- React Router (Routing)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd spa
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
```

Required environment variables:

- `VITE_API_BASE_URL`: Your API base URL (default: http://localhost:3003/api)
- `VITE_APP_NAME`: Application name
- `VITE_APP_VERSION`: Application version

Optional environment variables:

- `VITE_ENABLE_SORTING`: Enable/disable sorting feature
- `VITE_ENABLE_FILTERING`: Enable/disable filtering feature
- `VITE_API_TIMEOUT`: API request timeout in milliseconds
- `VITE_MAX_RECORDS_PER_PAGE`: Maximum records per page

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Start the backend server:

```bash
node server.js
```

The application will be available at `http://localhost:5173`

## Project Structure

```
spa/
├── src/
│   ├── api/          # API client and configuration
│   ├── components/   # Reusable components
│   ├── pages/        # Page components
│   ├── recoil/       # Recoil state management
│   └── schemas/      # Validation schemas
├── data/            # Data storage
├── server.js        # Backend server
└── vite.config.js   # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
