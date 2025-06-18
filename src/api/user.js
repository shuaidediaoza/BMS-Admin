import service from "./index"

//按需导出
// export function login(data){
//   return service({
//     url:"",
//     method:"post",
//     daat:data
//   })
// }
export const register = (data) => {
  return service.post('/user/register', data);
};

export const login = (credentials) => {
  return service.post('/user/login', credentials);
};