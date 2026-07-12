const assetForm = document.getElementById('assetForm');
const assetTableBody = document.querySelector('#assetTable tbody');
const addAssetBtn = document.getElementById('addAssetBtn');
const editAssetBtn = document.getElementById('editAssetBtn');
const deleteAssetBtn = document.getElementById('deleteAssetBtn');
const viewAssetBtn = document.getElementById('viewAssetBtn');
const assetPreview = document.getElementById('assetPreview');
const assetPreviewEmpty = document.getElementById('previewEmpty');
const previewImage = document.getElementById('previewImage');
const previewName = document.getElementById('previewName');
const previewCategory = document.getElementById('previewCategory');
const previewSerial = document.getElementById('previewSerial');
const previewDate = document.getElementById('previewDate');
const previewLocation = document.getElementById('previewLocation');
const previewCondition = document.getElementById('previewCondition');
const previewShared = document.getElementById('previewShared');
const previewUrl = document.getElementById('previewUrl');

const assetNameInput = document.getElementById('assetName');
const assetCategoryInput = document.getElementById('assetCategory');
const assetSerialInput = document.getElementById('assetSerial');
const purchaseDateInput = document.getElementById('purchaseDate');
const assetLocationInput = document.getElementById('assetLocation');
const assetConditionInput = document.getElementById('assetCondition');
const photoUrlInput = document.getElementById('photoUrl');

let assets = [];
let selectedAssetId = null;
let isEditing = false;

function resetForm() {
    assetForm.reset();
    selectedAssetId = null;
    isEditing = false;
    editAssetBtn.hidden = true;
    deleteAssetBtn.hidden = true;
    previewCard(false);
}

function previewCard(show) {
    if (show) {
        assetPreview.hidden = false;
        assetPreviewEmpty.hidden = true;
    } else {
        assetPreview.hidden = true;
        assetPreviewEmpty.hidden = false;
    }
}

function renderTable() {
    assetTableBody.innerHTML = '';

    assets.forEach(asset => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${asset.name}</td>
            <td>${asset.category}</td>
            <td>${asset.serial}</td>
            <td>${asset.location}</td>
            <td>${asset.condition}</td>
            <td>${asset.shared}</td>
            <td>
                <div class="action-buttons">
                    <button class="view-btn" data-id="${asset.id}">View</button>
                    <button class="edit-btn" data-id="${asset.id}">Edit</button>
                    <button class="delete-btn" data-id="${asset.id}">Delete</button>
                </div>
            </td>
        `;
        assetTableBody.appendChild(row);
    });
}

function safeUuid() {
    if (window.crypto && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    return 'asset-' + Math.random().toString(36).substring(2, 10) + '-' + Date.now().toString(36);
}

function getFormData() {
    const sharedResource = document.querySelector('input[name="sharedResource"]:checked').value;
    return {
        id: selectedAssetId || safeUuid(),
        name: assetNameInput.value.trim(),
        category: assetCategoryInput.value,
        serial: assetSerialInput.value.trim(),
        purchaseDate: purchaseDateInput.value,
        location: assetLocationInput.value.trim(),
        condition: assetConditionInput.value,
        shared: sharedResource,
        photoUrl: photoUrlInput.value.trim()
    };
}

function populatePreview(asset) {
    previewName.textContent = asset.name;
    previewCategory.textContent = asset.category;
    previewSerial.textContent = asset.serial;
    previewDate.textContent = asset.purchaseDate;
    previewLocation.textContent = asset.location;
    previewCondition.textContent = asset.condition;
    previewShared.textContent = asset.shared;
    previewUrl.textContent = asset.photoUrl || 'No URL provided';
    previewUrl.href = asset.photoUrl || '#';

    if (asset.photoUrl) {
        previewImage.src = asset.photoUrl;
        previewImage.hidden = false;
    } else {
        previewImage.hidden = true;
        previewImage.src = '';
    }

    previewCard(true);
}

function fillForm(asset) {
    assetNameInput.value = asset.name;
    assetCategoryInput.value = asset.category;
    assetSerialInput.value = asset.serial;
    purchaseDateInput.value = asset.purchaseDate;
    assetLocationInput.value = asset.location;
    assetConditionInput.value = asset.condition;
    photoUrlInput.value = asset.photoUrl;
    document.querySelector(`input[name="sharedResource"][value="${asset.shared}"]`).checked = true;

    selectedAssetId = asset.id;
    isEditing = true;
    editAssetBtn.hidden = false;
    deleteAssetBtn.hidden = false;
}

assetForm.addEventListener('submit', event => {
    event.preventDefault();
    const assetData = getFormData();

    if (!assetData.name || !assetData.category || !assetData.serial || !assetData.purchaseDate || !assetData.location || !assetData.condition) {
        alert('Please fill in all required fields before adding the asset.');
        return;
    }

    assets.push(assetData);
    renderTable();
    resetForm();
});

assetTableBody.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;

    const assetId = button.dataset.id;
    const asset = assets.find(item => item.id === assetId);
    if (!asset) return;

    if (button.classList.contains('view-btn')) {
        populatePreview(asset);
        selectedAssetId = asset.id;
        editAssetBtn.hidden = false;
        deleteAssetBtn.hidden = false;
    }

    if (button.classList.contains('edit-btn')) {
        fillForm(asset);
        populatePreview(asset);
    }

    if (button.classList.contains('delete-btn')) {
        assets = assets.filter(item => item.id !== assetId);
        renderTable();
        resetForm();
    }
});

editAssetBtn.addEventListener('click', () => {
    if (!isEditing || !selectedAssetId) return;

    const updatedAsset = getFormData();
    assets = assets.map(item => item.id === selectedAssetId ? updatedAsset : item);
    renderTable();
    resetForm();
});

deleteAssetBtn.addEventListener('click', () => {
    if (!selectedAssetId) return;
    assets = assets.filter(item => item.id !== selectedAssetId);
    renderTable();
    resetForm();
});

viewAssetBtn.addEventListener('click', () => {
    if (!selectedAssetId) {
        alert('Select an asset from the table first, or click View on a row.');
        return;
    }
    const asset = assets.find(item => item.id === selectedAssetId);
    if (asset) {
        populatePreview(asset);
    }
});

resetForm();
renderTable();
