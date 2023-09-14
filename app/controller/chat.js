const { Controller } = require('egg');
const OpenAI = require('openai');

class ChatController extends Controller {
  // 创建图片
  async creatImg() {
    const { ctx } = this;
    const { prompt, n=1, size="1024x1024" } = ctx.request.body;
    const openai = new OpenAI({
      apiKey: this.app.config.constant.API_KEY,
    });
    const response = await openai.images.generate({ prompt, n, size });
    ctx.body = {
      data: response.data
    };
  }
  
  // 创建聊天
  async createChat() {
    const { ctx } = this;
    const { request, service } = ctx;
    const { prompt, userId } = request.body;
    try {
      ctx.validate(this.indexRule, request.body);

      const openai = new OpenAI({
        apiKey: this.app.config.constant.API_KEY,
      });

      const userContext = await service.chat.getUserContext(userId);
      const messages = this.buildMessageList(userContext, prompt);

      const response = await openai.chat.completions.create({
        messages,
        model: "gpt-3.5-turbo",
      });

      const assistantResponse = response.choices[0].message.content.trim();
      const updatedUserContext = this.updateUserContext(userContext, prompt, assistantResponse);
      service.chat.updateUserContext(userId, updatedUserContext);

      const shouldEndConversation = this.isConversationEnding(assistantResponse);
      if (shouldEndConversation) {
        service.chat.deleteUserContext(userId);
        ctx.body = { code: 0, message: "拜拜！" };
      } else {
        ctx.body = { code: 0, message: assistantResponse };
      }

    } catch (err) {
      ctx.status = 442;
      ctx.body = {
        code: -1,
        message: '系统错误',
        error: err.errors,
      }
    }
  }

  // 构建消息列表
  buildMessageList = (userContext, prompt) => {
    return [
      ...userContext,
      { role: "system", content: "You are a helpful assistant that answers questions." },
      { role: "user", content: prompt }
    ];
  }

  // 更新用户上下文
  updateUserContext = (userContext, prompt, assistantResponse) => {
    return [
      ...userContext,
      { role: "user", content: prompt },
      { role: "assistant", content: assistantResponse }
    ];
  }

  // 判断是否结束聊天
  isConversationEnding(response) {
    const keywords = ["再见", "退出", "滚", "拜拜"];
    return keywords.some(keyword => response.includes(keyword));
  }

  // 定义参数校验规则
  get indexRule() {
    return {
      userId: {
        type: 'string',
        required: true,
        format: /^[A-Za-z0-9]+$/,
        message: 'userId不能为空，且只能包含字母和数字',
      },
      prompt: {
        type: 'string',
        required: true,
        max: 300,
        message: 'content不能为空，且长度不能超过300',
      },
    };
  }
}

module.exports = ChatController;
