
const UserLogout = (req, res) => {
    try {
        const cookies = req.cookies.token;
        if (!cookies) {
            return res.status(401).json({ message: 'Please login ...' })
        }

        // res.status(200).json({ cookies })
        res.clearCookie('token')
        res.status(200).json({ message: 'User logout Successfully' })
    } catch (error) {
        const errorMessage = error.message;
        res.status(500).json({ errorMessage })
    }
}

module.exports = UserLogout;