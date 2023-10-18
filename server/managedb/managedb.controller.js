const cvModel = require("../cv/cv.model");
const cvitemModel = require("../cvitem/cvitem.model")
const todos = [];

class managedbController {
  getAllmanagedb(req, res) {
    res.render('index', { todos });
  }

  newmanagedb = async function (req, res) {
    const task = req.body.task;
    if (task) {
        todos.push(task);
    }
    res.redirect('/managedb');
  };

  getmanagedbById = async (req, res) => {
   
  };

  deletemanagedb = async function (req, res) {
    
  }

  updatemanagedb = async function (req, res) {
    
  }

}

module.exports = new managedbController();
