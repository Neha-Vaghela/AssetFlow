const assetListBody = document.getElementById('assetListBody');
const btnCreateMaintenance = document.getElementById('btnCreateMaintenance');
const btnRequestTransfer = document.getElementById('btnRequestTransfer');
const btnRequestReturn = document.getElementById('btnRequestReturn');

const assets = [
    {
        name: 'Dell Latitude 5520',
        category: 'Laptop',
        serial: 'DL-6234',
        purchaseDate: '2024-01-12',
        location: 'Mumbai Office',
        condition: 'Good',
        shared: 'No',
        status: 'In Use',
        photo: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=120&q=80'
    },
    {
        name: 'HP E243 Monitor',
        category: 'Monitor',
        serial: 'HP-7590',
        purchaseDate: '2023-09-05',
        location: 'Mumbai Office',
        condition: 'Excellent',
        shared: 'Yes',
        status: 'Available',
        photo: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=120&q=80'
    },
    {
        name: 'Logitech MX Keys',
        category: 'Keyboard',
        serial: 'LG-2310',
        purchaseDate: '2024-03-22',
        location: 'Mumbai Office',
        condition: 'Fair',
        shared: 'No',
        status: 'Assigned',
        photo: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=120&q=80'
    }
];

function renderAssets() {
    assetListBody.innerHTML = assets.map(asset => `
        <tr>
            <td>${asset.name}</td>
            <td>${asset.category}</td>
            <td>${asset.serial}</td>
            <td>${asset.purchaseDate}</td>
            <td>${asset.location}</td>
            <td>${asset.condition}</td>
            <td>${asset.shared}</td>
            <td>${asset.status}</td>
            <td><img class="asset-photo" src="${asset.photo}" alt="${asset.name}"></td>
        </tr>
    `).join('');
}

btnCreateMaintenance.addEventListener('click', () => alert('Raise Maintenance Request clicked'));
btnRequestTransfer.addEventListener('click', () => alert('Request Transfer clicked'));
btnRequestReturn.addEventListener('click', () => alert('Request Return clicked'));

renderAssets();
