function fax(truFal)
{
    //starts preformanse monitor
    var t0 = performance.now();
    //gets data from local storage
    const qn = localStorage.getItem('TheQN');
    var prog = (JSON.parse(localStorage.getItem('progres')));
    console.log(prog)
    //parces the json string (from practice.js)
    var qnn = (JSON.parse(qn))
    //checks if the awnser was correct or not
    if (truFal == qnn.trufal){
        //console.log ("correct")
        var classTruFal = ("trufax")
        var faltru = ("Riktig!")
        var cor = ("1")
        prog.cor = prog.cor + 1
    }
    else {
        //console.log("wrong")
        var classTruFal = ("falfax")
        var faltru = ("Feil")
        var cor = ("0")
        prog.wro = prog.wro + 1
    }
    localStorage.setItem('progres', JSON.stringify(prog));
    if (qnn.trufal == "1"){
        var wastrufal = ("sant")
    }
    else {
        var wastrufal = ("usant")
    }
    if (truFal == 1) {
        var usrAwns = "sant"
    }
    else {
        var usrAwns = "usant"
    }
    //stores evrythin for practiceSum()
    var sumStore = JSON.parse(localStorage.getItem('SumStore'));
    sumStore.push({"cor":cor, "qn":qnn.qn, "wastrufal":wastrufal, "usrAwns":usrAwns, "qnid":qnn.qnID})
    localStorage.setItem('SumStore', JSON.stringify(sumStore));

    var Temp = '<div class="top3">'
        Temp += '<div class="imgbox"><div class="img2" style="background-image: url(' + qnn.img + ');"><div class="imgsrc">Kjilde: ' + qnn.srcimg + '</div></div></div>'
        Temp += '<div class="fax"><div class="' + classTruFal + '">' + faltru + '</div><div class="text">' + qnn.fact + '</div></div>'
        Temp += '</div>'
        Temp += '<div class="low2">'
        //ser om det er noe data igjen
        const cont = localStorage.getItem('TheData');
        //console.log(cont);
        if (cont == 'undefined') {
            Temp += '<button class="btnnex" onClick="practiceSum()">ferdig</button>'
        }
        else if (cont == undefined) {
            Temp += '<button class="btnnex" onClick="practiceSum()">Ferdig</button>'
        }
        else if (cont == "[]") {
            Temp += '<button class="btnnex" onClick="practiceSum()">Ferdig</button>'
        }
        else {
            Temp += '<button class="btnnex" onClick="continuePracticeGame()">neste</button>'
        }
        Temp += '</div>'
    //stops preformanse timer
    var t1 = performance.now();
    //makes the bottem bar with preformanse and fact sorse
    Temp += '</div><!-- 1/2 1 = hovedside, katgori velging, spillsiden 2 = spørsmålet, sanheten --> <div class="bottom">fact sorse: ' + qnn.srcfact + ' ms page build: ' + (~~(t1 - t0)) + ' ms</div>';
    //inserts the html into the document
    document.getElementById("main").innerHTML = Temp;
    //removes TheQN from localstorage
    localStorage.removeItem('TheQN');
}