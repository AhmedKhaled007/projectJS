var getfname = document.getElementById("fname");
var getlname = document.getElementById("lname");
var getusername = document.getElementById("username");
var getpassword = document.getElementById("pass");
var getage = document.getElementById("age");
var getbtn = document.getElementById("btnadd");
var getGender = document.querySelector("input[name='gender']:checked").value;

function students(name, pw, username, gender) {
    this.name = name
    this.pw = pw
    this.username = username
    this.gender = gender
        // this.city = city
        // this.address = address
}

localStorage.removeItem("lastname");

document.getElementById("register").onclick = function() {
    saveReg()


}


function saveReg() {
    if (localStorage.students1) {
        var arrStudent = JSON.parse(localStorage.students1)
    } else {
        var arrStudent = []
    }
    var count = arrStudent.length;
    console.log(arrStudent)

    for (var i = 0; i < count; i++) {

        if (arrStudent[i].username == getusername.value) {
            console.log("user name already exists")
            return false
        }
    }
    var student = new students(getfname.value + " " + getlname.value, getpassword.value, getusername.value, getGender)
    arrStudent[count] = student
    localStorage.students1 = JSON.stringify(arrStudent);
}








user_obj = new Object;
getfname.onblur = Validitefname;
getlname.onblur = Validitelname;
getpassword.onblur = Validitepass;
getage.onblur = Validiteage;
getusername.onblur = Validiteusername;

function Validitefname() {

    if (getfname.value.length < 5 & isNaN(getfname.value)) {
        document.getElementById("errorfname").innerText = "Name must be more than five character"
    }
}

function Validitelname() {

    if (getlname.value.length < 5 & isNaN(getlname.value)) {
        document.getElementById("errorlname").innerText = "Name must be more than five character"
    }
}

function Validiteusername() {

    if (getlname.value.length < 5 & isNaN(getlname.value)) {
        document.getElementById("errorusername").innerText = "Name must be more than five character"
    }
}

function Validitepass() {
    if (getpassword.value.length < 8) {
        document.getElementById("errorpass").innerText = "password must be more than eight character"
    }
}

function Validiteage() {
    if (getage.value < 18 || getage.value > 30) {
        document.getElementById("errorage").innerText = "age must be between 18 and 30"
    }

}
// function addcheckbtn(){
//     if(getfname.value.length>5&&getlname.value.length>5&&getpassword.value.length>8&&(getage.value>18||getage.value<30)){

//             user_obj.firstname=getfname.value
//             user_obj.lastname=getlname.value
//             user_obj.password=getpassword.value
//             user_obj.password=getage.value
//             user_obj.username=getusername.value

//         }
//     }