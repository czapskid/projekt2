var imionaTab = ["Damian", "Katarzyna", "Szczepan", "Jakub", "Adrianna", "Krzysztof", "Konrad", "Kornelia", "Dorota", "Patryk", "Piotrek", "Marzena", "Patrycja", "Oliwia", "Robert", "Kamila", "Beata", "Ola", "Dominika", "Dawid", "Tadeusz", "Adam", "Adrian", "Agnieszka", "Łukasz", "Marek", "Julia", "Jacek", "Wojtek", "Paweł", "Emilia"];
var nazwiskaTab = ["Czapski", "Szczepański", "Ufniarz", "Kowalski", "Soćko", "Wiecha", "Tomporowski", "Nowak", "Złotkowska", "Osiadała", "Krzyżanowska", "Rybińska", "Wróbel", "Celmer", "Chamryga", "Graczykowska", "Wojtkowska", "Sienkiewicz", "Mickiewicz", "Dębski", ];

var liczbaWierszy = 0;
var liczbaKolumn = 0;
var tablicaHeader = [];
var tablicaKomorek = [];

function aktualizujLiczbeWierszy() {
    'use strict';
    liczbaWierszy = parseInt(document.getElementById("liczbaWierszy").value, 10);
}
window.onload = aktualizujLiczbeWierszy;

function stworzButton() {
    'use strict';
    return "<button id=\"newColumnMaker\" onclick='dodajKolumne()' >Dodaj</button>";
}

function generujHeader() {
    'use strict';
    var wierszHeader = "<tr id=\"row0\"> <th id=\"th0\"> Lp</th> <th id=\"th1\" >Imię</th> <th id=\"th2\">Nazwisko</th> <th id=\"th3\">" + stworzButton() + "</th> </tr>";
    return wierszHeader;
}

function losujImie() {
    'use strict';
    return imionaTab[Math.floor(Math.random() * imionaTab.length)];
}

function losujNazwisko() {
    'use strict';
    return nazwiskaTab[Math.floor(Math.random() * nazwiskaTab.length)];
}

function generujTabele() {
    'use strict';
    var a, tabela = document.getElementById("generowanaTabela");

    tabela.innerHTML = generujHeader();
    liczbaKolumn = 4;

    for (a = 1; a <= liczbaWierszy; a = a + 1) {
        tabela.innerHTML = tabela.innerHTML + "<tr id=\"row" + a + "\"> <td id=\"t" + a + ".0\">" + a + "</td> <td id=\"td" + a + ".1\">" + losujImie() + "</td> <td id=\"td" + a + ".2\"> " + losujNazwisko() + "</td> <td id=\"td" + a + ".3\"></td> </tr>";
    }
}

function kopiujZawartosc() {
    'use strict';
    var i, j;
    for (i = 3; i < liczbaKolumn - 1; i = i + 1) {
        tablicaHeader[i] = document.getElementById("inpHead" + i).value;
    }

    for (i = 1; i <= liczbaWierszy; i = i + 1) {
        for (j = 3; j < liczbaKolumn - 1; j = j + 1) {
            tablicaKomorek[i + "." + j] = document.getElementById("inp" + i + "." + j).value;
        }
    }
}

function wprowadzZawartosc() {
    'use strict';
    var i, j;
    for (i = 3; i < liczbaKolumn - 1; i = i + 1) {
        document.getElementById("inpHead" + i).value = tablicaHeader[i];
    }

    for (i = 1; i <= liczbaWierszy; i = i + 1) {
        for (j = 3; j < liczbaKolumn - 1; j = j + 1) {
            document.getElementById("inp" + i + "." + j).value = tablicaKomorek[i + "." + j];
        }
    }
}

function dodajKolumne() {
    'use strict';
    kopiujZawartosc();

    var header, poprzedniButton, i, pustyWiersz, noweKomorki;
    
    header = document.getElementById("row0");
    header.innerHTML = header.innerHTML + "<th id=\"th" + (liczbaKolumn) + "\">" + stworzButton() + "</th>";

    poprzedniButton = document.getElementById("th" + (liczbaKolumn - 1));
    poprzedniButton.innerHTML = "<input class=\"headerInput\" id=\"inpHead" + (liczbaKolumn - 1) + "\" />";

    for (i = 1; i <= liczbaWierszy; i = i + 1) {
        pustyWiersz = document.getElementById("row" + i);
        pustyWiersz.innerHTML = pustyWiersz.innerHTML + " <td id=\"td" + i + "." + liczbaKolumn + "\"></td>";

        noweKomorki = document.getElementById("td" + i + "." + (liczbaKolumn - 1));
        noweKomorki.innerHTML = "<input class=\"tableInput\" id=\"inp" + i + "." + (liczbaKolumn - 1) + "\" />";
    }
    wprowadzZawartosc();
    liczbaKolumn = liczbaKolumn + 1;
}