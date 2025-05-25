import Launches from "./RoutingClasses/launches.js";

// Routing(needs to be implemented for the navbar to work)
const ROUTINGTARGET = document.querySelector("#root");

const PAGESFOLDER = "/src/pages/"

const NavLinks = document.querySelectorAll("a[data-href]");

const RoutingTable = {
    "/" : {page: "home.html", code: null},
    "/launches" : {page: "launches.html", code: Launches},
    "/about" : {page: "about.html", code: null},
}

const LoadPage = async (page) => {
    const resp = await fetch(PAGESFOLDER+page);
    const convresp = await resp.text();
    return convresp;
}

const NavClickEvent = async (event) => {
    event.preventDefault();
    let page = event.target.dataset.href;
    let data = await LoadPage(RoutingTable[page].page);
    ROUTINGTARGET.innerHTML = data;
    DynCode(RoutingTable[page].code)
    window.history.pushState({},"",page)
}

const DynCode = (code) => {
    if (code != null) {
        let DynamicCode = eval(code);
        new DynamicCode();
    }
}

window.addEventListener("popstate", async () => {
    const data = await LoadPage(RoutingTable[window.location.pathname].page);
    ROUTINGTARGET.innerHTML = data;
    DynCode(RoutingTable[window.location.pathname].code);
})

window.addEventListener("load", async () => {
    const data = await LoadPage(RoutingTable[window.location.pathname].page);
    ROUTINGTARGET.innerHTML = data;
    DynCode(RoutingTable[window.location.pathname].code);

})

NavLinks.forEach(NavI => {
    NavI.addEventListener("click", NavClickEvent)
})


// END ROUTING

// scroll to the top
var top = document.querySelector("#top");
var button = document.querySelector("#topButton");

button.addEventListener("click", () => {
    top.scrollIntoView();
})
