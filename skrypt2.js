function filtrLiter(e) {
    'use strict';
    var key, znak, reg;

    if (window.event) {
        key = e.keyCode;
    } else if (e.which) {
        key = e.which;
    } else {
        return true;
    }
    znak = String.fromCharCode(key);
    reg = /^[a-zA-ZęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+$/g;
    return reg.test(znak);
}

function filtrCyfr(e) {
    'use strict';
    var key, znak, reg;

    if (window.event) {
        key = e.keyCode;
    } else if (e.which) {
        key = e.which;
    } else {
        return true;
    }
    znak = String.fromCharCode(key);
    reg = /^[0-9]+$/i;
    return reg.test(znak);
}

function sprawdzPESEL() {
    'use strict';
    
    var pesel = document.getElementById("formularzPESEL").value, rok, miesiac, dzien, data, rokK, miesiacK, dzienK;
    rok = pesel.charAt(0) + pesel.charAt(1);
    miesiac = pesel.charAt(2) + pesel.charAt(3);
    dzien = pesel.charAt(4) + pesel.charAt(5);
    
    if (pesel.length !== 11) {
        return false;
    }
    
    data = document.getElementById("formularzKalendarz").value;
    rokK = data.charAt(2) + data.charAt(3);
    miesiacK = data.charAt(5) + data.charAt(6);
    dzienK = data.charAt(8) + data.charAt(9);
    
    if (rok !== rokK || miesiac !== miesiacK || dzien !== dzienK) {
        return false;
    }
    
    return true;

}
function sprawdzPlik() {
    'use strict';
    
    var obraz = document.getElementById("formularzPlik").value, A1 = ".jpg", A2 = ".tif", A3 = ".png", A4 = ".jpeg", A5 = ".gif";
    obraz = obraz.toLowerCase();
    if (obraz.indexOf(A1) > -1 || obraz.indexOf(A2) > -1 || obraz.indexOf(A3) > -1 || obraz.indexOf(A4) > -1 || obraz.indexOf(A5) > -1) {
        return true;
    }
    
    return false;
}

function sprawdzWyslij() {
    'use strict';
    
    var bledy = "";

    //imie
    if (document.getElementById("formularzImie").value === "" || document.getElementById("formularzImie").value === null) {
        bledy = bledy + "Imię ";
    }

    //nazwisko
    if (document.getElementById("formularzNazwisko").value === "" || document.getElementById("formularzNazwisko").value === null) {
        bledy = bledy + "Nazwisko ";
    }

    //data
    if (document.getElementById("formularzWiek").value === "0") {
        bledy = bledy + "Data urodzenia ";
    }
    
    
    //pesel
    if (!sprawdzPESEL()) {
        bledy = bledy + "PESEL ";
    }

    //plik
    if (!sprawdzPlik()) {
        bledy = bledy + "Plik ";
    }

    //przetwarzanie danych osobowych
    if (!document.getElementById("formularzCheck").checked) {
        bledy = bledy + "Przetwarzanie ";
    }


    if (bledy === "") {
        document.getElementById("formularzOK").innerHTML = "Wysłano";
    } else {
        document.getElementById("formularzOK").innerHTML = "Znaleziono błędy w następujących polach: <br>" + bledy;
    }
}


function liczZnaki() {
    'use strict';
    var komentarz = document.getElementById("formularzKom").value, dlugosc = komentarz.length;
    document.getElementById("formularzLiczba").value = dlugosc;
}
window.onload = liczZnaki;


function obliczWiek() {
    'use strict';
    var dzis, data, dataTab, podanaData, dataPom, roznica, roznicaLat;
    dzis = new Date();
    data = document.getElementById("formularzKalendarz").value;
    dataTab = data.split(".");
    podanaData = "";

    if (dataTab.length === 3) {
        dataPom = dataTab[2] + "/" + dataTab[1] + "/" + dataTab[0];
        podanaData = new Date(dataPom);

    } else {
        dataTab = data.split("-");
        if (dataTab.length === 3) {
            podanaData = new Date(data);
        } else {
            return false;
        }
    }

    roznica = dzis.getTime() - podanaData.getTime();
    roznicaLat = roznica / (1000 * 60 * 60 * 24 * 365);

    if (parseInt(roznicaLat, 10) >= 0) {
        document.getElementById("formularzWiek").value = parseInt(roznicaLat, 10);
    } else {
        document.getElementById("formularzWiek").value = 0;
    }
}

