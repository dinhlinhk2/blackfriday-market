import axios from 'axios';

const baseURL = import.meta.env.VITE_URL_GHTK;

export const getAllProvince = async () => {
    try {
        const res = await axios.get(`${baseURL}/address/list`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getDistrictByProvinceId = async (provinceId) => {
    try {
        const res = await axios.get(`${baseURL}/address/list?parentId=${encodeURIComponent(provinceId)}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getWardsByDistrictId = async (districtId) => {
    try {
        const res = await axios.get(`${baseURL}/address/list?parentId=${encodeURIComponent(districtId)}&type=1`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
