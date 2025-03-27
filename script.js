document.addEventListener("DOMContentLoaded", () => {
    const loginPage = document.getElementById("login-page");
    const homePage = document.getElementById("home-page");
    const postPage = document.getElementById("post-page");
    const friendListPage = document.getElementById("friend-page");
    const editProfilePage = document.getElementById("edit-profile-page");

    const loginForm = document.getElementById("login-form");
    const logoutBtn = document.getElementById("logout-btn");
    const friendListBtn = document.getElementById("friend-list-btn");
    const newPostBtn = document.getElementById("new-post-btn");
    const postBtn = document.getElementById("post-btn");
    const backButtons = document.querySelectorAll(".back-btn");
    const editProfileBtn = document.getElementById("edit-profile-btn");
    const saveProfileBtn = document.getElementById("save-profile-btn");

    const validUsername = "user";
    const validPassword = "1234";

    let profilePhoto = "default-avatar.jpg";
    let profileName = "Username";

    function showPage(page) {
        [loginPage, homePage, postPage, friendListPage, editProfilePage].forEach(p => p.classList.add("d-none"));
        page.classList.remove("d-none");
    }

    showPage(loginPage);

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const usernameInput = document.getElementById("username").value.trim();
        const passwordInput = document.getElementById("password").value.trim();

        if (usernameInput === validUsername && passwordInput === validPassword) {
            showPage(homePage);
            updateProfile();
        } else {
            alert("Invalid username or password. Try again.");
        }
    });

    logoutBtn.addEventListener("click", () => {
        showPage(loginPage);
    });

    friendListBtn.addEventListener("click", () => {
        showPage(friendListPage);
    });

    newPostBtn.addEventListener("click", () => {
        showPage(postPage);
    });

    backButtons.forEach(button => {
        button.addEventListener("click", () => {
            showPage(homePage);
        });
    });

    postBtn.addEventListener("click", () => {
        const postTitle = document.getElementById("post-title").value.trim();
        const postDescription = document.getElementById("post-description").value.trim();
        const postPhoto = document.getElementById("post-photo").files[0];

        if (postTitle && postDescription && postPhoto) {
            const postContainer = document.getElementById("posts");
            const newPost = document.createElement("div");
            newPost.classList.add("card", "p-3", "my-2");

            newPost.innerHTML = `
                <h6><strong>${profileName}</strong></h6>
                <img src="${URL.createObjectURL(postPhoto)}" alt="Post Image" class="img-fluid mb-2">
                <h5>${postTitle}</h5>
                <p>${postDescription}</p>
                <button class="btn btn-secondary comment-btn">Comment</button>
            `;

            postContainer.appendChild(newPost);
            showPage(homePage);
        } else {
            alert("Please fill all fields and select a photo.");
        }
    });

    editProfileBtn.addEventListener("click", () => {
        showPage(editProfilePage);
        document.getElementById("edit-username").value = profileName;
    });

    saveProfileBtn.addEventListener("click", () => {
        const newName = document.getElementById("edit-username").value.trim();
        const newProfilePhoto = document.getElementById("edit-profile-photo").files[0];

        if (newName) {
            profileName = newName;
        }
        if (newProfilePhoto) {
            profilePhoto = URL.createObjectURL(newProfilePhoto);
        }

        updateProfile();
        showPage(homePage);
    });

    function updateProfile() {
        document.getElementById("profile-photo").src = profilePhoto;
        document.getElementById("profile-name").textContent = profileName;
    }
});
