// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import firebaseConfig from '../../firebaseConfig.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app);

export default app;
export { firebaseAuth };
