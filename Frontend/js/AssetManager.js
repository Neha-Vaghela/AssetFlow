document.addEventListener('DOMContentLoaded', () => {
    
    // --- SIDEBAR DROPDOWN ACCORDION TOGGLERS ---
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const dropdownContent = this.nextElementSibling;
            const arrow = this.querySelector('span');
            
            if (dropdownContent.style.display === "block") {
                dropdownContent.style.display = "none";
                arrow.textContent = "▼";
            } else {
                dropdownContent.style.display = "block";
                arrow.textContent = "▲";
            }
        });
    });

    // --- CHART 1: PIE CHART (Asset Distribution) ---
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Available', 'Allocated', 'Maintenance'],
            datasets: [{
                data: [65, 45, 10],
                backgroundColor: [
                    '#22C55E', // Green for Available
                    '#3B82F6', // Blue for Allocated
                    '#EF4444'  // Red for Maintenance
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

    // --- CHART 2: BAR CHART (Assets by Category) ---
    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Laptop', 'Monitor', 'Printer', 'Projector'],
            datasets: [{
                label: 'Count',
                data: [70, 50, 30, 20],
                backgroundColor: '#7C3AED', // Consistent purple match
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#64748B' },
                    grid: { display: false }
                },
                x: {
                    ticks: { color: '#64748B' },
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { display: false } // Hidden because the graph title serves label context
            }
        }
    });
});