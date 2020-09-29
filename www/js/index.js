// Adds deviceready listener
document.addEventListener('deviceready', onDeviceReady, false);

// FlashCD vars (seconds)
var flashBaseCd = 10;
var bootsReduction = 10;
var inspirationReduction = 5;

// Timing variables
var fTop;
var fTopRemaining;
var fJgl;
var fJglRemaining;
var fMid;
var fMidRemaining;
var fBot;
var fBotRemaining;
var fSupp;
var fSuppRemaining;

// DOM elements
var fTopContainer;
var fTopTimer;
var fJglContainer;
var fJglTimer;
var fMidContainer;
var fMidTimer;
var fBotContainer;
var fBotTimer;
var fSuppContainer;
var fSuppTimer;

function onDeviceReady() {
    // Binds DOM elements
    fTopContainer = document.getElementById('flashTop');
    fTopTimer = document.getElementById('flashTopTimer');
    fJglContainer = document.getElementById('flashJgl');
    fJglTimer = document.getElementById('flashJglTimer');
    fMidContainer = document.getElementById('flashMid');
    fMidTimer = document.getElementById('flashMidTimer');
    fBotContainer = document.getElementById('flashBot');
    fBotTimer = document.getElementById('flashBotTimer');
    fSuppContainer = document.getElementById('flashSupp');
    fSuppTimer = document.getElementById('flashSuppTimer');

    // Adds click listeners to flash buttons
    fTopContainer.addEventListener('click', onFlashTop);
    fJglContainer.addEventListener('click', onFlashJgl);
    fMidContainer.addEventListener('click', onFlashMid);
    fBotContainer.addEventListener('click', onFlashBot);
    fSuppContainer.addEventListener('click', onFlashSupp);

    // Adds click listener to checkboxes
    let checkboxes = document.getElementsByClassName('timing-checkbox');
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', updateTimers);

    }

    // Sets timers
    updateTimers();
}

function onFlashTop() {
    if (fTop == null) {
        var flashCd = _getFlashCd('top');
        fTopRemaining = flashCd;

        _addRunningClass(fTopContainer);
        fTop = setInterval(function() {

            fTopRemaining = fTopRemaining - 1;

            fTopTimer.innerHTML = _formatTimer(fTopRemaining);

            if (fTopRemaining <= 0) {
                clearInterval(fTop);
                fTop = null;
                fTopTimer.innerHTML = _formatTimer(_getFlashCd('top'));
                _removeRunningClass(fTopContainer);
            }

        }, 1000);
    }
}

function onFlashJgl() {
    if (fJgl == null) {
        var flashCd = _getFlashCd('jgl');
        fJglRemaining = flashCd;

        _addRunningClass(fJglContainer);

        fJgl = setInterval(function() {

            fJglRemaining = fJglRemaining - 1;

            fJglTimer.innerHTML = _formatTimer(fJglRemaining);

            if (fJglRemaining <= 0) {
                clearInterval(fJgl);
                fJgl = null;
                fJglTimer.innerHTML = _formatTimer(_getFlashCd('jgl'));
                _removeRunningClass(fJglContainer);
            }

        }, 1000);
    }
}

function onFlashMid() {
    if (fMid == null) {
        var flashCd = _getFlashCd('mid');
        fMidRemaining = flashCd;

        _addRunningClass(fMidContainer);

        fMid = setInterval(function() {

            fMidRemaining = fMidRemaining - 1;

            fMidTimer.innerHTML = _formatTimer(fMidRemaining);

            if (fMidRemaining <= 0) {
                clearInterval(fMid);
                fMid = null;
                fMidTimer.innerHTML = _formatTimer(_getFlashCd('mid'));
                _removeRunningClass(fMidContainer);
            }

        }, 1000);
    }
}

function onFlashBot() {
    if (fBot == null) {
        var flashCd = _getFlashCd('bot');
        fBotRemaining = flashCd;

        _addRunningClass(fBotContainer);

        fBot = setInterval(function() {

            fBotRemaining = fBotRemaining - 1;

            fBotTimer.innerHTML = _formatTimer(fBotRemaining);

            if (fBotRemaining <= 0) {
                clearInterval(fBot);
                fBot = null;
                fBotTimer.innerHTML = _formatTimer(_getFlashCd('bot'));
                _removeRunningClass(fBotContainer);
            }

        }, 1000);
    }
}

function onFlashSupp() {
    if (fSupp == null) {
        var flashCd = _getFlashCd('supp');
        fSuppRemaining = flashCd;

        _addRunningClass(fSuppContainer);

        fSupp = setInterval(function() {

            fSuppRemaining = fSuppRemaining - 1;

            fSuppTimer.innerHTML = _formatTimer(fSuppRemaining);

            if (fSuppRemaining <= 0) {
                clearInterval(fSupp);
                fSupp = null;
                fSuppTimer.innerHTML = _formatTimer(_getFlashCd('supp'));
                _removeRunningClass(fSuppContainer);
            }

        }, 1000);
    }
}

function updateTimers() {
    fTopTimer.innerHTML = _formatTimer(_getFlashCd('top'));
    fJglTimer.innerHTML = _formatTimer(_getFlashCd('jgl'));
    fMidTimer.innerHTML = _formatTimer(_getFlashCd('mid'));
    fBotTimer.innerHTML = _formatTimer(_getFlashCd('bot'));
    fSuppTimer.innerHTML = _formatTimer(_getFlashCd('supp'));
}

/**
 * Formats the remaining seconds to mm:ss
 * 
 * @param {number} secondsRemainig 
 */
function _formatTimer(secondsRemainig) {
    return new Date(secondsRemainig * 1000).toISOString().substr(14, 5);
}

function _addRunningClass(element) {
    element.firstElementChild.classList.add('running');
}

function _removeRunningClass(element) {
    element.classList.remove('running');
}

function _getFlashCd(position) {
    let bootsPlainReduction = 0;
    let inspirationPlainReduction = 0;

    let boots = document.getElementById(position + 'Boots');
    if (boots.checked) {
        bootsPlainReduction = flashBaseCd * (bootsReduction / 100);
    }

    let inspiration = document.getElementById(position + 'Inspiration');
    if (inspiration.checked) {
        inspirationPlainReduction = flashBaseCd * (inspirationReduction / 100);
    }

    return flashBaseCd - bootsPlainReduction - inspirationPlainReduction;
}