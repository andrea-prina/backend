export const configuration = () => ({
  env: process.env.ENV,
  db: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
  },
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET,
    access_exp: process.env.JWT_ACCESS_EXP,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_exp: process.env.JWT_REFRESH_EXP,
  },
  gcloud: {
    client_id: process.env.GCLOUD_CLIENT_ID,
    client_secret: process.env.GCLOUD_CLIENT_SECRET,
    refresh_token: process.env.GCLOUD_REFRESH_TOKEN,
  },
  email: process.env.EMAIL_ADDRESS,
});
