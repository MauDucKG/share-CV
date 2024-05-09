const userModel = require("./user.model");

class userController {
  newuser = async function (req, res) {
    const userdata = req.body;
    try {
      const existingUser = await userModel.findOne({ login: userdata.login });
      
      if (!existingUser){
        console.log("Add new user")

        const userItem = new userModel({
          login: userdata.login,
          name: userdata.name,
          avatar: userdata.avatar_url,
          role: "candidate",
          email: userdata.email,
          phone: "",
          bio: userdata.bio,
          company: userdata.company,
          location: userdata.location,
          isRestricted: false,
          createdTime: new Date().toISOString()
      });
        await userItem.save();
        res.status(200).send("User saved successfully.");
      } 
      else res.status(200).send("User already exist");
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new userController();