  import { Admin, Resource, TopToolbar, SearchInput} from "react-admin";
  import { fetchUtils, DataProvider } from "react-admin";
  import { CVList } from "./CVList";
  import { CVEdit } from "./CVEdit";

  import { PostList } from "./PostList";
  import { PostEdit } from "./PostEdit";

  import { UserList } from "./UserList";
  import { UserEdit } from "./UserEdit";
  import { LINK_TO_SERVER } from "src/constants";

  const httpClient = (url: string, options: any = {}) => {
    try {
      const token = localStorage.getItem('access_token');
    
      if (!options.headers) {
        options.headers = new Headers({
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        });
      }
  
      return fetchUtils.fetchJson(url, options);
    } catch (error) {
      console.error('Error in httpClient:', error);
      throw error;
    }
  };

  const dataProvider: DataProvider = {
    async getList(resource, params) {
      const dot = resource + "s";

      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
    
      const url = `${LINK_TO_SERVER}/${resource}`;
    
      try {
        const { json } = await httpClient(url);
    
        // Kiểm tra xem response có dữ liệu hay không
        if (!json[dot] || json[dot].length === 0) {
          return {
            data: [],
            total: 0,
          };
        }
    
        // Sắp xếp dữ liệu ở phía client
        const sortedData = json[dot].sort((a : any, b : any) => {
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
          data: sortedData.slice(start, end).map((item : any) => ({ id: item._id, ...item })),
          total: sortedData.length,
        };
      } catch (error) {
        console.error('Error in getList:', error);
        window.location.href = '/401';
        throw error;
      }
    },
    
    async getOne(resource, params) {
      const url = `${LINK_TO_SERVER}/${resource}/${params.id}`;
    
      try {
        const { json } = await httpClient(url);
    
        if (!json) {
          return {
            data: null,
          };
        }
        return {
          data: { id: json._id, ...json },
          
        };
      } catch (error) {
        console.error('Error in getOne:', error);
        window.location.href = '/401';
        throw error;
      }
    },
    
      create: (resource, params) =>
        httpClient(`http://localhost:4000/${resource}`, {
          method: "POST",
          body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),
    
        update: (resource, params) =>
          httpClient(`${LINK_TO_SERVER}/${resource}/${params.id}`, {
            method: "PUT",
            body: JSON.stringify(params.data),
          })
          .then(({ json }) => {
            return { data: { ...json, id: params.id } };
          }),
    
      delete: (resource, params) =>
        httpClient(`${LINK_TO_SERVER}/${resource}/${params.id}`, {
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
          httpClient(`${LINK_TO_SERVER}/${resource}/${id}`, {
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
          edit={CVEdit}
          recordRepresentation="name" 
          

        />
        <Resource
          name="post"
          list={PostList}
          edit={PostEdit}
          recordRepresentation="title"
          
    
        />
        <Resource name="user" list={UserList} edit={UserEdit} />
        <Resource name="blacklist" list={UserList} edit={UserEdit} />
      </Admin>
  );

  export default AdminApp;