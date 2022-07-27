const io = require('socket.io')(8080, {
    cors: {
        origin: '*',
        // methods: ['GET', 'POST']
    }
})

let onlineUser = []; 
 
const addUser = (userId, socketId, userInfo) => {

    const checkUser = onlineUser.some(u => u.userId === userId);

    if (!checkUser) {
        onlineUser.push({ userId, socketId, userInfo });
    }
}

const findFriend = (id) => {
    return onlineUser.find(u => u.userId === id);
}

const userLogout = (userId) => {
    onlineUser = onlineUser.filter(u => u.userId !== userId)
}

const userRemove = (socketId) => {
    onlineUser = onlineUser.filter(u => u.socketId !== socketId);
}


io.on('connection', (socket) => {


    console.log('user is connected.....1');


    socket.on('addUser', (ChatId) => {

        if("id" in ChatId){
            addUser(ChatId.id, socket.id, ChatId);
            socket.to("adminChat").emit('getUser', onlineUser)
            socket.to("adminChat").emit('new_user_add', ChatId.senderName)
        }

    })

    socket.on('addAdmin', () => {
        socket.join('adminChat');
    });


    socket.on('typingMessage', (data) => {

            socket.to("adminChat").emit('typingMessageGet', {
                id: data.id,
                msg: data.msg
            })

    });




    socket.on('sendMessage', (data) => {
    
        if (data.from === "admin") {
            const user = findFriend(data.id);
           
            if (user !== undefined) {

                socket.to(user.socketId).emit('getMessage', data)
            }

        } else {
            socket.to("adminChat").emit('getMessage', data)
        }
    })


    socket.on('messageSeen', id => {
        socket.to("adminChat").emit('msgSeenResponse', id)
    })



    socket.on('seen', id => {
        socket.to("adminChat").emit('seenSuccess', id)
    })





   


    socket.on('delivaredMessage', id => {
        socket.to("adminChat").emit('msgDelivaredResponse', id)
    })


    //only user
    socket.on('logout', userId => {
        userLogout(userId)
    })


    socket.on('disconnect', () => {
        console.log('user disconnect....');
        userRemove(socket.id);

        io.emit('getUser', onlineUser)
    })

})