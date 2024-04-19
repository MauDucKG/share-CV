const postitemModel = require("./postitem.model");
const postModel = require("../post/post.model");
const remarkdown = require("../shared/promt/remarkdown")

class postitemController {
  getAllpostitem(request, respond) {
    postitemModel.find().exec()
      .then((postitems) => {
        respond.status(200).json({
          success: true,
          message: "Done!",
          postitems: postitems,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  newpostitem = async function (req, res) {
    const { idPost, detail } = req.body;
    
    try {
      const postExist = await postModel.findById(idPost).exec();
      if (!postExist) {
        return res.status(404).send("Invalid post id");
      }

      const content = await remarkdown(detail)
      const postitem = new postitemModel({
        idPost,
        detail: content,
      });

      await postitem.save();
      res.status(200).send("New postitem created!");
    } catch (error) {
      res.status(500).send(error);
    }
  };

  getpostitemById = async (req, res) => {
    const idPost = req.params.id;
    try {
      const postitem = await postitemModel.findOne({ idPost });
      if (!postitem) {
        return res.status(404).json({ message: "postitem not found" });
      }
      res.json(postitem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
}

module.exports = new postitemController();
