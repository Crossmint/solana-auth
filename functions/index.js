// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.

const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const getAuthChallenge = require("./getAuthChallenge");
const completeAuthChallenge = require("./completeAuthChallenge");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getAuthChallenge = functions.https.onRequest(getAuthChallenge);
exports.completeAuthChallenge = functions.https.onRequest(
  completeAuthChallenge
);
