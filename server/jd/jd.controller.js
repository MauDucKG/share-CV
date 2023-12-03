const jdModel = require("./jd.model");
const sendEmail = require("../shared/sentEmailToCompany");

class jdController {
  newjd = async function (req, res) {
    const { email, position, jdText } = req.body;
    try {
      const jdItem = new jdModel({
        requirements: jdText,
        email_company: email,
        title: position
      });

      await sendEmail(jdItem, email);

      await jdItem.save();
      
      res.status(200).send("JD saved successfully.");
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new jdController();