document.addEventListener('DOMContentLoaded', function() {
    setupNavigation()

    // Handling Form Submission and Saving Data
    const form = document.getElementById('statForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission
    
            // Get form values
            const name = document.getElementById('name').value;
            const noShadow = document.getElementById('noShadow').value === 'true';
            const paleComplexion = document.getElementById('paleComplexion').value === 'true';
            const noGarlic = document.getElementById('noGarlic').value === 'true';
            
            // Determine vampire status using both methods
            const isVampireRandom = randomGuessIsVampire();
            const isVampireCalculated = calculateVampireStatus(noShadow, paleComplexion, noGarlic);
    
            // Add classmate information to localStorage
            const classmates = JSON.parse(localStorage.getItem('classmates')) || [];
            classmates.push({ name, noShadow, paleComplexion, noGarlic, isVampireRandom, isVampireCalculated });
            localStorage.setItem('classmates', JSON.stringify(classmates));
    
            form.reset(); // Optionally: Clear the form after submission
    
            // Clear the table and reload data to include the new submission
            clearTable();
            loadSavedDataToTable();
        });
    
        // Initially load saved data from localStorage to the table
        loadSavedDataToTable();
    }

    // Setup change listener for result method selection (Random or Calculated)
    const resultMethodSelector = document.getElementById('resultMethod');
    if (resultMethodSelector) {
        resultMethodSelector.addEventListener('change', function() {
            displayResults(this.value);
        });
    }

    // Initially display random results on stats page
    displayResults('random');

    // Event listener for clearing localStorage
    const clearLocalStorageBtn = document.getElementById('clearLocalStorage');
    if (clearLocalStorageBtn) {
        clearLocalStorageBtn.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.clear();
            alert('Local storage cleared.');
            window.location.reload();
        });
    }

    renderVampireChart('random'); // Default to 'random' or retrieve the current selection from #resultMethod
    if (resultMethodSelector) {
        resultMethodSelector.addEventListener('change', function() {
            displayResults(this.value);
            renderVampireChart(this.value);
        });
    }
});

function renderVampireChart(method) {
    const classmates = JSON.parse(localStorage.getItem('classmates')) || [];
    let vampireCount = 0;
    let nonVampireCount = 0;

    classmates.forEach(classmate => {
        const isVampire = method === 'random' ? classmate.isVampireRandom : classmate.isVampireCalculated;
        isVampire ? vampireCount++ : nonVampireCount++;
    });

    const ctx = document.getElementById('vampireChart').getContext('2d');
    // If a chart instance already exists, destroy it to ensure we're creating a fresh chart
    if (window.vampireChartInstance) {
        window.vampireChartInstance.destroy();
    }
    
    window.vampireChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Vampires', 'Non-Vampires'],
            datasets: [{
                label: 'Vampire Distribution',
                data: [vampireCount, nonVampireCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
        }
    });
}

function clearTable() {
    const tableBody = document.querySelector('#classmateTable tbody');
    tableBody.innerHTML = ''; // Clears the table body, removing all existing rows
}

function setupNavigation() {
    var startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', function() {
            window.location.href = 'statEntry.html';
        });
    }

    var backToHome = document.getElementById('backToHome');
    if (backToHome) {
        backToHome.addEventListener('click', function() {
            window.location.href = 'homePage.html'; 
        });
    }

    var seeResults = document.getElementById('seeResults');
    if (seeResults) {
        seeResults.addEventListener('click', function() {
            window.location.href = 'stats.html';
        });
    }

    var editInformation = document.getElementById('editInformation');
    if (editInformation) {
        editInformation.addEventListener('click', function() {
            window.location.href = 'statEntry.html';
        });
    }

    var backToHomeFromStats = document.getElementById('backToHomeFromStats');
    if (backToHomeFromStats) {
        backToHomeFromStats.addEventListener('click', function() {
            window.location.href = 'homePage.html';
        });
    }
}

function randomGuessIsVampire() {
    return Math.random() > 0.5; // True means "Is a Vampire", False means "Is not a Vampire"
}

function calculateVampireStatus(noShadow, paleComplexion, noGarlic) {
    const score = (noShadow ? 4 : 0) + (paleComplexion ? 3 : 0) + (noGarlic ? 3 : 0);
    return score > 6;
}

function displayResults(method) {
    const resultsList = document.getElementById('resultsList');
    if (!resultsList) return; // Exit if resultsList is not on the current page

    resultsList.innerHTML = ''; // Clear existing results

    const classmates = JSON.parse(localStorage.getItem('classmates')) || [];
    classmates.forEach(({ name, isVampireRandom, isVampireCalculated }) => {
        const isVampire = method === 'random' ? isVampireRandom : isVampireCalculated;
        const li = document.createElement('li');
        li.textContent = `${name} - ${isVampire ? 'Vampire' : 'Not a Vampire'}`;
        resultsList.appendChild(li);
    });
}

function loadSavedDataToTable() {
    const tableBody = document.querySelector('#classmateTable tbody');
    const classmates = JSON.parse(localStorage.getItem('classmates')) || [];
    classmates.forEach(({ name, noShadow, paleComplexion, noGarlic, isVampireRandom }) => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = name;
        row.insertCell(1).textContent = noShadow ? 'Yes' : 'No';
        row.insertCell(2).textContent = paleComplexion ? 'Yes' : 'No';
        row.insertCell(3).textContent = noGarlic ? 'Yes' : 'No';
    });
}

