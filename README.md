# Express TypeScript API

A lightweight Express.js API built with TypeScript and MongoDB support.

## Features

- Express.js server with TypeScript
- MongoDB/Mongoose integration with remote URL support
- Test API endpoints
- Environment configuration with dotenv
- Automatic TypeScript compilation

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB instance (local or remote)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
```

3. Build the project:
```bash
npm run build
```

## Running the Server

### Development mode (with ts-node):
```bash
npm run dev
```

### Production mode:
```bash
npm run build
npm start
```

### Watch mode (auto-recompile):
```bash
npm run watch
```

## API Endpoints

- **GET /health** - Health check endpoint
- **GET /api/test** - Test endpoint that returns a success message

## Project Structure

```
.
├── src/
│   └── index.ts          # Main server file
├── dist/                 # Compiled JavaScript (generated)
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .env                  # Environment variables
└── .gitignore            # Git ignore rules
```

## MongoDB Connection

Set your MongoDB URI in the `.env` file:

- **Local MongoDB**: `mongodb://localhost:27017/express-api`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/dbname`

## License

ISC
"# backend" 
