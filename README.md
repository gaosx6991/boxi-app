# Boxi App

Boxi is a React Native delivery service application that allows users to manage package deliveries, track orders, and handle payments.

## Features

- User authentication (email/phone number login)
- Package delivery management
- Real-time order tracking
- Payment history
- Profile management
- Push notifications
- Balance top-up functionality

## Prerequisites

- Node.js (v14 or higher)
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development)
- yarn or npm

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd boxi-app
```

2. Install dependencies:

```bash
yarn install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.sample .env
```
Update the `API_URL` in `.env` file with your backend server URL.

4. Start Metro bundler:
```bash
yarn start
# or
npm start
```

5. Run the app:
```bash
# For iOS
yarn ios
# or
npm run ios

# For Android
yarn android
# or
npm run android
```

## Project Structure

```
boxi-app/
├── src/
│   ├── apis/         # API integration
│   ├── components/   # Reusable components
│   ├── screens/      # Screen components
│   ├── store/        # Redux store
│   ├── hooks/        # Custom hooks
│   ├── types/        # TypeScript types
│   └── utils/        # Utility functions
├── App.tsx           # Root component
└── index.js          # Entry point
```

## Tech Stack

- React Native
- TypeScript
- React Navigation
- Redux & Redux Persist
- React Native Document Picker
- React Native Toast Message

## Development

- The project uses TypeScript for type safety
- ESLint and Prettier are configured for code formatting
- Jest is set up for testing
- Metro bundler is configured for React Native

## Environment Variables

Required environment variables:
- `API_URL`: Backend API URL (e.g., http://192.168.3.195:3000)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
