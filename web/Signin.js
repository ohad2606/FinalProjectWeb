let userNm= document.cookie.replace(/(?:(?:^|.*;\s*)userName\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let usrPass= document.cookie.replace(/(?:(?:^|.*;\s*)pass\s*\=\s*([^;]*).*$)|^.*$/, "$1");

if(userNm !== ""){
    parent.document.getElementById("frame").src = "Tasks.html";
    parent.document.getElementById("lblName").innerText = userNm;
}

function signinBtn() {
    userNm = document.getElementById("userName").value;
    usrPass = document.getElementById("password").value;
    const user = JSON.parse(localStorage.getItem(userNm));
    if (user) {
        if (usrPass === user.password) {
            parent.document.getElementById("lblName").innerText = userNm;
            console.log("signin");
            taskDone();
            let chk = $("#chkRemember").is(":checked");
            if(chk === true){
                document.cookie = "userName="+userNm;
                document.cookie = "pass="+usrPass;
            }
            setTimeout(goToTask, 1000);
        } else {
            alert("Password not matched")
        }
    } else {
        alert("No user");
    }
}

function goToTask() {
    parent.document.getElementById("frame").src = "Tasks.html";
    parent.document.getElementById("done").style.visibility = "hidden";
}

function taskDone() {
    parent.document.getElementById("done").style.visibility = "visible";
    $("button").click(function () {
        $(".sa-success").addClass("hide");
        setTimeout(function () {
            $(".sa-success").removeClass("hide");
        }, 10);
    });
}
