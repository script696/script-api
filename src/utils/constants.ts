const CORS_CONFIG = {
  origin: [process.env.ADMIN_PANEL, process.env.TELEGRAM_URL],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
};

export { CORS_CONFIG };
