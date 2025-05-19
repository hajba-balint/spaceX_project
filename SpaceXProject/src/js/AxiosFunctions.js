import axios from "axios";
import Rocket from "./Rocket";

const Axios = axios.create({
    baseURL: "https://api.spacexdata.com/v5/",
    headers: {
        "Content-Type": "application/json"
    }
})

export default{
    async GetAllData(){
        return Axios.get("/launches")
            .then((res) => {
                return res.data;
            }).catch((err) => {
                console.log(err);
            });
    }
}