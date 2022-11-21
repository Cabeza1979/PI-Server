const session = require('supertest-session');
const app = require('../../src/routes/index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

// describe('Test de APIS', () => {
//   describe('GET /', () => {
//     it('responds with 201', () => agent.get('/').expect(201));
//     it('responds with and object ', () =>
//         agent.get('/countries/ARG').then((res) => {
//           expect(res.body.nombre).toEqual('Argentina');
//         }));
//   });

// });