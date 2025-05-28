import AxiosFunctions from "../AxiosFunctions.js";

export default class Quiz{
    constructor() {
        this.QuizUI = document.querySelector("#QuizUI");
        this.ScoreSumHTML = document.querySelector("#ScoreSum");
        this.ScoreSum = 0;
        this.ScoreCorrectHTML = document.querySelector("#ScoreCorrect");
        this.ScoreCorrect = 0;
        document.querySelectorAll(".btn").forEach(btn => {
            btn.addEventListener("click", () => {
                let btnNew = document.createElement("btn");
                btnNew.className = "btn btn-success";
                btnNew.innerHTML = "Check Answer!";
                btnNew.id = "CheckBtn";
                btnNew.addEventListener("click", () => {
                    document.querySelectorAll(".btn").forEach(btn2 => {
                        btn2.disabled = false;
                    });
                    this.QuizUI.removeChild(btnNew);
                });
                document.querySelectorAll(".btn").forEach(btn2 => {
                    btn2.disabled = true;
                })
                this.QuizHeadGenerator(Number(btn.value));
                this.QuizUI.appendChild(btnNew);
            });
        })
    }

    QuizHeadGenerator = async(ClickedBtnValue) => {
        const LaunchData = await AxiosFunctions.GetAllData();
        const CrewData = await AxiosFunctions.GetAllCrew();
        const CapsuleData = await AxiosFunctions.GetAllCapsules();
        const PayloadData = await AxiosFunctions.GetAllPayloads();
        const RocketData = await AxiosFunctions.GetAllRockets();
        if (ClickedBtnValue == 1) {
            let MaxNum = LaunchData.length - 1;
            let RandNum = Math.floor((Math.random()) * MaxNum) + 1
            let RandomData = LaunchData[RandNum];
            let QDiv = document.createElement("div");
            QDiv.classList.add("card")
            
            let CrewString = "";
            RandomData.crew.forEach(dc => {
                CrewString += `${this.CrewIdConverter(CrewData,dc)} <br>`;
            });
            if (RandomData.crew.length == 0) {
                CrewString = "Unmanned Mission";
            }
            let CapsuleString = "";
            RandomData.capsules.forEach(dc => {
                CapsuleString += `${this.CapsuleIdConverter(CapsuleData,dc)} <br>`;
            })
            if (RandomData.capsules.length == 0) {
                CapsuleString = "No Capsule";
            }

            let PayloadString = "";
            RandomData.payloads.forEach(dp => {
                PayloadString += `${this.PayloadIdConverter(PayloadData,dp)} <br>`;
            })
            if (RandomData.payloads.length == 0) {
                PayloadString = "No Payload";
            }
            
            QDiv.innerHTML = `
                <p>Rocket Name: <b>MISSING</b></p>
                <p>Crew: ${CrewString}</p>
                <p>Capsule: ${CapsuleString}</p>
                <p>Payload: ${PayloadString}</p>
                <p>Launch date: ${RandomData.date_local}</p>
                <form id="QForm">
                    <label for="Q" class="form-label">What is the name of the rocket</label>
                    <input type="text" class="form-control" id="QAnswer">
                </form>
            `;

            this.QuizUI.appendChild(QDiv);

            document.querySelector("#CheckBtn").addEventListener("click", () => {
                if(this.CheckAnswers(ClickedBtnValue, RocketData, RandomData.rocket) == true){
                    this.ScoreCorrect++;
                    this.ScoreCorrectHTML.innerHTML = this.ScoreCorrect;
                    this.ScoreSum++;
                    this.ScoreSumHTML.innerHTML = this.ScoreSum;
                }
                else{
                    this.ScoreSum++;
                    this.ScoreSumHTML.innerHTML = this.ScoreSum; 
                }
                this.QuizUI.removeChild(QDiv);
            })
        }
    }

    CheckAnswers(QType, RocketData = "", RocketID = ""){
        if (QType == 1) {
            let ConvRocketString = this.RocketIdConverter(RocketData,RocketID).toLowerCase();
            console.log(ConvRocketString);
            console.log((document.querySelector("#QAnswer").value).toLowerCase());
            if (((document.querySelector("#QAnswer").value).toLowerCase()) === ConvRocketString) {
                console.log((document.querySelector("#QAnswer").value).toLowerCase());
                console.log("PASs");
                return true;
            }
            return false;
        }
    }

    // launch converter functions

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

    // END

}
