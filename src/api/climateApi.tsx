import axios from "axios";

const climateApi = axios.create({
    baseURL: "https://api.thingspeak.com/channels/1557662/feeds.json?",
    params: {
        api_key: "97BYYUFW3V2UORV0",
        results: 1
    }
});

export default climateApi;