const express = require('express')
const http = require('http')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const database = require('./dbConnection/db.Connection');
const router = require('./routers/AdminRouter')
const { routerUser } = require('./routers/UserRouter')
const { routeImage } = require('./routers/ImageRouter')
const { CommentRouter } = require('./routers/commentRouter')
const { PostRouter } = require('./routers/UserPostRouter')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

function handleClientConnection(socket) {
    console.log('A user connected');
    // Handle custom events
    socket.on('custom_event', (data) => {
        // ...
    });
    // ... other event handlers
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
}
io.on('connection', handleClientConnection);


dotenv.config();

const corsOption = {
    origin: ['http://localhost:5173'],
    Credential: true,

}

app.use(cors(corsOption));

app.use(express.json())
app.use(cookieParser())



app.use('/avatar', express.static('./upload/avatar'));
app.use('/images', express.static('./upload/images'));
app.use('/posts', express.static('./upload/post'))
app.use('/admin', cookieParser, router);
app.use('/user', routerUser, routeImage, CommentRouter, PostRouter)


// app.get('/', (req, res) => {
//     res.cookie('username', 'john_doe', { expires: new Date(Date.now() + 3600000), httpOnly: true });

// })

const port = process.env.PORT || 3000

app.listen(port, '0.0.0.0', () => console.log(` app running on port ${port}`))

database()
