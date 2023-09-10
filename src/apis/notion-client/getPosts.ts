import { TPosts } from "src/types"

/**
 * @param {{ includePages: boolean }} - false: posts only / true: include pages
 */

// TODO: react query를 사용해서 처음 불러온 뒤로는 해당데이터만 사용하도록 수정
export const getPosts = async () => {
    const data = [{
      id: '28154df8-48c9-4b7c-b572-7a677ebf463e',
      date: { start_date: '2023-07-23' },
      type: [ 'Post' ],
      slug: 'maket',
      category: [ 'Overview' ],
      tags: [ 'Capricorn' ],
      summary: 'Cung thứ 10 trong Hoàng Đạo được gọi là Ma Kết và thuộc nguyên tố Đất, được sao Thổ chiếu mạng. Vì vậy, cung Ma Kết có những đặc điểm đặc trưng riêng biệt mà không có trong bất kỳ cung Hoàng Đạo nào khác. Nếu bạn muốn tận dụng tối đa tiềm năng của mình trong cuộc sống và công việc, hãy khám phá những điều bí ẩn bên trong cung Ma Kết.',
      author: [ ],
      title: 'Cung Ma Kết',
      status: [ 'Public' ],
      createdTime: 'Sat Sep 02 2023 07:57:04 GMT+0700 (Indochina Time)',
      fullWidth: false,
      experience: "3 tháng"
    },
    {
      id: '545c8773-d1a6-459b-9a11-da2775a8410d',
      date: { start_date: '2022-06-09' },
      type: [ 'Post' ],
      slug: 'about',
      category: [ '😎 Daily' ],
      author: [ ],
      title: 'hello!',
      status: [ 'PublicOnDetail' ],
      createdTime: 'Sat Sep 02 2023 07:57:04 GMT+0700 (Indochina Time)',
      fullWidth: false,
      experience: "3 tháng"
    }]


    // Sort by date
    data.sort((a: any, b: any) => {
      const dateA: any = new Date(a?.date?.start_date || a.createdTime)
      const dateB: any = new Date(b?.date?.start_date || b.createdTime)
      return dateB - dateA
    })

    const posts = data as TPosts
    return posts
}