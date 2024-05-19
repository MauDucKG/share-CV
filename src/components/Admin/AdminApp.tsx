import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import { fetchUtils, DataProvider } from "react-admin";
import { CVList } from "./CVList";
import { PostList } from "./PostList";
import { UserList } from "./UserList";


import { LINK_TO_SERVER } from "src/constants";

const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  // add your own headers here
  return fetchUtils.fetchJson(url, options);
};

const dataProvider: DataProvider = {
    getList: (resource, params) => {
        const dot = resource + "s";
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
      
        const url = `${LINK_TO_SERVER}/${resource}`;
        return httpClient(url).then(({ json }) => {
            // Sắp xếp dữ liệu ở phía client
            const sortedData = json[dot].sort((a: any, b: any) => {
            let fieldA = a[field];
            let fieldB = b[field];
        
            // Chuyển đổi giá trị sang chữ thường nếu là chuỗi
            if (typeof fieldA === 'string') {
                fieldA = fieldA.toLowerCase();
            }
            if (typeof fieldB === 'string') {
                fieldB = fieldB.toLowerCase();
            }
        
            if (fieldA < fieldB) return order === 'ASC' ? -1 : 1;
            if (fieldA > fieldB) return order === 'ASC' ? 1 : -1;
            
            return 0;
        });
        
        // Áp dụng phân trang
        const start = (page - 1) * perPage;
        const end = start + perPage;
        
        return {
            data: sortedData.slice(start, end).map((item: any) => ({ id: item._id, ...item })),
            total: sortedData.length,
        };
        });
    },
  
    getOne: (resource, params) =>
      httpClient(`http://localhost:4000/${resource}/${params.id}`).then(({ json }) => ({
        data: json,
      })),
  
    create: (resource, params) =>
      httpClient(`http://localhost:4000/${resource}`, {
        method: "POST",
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json })),
  
    update: (resource, params) =>
      httpClient(`http://localhost:4000/${resource}/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json })),
  
    delete: (resource, params) =>
      httpClient(`http://localhost:4000/${resource}/${params.id}`, {
        method: "DELETE",
      }).then(({ json }) => ({ data: json })),
  
    getMany: (resource, params) => {
      const { ids } = params;
      const url = `${LINK_TO_SERVER}/${resource}?${new URLSearchParams({ ids: ids.join(',') }).toString()}`;
      return httpClient(url).then(({ json }) => ({
        data: json[resource + 's'].map((item: any) => ({ id: item._id, ...item })),
      }));
    },
  
    getManyReference: (resource, params) => {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const { target, id } = params;
      const query = {
        sort: JSON.stringify([field, order]),
        filter: JSON.stringify({ [target]: id }),
      };
      const url = `${LINK_TO_SERVER}/${resource}?${new URLSearchParams(query).toString()}`;
      return httpClient(url).then(({ json }) => {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return {
          data: json[resource + 's'].slice(start, end).map((item: any) => ({ id: item._id, ...item })),
          total: json[resource + 's'].length,
        };
      });
    },
  
    updateMany: (resource, params) => {
      const { ids, data } = params;
      const promises = ids.map((id) =>
        httpClient(`http://localhost:4000/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        }).then(({ json }) => json)
      );
      return Promise.all(promises).then((data) => ({ data }));
    },
  
    deleteMany: (resource, params) => {
      const { ids } = params;
      const promises = ids.map((id) =>
        httpClient(`http://localhost:4000/${resource}/${id}`, {
          method: "DELETE",
        }).then(({ json }) => json)
      );
      return Promise.all(promises).then((data) => ({ data }));
    },
  };

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="cv"
      list={CVList}
      edit={CVList}
      recordRepresentation="name"
    />
    <Resource
      name="post"
      list={PostList}
      edit={PostList}
      recordRepresentation="title"
    />
    <Resource name="user" list={UserList} edit={UserList} />
    {/* <Resource name="blacklist" list={PostList} edit={PostList} /> */}
  </Admin>
);

export default AdminApp;