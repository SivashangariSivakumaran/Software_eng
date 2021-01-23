import { getRequest, postRequest, putRequest, deleteRequest} from "./utils";

const BASE_URL = "/admin/users";

export const getAllUsers = () => getRequest(`${BASE_URL}`);

export const deleteUsers = (id) => deleteRequest(`${BASE_URL}/${id}`);

export const updateUsers = (id,data) => putRequest(`${BASE_URL}/${id}`,data);

export const saveUsers = (data) => postRequest(`${BASE_URL}`,data);

export const getUser = (id) => getRequest(`${BASE_URL}/${id}`);