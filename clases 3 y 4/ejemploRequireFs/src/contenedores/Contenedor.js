const fs = require('fs')

class Contenedor {

    constructor(ruta) {
        this.ruta = ruta
    }

    start() {
        fs.writeFileSync(this.ruta, 'hola mundo')
    }
}

module.exports = Contenedor