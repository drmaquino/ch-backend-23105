import fs from 'fs'
import admin from "firebase-admin"

const serviceAccount = JSON.parse(fs.readFileSync('./firestore/coderhouse-dfd2e-firebase-adminsdk-pzazz-78933f0e58.json'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

class ContenedorFB {
    constructor() { }
}
