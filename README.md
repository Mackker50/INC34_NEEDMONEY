# Student Payment App

This project is a web application designed for students to manage their payment activities, including logging in, viewing balances, and recording expenses. The application is built using React, TypeScript, and Tailwind CSS.

## Features

- **Login Page**: Allows students to log in using their username and password (student ID). Validates credentials against an Excel file containing student information.
- **Dashboard**: Displays the total balance and history of top-ups. Users can upload payment slips to record their top-ups.
- **Payment History**: Shows a list of payments made, including details such as date, amount, and category.
- **Expense Report**: Displays expenses for various activities and allows filtering based on activity type.
- **Activity Payment**: Records expenses for different activities and allows users to input the amount spent.
- **Upload Slip**: Provides functionality for users to upload their payment slips for processing.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Routing**: react-router-dom
- **Excel File Handling**: xlsx (SheetJS)
- **State Management**: React useState/useContext or Zustand
- **Local Storage**: Used for temporary data storage

## Project Structure

```
student-payment-app
├── src
│   ├── components
│   ├── contexts
│   ├── hooks
│   ├── routes
│   ├── utils
│   ├── styles
│   ├── App.tsx
│   ├── index.tsx
├── public
│   └── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd student-payment-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage Guidelines

- Use your student ID as the username and password to log in.
- After logging in, you can view your dashboard, payment history, and manage your expenses.
- Ensure that the Excel file containing student information is correctly formatted for the login functionality to work.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.