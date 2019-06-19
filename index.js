#!/usr/local/bin/node
const admin = require('firebase-admin');
const cron = require('node-cron');

//console.log("admin");

//console.log("firestore");

var serviceAccount = require('./pimonitor-e2571-dee61a31982d.json');
//console.log("serviceAccount");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
//console.log("admin.init");

var db = admin.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

var docRef = db.collection('CpuTemps');

console.log("Starting job");
//cron.schedule('0 0,30 * * * *', () => {

cron.schedule('* * * * *', WriteCpuTemp() );

console.log('Firebase test running');

function WriteCpuTemp() {
    var addDoc = docRef.add({
        Date: new Date(),
        Temperature: Math.floor((Math.random() * 10) + 1)
    }).then(ref => {
        console.log("Added document with ID: " + ref.id);
    });
}