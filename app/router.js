'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  app.beforeStart(async () => {
    const ctx = app.createAnonymousContext();
    await ctx.app.mysql.query(`
      CREATE TABLE IF NOT EXISTS user_contexts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        memory INT(11) DEFAULT NULL,
        affinity INT(11) DEFAULT NULL,
        context TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

  });
  router.post('/creatChat', controller.chat.createChat);
  router.post('/creatImg', controller.chat.creatImg);
};

