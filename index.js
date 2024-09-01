const express = require('express')
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

dotenv.config();

app.use(cors({
    origin: `*`,
}))

app.use(express.json())
app.use(cookieParser())
app.use('/avatar', express.static('./upload/avatar'));
app.use('/images', express.static('./upload/images'));
app.use('/posts', express.static('./upload/post'))
app.use('/admin', router);
app.use('/user', routerUser, routeImage, CommentRouter, PostRouter)


// app.get('/', (req, res) => {
//     res.cookie('username', 'john_doe', { expires: new Date(Date.now() + 3600000), httpOnly: true });

// })

const port = process.env.PORT || 3000

app.listen(port, '0.0.0.0', () => console.log(` app running on port ${port}`))

database()
