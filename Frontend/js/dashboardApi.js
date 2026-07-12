const API_URL = "http://localhost:3000/api/dashboard";


async function getDashboardData(){

    try{

        const token = localStorage.getItem("token");


        const response = await fetch(API_URL,{

            method:"GET",

            headers:{
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json"
            }

        });


        const result = await response.json();


        return result.data;


    }
    catch(error){

        console.log(
            "Dashboard API Error:",
            error
        );

    }

}