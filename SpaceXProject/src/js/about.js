export default class About {
    constructor() {
        this.ReadMoreText()
    }

    ReadMoreText() {
        var readMore = document.querySelector("#readMore");
        var text = document.querySelector("#more");
        var visible = false;

        readMore.addEventListener("click", () => {
            if(visible == false){
                document.querySelector(".readMore").innerHTML = "Read less";
                text.style.display = "inline";
                visible = true;
            }
            else{
                document.querySelector(".readMore").innerHTML = "Read more";
                text.style.display = "none";
                visible = false;
            }

        })
    }
}
