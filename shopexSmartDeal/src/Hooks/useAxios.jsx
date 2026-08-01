import axios from "axios";

const axiosInstance =axios.create({
    baseURL: 'https://shopex-smart-deal-server.vercel.app'
})
const useAxios = () => {
    return  axiosInstance;
};

export default useAxios;