let button = document.querySelectorAll(".btn");
let msg = document.getElementById("msg");
const arr = ["red","yellow","green","blue"];
let gameP = [] ;
let userP = [] ;
let level = 1 ;
let idx = 0 ;
let isStart = false ;
document.addEventListener("keypress",()=>{
    start();
})
document.querySelector(".rst").addEventListener("click",()=>{
    document.querySelector("h1").innerText = "Press Any Key To Continue";
    isStart = false ;

})
function start(){
    if(!isStart){
        gameP = [];
        level = 1;
        gameSelect();
        isStart = true ;
    }
}
function selected(variable){
    document.querySelector("#"+variable).classList.add("pressed");
    let audio = new Audio(`/sounds/${variable}.mp3`)
    audio.play();
    setTimeout(()=>{
        document.querySelector("#"+variable).classList.remove("pressed");
    },200)
}
function check(i){
    console.log(userP + " "+gameP+" " +i);
    if(gameP[i] !== userP[i]){
        document.querySelector("#outer").classList.add("press");
    let audio = new Audio(`/sounds/wrong.mp3`)
    audio.play();
    document.querySelector("h1").innerText = "Wrong selection";
    setTimeout(()=>{
        document.querySelector("#outer").classList.remove("press");
        isStart = false ;
        setTimeout(()=>{
            document.querySelector("h1").innerText = "Press Any Key To Continue";
        },2000)
    },1000)
    level = 1 ;
    }
    else{
        if(gameP.length === userP.length){
            console.log("pattern ok");
            setTimeout(() => {
                gameSelect();
            }, 700);
        }
    }
    
}

let gameSelect = ()=>{
    console.log("gameselect");
    userP = [];
    idx = 0 ;
    document.querySelector(".rst > input").value = "RESET" ;
    document.querySelector("h1").innerText = "Level : "+level++ ;
    gv = arr[Math.floor(Math.random()*4)] ;
    selected(gv);
    gameP.push(gv);
    console.log("selected : " , gv, " " ,idx)
}

for(let b of button){
    b.addEventListener("click",()=>{
        if(isStart){
            let uv = b.getAttribute("id");
        selected(uv);
        userP.push(uv);
        check(userP.length-1);
        idx++;
        }
    })
}