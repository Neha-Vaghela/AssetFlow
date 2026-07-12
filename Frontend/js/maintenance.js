const maintenanceForm = document.getElementById('maintenanceForm');
const maintenanceTableBody = document.querySelector('#maintenanceTable tbody');
const assetId = document.getElementById('assetId');
const issueDesc = document.getElementById('issueDesc');
const priority = document.getElementById('priority');
const photoUpload = document.getElementById('photoUpload');
const photoPreview = document.getElementById('photoPreview');

const records = [
    { asset: 'AF-0003', issue: 'Screen Flicker', priority: 'High', status: 'Pending', photo: null },
    { asset: 'AF-0005', issue: 'Keyboard Issue', priority: 'Medium', status: 'Approved', photo: null }
];

let selectedIndex = null;

const btnApproveSelected = document.getElementById('btnApproveSelected');
const btnRejectSelected = document.getElementById('btnRejectSelected');
const btnResolveSelected = document.getElementById('btnResolveSelected');
const selectedInfo = document.getElementById('selectedInfo');

function renderRecords() {
    maintenanceTableBody.innerHTML = '';
    records.forEach((rec, idx) => {
        const tr = document.createElement('tr');
        tr.dataset.idx = idx;
        if (selectedIndex === idx) tr.classList.add('selected-row');
        const photoCell = rec.photo ? `<img src="${rec.photo}" alt="photo" style="height:48px;border-radius:6px">` : '—';
        tr.innerHTML = `
            <td>${rec.asset}</td>
            <td>${rec.issue}</td>
            <td>${rec.priority}</td>
            <td>${rec.status}</td>
            <td>${photoCell}</td>
        `;
        maintenanceTableBody.appendChild(tr);
    });
    updateActionBar();
}

function resetForm() {
    maintenanceForm.reset();
    photoPreview.textContent = 'No photo';
    photoPreview.style.backgroundImage = '';
}

photoUpload.addEventListener('change', function (e) {
    const file = e.target.files && e.target.files[0];
    if (!file) { photoPreview.textContent = 'No photo'; return; }
    const reader = new FileReader();
    reader.onload = function (ev) {
        photoPreview.innerHTML = `<img src="${ev.target.result}" alt="preview" style="max-height:92px;max-width:100%;border-radius:6px">`;
        photoPreview.dataset.url = ev.target.result;
    };
    reader.readAsDataURL(file);
});

maintenanceForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const newRec = {
        asset: assetId.value,
        issue: issueDesc.value.trim(),
        priority: priority.value,
        status: 'Pending',
        photo: photoPreview.dataset.url || null
    };
    records.unshift(newRec);
    renderRecords();
    resetForm();
});

// row click selects the record
maintenanceTableBody.addEventListener('click', function (e) {
    const tr = e.target.closest('tr');
    if (!tr) return;
    const idx = Number(tr.dataset.idx);
    if (Number.isFinite(idx)) {
        selectRow(idx);
    }
});

function selectRow(idx) {
    if (selectedIndex === idx) {
        selectedIndex = null; // toggle off
    } else {
        selectedIndex = idx;
    }
    renderRecords();
}

function updateActionBar() {
    if (selectedIndex === null) {
        selectedInfo.textContent = 'None';
        btnApproveSelected.disabled = true;
        btnRejectSelected.disabled = true;
        btnResolveSelected.disabled = true;
    } else {
        const rec = records[selectedIndex];
        selectedInfo.textContent = `${rec.asset} — ${rec.issue} (${rec.status})`;
        btnApproveSelected.disabled = false;
        btnRejectSelected.disabled = false;
        btnResolveSelected.disabled = false;
    }
}

btnApproveSelected.addEventListener('click', function () {
    if (selectedIndex === null) return;
    records[selectedIndex].status = 'Approved';
    renderRecords();
});

btnRejectSelected.addEventListener('click', function () {
    if (selectedIndex === null) return;
    records[selectedIndex].status = 'Rejected';
    renderRecords();
});

btnResolveSelected.addEventListener('click', function () {
    if (selectedIndex === null) return;
    records[selectedIndex].status = 'Resolved';
    renderRecords();
});

renderRecords();
