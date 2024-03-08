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
        
        // Load and display previously saved data from localStorage
        function loadSavedData() {
            const classmates = JSON.parse(localStorage.getItem('classmates')) || [];
            classmates.forEach(classmate => {
                addToTable(classmate.name, classmate.noShadow, classmate.paleComplexion, classmate.noGarlic);
            });
        }
        loadSavedData();
    }

    // Displaying Results on the Stats Page
    const resultsList = document.getElementById('resultsList');
    if (resultsList) {
        const classmates = JSON.parse(localStorage.getItem('classmates')) || [];
        classmates.forEach(classmate => {
            const li = document.createElement('li');
            li.textContent = `${classmate.name} - ${classmate.isVampire ? 'Vampire' : 'Not a Vampire'}`;
            resultsList.appendChild(li);
        });
    }

    // Navigation Buttons
    // Home page and statEntry page navigation
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

    // Ensure these IDs are correct for your application
    // This part seems redundant given the above, consider adjusting based on actual IDs
    const backToHomePage = document.getElementById('backToHome');
    const viewResults = document.getElementById('seeResults');

    if (backToHomePage) {
        backToHomePage.addEventListener('click', function() {
            window.location.href = 'homepage.html';
        });
    }

    if (viewResults) {
        viewResults.addEventListener('click', function() {
            window.location.href = 'stats.html';
        });
    }

});

document.getElementById('clearLocalStorage').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent any default action that might cause navigation
    localStorage.clear();
    alert('Local storage cleared.');

});


