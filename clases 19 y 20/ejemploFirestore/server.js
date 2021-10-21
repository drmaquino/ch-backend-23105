import fs from 'fs'
import admin from "firebase-admin"

const serviceAccount = JSON.parse(fs.readFileSync('./firestore/coderhouse-dfd2e-firebase-adminsdk-pzazz-78933f0e58.json'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

console.log('Base Firebase conectada!')

const db = admin.firestore();
const dbPersonas = db.collection('personas')

const { id: id1 } = await dbPersonas.add({ nombre: 'coder' });
const { id: id2 } = await dbPersonas.add({ nombre: 'house' });
console.log('Personas insertadas')

const personas = await dbPersonas.get();
personas.forEach(doc => {
    console.log({ id: doc.id, ...doc.data() })
})

await dbPersonas.doc(id1).update({ alias: 'ch' });
console.log("La persona ha sido actualizada");

await dbPersonas.doc(id1).set({ unicaProp: 'esta' });
console.log("La persona ha sido actualizada");

const p = await dbPersonas.doc(id1).get();
console.log(p.data());

await dbPersonas.doc(id1).delete();
console.log("La persona 1 ha sido borrada exitosamente");

const restantes = await dbPersonas.get();
restantes.forEach(doc => {
    console.log({ id: doc.id, ...doc.data() })
})

dbPersonas.get()
    .then(refs => {
        const ops = []
        refs.forEach(doc => {
            ops.push(dbPersonas.doc(doc.id).delete())
        })
        return Promise.allSettled(ops)
    })
    .then(results => {
        results.forEach(({ status }) => console.log(status))
    })
