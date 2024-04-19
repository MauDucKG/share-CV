const postModel = require("./post.model")
const postitemModel = require("../postitem/postitem.model")
const checkPost = require("../shared/promt/checkPost")
const extractTagsFromPost = require("../shared/promt/extractTagsFromPost")

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
    const { title, summary, content, thumbnail } = req.body

    await checkPost(content).then(async (checkRes) => {
      if (checkRes === "false") {
        res.status(400).send({ message: "Post is not valid" })
        return
      }
      
      await extractTagsFromPost(content).then(async (tags) => {
        try {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          const slug = require("crypto").randomBytes(10).toString("hex")
          const post = new postModel({
            date: {
              start_date: new Date().toISOString(),
            },
            type: ["Post"],
            slug: slug, // Use the unique slug here
            tags,
            category: ["Blog"],
            summary: summary,
            location: "Viet Nam",
            content: content,
            title: title,
            status: ["Public"],
            createdTime: new Date().toISOString(),
            fullWidth: false,
            thumbnail: thumbnail,
            experience: new Date().toISOString(),
          })

          const postitem = new postitemModel({
            idPost: post.slug,
            detail: content,
          })
          await post.save()
          await postitem.save()
          res
            .status(200)
            .send({ message: "New Post created!!!", slug: post.slug })
        } catch (error) {
          res.status(500).send(error)
        }
      })
    })
  }
}

module.exports = new postController()
