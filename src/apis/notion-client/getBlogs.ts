import axios from 'axios';
import { TPosts, TPost } from 'src/types';
import { LINK_TO_SERVER } from 'src/constants';


export const getBlogs = async () => {
  try {
    const response = await axios.get(`${LINK_TO_SERVER}/post`);

    const newData = response.data.posts

    const data = [
    {
      _id: '545c8773-d1a6-459b-9a11-da2775a8410d',
      date: { start_date: '2022-06-09' },
      type: [ 'Post' ],
      slug: 'about',
      category: [ '😎 Analysis' ],
      author: [ ],
      title: `Job Market Analysis`,
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

    const blogs = mergedData as TPosts;
    return blogs;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

}