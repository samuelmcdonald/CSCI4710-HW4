document.addEventListener('DOMContentLoaded', function() {
    // Handling Form Submission and Saving Data
    const form = document.getElementById('statForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form submission
            
            // Get form values
            const name = document.getElementById('name').value;
            const noShadow = document.getElementById('noShadow').value === 'true' ? 'Yes' : 'No';
            const paleComplexion = document.getElementById('paleComplexion').value === 'true' ? 'Yes' : 'No';
            const noGarlic = document.getElementById('noGarlic').value === 'true' ? 'Yes' : 'No';
            const isVampire = randomGuessIsVampire();

            addToTable(name, noShadow, paleComplexion, noGarlic);

            // Save data to localStorage
            const classmates = JSON.parse(localStorage.getItem('classmates')) || [];
            classmates.push({ name, noShadow, paleComplexion, noGarlic, isVampire });
            localStorage.setItem('classmates', JSON.stringify(classmates));

            // Optionally: Clear the form after submission
            form.reset();
        });
    }

    // Model switching functionality
    const randomModelBtn = document.getElementById('randomModel');
    const thresholdModelBtn = document.getElementById('thresholdModel');

    if(randomModelBtn && thresholdModelBtn) {
        randomModelBtn.addEventListener('click', function() {
            updateResults("random");
        });

        thresholdModelBtn.addEventListener('click', function() {
            updateResults("threshold");
        });
    }

    function randomGuessIsVampire() {
        // True means "Is a Vampire", False means "Is not a Vampire"
        return Math.random() > 0.5;
    }

    // Function to add data to the table
    function addToTable(name, noShadow, paleComplexion, noGarlic) {
        const table = document.getElementById('classmateTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.insertCell(0).textContent = name;
        newRow.insertCell(1).textContent = noShadow;
        newRow.insertCell(2).textContent = paleComplexion;
        newRow.insertCell(3).textContent = noGarlic;
    }
    
    function updateResults(modelType) {
        const classmates = JSON.parse(localStorage.getItem('classmates')) || [];
        if (modelType === "random") {
            classmates.forEach(classmate => {
                classmate.isVampire = randomGuessIsVampire();
            });
        } else if (modelType === "threshold") {
            classmates.forEach(classmate => {
                let score = 0;
                score += classmate.noShadow === 'Yes' ? 4 : 0;
                score += classmate.paleComplexion === 'Yes' ? 3 : 0;
                score += classmate.noGarlic === 'Yes' ? 3 : 0;
                classmate.isVampire = score > 6;
            });
        }
        displayResults(classmates);
    }

    function displayResults(classmates) {
        // Clear existing results
        const resultsList = document.getElementById('resultsList');
        if (resultsList) {
            resultsList.innerHTML = '';

            // Update display based on the model selected
            classmates.forEach(classmate => {
                const li = document.createElement('li');
                li.textContent = `${classmate.name} - ${classmate.isVampire ? 'Vampire' : 'Not a Vampire'}`;
                resultsList.appendChild(li);
            });
        }

        // Count vampires and non-vampires
        let vampireCount = 0;
        let nonVampireCount = 0;
        classmates.forEach(classmate => {
            if (classmate.isVampire) {
                vampireCount++;
            } else {
                nonVampireCount++;
            }
        });

        // Prepare the chart data
        const data = {
            labels: [
                'Vampire',
                'Not a Vampire'
            ],
            datasets: [{
                label: 'Classification Results',
                data: [vampireCount, nonVampireCount],
                backgroundColor: [
                    'rgb(255, 99, 132)', // Vampire color
                    'rgb(54, 162, 235)' // Non-Vampire color
                ],
                hoverOffset: 4
            }]
        };

        // Config object for the pie chart
        const config = {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Vampire Classification Results'
                    }
                }
            },
        };

        // Check if the chart instance already exists and destroy it to avoid duplicates
        if (window.resultsChart instanceof Chart) {
            window.resultsChart.destroy();
        }

        // Render the pie chart
        window.resultsChart = new Chart(
            document.getElementById('resultsChart'),
            config
        );
    }

    // Ensure initial load of data if on the results page
    if(document.getElementById('resultsList')) {
        updateResults("random"); // Default to random model on initial load
    }

    // Navigation Buttons
    const startButton = document.getElementById('startButton');
    const backToHome = document.getElementById('backToHome');
    const seeResults = document.getElementById('seeResults');
    const backToHomeFromStats = document.getElementById('backToHomeFromStats');
    const editInformation = document.getElementById('editInformation');

    if (startButton) {
        startButton.addEventListener('click', function() {
            window.location.href = 'statEntry.html';
        });
    }

    if (backToHome) {
        backToHome.addEventListener('click', function() {
            window.location.href = 'homePage.html';
        });
    }

    if (seeResults) {
        seeResults.addEventListener('click', function() {
            window.location.href = 'stats.html';
        });
    }

    if (editInformation) {
        editInformation.addEventListener('click', function() {
            window.location.href = 'statEntry.html';
        });
    }

    if (backToHomeFromStats) {
        backToHomeFromStats.addEventListener('click', function() {
            window.location.href = 'homePage.html';
        });
    }

    document.getElementById('clearLocalStorage').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent any default action that might cause navigation
        localStorage.clear();
        alert('Local storage cleared.');

    });
});
