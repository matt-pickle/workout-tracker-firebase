import firebaseConfig from "./firebase-keys.js";
import {initializeApp} from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateEmail,
  updatePassword
} from "firebase/auth";
import {getFirestore, doc, setDoc, updateDoc} from "firebase/firestore";

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export async function registration(email, password) {
  const sanitizedEmail = email.toLowerCase().trim();
  try {
    await createUserWithEmailAndPassword(auth, sanitizedEmail, password)
    .then(userCredential => {
      if (userCredential) {
        const user = userCredential.user;
        sendEmailVerification(user);
        setDoc(doc(db, "users", user.uid), {
          email: user.email,
          workoutHistory: [],
          weightHistory: []
        });
        alert(
          "Success! An automated message with a verification link has been sent to your email. " +
          "Please use it to enable your account by verifying your email address."
        );
      }
    });
  } catch(err) {
    alert("Error!", err.message);
  }
}

export async function logIn(email, password) {
  const sanitizedEmail = email.toLowerCase().trim();
  try {
    await signInWithEmailAndPassword(auth, sanitizedEmail, password)
    .then(userCredential => {
      const user = userCredential.user;
      if (!user.emailVerified) {
        sendEmailVerification(user);
        signOut();
        alert(
          "Unverified Email Address. A new automated message with a verification link has been sent to your email. " +
          "Please use it to enable your account by verifying your email address."
        );
      }
    });
  } catch(err) {
    alert("Error! " + err.message);
  }
}

export async function logOut() {
  try {
    await signOut();
  } catch(err) {
    alert("Error! " + err.message);
  }
}

export async function resetPassword(email) {
  const sanitizedEmail = email.toLowerCase().trim();
  try {
    await sendPasswordResetEmail(auth, sanitizedEmail);
    alert(
      "An automated message with a password reset link has been sent to your email."
    );
  } catch(err) {
    alert("Error! " + err.message);
  }
}

export async function changeEmail(oldEmail, password, newEmail) {
  const sanitizedOldEmail = oldEmail.toLowerCase().trim();
  const sanitizedNewEmail = newEmail.toLowerCase().trim();
  try {
    await signInWithEmailAndPassword(auth, sanitizedOldEmail, password)
    .then(() => {
      updateEmail(auth.currentUser, sanitizedNewEmail)
      .then(() => {
        sendEmailVerification(auth.currentUser);
        updateDoc(doc(db, "users", auth.currentUser.uid), {email: auth.currentUser.email});
        alert(
          "Success! Your email address has been changed to " + newEmail +
          ". Please verify this address by clicking on the link in the automated verification message sent to your email."
        );
      });
    });
  } catch(err) {
    alert("Error! " + err.message);
  }
}

export async function changePassword(email, oldPassword, newPassword) {
  const sanitizedEmail = email.toLowerCase().trim();
  try {
    await signInWithEmailAndPassword(auth, sanitizedEmail, oldPassword)
    .then(() => {
      updatePassword(auth.currentUser, newPassword)
      .then(() => {
        alert(
          "Success! Your password has been changed."
        );
      });
    });
  } catch(err) {
    alert("Error! " + err.message);
  }
}

export async function updateWorkoutHistory(userUID, updatedWorkoutHistoryArr) {
  try {
    await updateDoc(doc(db, "users", userUID), {workoutHistory: updatedWorkoutHistoryArr});
    alert("Workout saved successfully!");
  } catch(err) {
    alert("Error! " + err.message);
  }
}

export async function updateWeightHistory(userUID, updatedWeightHistoryArr) {
    try {
      await updateDoc(doc(db, "users", userUID), {weightHistory: updatedWeightHistoryArr});
    } catch(err) {
      alert("Error! " + err.message);
    }
  }