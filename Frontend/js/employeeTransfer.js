const transferRequestForm = document.getElementById('transferRequestForm');
const transferRequestBody = document.getElementById('transferRequestBody');
const transferAsset = document.getElementById('transferAsset');
const transferDepartment = document.getElementById('transferDepartment');
const transferReason = document.getElementById('transferReason');

const transferRequests = [
    { asset: 'AF-0002', department: 'HR', date: '12/07/2026', status: 'Pending' },
    { asset: 'AF-0004', department: 'Finance', date: '10/07/2026', status: 'Approved' }
];

function renderTransferRequests() {
    transferRequestBody.innerHTML = transferRequests.map(request => `
        <tr>
            <td>${request.asset}</td>
            <td>${request.department}</td>
            <td>${request.date}</td>
            <td>${request.status}</td>
        </tr>
    `).join('');
}

transferRequestForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    transferRequests.unshift({
        asset: transferAsset.value,
        department: transferDepartment.value,
        date: formattedDate,
        status: 'Pending'
    });
    renderTransferRequests();
    alert('Transfer Request Submitted Successfully');
    transferRequestForm.reset();
});

renderTransferRequests();
