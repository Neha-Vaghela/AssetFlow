const toggleFormBtn = document.getElementById('toggleFormBtn');
const cancelBtn = document.getElementById('cancelBtn');
const addDepartmentPanel = document.getElementById('addDepartmentPanel');
const form = document.getElementById('departmentForm');
const responseMessage = document.getElementById('responseMessage');

function toggleForm() {
    const isHidden = addDepartmentPanel.hasAttribute('hidden');
    if (isHidden) {
        addDepartmentPanel.removeAttribute('hidden');
        toggleFormBtn.textContent = '− Close Form';
    } else {
        addDepartmentPanel.setAttribute('hidden', '');
        toggleFormBtn.textContent = '+ Add Department';
    }
}

function closeForm() {
    addDepartmentPanel.setAttribute('hidden', '');
    toggleFormBtn.textContent = '+ Add Department';
}

function showSuccess(message) {
    responseMessage.textContent = message;
    responseMessage.classList.add('visible');
    setTimeout(() => responseMessage.classList.remove('visible'), 4000);
}

toggleFormBtn.addEventListener('click', toggleForm);
cancelBtn.addEventListener('click', closeForm);

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('departmentName').value.trim();
    const head = document.getElementById('departmentHead').value;
    const status = document.querySelector('input[name="status"]:checked').value;

    if (!name || !head) {
        return;
    }

    form.reset();
    closeForm();
    showSuccess('Department created successfully');
});