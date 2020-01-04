// function loadJSON() {

//     var xobj = new XMLHttpRequest();
//     xobj.overrideMimeType("application/json");
//     xobj.open('GET', 'C:\Users\Ahmed\Desktop\Workplaces\Big Project\data.json', true); // Replace 'my_data' with the path to your file
//     xobj.onreadystatechange = function() {
//         if (xobj.readyState == 4) {
//             // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//             var x = xobj.responseText;
//             console.log(x)
//         }
//     };
//     xobj.send(null);
// }

// function init() {
//     loadJSON(function(response) {
//         // Parse JSON string into object
//         var actual_JSON = JSON.parse(response);
//         console.log(actual_JSON)
//     });
// }
// loadJSON()


var rndQA = "";
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var dataJ = this.responseText;
        var dataObject = JSON.parse(dataJ)
        rndQA = dataObject.results
        randomArray(rndQA)

    }
};
document.getElementById("start").onclick = function() {
    if (rndQA != "") {
        hide();
        time();
        makeQuestion(rndQA)
        document.getElementById("sub").onclick = function() {
            document.getElementById('exam').style.display = 'none';
            document.getElementById('time').style.display = 'none'
            checkAnswer(rndQA)
        }
    } else {
        alert("please try again later")
    }
}

xhttp.open("GET", "https://opentdb.com/api.php?amount=40&category=18&type=multiple", true);
xhttp.send();

// var data1 = JSON.parse('{ "response_code": 0, "results": [{ "category": "Science: Computers", "type": "multiple", "difficulty": "medium", "question": "All of the following programs are classified as raster graphics editors EXCEPT:", "correct_answer": "Inkscape", "incorrect_answers": ["Paint.NET", "GIMP", "Adobe Photoshop"] }, { "category": "Science: Computers", "type": "multiple", "difficulty": "medium", "question": "Nvidia&#039;s headquarters are based in which Silicon Valley city?", "correct_answer": "Santa Clara", "incorrect_answers": ["Palo Alto", "Cupertino", "Mountain View"] }, { "category": "Science: Computers", "type": "multiple", "difficulty": "medium", "question": "What did the name of the Tor Anonymity Network orignially stand for?", "correct_answer": "The Onion Router", "incorrect_answers": ["The Only Router", "The Orange Router", "The Ominous Router"] }, { "category": "Science: Computers", "type": "multiple", "difficulty": "medium", "question": "What was the first commerically available computer processor?", "correct_answer": "Intel 4004", "incorrect_answers": ["Intel 486SX", "TMS 1000", "AMD AM386"] }, { "category": "Science: Computers", "type": "multiple", "difficulty": "medium", "question": "Which of these is the name for the failed key escrow device introduced by the National Security Agency in 1993?", "correct_answer": "Clipper Chip", "incorrect_answers": ["Enigma Machine", "Skipjack", "Nautilus"] }, { "category": "Science: Computers", "type": "multiple", "difficulty": "medium", "question": "How many cores does the Intel i7-6950X have?", "correct_answer": "10", "incorrect_answers": ["12", "8", "4"] }, { "category": "Science: Computers", "type": "multiple", "difficulty": "medium", "question": "What is the correct term for the metal object in between the CPU and the CPU fan within a computer system?", "correct_answer": "Heat Sink", "incorrect_answers": ["CPU Vent", "Temperature Decipator", "Heat Vent"] }, { "category": "Science: Computers", "type": "multiple", "difficulty": "medium", "question": "What does the term GPU stand for?", "correct_answer": "Graphics Processing Unit", "incorrect_answers": ["Gaming Processor Unit", "Graphite Producing Unit", "Graphical Proprietary Unit"] }, { "category": "Science: Computers", "type": "multiple", "difficulty": "medium", "question": "What was the first Android version specifically optimized for tablets?", "correct_answer": "Honeycomb", "incorrect_answers": ["Eclair", "Froyo", "Marshmellow"] }, { "category": "Science: Computers", "type": "multiple", "difficulty": "medium", "question": "When did the online streaming service &quot;Mixer&quot; launch?", "correct_answer": "2016", "incorrect_answers": ["2013", "2009", "2011"] }] }')
// var data1 = JSON.parse(dataJ)
// var rndQA = data1.results

// randomArray(rndQA)       بببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببببلئ
// document.getElementById("sub").addEventListener("click", function() {
//     checkAnswer()
// })



function makeQuestion(rndQA) {
    for (let i = 0; i < 10; i++) {
        // create div for question
        var qst = document.createElement("div");
        qst.className = "question";
        // insert question in praghaph
        var p = document.createElement("p");
        p.className = "qst-text";
        p.innerHTML = i + 1 + ".  " + rndQA[i].question;
        qst.appendChild(p);


        var points = document.createElement("span");
        if (rndQA[i].difficulty == "easy") {
            points.innerHTML = "1 point"
        } else if (rndQA[i].difficulty == "medium") {
            points.innerHTML = " 2 point"
        } else if (rndQA[i].difficulty == "hard") {
            points.innerHTML = " 5 point"
        }
        qst.appendChild(points)
            // insert answers in random order
        list = document.createElement("ul");
        var rndAnswer = rndQA[i].incorrect_answers;
        rndAnswer.push(rndQA[i].correct_answer);
        // console.log(rndAnswer)
        randomArray(rndAnswer);
        rndAnswer.forEach(element => {
            list.innerHTML += "<li><input type='radio' name='qst" + (i + 1) + "' value='" + element + "'>" + element + "</li>";
        });
        // append question and answer
        qst.appendChild(list);
        document.getElementById("exam").appendChild(qst);
    }
    var btn = document.createElement("div")
    btn.innerHTML = "<button type='button' id='sub'> Sumbit </button><button type='button' id='clr'> Clear </button>"
    btn.className = "btn"
    document.getElementById("exam").appendChild(btn)
    document.getElementById('clr').onclick = resetAnswer


}

function randomArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function checkAnswer(rndQA) {
    var score = 0
    var total = 0

    for (let i = 0; i < 10; i++) {
        if (rndQA[i].difficulty == "easy") {
            total += 1
        } else if (rndQA[i].difficulty == "medium") {
            total += 2
        } else if (rndQA[i].difficulty == "hard") {
            total += 5
        }
        var val = ""
        var radio = document.querySelector("input[name='qst" + (i + 1) + "']:checked");
        if (radio) {
            val = radio.value
        }
        if (val == rndQA[i].correct_answer) {
            if (rndQA[i].difficulty == "easy") {
                score += 1
            } else if (rndQA[i].difficulty == "medium") {
                score += 2
            } else if (rndQA[i].difficulty == "hard") {
                score += 5
            }
        }
    }
    return (score)
}

function time() {
    var m = 04
    var s = 59
    document.getElementById('timer').innerHTML = m + ":" + s;
    startTimer(m, s);
}

function startTimer(m, s) {
    s -= 1;
    if (s < 0) {
        m -= 1;
        s = 59;
    }
    if (s < 10) {
        s = "0" + s
    }
    if (m >= 0) {
        document.getElementById('timer').innerHTML = m + " : " + s;
        setTimeout(function() { startTimer(m, s) }, 10);
    } else {
        var score = checkAnswer(rndQA)
        localStorage.setItem("score", score);

    }
}

function hide() {
    var main = document.getElementsByClassName("main")[0]
    main.parentElement.removeChild(main)
}

// function checkLogin(){

// }

function resetAnswer() {
    for (var i = 0; i < 10; i++) {
        var ele = document.getElementsByName("qst" + (i + 1));
        for (var j = 0; j < 4; j++)
            ele[j].checked = false;
    }
}