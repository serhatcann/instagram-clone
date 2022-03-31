# Instagram Clone App

This is a simple Instagram clone project with some of its core features. Created with CRA(Create React App) and used Firebase for the backend.
You can preview this app by clicking [Instagram Clone App](https://serhatcann-clone.vercel.app)

## Technologies

- React
  - React Hooks
  - Context API
- React Router
- Tailwind CSS
- Firebase
  - Firestore
  - Authentication
- date-fns
- React Loading Skeleton

## Features / Functionalities

- Sign up and login
- Home
  - Photo feed based on who you follow
  - Like / Unlike photos
  - Enter comments to photos
  - Follow people from suggestion list
- Profile
  - Follow / Unfollow Users
  - See User details and photos

## Preview Images

- Home Page
![instagram-home](https://user-images.githubusercontent.com/48242223/160870129-ed22f893-629f-452b-865e-05cd4479a89f.png)
- Profile Page
![instagram-profile](https://user-images.githubusercontent.com/48242223/160870210-1dffdef9-d3d6-4c65-bc7c-45b4c84fba9e.png)



## Setup

1. Clone the project
2. Create a Firebase project with firestore database and authentication
3. Replace your config values in /src/lib/firebase.js with firebaseConfig variable.
4. Database structures;
  - Photos
  ![photos](https://user-images.githubusercontent.com/48242223/160868918-3125446d-5dc8-4f64-b280-d7ab37a86946.png)
  - Users
  ![users](https://user-images.githubusercontent.com/48242223/160869131-393bf793-b396-460a-bc74-37f449cf7bc3.png)

