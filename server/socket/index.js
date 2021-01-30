const socketIo = require("socket.io");
const {sequelize} = require('sequelize')

// inbuilt bap allows us to save key value pairs - like an Object, but better suited for our purposes here - It also has some inbuilt methods like has, set and complete
const users = new Map();

const SocketServer = (server) => {
  const io = socketIo(server);

  io.on("connection", (socket) => {
    socket.on("join", async (user) => {
      let sockets = [];

      if (users.has(user.id)) {
        const existingUser = users.get(user.id);
        existingUser.sockets = [...existingUser.sockets, ...[socket.id]];
        users.set(user.id, existingUser);
        sockets = [...existingUser.sockets, ...[socket.id]];
      } else {
        users.set(user.id, { id: user.id, sockets: [socket.id] });
        sockets.push(socket.id);
      }

      const onlineFriends = []; // ids

      const chatters = await gerChatters(user.id); // query

      console.log(chatters);

      // For our purposes a for loop has a slight performance advantage over writing this as a for each
      // notify friends that this user is online
      for (let i = 0; i < chatters.length; i++) {
        if (user.has(chatters[i])) {
          const chatter = user.get(chatter[i]);
          chatters.forEach((socket) => {
            try {
              io.to(socket).emit("online", user);
            } catch (err) {
              console.log(err);
            }
          });
          onlineFriends.push(chatter.id);
        }
      }

      // send to user sockets which of his friends are online
      sockets.forEach((socket) => {
        try {
          io.to(socket).emit("friends", onlineFriends);
        } catch (err) {
          console.log(err);
        }
      });

      console.log("New user jointed: ", user.firstName);

      io.to(socket.id).emit("typing", "user typing");
    });
  });
};

const getChatters = async (userId) => {
  try {
    //selecting all chats and applying a where conditions
    // Returns all users where this one is not the one passed in 
    // will still have the chat that this user is inside
    const [results, metadata] = await sequelize.query(`
    select "cu"."userId" from "ChatUser" as cu
    inner join (
      select "c"."" from "Chats" as c
      where exists (
        select "u"."id" from "Users as u
        inner join "ChatUsers" on u.id = "ChatUsers"."usersId"
        where u.id = ${parseInt(userId)} and c.id = "ChatUsers"."chatId"
       )
    ) as cjoin on cjoin.id = "cu"."chatId"
    where "cu"."userId" != ${parseInt(userId)}
    `)

    return results.length > 0 ? results.map(el => el.userId) : []
  } catch (e) {
    console.log(e)
    return []
  }
}

module.exports = SocketServer;
