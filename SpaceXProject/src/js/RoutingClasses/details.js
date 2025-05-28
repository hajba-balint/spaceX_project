import AxiosFunctions from "../AxiosFunctions.js";

export default class Details{
    constructor() {
        this.HideTopButton();
        this.FillSelects();
        this.DataTarget = document.querySelector("#DataTarget");
        document.querySelector("#CrewSelect").addEventListener("change", async (event) => {
            if (event.target.value == "null") {
                this.NullOptionHandler();
                return;
            }
            document.querySelector("#CapsuleSelect").style.visibility = "hidden";
            document.querySelector("#PayloadSelect").style.visibility = "hidden";
            const SelectedIdData = await AxiosFunctions.GetAllDataByID("/crew",event.target.value)
            this.DataTarget.innerHTML = `
            <div class='col-lg-3 col-md-6 col-sm-12 m-auto'>
                <div class='card'>
                    <img src='${SelectedIdData.image}' alt='...' max-width='400px'>
                    <div class='card-body'>
                        <h3 class='text-center mb-3'>${SelectedIdData.name}</h3>
                        <p>Employed by: <b>${SelectedIdData.agency}</b></p>
                        <p>Current Status: <b>${SelectedIdData.status}</b></p>
                    </div>
                </div>
            </div>
            `;
        });
        document.querySelector("#CapsuleSelect").addEventListener("change", async (event) => {
            if (event.target.value == "null") {
                this.NullOptionHandler()
                return;
            }
            document.querySelector("#CrewSelect").style.visibility = "hidden";
            document.querySelector("#PayloadSelect").style.visibility = "hidden";
            const SelectedIdData = await AxiosFunctions.GetAllDataByID("/capsules",event.target.value)
            this.DataTarget.innerHTML = `
            <div class='col-lg-3 col-md-6 col-sm-12 m-auto'>
                <div class='card'>
                    <div class='card-body'>
                        <h1>${SelectedIdData.type}(<b>${SelectedIdData.serial}</b>)</h1>
                        <p><b>Status: </b>${SelectedIdData.status}</p>
                        <p><b>Last Update: </b>${ SelectedIdData.last_update != null ? SelectedIdData.last_update : "No Information available"}</p>
                    </div>
                </div>
            </div>
            `;
        });
        document.querySelector("#PayloadSelect").addEventListener("change", async (event) => {
            if (event.target.value == "null") {
                this.NullOptionHandler();
                return;
            }
            document.querySelector("#CapsuleSelect").style.visibility = "hidden";
            document.querySelector("#CrewSelect").style.visibility = "hidden";
            const SelectedIdData = await AxiosFunctions.GetAllDataByID("/payloads",event.target.value)
            let ManufacturerConcat = SelectedIdData.manufacturers.join(", ");
            let CustomerConcat = SelectedIdData.customers.join(", ");
            this.DataTarget.innerHTML = `
            <div class='col-lg-3 col-md-6 col-sm-12 m-auto'>
                <div class='card'>
                    <div class='card-body'>
                        <h1>${SelectedIdData.name}</h1>
                        <p><b>Type:</b> ${SelectedIdData.type}</p>
                        <p><b>Manufacturer(s): </b>${ManufacturerConcat}</p>
                        <p><b>Customer(s): </b>${CustomerConcat}</p>
                    </div>
                </div>
            </div>
            `; 
        });
    }

    FillSelects = async () => {
        const CrewData = await AxiosFunctions.GetAllCrew();
        const CapsuleData = await AxiosFunctions.GetAllCapsules();
        const PayloadData = await AxiosFunctions.GetAllPayloads();
        const CrewSel = document.querySelector("#CrewSelect");
        const PayloadSel = document.querySelector("#PayloadSelect");
        const CapsuleSel = document.querySelector("#CapsuleSelect");
        CrewData.forEach(Crew => {
            let opt = document.createElement("option");
            opt.value = Crew.id;
            opt.innerHTML = Crew.name;
            CrewSel.appendChild(opt);
        });
        CapsuleData.forEach(Capsule => {
            let opt = document.createElement("option");
            opt.value = Capsule.id;
            opt.innerHTML = `${Capsule.type}(<b>${Capsule.serial}</b>)`;
            CapsuleSel.appendChild(opt);
        });
        PayloadData.forEach(Payload => {
            let opt = document.createElement("option");
            opt.value = Payload.id;
            opt.innerHTML = Payload.name;
            PayloadSel.appendChild(opt);
        });
    }

    VisReset()
    {
        document.querySelector("#CapsuleSelect").style.visibility = "visible";
        document.querySelector("#PayloadSelect").style.visibility = "visible";
        document.querySelector("#CrewSelect").style.visibility = "visible";
    }

    NullOptionHandler(){
        this.DataTarget.innerHTML = "";
        this.VisReset();
    }

    HideTopButton(){
        document.querySelector("#topButton").style.display = "none";
    }


}
