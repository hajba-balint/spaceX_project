import AxiosFunctions from "../AxiosFunctions.js";


export default class Launches{

    constructor(){
        this.TableLoader();
    }

    RocketIdConverter(RocketData,Id){
        let RNAME = "";
        RocketData.forEach(R => {
            if (R.id == Id) {
                RNAME = R.name;
                
            }
        });
        return RNAME;
    }

    CrewIdConverter(CrewData,Id){
        let CNAME = "";
        CrewData.forEach(C => {
            if (C.id == Id) {
                CNAME += C.name;
                
            }
        });
        return CNAME;
    }

    CapsuleIdConverter(CapsuleData,Id){
        let CNAME = "";
        CapsuleData.forEach(C => {
            if (C.id == Id) {
                CNAME += C.type;
                
            }
        });
        return CNAME;
    }

    PayloadIdConverter(PayloadData,Id){
        let CNAME = "";
        PayloadData.forEach(C => {
            if (C.id == Id) {
                CNAME += C.name;
            }
        });
        return CNAME;
    }

    TableLoader = async () => {
        const RocketData = await AxiosFunctions.GetAllRockets();
        const CrewData = await AxiosFunctions.GetAllCrew();
        const CapsuleData = await AxiosFunctions.GetAllCapsules();
        const PayloadData = await AxiosFunctions.GetAllPayloads();
        const Table = document.querySelector("#TableTbody");
        const data = await AxiosFunctions.GetAllData();
        data.forEach(d => {
            let RocketName = this.RocketIdConverter(RocketData,d.rocket);
            let CrewString = "";
            d.crew.forEach(dc => {
                CrewString += `${this.CrewIdConverter(CrewData,dc)} <br>`;
            });
            if (d.crew.length == 0) {
                CrewString = "Unmanned Mission";
            }

            let CapsuleString = "";
            d.capsules.forEach(dc => {
                CapsuleString += `${this.CapsuleIdConverter(CapsuleData,dc)} <br>`;
            })
            if (d.capsules.length == 0) {
                CapsuleString = "No Capsule";
            }

            let PayloadString = "";
            d.payloads.forEach(dp => {
                PayloadString += `${this.PayloadIdConverter(PayloadData,dp)} <br>`;
            })
            if (d.payloads.length == 0) {
                PayloadString = "No Payload";
            }
            Table.innerHTML += `
                <tr>
                    <td>${RocketName}</td>
                    <td>${CrewString}</td>
                    <td>${CapsuleString}</td>
                    <td>${PayloadString}</td>
                    <td>${d.date_local}</td>
                </tr>
            `
        });
    }
}



