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
 *  GET /v1/rest/datastore/O-A0001-001
 *  自動氣象站-氣象觀測資料
 *  @returns {Promise}
 */
export function weatherCurrentRecord(params = {}) {
    return axios.get("/O-A0001-001", Params(params));
}

/**
 *  GET /v1/rest/datastore/O-A0002-001
 *  自動雨量站-雨量觀測資料
 *  @returns {Promise}
 */
export function rainCurrentRecord(params = {}) {
    return axios.get("/O-A0002-001", Params(params));
}
