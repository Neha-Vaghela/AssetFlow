const API_URL = "http://localhost:3000/api/category";

const token = localStorage.getItem("token");

const toggleFormBtn = document.getElementById("toggleFormBtn");
const cancelBtn = document.getElementById("cancelBtn");
const categoryFormPanel = document.getElementById("categoryFormPanel");
const categoryForm = document.getElementById("categoryForm");
const categoryTable = document.getElementById("categoryTable");
const responseMessage = document.getElementById("responseMessage");

const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const saveBtn = document.querySelector(".save-btn");

let editingCategoryId = null;


// ======================
// MESSAGE
// ======================

function showMessage(message) {

    responseMessage.textContent = message;

    responseMessage.classList.add("visible");

    setTimeout(() => {
        responseMessage.classList.remove("visible");
    }, 3000);

}


// ======================
// FORM OPEN/CLOSE
// ======================

toggleFormBtn.addEventListener("click", () => {

    categoryFormPanel.toggleAttribute("hidden");

    toggleFormBtn.textContent =
        categoryFormPanel.hasAttribute("hidden")
            ? "+ Add Category"
            : "− Close Form";

});

cancelBtn.addEventListener("click", resetForm);


function resetForm() {

    categoryForm.reset();

    editingCategoryId = null;

    formTitle.textContent =
        "Add New Category";

    formSubtitle.textContent =
        "Enter category details and optional field information.";

    saveBtn.textContent =
        "Save Category";

    categoryFormPanel.setAttribute(
        "hidden",
        ""
    );

    toggleFormBtn.textContent =
        "+ Add Category";

}


// ======================
// LOAD CATEGORIES
// ======================

async function loadCategories() {

    try {

        const response = await fetch(
            `${API_URL}/list`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        const data =
            await response.json();

        categoryTable.innerHTML = "";

        data.categories.forEach(category => {

            categoryTable.innerHTML += `
            
            <tr>

                <td>${category.categoryName}</td>

                <td>
                    ${
                        category.optionalField
                        || "-"
                    }
                </td>

                <td>
                    <span class="
                        status-chip
                        ${
                            category.status === "Active"
                            ? "active"
                            : "inactive"
                        }
                    ">
                        ${category.status}
                    </span>
                </td>

                <td>

                    <button
                        class="edit-btn"
                        onclick="editCategory(
                            '${category._id}',
                            '${category.categoryName}',
                            '${category.optionalField || ""}',
                            '${category.status}'
                        )"
                    >
                        Edit
                    </button>

                    <button
                        class="deactivate-btn"
                        onclick="deleteCategory('${category._id}')"
                    >
                        Delete
                    </button>

                </td>

            </tr>
            
            `;

        });

    } catch (error) {

        console.log(error);

    }

}


// ======================
// ADD / UPDATE CATEGORY
// ======================

categoryForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const categoryName =
            document.getElementById(
                "categoryName"
            ).value;

        const optionalField =
            document.getElementById(
                "optionalField"
            ).value;

        const status =
            document.querySelector(
                'input[name="status"]:checked'
            ).value;

        try {

            let url =
                `${API_URL}/add`;

            let method =
                "POST";

            if (editingCategoryId) {

                url =
                    `${API_URL}/edit/${editingCategoryId}`;

                method =
                    "PUT";

            }

            const response = await fetch(
                url,
                {
                    method,

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        categoryName,
                        optionalField,
                        status
                    })
                }
            );

            const data =
                await response.json();

            showMessage(
                data.message
            );

            resetForm();

            loadCategories();

        } catch (error) {

            console.log(error);

        }

    }
);


// ======================
// EDIT
// ======================

function editCategory(
    id,
    categoryName,
    optionalField,
    status
) {

    editingCategoryId = id;

    categoryFormPanel.removeAttribute(
        "hidden"
    );

    toggleFormBtn.textContent =
        "− Close Form";

    formTitle.textContent =
        "Edit Category";

    formSubtitle.textContent =
        "Update category details";

    saveBtn.textContent =
        "Update Category";

    document.getElementById(
        "categoryName"
    ).value = categoryName;

    document.getElementById(
        "optionalField"
    ).value = optionalField;

    document.querySelector(
        `input[value="${status}"]`
    ).checked = true;

}


// ======================
// DELETE
// ======================

async function deleteCategory(id) {

    if (
        !confirm(
            "Delete this category?"
        )
    ) {
        return;
    }

    try {

        const response = await fetch(
            `${API_URL}/delete/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        const data =
            await response.json();

        showMessage(
            data.message
        );

        loadCategories();

    } catch (error) {

        console.log(error);

    }

}


// ======================
// INITIAL LOAD
// ======================

loadCategories();