/*
        Tre funktioner, en som sparar data, en som hämtar data och visar, en som rensar. 
        */

        // Funktion som sparar data lokalt
        function saveData() {
            const newData = document.getElementById('inputData').value; //hämta värdet från formulär
            console.log(newData);
            let existingData = localStorage.getItem('savedData'); // hämta tidigare data
            existingData = existingData ? JSON.parse(existingData) : []; //om det finns data sedan innan, konvertera från JSON till objekt, annars skapa en tom array.

            existingData.push(newData);//lägg till data
            localStorage.setItem('savedData', JSON.stringify(existingData));//gör om data till sträng, spara i local

            alert('Data saved to local storage!');
            document.getElementById('inputData').value = ''; // Clear input field
        }

        // Visa sparad data
        function showData() {
            const savedData = localStorage.getItem('savedData');
            if (savedData) {
                const parsedData = JSON.parse(savedData); //gör om JSON till objekt
                if (parsedData.length > 0) {
                    alert('Data hämtad från local stoarage: ' + parsedData.join(', '));
                } else {
                    alert('Ingen data hittad');
                }
            } else {
                alert('Ingen data hittad');
            }
        }

        // Rensa data
        function clearStorage() {
            localStorage.removeItem('savedData');
            alert('Local storage cleared');
        }