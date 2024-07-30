import type { User, Depart } from "../model";
import axios from "axios";

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('/api/users');
  return data;
};

const fetchProfile = async (): Promise<{ role: string }> => {
  const { data } = await axios.get('/api/profile');
  return data;
};

const fetchDeparts = async (): Promise<Depart[]> => {
  const { data } = await axios.get('/api/departs');
  return data;
};

type CountUsersParams = {
  startDate?: string | null,
  endDate?: string | null
}

const fetchCountUsers = async (params?: CountUsersParams): Promise<number> => {
  const { data } = await axios.get(`/api/user/counts`, {params: {...params}});
  return data;
};

const loginUser = async ({username, password}: {username: string, password: string}) => {
  await axios.post('/api/login', {username, password});
}

export { fetchUsers, fetchProfile, fetchDeparts, loginUser, fetchCountUsers }