const userModel = require('./user/user.model')
const checkPermissionCandidate = async (req, res, next) => {
    try {
        const login = req.body.userdata.login
        const existingUser = await userModel.findOne({ login: login });
        if (existingUser.role === 'candidate' || existingUser.role === 'admin') {
            next()
        }
        else {
            console.log("Not Permission")
            res.status(403).json({ message : 'Not Permission'})
        }
    }
    catch (error) {
        console.log("No User")
        res.status(500).send(error);
    }
}

const checkPermissionAdmin = async (req, res, next) => {
    try {
        const login = req.body.userdata.login
        const existingUser = await userModel.findOne({ login: login });
        if (existingUser.role === 'admin') {
            next()
        }
        else {
            console.log("Not Permission")
            res.status(403).json({ message : 'Not Permission'})
        }
    }
    catch (error) {
        console.log("No User")
        res.status(500).send(error);
    }
}

module.exports = {
    checkPermissionCandidate,
    checkPermissionAdmin
};