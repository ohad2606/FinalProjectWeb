function signupBtn() {
    const name = document.querySelector("#name").value;
    const userName = document.querySelector("#userName").value;
    const password = document.querySelector("#password01").value;
    const pass02 = document.querySelector("#password02").value;
    if(name === "" || userName === "" || password === "") {
        alert("Please enter your details");
    }else if (password === pass02) {
        const user = JSON.parse(localStorage.getItem(userName));
        if(user) {
            if (userName === user.userName) {
                alert("User name is not valid");
                return;
            }
        } else {
            const user = {userName: userName, name: name, password: password};
            localStorage.setItem(userName, JSON.stringify(user));
            parent.document.getElementById("lblName").innerText = name;
            taskDone();
            setTimeout(goToTask, 1000);
        }
    }else {
        alert("The passwords not matched");
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

function cancel() {
    parent.document.getElementById("frame").src = "Signin.html";
}