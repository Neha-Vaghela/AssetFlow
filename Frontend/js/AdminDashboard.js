document.addEventListener('DOMContentLoaded', () => {

    // --- CHART 1: PIE CHART (Asset Distribution) ---
    const adminPieCtx = document.getElementById('adminPieChart').getContext('2d');
    new Chart(adminPieCtx, {
        type: 'pie',
        data: {
            labels: ['Available', 'Allocated', 'Maintenance'],
            datasets: [{
                data: [80, 30, 10],
                backgroundColor: [
                    '#10B981', // Emerald green
                    '#3B82F6', // Blue
                    '#EF4444'  // Red
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#1E293B', font: { weight: 'bold' } }
                }
            }
        }
    });

    // --- CHART 2: BAR CHART (Department-wise Assets) ---
    const adminBarCtx = document.getElementById('adminBarChart').getContext('2d');
    new Chart(adminBarCtx, {
        type: 'bar',
        data: {
            labels: ['IT', 'HR', 'Finance', 'Operations'],
            datasets: [{
                label: 'Assets Managed',
                data: [55, 20, 15, 30],
                backgroundColor: '#7C3AED', // Sleek matching purple
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#475569' },
                    grid: { display: false }
                },
                x: {
                    ticks: { color: '#475569' },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
});