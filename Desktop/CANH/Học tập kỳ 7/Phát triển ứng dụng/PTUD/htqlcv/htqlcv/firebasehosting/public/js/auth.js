import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';

function initAuth(firebaseApp) {
  return getAuth(firebaseApp);
}

function checkUserSignedIn(auth, onSuccess, onError) {
  onAuthStateChanged(auth, (user) => {
    if (user) { onSuccess(user); }
    else onError();
  });
}

function signIn(auth, email, password, onSuccess, onError) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => onSuccess(userCredential))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      onError(errorCode, errorMessage);
    });
}

function resetPassword(auth, email, onSuccess, onError) {
  sendPasswordResetEmail(auth, email)
    .then((userCredential) => onSuccess(userCredential))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      onError(errorCode, errorMessage);
    });
}

function signUp(auth, email, password, onSuccess, onError) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => onSuccess(userCredential))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      onError(errorCode, errorMessage);
    });
}

function updateDisplayName(auth, newName, onSuccess, onError) {
  updateProfile(auth.currentUser, { displayName: newName })
    .then(() => onSuccess())
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      onError(errorCode, errorMessage);
    });

}

export { initAuth, checkUserSignedIn, signIn, resetPassword, signUp, updateDisplayName };