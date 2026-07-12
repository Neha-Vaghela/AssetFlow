const toggleAddEmployeeBtn = document.getElementById('toggleAddEmployeeBtn');
const togglePromoteBtn = document.getElementById('togglePromoteBtn');
const addEmployeePanel = document.getElementById('addEmployeePanel');
const promotePanel = document.getElementById('promotePanel');
const cancelAddBtn = document.getElementById('cancelAddBtn');
const cancelPromoteBtn = document.getElementById('cancelPromoteBtn');
const responseMessage = document.getElementById('responseMessage');
const employeeTable = document.getElementById('employeeTable');
const selectEmployee = document.getElementById('selectEmployee');
const promoteForm = document.getElementById('promoteForm');
const addEmployeeForm = document.getElementById('addEmployeeForm');

let editingRow = null;

function showResponse(message) {
    responseMessage.textContent = message;
    responseMessage.classList.add('visible');
    setTimeout(() => responseMessage.classList.remove('visible'), 3500);
}

function closeAllPanels() {
    addEmployeePanel.setAttribute('hidden', '');
    promotePanel.setAttribute('hidden', '');
    toggleAddEmployeeBtn.textContent = '+ Add Employee';
}

function resetAddForm() {
    addEmployeeForm.reset();
    addEmployeeForm.querySelector('input[value="Active"]').checked = true;
    editingRow = null;
    addEmployeeForm.querySelector('.save-btn').textContent = 'Add Employee';
}

function fillEmployeeSelect() {
    const rows = [...employeeTable.querySelectorAll('tr')];
    selectEmployee.innerHTML = '<option value="">Choose employee</option>';
    rows.forEach((row, index) => {
        const name = row.children[0].textContent;
        const email = row.children[1].textContent;
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${name} — ${email}`;
        selectEmployee.appendChild(option);
    });
}

function togglePanel(panel, button, closeOther = null) {
    const isHidden = panel.hasAttribute('hidden');
    if (closeOther) closeOther.setAttribute('hidden', '');
    if (isHidden) {
        panel.removeAttribute('hidden');
        button.textContent = button === toggleAddEmployeeBtn ? '− Close Form' : '− Close Form';
        if (panel === promotePanel) fillEmployeeSelect();
    } else {
        panel.setAttribute('hidden', '');
        button.textContent = button === toggleAddEmployeeBtn ? '+ Add Employee' : 'Promote Employee';
    }
}

function updateEmployeeRow(row, name, email, department, role, status) {
    row.children[0].textContent = name;
    row.children[1].textContent = email;
    row.children[2].textContent = department;
    row.children[3].textContent = role;
    const statusChip = row.children[4].querySelector('.status-chip');
    statusChip.textContent = status;
    statusChip.className = `status-chip ${status === 'Active' ? 'active' : 'inactive'}`;
}

function createEmployeeRow(name, email, department, role, status) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${department}</td>
        <td>${role}</td>
        <td><span class="status-chip ${status === 'Active' ? 'active' : 'inactive'}">${status}</span></td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="promote-btn">Change Role</button>
        </td>
    `;
    employeeTable.appendChild(row);
}

toggleAddEmployeeBtn.addEventListener('click', () => {
    togglePanel(addEmployeePanel, toggleAddEmployeeBtn, promotePanel);
    if (!addEmployeePanel.hasAttribute('hidden')) {
        resetAddForm();
    }
});

togglePromoteBtn.addEventListener('click', () => {
    togglePanel(promotePanel, togglePromoteBtn, addEmployeePanel);
});

cancelAddBtn.addEventListener('click', () => {
    closeAllPanels();
    resetAddForm();
});

cancelPromoteBtn.addEventListener('click', () => {
    closeAllPanels();
    promoteForm.reset();
});

addEmployeeForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('employeeName').value.trim();
    const email = document.getElementById('employeeEmail').value.trim();
    const department = document.getElementById('employeeDepartment').value;
    const status = addEmployeeForm.querySelector('input[name="employeeStatus"]:checked').value;
    const role = 'Employee';
    if (!name || !email || !department) return;

    if (editingRow) {
        updateEmployeeRow(editingRow, name, email, department, editingRow.children[3].textContent, status);
        showResponse('Employee updated successfully');
    } else {
        createEmployeeRow(name, email, department, role, status);
        showResponse('Employee added successfully');
    }

    closeAllPanels();
    resetAddForm();
});

promoteForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const selectedIndex = selectEmployee.value;
    const newRole = document.getElementById('selectRole').value;
    if (selectedIndex === '' || newRole === '') return;
    const row = employeeTable.querySelectorAll('tr')[selectedIndex];
    if (!row) return;
    row.children[3].textContent = newRole;
    showResponse('Role updated successfully');
    closeAllPanels();
    promoteForm.reset();
});

employeeTable.addEventListener('click', function (event) {
    if (event.target.matches('.edit-btn')) {
        const row = event.target.closest('tr');
        editingRow = row;
        document.getElementById('employeeName').value = row.children[0].textContent;
        document.getElementById('employeeEmail').value = row.children[1].textContent;
        document.getElementById('employeeDepartment').value = row.children[2].textContent;
        const status = row.children[4].querySelector('.status-chip').textContent;
        addEmployeeForm.querySelector(`input[name="employeeStatus"][value="${status}"]`).checked = true;
        addEmployeeForm.querySelector('.save-btn').textContent = 'Save Employee';
        addEmployeePanel.removeAttribute('hidden');
        toggleAddEmployeeBtn.textContent = '− Close Form';
        promotePanel.setAttribute('hidden', '');
        togglePromoteBtn.textContent = 'Promote Employee';
    }
    if (event.target.matches('.promote-btn')) {
        const row = event.target.closest('tr');
        fillEmployeeSelect();
        selectEmployee.value = [...employeeTable.querySelectorAll('tr')].indexOf(row);
        promotePanel.removeAttribute('hidden');
        togglePromoteBtn.textContent = '− Close Form';
        addEmployeePanel.setAttribute('hidden', '');
        toggleAddEmployeeBtn.textContent = '+ Add Employee';
    }
});

fillEmployeeSelect();