import AxiosFunctions from "../AxiosFunctions.js";

export default class Details{
    constructor() {
        this.FillSelects();
        
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
        CapsuleData.forEach(Crew => {
            let opt = document.createElement("option");
            opt.value = Crew.id;
            opt.innerHTML = Crew.type;
            CapsuleSel.appendChild(opt);
        });
        PayloadData.forEach(Crew => {
            let opt = document.createElement("option");
            opt.value = Crew.id;
            opt.innerHTML = Crew.name;
            PayloadSel.appendChild(opt);
        });
    }
}