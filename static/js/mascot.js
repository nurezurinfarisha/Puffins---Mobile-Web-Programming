// let message = 'This is a dynamic message';
// let popmessage = "HEy!"
// let html = generateMascot(message, popmessage);
// document.getElementById('yourElementId').innerHTML = html;

function generateMascot(message, popMessage){
    html = generateMascotHTML(message, popMessage);
    document.getElementById('mascot').innerHTML = html;
}

function generateMascotHTML(message, popMessage) {
    return `
    <div class="mascot mascot-animation">
        <a title="mascot mascot-animation" href="#" onclick="popAlert('${popMessage}')">
            <img src="../static/img/mascot/2.png" alt="Mascot" width="100px" height="100px">
        </a>
        <div class="talk-bubble tri-left round right-in" height="100px" style="background-color: beige;">
            <div class="talktext">
                <p>${message}</p>
            </div>
        </div>
    </div>
    `;
}

function popAlert(popmessage){
    alert(popmessage);
}

function showMessageBasedOnPage() {
    let path = window.location.pathname;
    let message, popMessage;

    if (path === '/home') {
        message = 'Selamat Datang!';
        popMessage = "halu";
    } else if (path === '/kuizLeaderboard') {
        message = 'Bijaknya!';
        popMessage = "Cubala lagi!";
    } else {
        message = 'This is the default message';
        popMessage = "";
    }

    let html = generateMascotHTML(message, popMessage);
    document.getElementById('mascot').innerHTML = html;
}

// Call the function when the page loads
window.onload = showMessageBasedOnPage;