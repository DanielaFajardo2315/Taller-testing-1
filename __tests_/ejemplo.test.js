// un archivo .test.js se conoce como suit de pruebas
// Es el lugar donde ustedes definen los casos de prueba agrupados por temática

// 1. Importaciones
import { suma } from "../src/utils/ejemplo.js";

// 2. desarrollo

/* 
    1. Bloques de prueba (agrupa por método) → describe
    2. Casos individuales de prueba → it
        - Es que abarquen la mayoría de los casos posibles
        - Que se conozca el resultado esperado
*/

describe('Probar función suma...', () => {
    // definir los casos individuales (una descripción, función flecha)
    it ('Caso 1: suma correcta de números positivos', ()=> {
        expect(suma(2,3)).toBe(5);
    });

    it ('Caso 2: suma correcta de número con cero', ()=> {
        expect(suma(7,0)).toBe(7);
    });

    it ('Caso 3: suma correcta de números negativos', ()=> {
        expect(suma(-2,-4)).toBe(-6);
    });
});