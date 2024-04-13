const extractData = require("./extractData")

async function extractTagsFromPost(text) {
  const PROMPT_TAGS = `Extract from the following post the possible tags that users can rely on to easily find the article (return the top 3 relevant tags). The extracted ones should be in ((only return the word separate by comma, not duplicate)): `
  const PROMPT_TAGS1 = `Please rewrite the sentence in English without any spacing around the commas: `
  const tagsString = await extractData(PROMPT_TAGS, text)
  const tagsString1 = await extractData(PROMPT_TAGS1, tagsString)

  const tags = tagsString1.split(",").map(tag => tag.trim());

  return tags
}

module.exports = extractTagsFromPost

// // Test the function
// const text = `Nhu cầu tuyển dụng năm 2024

// Theo Báo cáo Khảo sát Thị trường Tuyển dụng năm 2023 - 2024 của JobsGO (đơn vị hỗ trợ tuyển dụng và tìm việc uy tín tại Việt Nam), kế hoạch tuyển dụng năm 2024 của các doanh nghiệp khá đa dạng. 39,6% doanh nghiệp dự định tăng tuyển thêm từ 10-30% nhân sự, trong khi có 31,6% dự định tuyển thêm dưới 10% nhân sự. Điều này tạo ra một tín hiệu tích cực cho người lao động, cung cấp nhiều cơ hội mới trong mùa tuyển dụng năm nay. Mặc dù dự báo cho năm 2024 còn nhiều rủi ro tiềm ẩn do tình hình kinh tế thế giới, nhưng cơ hội tuyển dụng vẫn rộng mở và đa dạng.

// Tuy nhiên, nhảy việc đầu năm cũng ẩn chứa không ít những khó khăn khi tỷ lệ cạnh tranh cao. Phần đông ứng viên có xu hướng nhảy việc vào đầu năm. Điều này làm cho tỷ lệ cạnh tranh khi tìm kiếm việc làm tại Hà Nội hay TP. Hồ Chí Minh,... cao nhiều ứng viên khó có thể tìm công việc phù hợp với mục tiêu đề ra.


// Kế hoạch tuyển dụng nhân sự của nhà tuyển dụng năm 2024 - Nguồn: Bảng Báo cáo Thị trường tuyển dụng năm 2023-2024 của JobsGO

// Mối quan tâm của người lao động khi tìm kiếm công việc mới

// Thống kê từ JobsGO về Mức độ hài lòng của nhân viên năm 2023 & Kế hoạch tìm việc năm 2024 được khảo sát sau Tết Nguyên Đán cũng cho thấy: Trong số 700 câu trả lời nhận được từ người lao động, mức lương và các khoản thưởng là điều người lao động quan tâm nhất khi tìm kiếm việc làm với 334 lượt bình chọn chiếm 55,7%.

// Đứng thứ 2 với cơ hội phát triển và học tập cũng là một trong số mối quan tâm hàng đầu của ứng viên với 320 bình chọn (chiếm 53,3%). Ngoài ra, các phúc lợi khác như đảm bảo công việc dài hạn, có thể gắn bó và làm việc lâu dài với công ty; lương tháng 13, teambuilding, sinh nhật; địa điểm làm việc; môi trường làm việc; thương hiệu công ty;... cũng là một trong số những mối quan tâm hàng đầu của ứng viên.


// Mối quan tâm của người lao động khi tìm kiếm việc làm năm 2024 - Nguồn: Bảng Khảo sát mức độ hài lòng của nhân viên năm 2023 & Kế hoạch tìm việc năm 2024 của JobsGO
// Mức lương và các khoản thưởng cao là ưu tiên hàng đầu

// Mức lương và các khoản thưởng cao khi tìm kiếm việc làm là điều dễ hiểu. Khi mức lương cao và các khoản thưởng hấp dẫn có thể cung cấp cho họ một cuộc sống thoải mái hơn và cơ hội tiết kiệm hoặc đầu tư cho tương lai.

// Thông qua mức lương và các khoản thưởng, người lao động như được công nhận giá trị lao động của họ từ phía doanh nghiệp, tạo động lực và cam kết trong công việc. Đối với một số người, mức lương và các khoản thưởng cũng là yếu tố quan trọng đánh giá sự thành công và tiến bộ trong sự nghiệp của họ. Do đó, không ngạc nhiên khi người lao động đặt sự ưu tiên cao độ về mức lương và các khoản thưởng khi lựa chọn công việc mới.

// Thông qua thống kê từ khảo sát của JobsGO cũng cho thấy IT, Marketing - Quảng cáo - PR, Bất động sản, Sản xuất - Vận hành (Nhân viên kỹ thuật, công nhân,...), Kinh doanh - Bán hàng, Giáo Dục - Đào tạo, Hành Chính - Nhân Sự, Khách sạn - Nhà hàng,... vẫn là các ngành nghề có mức lương thưởng tăng cao nhất trong năm 2023, tăng trưởng cao từ 51,72% - 68%.

// Trong đó, ngành IT - Tech vẫn là nhóm ngành có mức lương tăng trưởng cao nhất. Ngược lại, nhóm ngành Xây dựng và Du lịch là hai nhóm ngành có tỷ lệ giảm lương cao. Điều này cũng dễ hiểu bởi Sự biến động trong kinh tế toàn cầu có thể ảnh hưởng đến mức lương trong nhiều ngành, bao gồm cả xây dựng và du lịch. Nếu có sự suy thoái kinh tế hoặc không ổn định, các doanh nghiệp có thể phải cắt giảm chi phí, bao gồm cả chi phí nhân sự, để duy trì hoạt động.

// Cơ hội thăng tiến và phát triển là quan trọng
// Ngoài mức lương, cơ hội thăng tiến và phát triển cũng là một trong những yếu tố quan trọng mà ứng viên quan trọng khi tìm kiếm việc làm. Về cơ bản, thăng tiến chính là việc bạn làm ở trong công ty được đề bạt lên cấp bậc cao hơn.

// Cơ hội thăng tiến được coi là phần thưởng xứng đáng nhất cho những nỗ lực và sự tận tâm của bạn đối với doanh nghiệp. Không những mang lại nhiều lợi ích hấp dẫn, thăng tiến còn đồng nghĩa với việc bạn đang đứng trước cơ hội để nâng cao kiến thức và kinh nghiệm của bản thân mình.

// Đảm bảo công việc dài hạn
// Ngược lại với suy nghĩ của nhiều người về xu hướng thường xuyên “nhảy việc” của người lao động hiện nay, đảm bảo công việc dài hạn là một trong số những yếu tố nhiều ứng viên quan tâm khi tìm kiếm việc làm. Theo Khảo sát của JobsGO về “Thời gian trung bình anh/chị làm việc tại một công ty”, thời gian làm việc trên 3 năm và trên 5 năm chiếm tỷ lệ cao. Với nhóm ngành Du lịch, Giáo Dục - Đào tạo, Bất Động Sản và Xây dựng có thời gian gắn bó công việc chiếm tỷ lệ cao từ 53,85% - 84%.

// `
// extractTagsFromPost(text)
//   .then((tags) => {
//     console.log("--------------------------------")
//     console.log(tags)
//     console.log("--------------------------------")
//   })
//   .catch((error) => {
//     console.error(error)
//   })
