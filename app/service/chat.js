const { Service } = require('egg');

class ChatService extends Service {

  // 获取用户上下文
  async getUserContext(userId) {
    const result = await this.app.mysql.select('user_contexts', {
      where: { user_id: userId },
      orders: [['created_at', 'desc']],
      limit: 1,
    });
    return result[0] ? JSON.parse(result[0].context) : [];
  }

  // 更新用户上下文
  async updateUserContext(userId, context) {
    const existingData = await this.app.mysql.get('user_contexts', { user_id: userId });
  
    const record = {
      user_id: userId,
      context: JSON.stringify(context),
      created_at: new Date(),
    };

    if (existingData) {
      await this.app.mysql.update('user_contexts', record, {
        where: { user_id: userId },
      });
    } else {
      await this.app.mysql.insert('user_contexts', record);
    }

  }

  // 删除用户上下文
  async deleteUserContext(userId) {
    await this.app.mysql.delete('user_contexts', {
      user_id: userId
    });
  }
}

module.exports = ChatService;
