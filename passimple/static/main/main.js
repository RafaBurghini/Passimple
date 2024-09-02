function showPassword(password) {
    var passwordDiv = document.querySelector('.pass-generated');
    passwordDiv.textContent = password; 
    passwordDiv.classList.add('has-password'); 
}


function toggleInfo(id, username, email, password) {
    const isShown = document.getElementById(`toggle-btn-${id}`).getAttribute('data-shown') === 'true';
    if (isShown) {
        // HIDE INFO
        document.getElementById(`username-${id}`).textContent = '***********';
        document.getElementById(`email-${id}`).textContent = '***********';
        document.getElementById(`password-${id}`).textContent = '***********';
        document.getElementById(`toggle-btn-${id}`).textContent = 'Show';
        document.getElementById(`toggle-btn-${id}`).setAttribute('data-shown', 'false');
    } else {
        // SHOW INFO    
        document.getElementById(`username-${id}`).textContent = username;
        document.getElementById(`email-${id}`).textContent = email;
        document.getElementById(`password-${id}`).textContent = password;
        document.getElementById(`toggle-btn-${id}`).textContent = 'Hide';
        document.getElementById(`toggle-btn-${id}`).setAttribute('data-shown', 'true');
    }
}

function copytoclipboard(id, password) {
    navigator.clipboard.writeText(password).then(function() {
        alert("Password copied to clipboard!");
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}