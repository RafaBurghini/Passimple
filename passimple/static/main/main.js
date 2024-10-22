// Manage click on show/hide password button
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.table-button-showpass').forEach(button => {
        button.addEventListener('click', function() {
            const passwordSpan = document.getElementById(`password-${this.getAttribute('data-id')}`);
            const password = this.getAttribute('data-password');
            if (passwordSpan.textContent === '***********') {
                passwordSpan.textContent = password;
                this.textContent = 'Hide';
            } else {
                passwordSpan.textContent = '***********';
                this.textContent = 'Show';
            }
        });
    });

    // Manage click on copy password button
    document.querySelectorAll('.table-button-copypass').forEach(button => {
            button.addEventListener('click', function() {
                const password = this.getAttribute('data-password');
                navigator.clipboard.writeText(password).then(function() {
                    alert("Password copied to clipboard!"); // show a confirmation message
                }, function(err) {
                    console.error('Could not copy text: ', err);
                });
            });
    });

    // Manage click on delete button
    document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function() {
                const accountId = this.getAttribute('data-id');
                if (confirm("Are you sure you want to delete this account? This action cannot be undone.")) {
                    window.location.href = `/delete_accountinfo/${accountId}/`;
                }
            });
    });

    // Manage click on delete account button
    document.querySelectorAll('.btn-delaccount').forEach(button => {
            button.addEventListener('click', function() {
                if (confirm("Are you sure you want to delete this account? This action cannot be undone.")) {
                    document.getElementById('deleteAccountForm').submit();
                }
            });
    });

    // Manage click on show/hide password button in edit account
document.querySelectorAll('.toggle-password').forEach(button => {
    const togglePasswordButton = document.getElementById('togglePassword');
    const passwordField = document.getElementById('editPassword');
        if (togglePasswordButton && passwordField) {
            togglePasswordButton.addEventListener('click', function() {
                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                    togglePasswordButton.textContent = 'Hide';
                } else {
                    passwordField.type = 'password';
                    togglePasswordButton.textContent = 'Show';
                }
            });
        }
    });
    // Manage click on close modal button in edit account
    const closeModalButton = document.getElementById('closeModal');
        if (closeModalButton) {
            closeModalButton.addEventListener('click', function() {
                document.getElementById('editModal').style.display = 'none';
            });
        }

    // Close the modal when clicking outside the modal content in edit account
    window.addEventListener('click', function(event) {
            const modal = document.getElementById('editModal');
            if (modal && event.target == modal) {
                modal.style.display = 'none';
            }
        });
    });

    document.addEventListener('DOMContentLoaded', (event) => {
        // Get the modal
        var modal = document.getElementById("addAccountModal");
        
        // Get the button that opens the modal
        var btn = document.getElementById("openModalBtn");

        // Get the cancel button
        var cancelbtn = document.getElementById("cancelbutton");
        
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("closeaddaccount")[0];
        
        // When the user clicks the button, open the modal 
        btn.onclick = function() {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks the cancel button, close the modal
        cancelbtn.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    });
    document.addEventListener('DOMContentLoaded', (event) => {
        // Get the modal
        var modal = document.getElementById("editModal");
        
        // Get the button that opens the modal
        var btn = document.getElementById("editbutton");
        var cancelbtn = document.getElementById("canceleditmodalbutton");
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("closeedit")[0];
        
        // When the user clicks the button, open the modal 
        btn.onclick = function() {
            modal.style.display = "block";
        }
        cancelbtn.onclick = function() {
            modal.style.display = "none";
        }
        
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
        
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            }
        }
        
    });

    document.addEventListener('DOMContentLoaded', function() {
            const copyButtons = document.querySelectorAll('.table-button-copypass');
            copyButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    const password = this.getAttribute('data-password');
                    copytoclipboard(id, password);
                });
            });
    });

    document.addEventListener('DOMContentLoaded', function() {
    // Manage click on edit button
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function() {
            const accountId = this.getAttribute('data-id');
            const site = this.getAttribute('data-site');
            const username = this.getAttribute('data-username');
            const email = this.getAttribute('data-email');
            const password = this.getAttribute('data-password');

            openEditModal(accountId, site, username, email, password);
        });
    });
    });


    // Manage click on delete button
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            const accountId = this.getAttribute('data-id');
            if (confirm("Are you sure you want to delete this account? This action cannot be undone.")) {
                window.location.href = `{% url 'delete_accountinfo' 0 %}`.replace('0', accountId);
            }
        });
    });
    // Close the modal when clicking outside the modal content
    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('editModal').style.display = 'none';
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('editModal');
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });


    function openEditModal(accountId, site, username, email, password) {
        document.getElementById('editAccountId').value = accountId;
        document.getElementById('editSite').value = site;
        document.getElementById('editUsername').value = username;
        document.getElementById('editEmail').value = email;
        document.getElementById('editPassword').value = password;

        document.getElementById('editModal').style.display = 'block';
    }

    function toggleInfo(counter, username, email, password) {
        const usernameSpan = document.getElementById(`username-${counter}`);
        const emailSpan = document.getElementById(`email-${counter}`);
        const passwordSpan = document.getElementById(`password-${counter}`);
        const toggleBtn = document.getElementById(`toggle-btn-${counter}`);

        if (toggleBtn.getAttribute('data-shown') === 'false') {
            usernameSpan.textContent = username;
            emailSpan.textContent = email;
            passwordSpan.textContent = password;
            toggleBtn.textContent = 'Hide';
            toggleBtn.setAttribute('data-shown', 'true');
        } else {
            usernameSpan.textContent = '***********';
            emailSpan.textContent = '***********';
            passwordSpan.textContent = '***********';
            toggleBtn.textContent = 'Show';
            toggleBtn.setAttribute('data-shown', 'false');
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Manage click on show/hide password button
        document.querySelectorAll('.table-button-copypass').forEach(button => {
            button.addEventListener('click', function() {
                const password = this.getAttribute('data-password');
                navigator.clipboard.writeText(password).then(function() {
                    alert("Password copied to clipboard!"); // show a confirmation message
                }, function(err) {
                    console.error('Could not copy text: ', err);
                });
            });
    });
});

