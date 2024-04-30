const extractData = require("../shared/promt/extractData")
const filterCVFromJD = require("../shared/filterCVFromJD")
const { LINK_TO_CLIENT } = require("../shared/const")

class chatController {
  async chatResponse(req, res) {
    const text = req.body.text
    const PROMT_CASE =
      "Với văn bản được nhập thì nó là loại nào sau đây: 1. Hỏi về tôi là ai 2. Tìm CV phù hợp trong hệ thống 3. Các CV phù hợp với JD trong hệ thống 4. Các việc làm hiện có với công việc nào đó 5. Thông tin khác (chỉ trả về một con số)"

    const response = await extractData(PROMT_CASE, text)
    const casePROMT = response.match(/\d+/)?.[0] || "5"

    if (casePROMT === "1") {
      res.json({
        message:
          "Hệ thống của tôi là ShareCV, rất vui được nhận câu hỏi từ bạn",
      })
    } else if (casePROMT === "2" || casePROMT === "3") {
      const result = await filterCVFromJD(text, "Ho Chi Minh")
      const slugFields = result.map((item) => LINK_TO_CLIENT + "/" + item.slug)
      res.json({ message: slugFields.join(", ") })
    } else if (casePROMT === "4") {
      const result = await extractData(
        "Cho tôi thông tin về các công việc hiện (đưa ra các liên kết) có trên mạng ở thời điểm hiện tại với các gợi ý ở đây: ",
        text
      )
      console.log(result)
      res.json({ message: result })
    } else if (casePROMT === "5") {
      res.json({ message: "Thông tin khác" })
    } else {
      res.json({ message: casePROMT }) // if no match found
    }
  }
}

module.exports = new chatController()
