const userModel = require("./user.model");

class userController {
  newuser = async function (req, res) {
    const userdata = req.body;
    try {
      const existingUser = await userModel.findOne({ login: userdata.login });
      
      if (!existingUser){
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

  async updateUser(req, res) {
    try { 
      const userId = req.params.id;
      const user = await userModel.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const userSend = req.existingUser;
      if (user.login !== userSend.login){
        return res.status(401).json({ error: "No Permission" });
      } 
  
      user.name = req.body.name || user.name;
      user.avatar = req.body.avatar || user.avatar;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.bio = req.body.bio || user.bio;
      user.company = req.body.company || user.company;
      user.location = req.body.location || user.location;
  
      await user.save();

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  
}

module.exports = new userController();