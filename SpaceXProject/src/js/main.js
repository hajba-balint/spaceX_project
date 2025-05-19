import Rocket from "./Rocket.js";
import AxiosFunctions from "./AxiosFunctions.js";

const Table = document.querySelector("#TableTbody");

const TableLoader = async () => {
    const data = await AxiosFunctions.GetAllData();
    data.forEach(d => {
        let CrewString = "";
        d.crew.forEach(dc => {
            CrewString += `${dc.role} <br>`;
        });
        console.log(d.crew);
        if (d.crew.length == 0) {
            CrewString = "Unmanned Mission";
        }

        let CapsuleString = "";
        d.capsules.forEach(dc => {
            CapsuleString += `${dc} `;
        })
        if (d.capsules.length == 0) {
            CapsuleString = "No Capsule";
        }

        let PayloadString = "";
        d.payloads.forEach(dp => {
            PayloadString += `${dp} `;
        })
        if (d.payloads.length == 0) {
            PayloadString = "No Payload";
        }
        Table.innerHTML += `
            <tr>
                <td>${d.rocket}</td>
                <td>${CrewString}</td>
                <td>${CapsuleString}</td>
                <td>${PayloadString}</td>
                <td>${d.date_local}</td>
            </tr>
        `
    });
}

TableLoader();