const postModel = require("./post.model")
const cvitemModel = require("../cvitem/cvitem.model")

class postController {
  async getAllpost(request, respond) {
    postModel
      .find()
      .exec()
      .then((posts) => {
        respond.status(200).json({
          success: true,
          message: "Done!",
          posts: posts,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  newpost = async function (req, res) {
    const {title, summary, image, content} = req.body;
    
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const slug = require("crypto").randomBytes(10).toString("hex")
      const postItem = new postModel({
        date: {
          start_date: new Date().toISOString(),
        },
        type: ["Post"],
        slug: slug, // Use the unique slug here
        tags: ["Analyst"],
        category: ["Blog"],
        summary: summary,
        location: "Viet Nam",
        content: content,
        title: title,
        status: ["Public"],
        createdTime: new Date().toISOString(),
        fullWidth: false,
        experience: new Date().toISOString(),
        thumbnail: image
      });

      const cvitem = new cvitemModel({
        idCv: postItem.slug,
        detail: content
      });
      await postItem.save();
      await cvitem.save()
      res.status(200).send({message: "New Post created!!!", slug: postItem.slug});
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
    

  
module.exports = new postController()
