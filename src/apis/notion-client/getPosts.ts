import axios from 'axios';
import { TPosts } from 'src/types';
import { LINK_TO_SERVER } from 'src/constants';


export const getPosts = async () => {
  try {
    const response = await axios.get(`${LINK_TO_SERVER}/cv`);
    const newData = response.data.cvs;
    console.log(newData)

    //######################################################
    const number = newData.length;
    let countBelow24Months = 0;
    let countAbove24Months = 0;
    
    newData.forEach((item : any) => {
      const experience = parseInt(item.experience);
      if (experience <= 24) {
        countBelow24Months++;
      } else {
        countAbove24Months++;
      }
    });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    let countNewApplicants = 0;
    newData.forEach((item : any) => {
      const createdTime = new Date(item.createdTime);
      createdTime.setHours(0, 0, 0, 0); 

      if (createdTime.getTime() === today.getTime()) {
        countNewApplicants++;
      }
    });



    //######################################################

    const data = [
    {
      _id: '545c8773-d1a6-459b-9a11-da2775a8410d',
      date: { start_date: '2022-06-09' },
      type: [ 'Post' ],
      slug: 'about',
      category: [ '😎 Daily' ],
      author: [ ],
      title: `- Nhu cầu tìm việc: ${number} ứng viên
      - Số lượng intern/fresher (dưới 2 năm kinh nghiệm): ${countBelow24Months} ứng viên 
      - Số lượng trên 2 năm kinh nghiệm: ${countAbove24Months} ứng viên
      - Số lượng CV mới hôm nay: ${countNewApplicants} CV
      `,
      status: [ 'PublicOnDetail' ],
      createdTime: 'Sat Sep 02 2023 07:57:04 GMT+0700 (Indochina Time)',
      fullWidth: false,
      experience: "3 tháng"
    }];
    
    const mergedData = [...data, ...newData];

    // Sort by date
    mergedData.sort((a: any, b: any) => {
      const dateA: any = new Date(a?.date?.start_date || a.createdTime);
      const dateB: any = new Date(b?.date?.start_date || b.createdTime);
      return dateB - dateA;
    });

    const posts = mergedData as TPosts;
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  
}
