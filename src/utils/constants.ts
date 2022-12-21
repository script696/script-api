const CORS_CONFIG = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
};

export { CORS_CONFIG };
