const { response } = require('express');
const { getUserData } = require('./login/login.controller');
const userModel = require('./user/user.model')
const axios = require('axios');

const checkPermissionCandidate = async (req, res, next) => {
    try {
        const login = req.body.userdata.login
        const existingUser = await userModel.findOne({ login: login });
        if (existingUser.role === 'candidate' || existingUser.role === 'admin') {
            res.json({existingUser})
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

const checkPermissionTokenAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({ error: "Missing token" });
        }
        
        const config = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: 'https://api.github.com/user',
            headers: { 
                'Accept': 'application/vnd.github.v3+json', 
                'Authorization': req.get("Authorization")
            }
        };    

        const response = await axios.request(config);        

        const existingUser = await userModel.findOne({ login: response.data.login });
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

const checkPermissionTokenCandidate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({ error: "Missing token" });
        }
        
        const config = {
            method: 'GET',
            maxBodyLength: Infinity,
            url: 'https://api.github.com/user',
            headers: { 
                'Accept': 'application/vnd.github.v3+json', 
                'Authorization': req.get("Authorization")
            }
        };    

        const response = await axios.request(config);        

        const existingUser = await userModel.findOne({ login: response.data.login });
        if (existingUser.role === 'candidate' || existingUser.role === 'admin') {
            req.existingUser = existingUser; 
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
    checkPermissionAdmin,
    checkPermissionTokenAdmin,
    checkPermissionTokenCandidate
};