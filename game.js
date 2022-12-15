function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

jQuery(function ($) {
    var fiveMinutes = 60 * 5,
        display = $('#timer');
    startTimer(fiveMinutes, display);
})

var globs_number=getRandomInt(13);
var counter_value=0;
var points_ges=0;
function ggbOnInit() {
    app.setCoordSystem(-10,10,-10,10);
    app.setGridVisible(true);
    // generate random points        
    var min_pos = -5;
    var max_pos = 5;
    for (var i=0;i<globs_number;i++){
        var label = app.evalCommandGetLabels("A_"+i+"=("+getRandomInt(min_pos,max_pos)+","+getRandomInt(min_pos,max_pos)+")");
        app.setLabelVisible(label,false);
    }
}

function checkInput(strInput) {
    // check if input is valid
    if (strInput.includes("x")){
        var division = "d=Division("+strInput+",x^3)";
        console.log(app.evalCommand(division));
        app.setVisible("d",false);
        console.log(app.evalCommand("dd=d(1)"));
        app.setVisible("dd",false);
        var check = app.getValueString("dd").replace( /^\D+/g, '');
        if (check == '' || check >=1) {
            console.log("Falsche Eingabe.");
            return false;
        } else {
            console.log("Passt.");
            return true;
        }
    } else {
        return true;
    }
}

function evalInput(strInput) {
    // execute function if valid and update counter
    if (checkInput(strInput)==true){
        var counter = document.getElementById("counter");
        counter_value = counter.innerHTML;
        app.evalCommand("f_"+counter_value+"(x)="+strInput);
        var counter_int_value = parseInt(counter.innerHTML);
        counter.innerHTML=counter_int_value+1;
        delete_globs(counter_int_value);
    }
    return false;
}

<!--function update_counter() {-->
    <!--// update counter by checking field value-->
    <!--var counter= document.getElementById("counter");-->
    <!--var counter_value = parseInt(counter.innerHTML);-->
    <!--counter.innerHTML=counter_value+1;-->
    <!--}-->

function delete_globs(function_number){
    var hit_counter = -1;
    for (var i=0;i<globs_number;i++){
        var distance = app.getValue("Distance(f_"+function_number+",A_"+i+")");
        if(distance==0){
            hit_counter+=1;
            app.setVisible("A_"+i,false);
        }
    }
    if (hit_counter>=0){
        points_ges+=2**hit_counter;
    }
    var points_element = document.getElementById("points");
    points_element.innerHTML=points_ges;
} 

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

