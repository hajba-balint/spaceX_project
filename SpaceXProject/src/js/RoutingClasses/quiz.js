import AxiosFunctions from "../AxiosFunctions.js";

export default class Quiz{
    constructor() {
        this.QuizUI = document.querySelector("#QuizUI");
        document.querySelectorAll(".btn").forEach(btn => {
            btn.addEventListener("click", () => {
                let btnNew = document.createElement("btn");
                btnNew.className = "btn btn-success";
                btnNew.innerHTML = "Check Answer!";
                btnNew.addEventListener("click", () => {
                    document.querySelectorAll(".btn").forEach(btn2 => {
                        btn2.style.visibility = "visible";
                    });
                    this.QuizUI.removeChild(btnNew);
                });
                document.querySelectorAll(".btn").forEach(btn2 => {
                    btn2.style.visibility = "hidden";
                })
                this.QuizHeadGenerator(Number(btn.value));
                this.QuizUI.appendChild(btnNew);
            });
        })
    }

    QuizHeadGenerator = async(ClickedBtnValue) => {
        if (ClickedBtnValue == 1) {
            const LaunchData = await AxiosFunctions.GetAllData();
            let MaxNum = LaunchData.length - 1;
            let RandNum = Math.floor((Math.random()) * MaxNum) + 1
            let RandomData = LaunchData[RandNum];
            console.log(RandomData);            
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