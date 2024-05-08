const axios = require('axios');
const userModel = require('../user/user.model')
class loginController {
    async getToken(req, res) {
        try {
            const data = req.body.data;

            const config = {
                method: "POST",
                maxBodyLength: Infinity,
                url: "https://api.utteranc.es/token",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            const response = await axios.request(config);

            res.json(response.data);
          } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
          }
    }

    async getUserData(req, res) {
        try {
            req.get("Authorization")
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

            if (!existingUser){
                const userItem = new userModel({
                    login: response.data.login,
                    name: response.data.name,
                    avatar: response.data.avatar_url,
                    role: "candidate",
                    email: response.data.email,
                    phone: "",
                    bio: response.data.bio,
                    company: response.data.company,
                    location: response.data.location,
                    isRestricted: false,
                    createdTime: new Date().toISOString()
                });
                await userItem.save();
            } 

            res.json(response.data);

          } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Login Error" });
          }
    }


}

module.exports = new loginController();