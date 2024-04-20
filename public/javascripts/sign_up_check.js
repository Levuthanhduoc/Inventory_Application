
function main(){
    const pass = document.querySelector(".in-pass");
    const repass = document.querySelector(".in-repass");
    const name = document.querySelector(".in-name");
    const button = document.querySelector(".out-sign-up");
    const err = document.querySelector(".err-message");
    const form = document.querySelector(".sign-up-form");
    button.addEventListener("click",(e)=>{
        e.preventDefault();
        err.textContent = "";
        const match = pass.value.match(/^(?=.*[A-Za-z])(?=.*[\d])[A-Za-z\d]{8,}$/gm)
        console.log(match)
        if(name.value.length < 5){
            e.preventDefault();
            err.textContent += "Name had 5 character minimun";
            return;
        }else if(match === null){
            e.preventDefault();
            err.textContent += "Password had at least 1 letter, 1 number and 8 character minimum "
            return;
        }else if(pass.value !== repass.value){
            e.preventDefault();
            err.textContent += "Password didnt match"
            return;
        }
        form.submit();
    })
    
};
main();