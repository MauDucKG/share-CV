const userModel = require("./user.model");

class userController {
  async getAlluser(request, respond) {
    try {
      const users = await userModel.find({ isRestricted: false });
      respond.status(200).json({
        success: true,
        message: "Done!",
        users: users,
      });
    } catch (error) {
      respond.status(500).json({
        success: false,
        message: "An error occurred while retrieving users",
      });
    }
  }

  async getOne(request, respond) {
    try {
      const cv = await userModel.findById(request.params.id);
  
      if (!cv) {
        respond.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }
  
      respond.status(200).json(cv);

    } catch (error) {
      console.log(error);
      respond.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

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
      if (user.login !== userSend.login && userSend.role !== "admin"){
        return res.status(401).json({ error: "No Permission" });
      } 
      
      user.name = req.body.name || user.name;
      user.avatar = req.body.avatar || user.avatar;
      user.role = req.body.role || user.role;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.bio = req.body.bio || user.bio;
      user.company = req.body.company || user.company;
      user.location = req.body.location || user.location;
      user.isRestricted = req.body.isRestricted || user.isRestricted;

      await user.save();

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(request, respond) {
    try {
      const user = await userModel.findById(request.params.id);

      if (!user) {
        return respond.status(404).json({
          success: false,
          message: "User not found"
        });
      }
  
      user.isRestricted = true
      await user.save();
  
      respond.status(200).json({
        success: true,
        message: "User deleted successfully"
      });
    } catch (error) {
      console.error(error);
      respond.status(500).json({
        success: false,
        message: "An error occurred while deleting the user"
      });
    }
  }
  
}

module.exports = new userController();