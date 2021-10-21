import fs from 'fs'
import admin from "firebase-admin"

const serviceAccount = JSON.parse(fs.readFileSync('./firestore/xxxxxxxxxxxxxxxxxxxxxxxxxxxxx.json'))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

console.log('Base Firebase conectada!')

const db = admin.firestore();
const colores = db.collection('colores')

/* --------------------------------------- */
// 1) Agregar los colores red, green, blue dentro de una colección llamada colores con el formato: { nombre: color }
const { id: redId } = await colores.add({ nombre: 'red' });
const { id: greenId } = await colores.add({ nombre: 'green' });
const { id: blueId } = await colores.add({ nombre: 'blue' });
console.log('Colores insertados')
// console.log(redId, greenId, blueId)

/* --------------------------------------- */
// 2) Listar todos los colores disponibles.
const todos = await colores.get();
todos.forEach(doc => {
    console.log({ id: doc.id, ...doc.data() })
})

/* --------------------------------------- */
// 3) Modificar el color blue por navy.
await colores.doc(blueId).set({ color: 'navy' });
console.log("El color ha sido actualizado");


// /* --------------------------------------- */
// 4) eliminar el color green
await colores.doc(greenId).delete();
console.log("El color ha sido borrado exitosamente");
