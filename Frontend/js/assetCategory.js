const toggleFormBtn = document.getElementById('toggleFormBtn');
const cancelBtn = document.getElementById('cancelBtn');
const categoryFormPanel = document.getElementById('categoryFormPanel');
const categoryForm = document.getElementById('categoryForm');
const responseMessage = document.getElementById('responseMessage');
const categoryTable = document.getElementById('categoryTable');
const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');
const saveBtn = categoryForm.querySelector('.save-btn');

let editingRow = null;

function showResponse(message) {
    responseMessage.textContent = message;
    responseMessage.classList.add('visible');
    setTimeout(() => responseMessage.classList.remove('visible'), 3500);
}

function resetForm() {
    categoryForm.reset();
    categoryForm.querySelector('input[value="Active"]').checked = true;
}

function openForm(isEdit = false) {
    categoryFormPanel.removeAttribute('hidden');
    toggleFormBtn.textContent = '− Close Form';
    formTitle.textContent = isEdit ? 'Edit Category' : 'Add New Category';
    formSubtitle.textContent = isEdit ? 'Update the selected category and save changes.' : 'Enter category details and optional field information.';
    saveBtn.textContent = isEdit ? 'Update Category' : 'Save Category';
}

function closeForm() {
    categoryFormPanel.setAttribute('hidden', '');
    toggleFormBtn.textContent = '+ Add Category';
    editingRow = null;
    resetForm();
}

function toggleForm() {
    if (categoryFormPanel.hasAttribute('hidden')) {
        resetForm();
        openForm();
    } else {
        closeForm();
    }
}

function updateRowValues(row, name, optionalField, status) {
    row.querySelector('td:nth-child(1)').textContent = name;
    row.querySelector('td:nth-child(2)').textContent = optionalField || '-';
    const statusChip = row.querySelector('.status-chip');
    statusChip.textContent = status;
    statusChip.className = 'status-chip ' + (status === 'Active' ? 'active' : 'inactive');
    const actionBtn = row.querySelector('.activate-btn, .deactivate-btn');
    if (status === 'Active') {
        if (actionBtn) {
            actionBtn.textContent = 'Deactivate';
            actionBtn.className = 'deactivate-btn';
        }
    } else {
        if (actionBtn) {
            actionBtn.textContent = 'Activate';
            actionBtn.className = 'activate-btn';
        }
    }
}

function createRow(name, optionalField, status) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${name}</td>
        <td>${optionalField || '-'}</td>
        <td><span class="status-chip ${status === 'Active' ? 'active' : 'inactive'}">${status}</span></td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="${status === 'Active' ? 'deactivate-btn' : 'activate-btn'}">${status === 'Active' ? 'Deactivate' : 'Activate'}</button>
        </td>
    `;
    categoryTable.appendChild(row);
}

toggleFormBtn.addEventListener('click', toggleForm);
cancelBtn.addEventListener('click', closeForm);

categoryForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('categoryName').value.trim();
    const optionalField = document.getElementById('optionalField').value.trim();
    const status = categoryForm.querySelector('input[name="status"]:checked').value;
    if (!name) return;

    if (editingRow) {
        updateRowValues(editingRow, name, optionalField, status);
        showResponse('Category updated successfully');
    } else {
        createRow(name, optionalField, status);
        showResponse('Category added successfully');
    }

    closeForm();
});

categoryTable.addEventListener('click', function (event) {
    if (event.target.matches('.edit-btn')) {
        const row = event.target.closest('tr');
        editingRow = row;
        const name = row.children[0].textContent;
        const optionalField = row.children[1].textContent === '-' ? '' : row.children[1].textContent;
        const status = row.querySelector('.status-chip').textContent;
        document.getElementById('categoryName').value = name;
        document.getElementById('optionalField').value = optionalField;
        categoryForm.querySelector(`input[name="status"][value="${status}"]`).checked = true;
        openForm(true);
    }

    if (event.target.matches('.activate-btn') || event.target.matches('.deactivate-btn')) {
        const row = event.target.closest('tr');
        const statusChip = row.querySelector('.status-chip');
        const isActive = event.target.matches('.deactivate-btn');
        const newStatus = isActive ? 'Inactive' : 'Active';
        updateRowValues(row, row.children[0].textContent, row.children[1].textContent === '-' ? '' : row.children[1].textContent, newStatus);
    }
});