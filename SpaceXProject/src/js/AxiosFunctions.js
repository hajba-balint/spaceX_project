import axios from "axios";

const Axios = axios.create({
    baseURL: "https://api.spacexdata.com/v5/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default{
    async GetAllData(){
        return axios.get("/launches")
            .then((res) => {
                let formatteddata = {}
                formatteddata.rocket
            })
    }
}