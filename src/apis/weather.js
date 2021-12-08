import Axios from "axios";

const axios = Axios.create({
    baseURL: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/",
});

const Authorization = "CWB-A00AAFC4-FFD9-4A03-A760-7F9336CE62FC";
const Params = (params = {}) => {
    return {
        params: {
            Authorization,
            ...params,
        },
    };
};

/**
 *  GET 自動氣象站資料-無人自動站氣象資料
 *  @returns {Promise}
 */
export function weatherCurrentRecord(params = {}) {
    return axios.get("/O-A0001-001", Params(params));
}
