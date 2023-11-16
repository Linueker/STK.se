
// Funktion som sparar data i local storage
function saveData() {
    const programTitel = document.getElementById('inputData').value;
    const programDescription = document.getElementById('programDescription').value;
    const ageLimit = document.getElementById('age').value;
    let tvProgram = { //Mall för TV-program som objekt med nyckelvärden som tas in enligt variabler ovan
        titel: programTitel,
        description: programDescription,
        age: ageLimit,
    }
    if (!programTitel || !programDescription || !ageLimit) {
        alert("Fyll i alla fält!")
        return; //Avbryter funktionen om något fält är tomt
    }

    let existingData = localStorage.getItem('savedData'); // Hämta tidigare data
    existingData = existingData ? JSON.parse(existingData) : []; // Om det finns data sedan innan, konvertera från JSON till objekt, annars skapa en tom array.

    existingData.push(tvProgram); // Lägger till användarinmatad data till tidigare data
    localStorage.setItem('savedData', JSON.stringify(existingData)); //gör om data till sträng, spara i local storage

    alert('Programmet sparades!');
    document.getElementById('inputData').value = '';
    document.getElementById('programDescription').value = '';
    document.getElementById('age').value = ''; // Clear input field
}

// Visa sparad data
function showData(event) {
    event.preventDefault();
    const savedData = localStorage.getItem('savedData');
    if (savedData) {
        const parsedData = JSON.parse(savedData); //gör om JSON till objekt

        if (parsedData.length > 0) {
            let table = document.getElementById('searchResult').firstElementChild;

            if (table.children.length > 1) {
                while (table.children.length != 1) {
                    table.children[1].remove();
                    // Tar bort all HTML i resultattabellen förutom table body som ligger på plats 0.
                    document.getElementById('searchResult').style.display = 'none';
                }
            }
            // Design och rubrik läggs till i tabellen som presenterar resultatet
            document.getElementById('searchResult').style.display = 'flex';
            document.getElementById('searchResult').firstElementChild.appendChild(document.createElement('h2')).innerHTML = "Sökresultat";

            // Alla objekt från i JSON-filen loopas igenom och skrivs ut på sidan.
            for (let index = 0; index < parsedData.length; index++) {
                const insertRow = document.getElementById('searchResult').firstElementChild.appendChild(document.createElement('tr')); // lägger till en ny rad i "resultat-tabellen"
                // tabell-data läggs till i den skapade raden
                insertRow.appendChild(document.createElement('td')).innerHTML = "<strong>Titel: </strong>" + "<br>" + parsedData[index].titel; // värden på respektive nyckel i objektet skrivs ut
                insertRow.appendChild(document.createElement('td')).innerHTML = "<strong>Beskrivning: </strong>" + "<br>" + parsedData[index].description;
                insertRow.appendChild(document.createElement('td')).innerHTML = "<strong>Åldersgräns: </strong>" + "<br>" + parsedData[index].age;
            }
        }
        else {
            alert('Ingen data hittad');
        }
    } 
    else {
        alert('Ingen data hittad');
    }
}

//Funktion för att söka efter objekt
function searchData(event) {
    event.preventDefault();
    let titelSearch = document.getElementById('searchTitel').value;
    let ageSearch = document.getElementById('searchAge').value;
    let table = document.getElementById('searchResult').firstElementChild;
    const savedData = localStorage.getItem('savedData');
    const parsedData = JSON.parse(savedData);
    let result = "";

    if (table.children.length > 1) {
        while (table.children.length != 1) {
            table.children[1].remove();
            // Tar bort all html resultattabellen förutom table body som ligger på plats 0.
            document.getElementById('searchResult').style.display = 'none';
        }
    }
    
    if (!titelSearch && !ageSearch) {
        alert("Fyll i minst 1 fält!")
        return; //Avbryter funktionen om båda fält är tomma
    }
    // här ifrån utförs samma funktioner som i "showData"-funktionen för att skriva ut objekten på sidan
    document.getElementById('searchResult').style.display = 'flex';
    document.getElementById('searchResult').firstElementChild.appendChild(document.createElement('h2')).innerHTML = "Sökresultat";
    
    for (let index = 0; index < parsedData.length; index++) {

        if (parsedData[index].titel === titelSearch || parsedData[index].age === ageSearch) { // Om användaren har skrivit en titel eller valt en åldersgräns 
            console.log(parsedData[index]);
            result = "ok"
            const insertRow = document.getElementById('searchResult').firstElementChild.appendChild(document.createElement('tr'));

            insertRow.appendChild(document.createElement('td')).innerHTML = "<strong>Titel: </strong>" + "<br>" + parsedData[index].titel;
            insertRow.appendChild(document.createElement('td')).innerHTML = "<strong>Beskrivning: </strong>" + "<br>" + parsedData[index].description;
            insertRow.appendChild(document.createElement('td')).innerHTML = "<strong>Åldersgräns: </strong>" + "<br>" + parsedData[index].age;
        }
    }

    if (result !== "ok") { //Om sökningen inte hittar något objekt ploppar denna "varning" upp
        alert("Det du söker finns ej i registret!")
    }
    // sökrutorna nollställs
    document.getElementById('searchTitel').value = '';
    document.getElementById('searchAge').value = '';
}

// Rensa data
let clearStorage = () => {
    let table = document.getElementById('searchResult').firstElementChild;
    const savedData = localStorage.getItem('savedData');

    if (table.children.length > 1 || savedData) {
        
        let userConfirmed = confirm("Är du säker på att du vill radera all data?");

        if (userConfirmed) {
            while (table.children.length != 1) {
                table.children[1].remove(); // Tar bort all html resultattabellen förutom table body som ligger på plats 0.
                document.getElementById('searchResult').style.display = 'none';
            }
            localStorage.clear(); // Tar bort allt ur local storage
        } else {
            // Användaren valde att inte radera data
        }

    }
    else {
        alert("Listan är redan tom!")
    }
}
