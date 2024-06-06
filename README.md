# Baldini - An Expo Firebase Mobile App

Welcome to Baldini, a mobile application built with Expo and Firebase that allows you to post and share moments of your life. Whether it's a picture, a thought, or an update, Baldini makes it easy to stay connected with friends and family.

## Features

- **User Authentication**: Secure login and registration using Firebase Authentication.
- **Post Creation**: Share text and images with your followers.
- **Real-time Updates**: See new posts and updates instantly with real-time data synchronization.
- **Profile Management**: Customize your profile with a picture.
- **Like and Comment**: Engage with posts by liking.

## Screenshots

![mockup image](https://github.com/janekskr/firebase-expo-app/blob/main/assets/images/mockup.png)

## Installation

To get started with Baldini, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/janekskr/firebase-expo-app.git
    cd firebase-expo-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up Firebase**:
   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project.
   - Enable Authentication and Firestore Database.
   - Copy your Firebase config and add it to the project.
   - Create a `.env` file in the root directory:
     ```env
     EXPO_PUBLIC_FIREBASE_CONFIG='{
       "apiKey": "YOUR_API_KEY",
       "authDomain": "YOUR_AUTH_DOMAIN",
       "projectId": "YOUR_PROJECT_ID",
       "storageBucket": "YOUR_STORAGE_BUCKET",
       "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
       "appId": "YOUR_APP_ID",
       "measurementId": "YOUR_MEASUREMENT_ID"
     }'
     ```

4. **Run the app**:
    ```bash
    npx expo start
    ```
    This will start the Expo development server. Use the Expo Go app on your phone to scan the QR code and run the app.

## Usage

1. **Register/Login**: Create a new account or log in with your existing account.
2. **Create a Post**: Tap the "+" button to create a new post. Add a picture or write something interesting.
3. **Browse Feed**: See the latest updates from people you follow.
4. **Engage**: Like posts to engage with your community.
5. **Profile**: View and edit your profile.

## Contributing

We welcome contributions to Baldni! To contribute, follow these steps:

1. **Fork the repository**.
2. **Create a new branch**:
    ```bash
    git checkout -b feature-name
    ```
3. **Make your changes**.
4. **Commit your changes**:
    ```bash
    git commit -m "Description of changes"
    ```
5. **Push to the branch**:
    ```bash
    git push origin feature-name
    ```
6. **Create a pull request**.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions, feel free to reach out:

- **GitHub**: [janekskr](https://github.com/janekskr)
