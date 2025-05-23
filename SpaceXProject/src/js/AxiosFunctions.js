import axios from "axios";
import Rocket from "./Rocket";

const Axios = axios.create({
    baseURL: "https://api.spacexdata.com/v4/",
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
    },
    async GetAllRockets(){
        return Axios.get("/rockets")
            .then((res) => {
                return res.data;
            }).catch((err) => {
                console.log(err);
            });
    },
    async GetAllCrew(){
        return Axios.get("/crew")
            .then((res) => {
                return res.data;
            }).catch((err) => {
                console.log(err);
            });
    },
    async GetAllCapsules(){
        return Axios.get("/capsules")
            .then((res) => {
                return res.data;
            }).catch((err) => {
                console.log(err);
            });
    },
    async GetAllPayloads(){
        return Axios.get("/payloads")
            .then((res) => {
                return res.data;
            }).catch((err) => {
                console.log(err);
            });
    }
}
