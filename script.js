document.addEventListener('DOMContentLoaded', function() {
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
});
