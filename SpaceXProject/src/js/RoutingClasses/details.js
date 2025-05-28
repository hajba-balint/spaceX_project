import AxiosFunctions from "../AxiosFunctions.js";

export default class Details{
    constructor() {
        this.FillSelects();
        this.DataTarget = document.querySelector("#DataTarget");
        document.querySelector("#CrewSelect").addEventListener("change", async (event) => {
            if (event.target.value == "null") {
                this.NullOptionHandler();
                return;
            }
            document.querySelector("#CapsuleSelect").disabled = true;
            document.querySelector("#lbCapsuleSelect").disabled = true;
            document.querySelector("#PayloadSelect").disabled = true;
            document.querySelector("#lbPayloadSelect").disabled = true;
            const SelectedIdData = await AxiosFunctions.GetAllDataByID("/crew",event.target.value)
            this.DataTarget.innerHTML = `
            <div class='col-lg-4 col-md-6 col-sm-12 m-auto'>
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
            document.querySelector("#CrewSelect").disabled = true;
            document.querySelector("#lbCrewSelect").disabled = true;
            document.querySelector("#PayloadSelect").disabled = true;
            document.querySelector("#lbPayloadSelect").disabled = true;
            const SelectedIdData = await AxiosFunctions.GetAllDataByID("/capsules",event.target.value)
            this.DataTarget.innerHTML = `
            <div class='col-lg-4 col-md-6 col-sm-12 m-auto'>
                <div class='card'>
                    <div class='card-body text-center'>
                        <h3>${SelectedIdData.type}(<b>${SelectedIdData.serial}</b>)</h3>
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
            document.querySelector("#CapsuleSelect").disabled = true;
            document.querySelector("#lbCapsuleSelect").disabled = true;
            document.querySelector("#CrewSelect").disabled = true;
            document.querySelector("#lbCrewSelect").disabled = true;
            const SelectedIdData = await AxiosFunctions.GetAllDataByID("/payloads",event.target.value)
            let ManufacturerConcat = SelectedIdData.manufacturers.join(", ");
            let CustomerConcat = SelectedIdData.customers.join(", ");
            this.DataTarget.innerHTML = `
            <div class='col-lg-4 col-md-6 col-sm-12 m-auto'>
                <div class='card'>
                    <div class='card-body'>
                        <h3 class='my-3 text-center'>${SelectedIdData.name}</h3>
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
        document.querySelector("#CapsuleSelect").disabled = false;
        document.querySelector("#lbCapsuleSelect").disabled = false;
        document.querySelector("#PayloadSelect").disabled = false;
        document.querySelector("#lbPayloadSelect").disabled = false;
        document.querySelector("#CrewSelect").disabled = false;
        document.querySelector("#lbCrewSelect").disabled = false;
    }

    NullOptionHandler(){
        this.DataTarget.innerHTML = "";
        this.VisReset();
    }
}
