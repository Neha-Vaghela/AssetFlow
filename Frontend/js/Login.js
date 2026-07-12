const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    try {

        const response = await fetch(
            "http://localhost:3000/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    role
                })
            }
        );

        const data = await response.json();

        if (data.success) {

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            alert("Login Successful!");

            const role = data.user.role;

if (role === "Admin") {
    window.location.href = "admin.html";
}
else if (role === "Asset Manager") {
    window.location.href = "AssetManager.html";
}
else if (role === "Department Head") {
    window.location.href = "DepartmentHead.html";
}
else {
    window.location.href = "Employee.html";
}

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to server");

    }
});