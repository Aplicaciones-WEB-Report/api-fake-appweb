const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: './public'
});

// Configurar CORS para permitir peticiones desde cualquier origen
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

server.use(middlewares);

// Todas las rutas van bajo /api
server.use('/api', router);

// Ruta de prueba
server.get('/', (req, res) => {
  res.json({
    message: 'API funcionando correctamente',
    endpoints: [
      '/api/users',
      '/api/candidate_profiles',
      '/api/job_offers',
      '/api/applications',
      '/api/messages'
    ]
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server corriendo en puerto ${port}`);
});
