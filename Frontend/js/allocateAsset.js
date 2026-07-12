const allocationForm = document.getElementById('allocationForm');
const allocationTableBody = document.querySelector('#allocationTable tbody');
const selectAsset = document.getElementById('selectAsset');
const selectEmployee = document.getElementById('selectEmployee');
const expectedReturnDate = document.getElementById('expectedReturnDate');
const allocationNotes = document.getElementById('allocationNotes');
const returnAssetBtn = document.getElementById('returnAssetBtn');
const transferAssetBtn = document.getElementById('transferAssetBtn');

const allocations = [];

function renderAllocations() {
    allocationTableBody.innerHTML = '';

    allocations.forEach((allocation, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${allocation.asset}</td>
            <td>${allocation.employee}</td>
            <td>${allocation.returnDate || 'N/A'}</td>
            <td>${allocation.notes || '-'}</td>
        `;
        allocationTableBody.appendChild(row);
    });
}

function resetForm() {
    selectAsset.value = '';
    selectEmployee.value = '';
    expectedReturnDate.value = '';
    allocationNotes.value = '';
}

allocationForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const newAllocation = {
        asset: selectAsset.value,
        employee: selectEmployee.value,
        status: 'Assigned',
        returnDate: expectedReturnDate.value,
        notes: allocationNotes.value.trim(),
    };

    allocations.push(newAllocation);
    renderAllocations();
    resetForm();
});

returnAssetBtn.addEventListener('click', function () {
    const activeAllocation = allocations.find((allocation) => allocation.status === 'Assigned');

    if (!activeAllocation) {
        alert('No assigned asset to return.');
        return;
    }

    activeAllocation.status = 'Returned';
    renderAllocations();
});

transferAssetBtn.addEventListener('click', function () {
    const activeAllocation = allocations.find((allocation) => allocation.status === 'Assigned');

    if (!activeAllocation) {
        alert('No assigned asset available for transfer.');
        return;
    }

    const nextEmployee = prompt('Enter the name of the employee to transfer the asset to:');
    if (!nextEmployee) {
        return;
    }

    activeAllocation.employee = nextEmployee;
    activeAllocation.status = 'Transferred';
    renderAllocations();
});

renderAllocations();
