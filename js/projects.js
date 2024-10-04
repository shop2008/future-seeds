document.addEventListener('DOMContentLoaded', function () {
    // Project data
    const featuredProject = {
        title: "Featured Project",
        description: "Lorem ipsum dolor sit amet consectetur. Utilitas ultrices pulvinar malesuada mauris. Sit felis nunc enim urna cursus dolor ultrices id ultricies purus aliquet.",
        leftImage: "./images/ch.png",
        rightImage: "./images/ch.png"
    };

    const projects = [
        {
            title: "Share Food With Others In Need",
            description: "In carrying out their duties, charitable foundations food, medicine, food.",
            raised: "$69,152",
            goal: "$89,000",
            progress: 77,
            image: "../images/projects/project1.jpg"
        },
        {
            title: "Provide Medical Assistance",
            description: "Help provide essential medical assistance to children in need.",
            raised: "$54,230",
            goal: "$75,000",
            progress: 72,
            image: "../images/projects/project2.jpg"
        },
        {
            title: "Educational Support",
            description: "We offer educational support to underprivileged children.",
            raised: "$12,520",
            goal: "$50,000",
            progress: 25,
            image: "../images/projects/project3.jpg"
        }
    ];

    // Function to render the featured project
    function renderFeaturedProject() {
        document.getElementById('featuredTitle').textContent = featuredProject.title;
        document.getElementById('featuredDescription').textContent = featuredProject.description;
        document.getElementById('featuredLeftImage').src = featuredProject.leftImage;
        document.getElementById('featuredRightImage').src = featuredProject.rightImage;
    }

    // Function to render the projects dynamically
    function renderProjects() {
        const projectsContainer = document.getElementById('projectsContainer');

        projects.forEach(project => {
            const projectCard = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${project.image}" class="card-img-top" alt="Project Image">
                        <div class="card-body">
                            <h5 class="card-title">${project.title}</h5>
                            <p class="card-text">${project.description}</p>
                            <div class="d-flex justify-content-between mb-2">
                                <span>Raised: ${project.raised}</span>
                                <span>Goal: ${project.goal}</span>
                            </div>
                            <div class="progress mb-3">
                                <div class="progress-bar" role="progressbar" style="width: ${project.progress}%;" aria-valuenow="${project.progress}"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <a href="donate.html" class="btn btn-primary w-100">Donate Now</a>
                        </div>
                    </div>
                </div>
            `;

            projectsContainer.insertAdjacentHTML('beforeend', projectCard);
        });
    }

    // Render featured project and projects on page load
    renderFeaturedProject();
    renderProjects();
});
