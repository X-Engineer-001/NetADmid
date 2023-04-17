import api from "./axiosClient";
import lz from "lz-string";
export const user = {
    async getPosts() {
        const { data } = await api.get("/users/view");
        return data;
    },
    async createOne(inputs) {
        const { data } = await api.post("/users/register",{name:inputs.username,pass:inputs.password,img:inputs.image});
        return data;
    },
    async login(inputs) {
        const { data } = await api.post("/users/login",{name:inputs.username,pass:inputs.password});
        return data;
    },
    async post(input,logins) {
        const { data } = await api.post("/users/post",{text:input,name:logins.username,pass:logins.password});
        return data;
    },
    async delPost(target,logins) {
        const { data } = await api.post("/users/delPost",{id:target,name:logins.username,pass:logins.password});
        return data;
    },
    async getAvatar(input) {
        const { data } = await api.post("/users/avatar",{text:input});
        return data.img;
    },
};