module.exports = {
  host: process.env.NODE_HOST || 'localhost',
  port: process.env.PORT,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Отправка посылок',
    titleTemplate: 'Отправка посылок',
    meta: [
      {
        name: 'description',
        content: 'Отправка посылок',
      },
    ],
    restApi: 'https://site.ru/api',
  },
};
