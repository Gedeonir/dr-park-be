const socketIO = require('socket.io')({
    cors:{
        origin:"*",
    }
})
const jwt = require("jsonwebtoken");
const {Notification} = require('../../models')
const emitter = require('./Emitter')

const tokenVerification = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRETE);
}

const getNotifications = async (user) =>{
    return Notification.findAll({where:{receiver: user,isRead:false}});
}

const socketMethod = {};

socketMethod.socketStarter = server =>{
    socketIO.attach(server);
    socketIO.on("connection", async (socket) => {
        const token = socket.handshake.auth.token
        const verifyToken = tokenVerification(token);
        emitter.on("notification request", async (newNotification) => {
            if (verifyToken.uuid == newNotification.receiver) {
                socket.emit('newNotification',newNotification);
            }
        });

        const notificationCount = await getNotifications(verifyToken.uuid);
        socket.emit('notificationCount',notificationCount.length);
    });
};

module.exports = {socketMethod,socketIO}