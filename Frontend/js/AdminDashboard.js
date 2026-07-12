document.addEventListener('DOMContentLoaded', async () => {


    // Get backend data
    const dashboard = await getDashboardData();


    console.log("Dashboard Data:", dashboard);



    if (!dashboard) {
        console.log("No dashboard data found");
        return;
    }



    // ============================
    // UPDATE KPI CARDS
    // ============================

    const cardValues = document.querySelectorAll(".kpi-card p");


    cardValues[0].innerText = dashboard.cards.totalAssets;

    cardValues[1].innerText = dashboard.cards.availableAssets;

    cardValues[2].innerText = dashboard.cards.allocatedAssets;

    cardValues[3].innerText = dashboard.cards.maintenanceToday;

    cardValues[4].innerText = dashboard.cards.activeBookings;

    cardValues[5].innerText = dashboard.cards.pendingTransfers;

    cardValues[6].innerText = dashboard.cards.upcomingReturns;

    cardValues[7].innerText = dashboard.cards.overdueReturns;





    // ============================
    // CHART 1: PIE CHART
    // ============================


    const adminPieCtx = document
        .getElementById('adminPieChart')
        .getContext('2d');


    new Chart(adminPieCtx, {


        type: 'pie',


        data: {


            labels: [
                'Available',
                'Allocated',
                'Maintenance'
            ],


            datasets: [{


                data: [

                    dashboard.assetDistribution.available,

                    dashboard.assetDistribution.allocated,

                    dashboard.assetDistribution.maintenance

                ],


                backgroundColor: [

                    '#10B981',

                    '#3B82F6',

                    '#EF4444'

                ],


                borderWidth: 0


            }]

        },


        options: {


            responsive: true,


            plugins: {


                legend: {


                    position: 'bottom',


                    labels: {

                        color: '#1E293B',

                        font: {

                            weight: 'bold'

                        }

                    }


                }


            }


        }


    });







    // ============================
    // CHART 2: BAR CHART
    // ============================



    const adminBarCtx = document
        .getElementById('adminBarChart')
        .getContext('2d');



    const departmentLabels =
        dashboard.departmentWiseAssets.map(
            item => item.department
        );


    const departmentValues =
        dashboard.departmentWiseAssets.map(
            item => item.totalAssets
        );



    new Chart(adminBarCtx, {



        type: 'bar',



        data: {



            labels: departmentLabels,



            datasets: [{


                label: 'Assets Managed',


                data: departmentValues,


                backgroundColor: '#7C3AED',


                borderRadius: 6


            }]



        },



        options: {



            responsive: true,



            scales: {



                y: {


                    beginAtZero: true,


                    ticks: {

                        color: '#475569'

                    },


                    grid: {

                        display: false

                    }


                },



                x: {


                    ticks: {

                        color: '#475569'

                    },


                    grid: {

                        display: false

                    }


                }


            },



            plugins: {


                legend: {


                    display: false


                }


            }



        }



    });



});