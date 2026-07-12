const API_URL = "http://localhost:3000/api";

const token = localStorage.getItem("token");

const toggleFormBtn = document.getElementById("toggleFormBtn");
const cancelBtn = document.getElementById("cancelBtn");
const addDepartmentPanel = document.getElementById("addDepartmentPanel");
const departmentForm = document.getElementById("departmentForm");
const departmentTable = document.getElementById("departmentTable");
const responseMessage = document.getElementById("responseMessage");


// ---------------------
// Toggle Form
// ---------------------

toggleFormBtn.addEventListener("click", () => {
    addDepartmentPanel.toggleAttribute("hidden");

    toggleFormBtn.textContent =
        addDepartmentPanel.hasAttribute("hidden")
            ? "+ Add Department"
            : "− Close Form";
});

cancelBtn.addEventListener("click", () => {
    addDepartmentPanel.setAttribute("hidden", "");
    toggleFormBtn.textContent = "+ Add Department";
});


// ---------------------
// Show Message
// ---------------------

function showMessage(message) {
    responseMessage.textContent = message;

    responseMessage.classList.add("visible");

    setTimeout(() => {
        responseMessage.classList.remove("visible");
    }, 3000);
}


// ---------------------
// Load Employees
// ---------------------

async function loadEmployees() {

    try {

        const response = await fetch(
            `${API_URL}/employees/list`
        );

        const data = await response.json();

        const departmentHead =
            document.getElementById("departmentHead");

        departmentHead.innerHTML =
            `<option value="">Select Department Head</option>`;

        data.employees.forEach(emp => {

            const option =
                document.createElement("option");

            option.value = emp.user._id;
            option.textContent = emp.user.name;

            departmentHead.appendChild(option);

        });

    } catch (error) {

        console.log(error);

    }

}


// ---------------------
// Load Departments Dropdown
// ---------------------

async function loadDepartmentDropdown() {

    try {

        const response = await fetch(
            `${API_URL}/departments/all`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        const parentDepartment =
            document.getElementById("parentDepartment");

        parentDepartment.innerHTML =
            `<option value="">None</option>`;

        data.data.forEach(dep => {

            const option =
                document.createElement("option");

            option.value = dep._id;
            option.textContent =
                dep.departmentName;

            parentDepartment.appendChild(option);

        });

    } catch (error) {

        console.log(error);

    }

}


// ---------------------
// Load Department Table
// ---------------------

async function loadDepartments() {

    try {

        const response = await fetch(
            `${API_URL}/departments/all`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        departmentTable.innerHTML = "";

        data.data.forEach(dep => {

            departmentTable.innerHTML += `
                <tr>

                    <td>${dep.departmentName}</td>

                    <td>
                        ${dep.departmentHead?.name || "-"}
                    </td>

                    <td>
                        ${
                            dep.parentDepartment?.departmentName
                            || "-"
                        }
                    </td>

                    <td>
                        <span class="${
                            dep.status === "Active"
                                ? "active"
                                : "inactive"
                        }">
                            ${dep.status}
                        </span>
                    </td>

                    <td>

                        <button
                            class="deactivate-btn"
                            onclick="deactivateDepartment('${dep._id}')"
                        >
                            Deactivate
                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}


// ---------------------
// Create Department
// ---------------------

departmentForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const departmentName =
            document.getElementById("departmentName").value;

        const departmentHead =
            document.getElementById("departmentHead").value;

        const parentDepartment =
            document.getElementById("parentDepartment").value;

        const status =
            document.querySelector(
                'input[name="status"]:checked'
            ).value;

        try {

            const response = await fetch(
                `${API_URL}/departments/create`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        departmentName,
                        departmentHead,
                        parentDepartment,
                        status
                    })
                }
            );

            const data =
                await response.json();

            if (!data.success) {

                return showMessage(
                    data.message
                );

            }

            showMessage(
                "Department created successfully"
            );

            departmentForm.reset();

            addDepartmentPanel.setAttribute(
                "hidden",
                ""
            );

            toggleFormBtn.textContent =
                "+ Add Department";

            loadDepartments();
            loadDepartmentDropdown();

        } catch (error) {

            console.log(error);

        }

    }
);


// ---------------------
// Deactivate Department
// ---------------------

async function deactivateDepartment(id) {

    try {

        const response = await fetch(
            `${API_URL}/departments/deactivate/${id}`,
            {
                method: "PATCH",

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        const data =
            await response.json();

        showMessage(data.message);

        loadDepartments();

    } catch (error) {

        console.log(error);

    }

}


// ---------------------
// Initial Load
// ---------------------

loadEmployees();
loadDepartmentDropdown();
loadDepartments();