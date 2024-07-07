# ToDo Task Manager App

## Overview

This is a ToDo Task Manager App with the frontend built in React and the backend utilizing Firebase for authentication and database connectivity.

## Features

- **User Authentication**: Register and authenticate users.
- **Task Management**: Create, view, update, and delete tasks.
  - Task Details: Each task includes a name, description, and status (To Do, In Progress, Done).
- **Real-time Updates**: View and manage tasks in real-time.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- Firebase account

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/todo-task-manager.git
   cd todo-task-manager
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Firebase Configuration**

   - Create a new project in [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** and **Firestore Database** in your Firebase project.
   - Obtain your Firebase configuration details from the Firebase project settings.

4. **Add Firebase Configuration**

   - Create a file named `firebaseConfig.js` in the `src` directory and add your Firebase configuration details:

     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     };

     export default firebaseConfig;
     ```

5. **Run the Application**

   ```bash
   npm start
   ```

   The app should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

1. **Register/Login**

   - Register a new account or login with an existing account.

2. **Create Task**

   - Once logged in, create a new task by providing a task name, description, and status (To Do, In Progress, Done).

3. **View Tasks**

   - View all the tasks you have created in the task list.

4. **Update Task**

   - Change the status of a task by selecting a new status from the dropdown.

5. **Delete Task**

   - Delete a task by clicking the delete button next to the task.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)