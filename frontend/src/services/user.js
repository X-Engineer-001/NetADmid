import api from "./axiosClient";
export const user = {
    async getAll() {
        const { data } = await api.get("/users");
        return data;
    },
    async createOne(username) {
        const { data } = await api.post("/users",{name:username});
        return data;
    },
};