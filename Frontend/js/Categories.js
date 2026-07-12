document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('categoryModal');
    const categoryForm = document.getElementById('categoryForm');
    const modalTitle = document.getElementById('modalTitle');
    const toast = document.getElementById('toastNotification');
    const tableBody = document.getElementById('categoryTableBody');

    // Form Fields
    const categoryIdInput = document.getElementById('categoryId');
    const nameInput = document.getElementById('categoryName');
    const fieldInput = document.getElementById('optionalField');
    const statusInput = document.getElementById('categoryStatus');

    let isEditMode = false;
    let activeRowToEdit = null;

    // --- OPEN MODAL FOR ADDING ---
    document.getElementById('openAddModalBtn').addEventListener('click', () => {
        isEditMode = false;
        categoryForm.reset();
        categoryIdInput.value = '';
        modalTitle.textContent = "Add New Category";
        modal.classList.remove('hidden');
    });

    // --- CLOSE MODAL ACTION ---
    document.getElementById('closeModalBtn').addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // --- OPEN MODAL FOR EDITING (EVENT DELEGATION) ---
    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-edit')) {
            isEditMode = true;
            activeRowToEdit = e.target.closest('tr');

            // Extract existing values from row strings
            const currentName = activeRowToEdit.querySelector('.cat-name').textContent;
            const currentField = activeRowToEdit.querySelector('.cat-field').textContent;
            const currentStatus = activeRowToEdit.querySelector('.status').textContent;

            // Pre-fill the input fields inside form template
            categoryIdInput.value = activeRowToEdit.dataset.id;
            nameInput.value = currentName;
            fieldInput.value = currentField;
            statusInput.value = currentStatus;

            modalTitle.textContent = "Edit Category";
            modal.classList.remove('hidden');
        }
    });

    // --- FORM SUBMIT SYSTEM ROUTER ---
    categoryForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameValue = nameInput.value;
        const fieldValue = fieldInput.value || 'N/A';
        const statusValue = statusInput.value;
        const statusClass = statusValue === 'Active' ? 'badge-active' : 'badge-inactive';

        if (isEditMode && activeRowToEdit) {
            // Update Table Row Data fields
            activeRowToEdit.querySelector('.cat-name').textContent = nameValue;
            activeRowToEdit.querySelector('.cat-field').textContent = fieldValue;
            
            const statusSpan = activeRowToEdit.querySelector('.status');
            statusSpan.textContent = statusValue;
            statusSpan.className = `status ${statusClass}`;

            showToast("Category updated successfully!");
        } else {
            // Append/Create New Element entry row
            const newId = Date.now(); // Quick runtime dynamic token ID assignment
            const newRow = document.createElement('tr');
            newRow.setAttribute('data-id', newId);
            newRow.innerHTML = `
                <td class="cat-name">${nameValue}</td>
                <td class="cat-field">${fieldValue}</td>
                <td><span class="status ${statusClass}">${statusValue}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="btn-edit">Edit</button>
                    </div>
                </td>
            `;
            tableBody.appendChild(newRow);
            showToast("Category added successfully!");
        }

        modal.classList.add('hidden');
    });

    // --- SUCCESS TOAST ANIMATOR ACTION ---
    function showToast(message) {
        toast.textContent = message;
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000); // Fades out alert notification precisely after 3 seconds
    }
});