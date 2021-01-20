const models = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../models");
const User = models.User;
const Chat = models.Chat;
const ChatUser = models.ChatUser;
const Message = models.Message;

exports.index = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
    include: [
      {
        model: Chat,
        include: [
          {
            model: User,
            where: {
              [Op.not]: {
                id: req.user.id,
              },
            },
          },
          {
            model: Message,
            include: [
              {
                model: User,
              },
            ],
            limit: 20,
            order: [["id", "DESC"]],
          },
        ],
      },
    ],
  });

  return res.json(user.Chats);
};

exports.create = async (req, res) => {
  const { partnerId } = req.body;

  const t = await sequelize.transaction();

  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      include: [
        {
          model: Chat,
          where: {
            type: "dual",
          },
          include: [
            {
              model: ChatUser,
              where: {
                userId: partnerId,
              },
            },
          ],
        },
      ],
    });

    if (user && user.Chats.length > 0)
      return res.status(403).json({
        status: "Error",
        message: "Chat with user already exists",
      });

    const chat = await Chat.create({ type: "dual" }, { transaction: t });

    await ChatUser.bulkCreate(
      [
        {
          chatId: chat.id,
          userId: req.user.id,
        },
        {
          chatId: chat.id,
          userId: partnerId,
        },
      ],
      { transaction: t }
    );
    await t.commit();

    const creator = await User.findOne({
      where: {
        id: req.user.id,
      },
    });

    const partner = await User.findOne({
      where: {
        id: partnerId,
      },
    });

    const forCreator = {
      id: chat.id,
      type: "dual",
      User: [partner],
      Messages: [],
    };

    const forReceiver = {
      id: chat.id,
      type: "dual",
      User: [creator],
      Message: [],
    };

    return res.json([forCreator, forReceiver]);
  } catch (e) {
    await t.rollback();
    return res.status(500).json({ status: "Error", message: e.message });
  }
};

exports.messages = async (req, res) => {
  const limit = 10;
  const page = req.query.page || 1;
  const offset = page > 1 ? page * limit : 0;

  const messages = await Message.findAndCountAll({
    where: {
      chatId: req.query.id,
    },
    include: [
      {
        model: User,
      },
    ],
    limit,
    offset,
    order: [["id", "DESC"]],
  });

  const totalPages = Math.ceil(messages.count / limit);

  if (page > totalPages) return res.json({ data: { messages: [] } });

  const result = {
    messages: messages.rows,
    pagination: {
      page,
      totalPages,
    },
  };

  return res.json(result);
};

exports.imageUpload = (req, res) => {
  if (req.file) {
    return res.json({ url: req.file.filename });
  }

  return res.status(500).json("No omage uploaded");
};

exports.addUserToGroup = async (req, res) => {
  try {
    const { chatId, userId } = req.body;

    const chat = await Chat.findOne({
      where: {
        id: chatId,
      },
      include: [
        {
          model: User,
        },
        {
          model: Message,
          include: [
            {
              model: User,
            },
          ],
          limit: 20,
          order: [["id", "DESC"]],
        },
      ],
    });

    Chat.Messages.reverse();

    // Check if already in the group
    chat.User.forEach((user) => {
      if (user.id === userId) {
        return res.status(403).json({ message: "User already in the group" });
      }
    });

    await ChatUser.create({ chatId, userId });

    const newChatter = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (chat.type === "dual") {
      chat.type = "group";
      chat.save();
    }

    return res.json({ chat, newChatter });
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e.message });
  }
};

exports.deleteChat = async (req, res) => {
  const { id } = req.params;

  try {
    const chat = await Chat.findOne({
      where: {
        id,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    const notifyUser = chat.User.map((user) => user.id);

    await chat.destroy();
    return res.json({ chatId: id, notifyUser });
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e.message });
  }
};

exports.leaveCurrentChat = async (req, res) => {
  try {
    const { chatId } = req.body;
    const chat = await Chat.findOne({
      where: {
        id: chatId,
      },
      include: [
        {
          model: User,
        },
      ],
    });

    if (chat.User.length === 2) {
      return res
        .status(405)
        .json({ status: "Error", message: "You cannot leave this chat" });
    }

    if (chat.User.length === 3) {
      chat.type = "dual";
      chat.save();
    }

    await ChatUser.destroy({
      where: {
        chatId,
        userId: req.user.id,
      },
    });

    await Message.destroy({
      where: {
        chatId,
        fromUseId: req.user.id,
      },
    });

    const notifyUser = chat.User.map((user) => user.id);

    return res.json({
      chatId: chat.id,
      userId: req.user.id,
      currentUserId: req.user.id,
      notifyUser,
    });
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e.message });
  }
};
