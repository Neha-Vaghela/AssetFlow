const API_URL = "http://localhost:3000/api";

const token = localStorage.getItem("token");

const toggleAddEmployeeBtn = document.getElementById("toggleAddEmployeeBtn");
const togglePromoteBtn = document.getElementById("togglePromoteBtn");

const addEmployeePanel = document.getElementById("addEmployeePanel");
const promotePanel = document.getElementById("promotePanel");

const cancelAddBtn = document.getElementById("cancelAddBtn");
const cancelPromoteBtn = document.getElementById("cancelPromoteBtn");

const addEmployeeForm = document.getElementById("addEmployeeForm");
const promoteForm = document.getElementById("promoteForm");

const employeeUser = document.getElementById("employeeUser");
const employeeDepartment = document.getElementById("employeeDepartment");

const selectEmployee = document.getElementById("selectEmployee");
const selectRole = document.getElementById("selectRole");

const employeeTable = document.getElementById("employeeTable");
const responseMessage = document.getElementById("responseMessage");

function showMessage(message) {
    responseMessage.textContent = message;

    responseMessage.classList.add("visible");

    setTimeout(() => {
        responseMessage.classList.remove("visible");
    }, 3000);
}

function closePanels() {
    addEmployeePanel.setAttribute("hidden", "");
    promotePanel.setAttribute("hidden", "");

    toggleAddEmployeeBtn.textContent = "+ Add Employee";
}

toggleAddEmployeeBtn.addEventListener("click", () => {

    if (addEmployeePanel.hasAttribute("hidden")) {

        addEmployeePanel.removeAttribute("hidden");
        promotePanel.setAttribute("hidden", "");

    } else {

        addEmployeePanel.setAttribute("hidden", "");

    }

});

togglePromoteBtn.addEventListener("click", () => {

    if (promotePanel.hasAttribute("hidden")) {

        promotePanel.removeAttribute("hidden");
        addEmployeePanel.setAttribute("hidden", "");

    } else {

        promotePanel.setAttribute("hidden", "");

    }

});

cancelAddBtn.addEventListener("click", closePanels);
cancelPromoteBtn.addEventListener("click", closePanels);

async function loadUsers() {

    try {

        const response = await fetch(
            `${API_URL}/users/all`
        );

        const data = await response.json();

        employeeUser.innerHTML =
            '<option value="">Select User</option>';

        selectEmployee.innerHTML =
            '<option value="">Choose Employee</option>';

        data.users.forEach(user => {

            employeeUser.innerHTML += `
                <option value="${user._id}">
                    ${user.name} (${user.email})
                </option>
            `;

            selectEmployee.innerHTML += `
                <option value="${user._id}">
                    ${user.name}
                </option>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

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

        employeeDepartment.innerHTML =
            '<option value="">Select Department</option>';

        data.data.forEach(department => {

            employeeDepartment.innerHTML += `
                <option value="${department._id}">
                    ${department.departmentName}
                </option>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}
async function loadEmployees() {

    try {

        const response = await fetch(
            `${API_URL}/employees/list`
        );

        const data = await response.json();

        employeeTable.innerHTML = "";

        data.employees.forEach(employee => {

            employeeTable.innerHTML += `
                <tr data-id="${employee._id}">
                    <td>${employee.user.name}</td>
                    <td>${employee.user.email}</td>
                    <td>${employee.department.departmentName}</td>
                    <td>${employee.user.role}</td>
                    <td>
                        <span class="status-chip ${employee.status.toLowerCase()}">
                            ${employee.status}
                        </span>
                    </td>
                    <td>
                        <button class="edit-btn">
                            Edit
                        </button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

addEmployeeForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const userId =
            employeeUser.value;

        const department =
            employeeDepartment.value;

        const status =
            document.querySelector(
                'input[name="employeeStatus"]:checked'
            ).value;

        try {

            const response = await fetch(
                `${API_URL}/employees/add`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        userId,
                        department,
                        status
                    })
                }
            );

            const data = await response.json();

            if (!data.success) {

                showMessage(data.message);
                return;

            }

            showMessage(
                "Employee Added Successfully"
            );

            addEmployeeForm.reset();

            closePanels();

            loadEmployees();

        } catch (error) {

            console.log(error);

        }

    }
);

promoteForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        const userId =
            selectEmployee.value;

        const role =
            selectRole.value;

        try {

            const response = await fetch(
                `${API_URL}/employees/change-role`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        userId,
                        role
                    })
                }
            );

            const data = await response.json();

            if (!data.success) {

                showMessage(data.message);
                return;

            }

            showMessage(
                "Role Updated Successfully"
            );

            promoteForm.reset();

            closePanels();

            loadEmployees();

        } catch (error) {

            console.log(error);

        }

    }
);

loadUsers();
loadDepartments();
loadEmployees();