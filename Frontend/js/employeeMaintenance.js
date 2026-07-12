const employeeMaintenanceForm = document.getElementById('employeeMaintenanceForm');
const employeeMaintenanceBody = document.getElementById('employeeMaintenanceBody');
const employeeAsset = document.getElementById('employeeAsset');
const employeePriority = document.getElementById('employeePriority');
const employeeIssue = document.getElementById('employeeIssue');
const employeePhoto = document.getElementById('employeePhoto');
const employeePhotoPreview = document.getElementById('employeePhotoPreview');

const maintenanceRequests = [
    {
        asset: 'AF-0003',
        issue: 'Screen Flickering',
        priority: 'High',
        status: 'Pending',
        photo: null
    },
    {
        asset: 'AF-0005',
        issue: 'Keyboard Not Responding',
        priority: 'Medium',
        status: 'Approved',
        photo: null
    }
];

function renderMaintenanceRequests() {
    employeeMaintenanceBody.innerHTML = maintenanceRequests.map(request => `
        <tr>
            <td>${request.asset}</td>
            <td>${request.issue}</td>
            <td>${request.priority}</td>
            <td>${request.status}</td>
            <td>${request.photo ? `<img class="asset-photo" src="${request.photo}" alt="${request.asset}">` : '—'}</td>
        </tr>
    `).join('');
}

function resetForm() {
    employeeMaintenanceForm.reset();
    employeePhotoPreview.textContent = 'No photo';
    employeePhotoPreview.style.backgroundImage = '';
    delete employeePhotoPreview.dataset.url;
}

employeePhoto.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) {
        employeePhotoPreview.textContent = 'No photo';
        return;
    }
    const reader = new FileReader();
    reader.onload = function (event) {
        employeePhotoPreview.innerHTML = `<img class="asset-photo" src="${event.target.result}" alt="preview">`;
        employeePhotoPreview.dataset.url = event.target.result;
    };
    reader.readAsDataURL(file);
});

employeeMaintenanceForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const request = {
        asset: employeeAsset.value,
        issue: employeeIssue.value.trim(),
        priority: employeePriority.value,
        status: 'Pending',
        photo: employeePhotoPreview.dataset.url || null
    };
    maintenanceRequests.unshift(request);
    renderMaintenanceRequests();
    resetForm();
});

renderMaintenanceRequests();
