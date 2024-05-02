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
          "Tôi là chatbot của share-CV, tôi có thể giúp bạn tìm kiếm CV phù hợp với yêu cầu của bạn. Bạn có thể nhập văn bản để tìm kiếm CV hoặc tìm kiếm CV phù hợp với JD của bạn. Bạn cũng có thể tìm kiếm các công việc hiện có với các gợi ý từ tôi.",
      })
    } else if (casePROMT === "2" || casePROMT === "3") {
      const result = await filterCVFromJD(text, "Ho Chi Minh")
      const slugFields = result.map((item) => LINK_TO_CLIENT + "/" + item.slug)
      let message
      if (slugFields.length === 0) {
        message = "Hiện tại hệ thống không có CV phù hợp với yêu cầu của bạn"
      } else {
        message =
          "# Sau đây là thông tin về các CV hiện tại phù hợp với yêu cầu của bạn trong hệ thống chúng tôi:<br>" +
          slugFields.map((field) => `- ${field}`).join("<br>")
      }
      res.json({ message: message })
    } else if (casePROMT === "4") {
      const result = await extractData(
        "Cho tôi thông tin về các công việc hiện (đưa ra các liên kết) có trên mạng ở thời điểm hiện tại với các gợi ý ở đây: ",
        text
      )
      res.json({ message: result })
    } else if (casePROMT === "5") {
      res.json({
        message:
          "Chào mừng đến với Share CV - nền tảng cung cấp CV chất lượng cho nhà tuyển dụng. Tại đây, bạn có thể nhanh chóng tìm thấy CV phù hợp và trò chuyện với nhà tuyển dụng. Ngoài ra, chúng tôi cung cấp thông tin về việc làm hiện tại và các vị trí phù hợp với yêu cầu của bạn. Khám phá ngay để tìm kiếm những cơ hội việc làm tuyệt vời và chia sẻ CV một cách dễ dàng. Hãy yêu cầu câu hỏi phù hợp với hệ thống để hệ thống phản hồi tốt nhất",
      })
    } else {
      res.json({
        message:
          "Chào mừng đến với Share CV - nền tảng cung cấp CV chất lượng cho nhà tuyển dụng. Tại đây, bạn có thể nhanh chóng tìm thấy CV phù hợp và trò chuyện với nhà tuyển dụng. Ngoài ra, chúng tôi cung cấp thông tin về việc làm hiện tại và các vị trí phù hợp với yêu cầu của bạn. Khám phá ngay để tìm kiếm những cơ hội việc làm tuyệt vời và chia sẻ CV một cách dễ dàng.",
      })
    }
  }
}

module.exports = new chatController()
