const projectsData = [
    {
        id: "portfolio-website",
        name: "Full-Stack Developer Portfolio Website [Updating]",
        shortDesc: "A modern, responsive portfolio website built with Java, HTML, CSS, and JavaScript to showcase my skills and projects.",
        thumbnail: "User/image/p3.png",
        role: "FullStack Developer",
        type: "Personal Project",
        year: "5/4/2026 - 20/4/2026",
        featured: true,
        githubUrl: "https://github.com/ChickenPTT/Personal_Portfolio_Website",
        demoUrl: null,
        techStack: ["Java", "Spring Boot", "Thymeleaf", "HTML", "CSS", "JavaScript"],
        overview: "Write a short paragraph about the problem this project solves and your goal for it.",
        features: [
            "Dark / Light theme toggle",
            "Responsive layout across devices",
            "Contact form with validation"
        ],
        challenges: "Describe a technical challenge you faced and how you solved it.",
        gallery: ["User/image/p3.png"]
    },
    {
        id: "backend-jakarta-ee",
        name: "Backend Web Application with Java EE (Servlet, JSP, JDBC)",
        shortDesc: "Web-based user management system built using Java Servlets and JSP following the MVC architecture.",
        thumbnail: "User/image/P1.png",
        role: "Back-end Developer",
        type: "Personal Project",
        year: "6/2025 - 3/2026",
        featured: true,
        githubUrl: "https://github.com/ChickenPTT/Backend-Web-Application-with-Jakarta-EE-Servlet-JSP-JDBC-/tree/laptrinhJavaWeb",
        demoUrl: null,
        techStack: ["Java", "Servlet", "JSP", "JDBC", "MySQL"],
        overview: "Write a short paragraph about the problem this project solves and your goal for it.",
        features: [
            "CRUD operations via DAO pattern",
            "MVC architecture with Servlet + JSP",
            "MySQL integration through JDBC"
        ],
        challenges: "Describe a technical challenge you faced and how you solved it.",
        gallery: ["User/image/P1.png"]
    },
    {
        id: "toyota-redesign",
        name: "Leader - Redesign Website Toyota Viet Nam",
        shortDesc: "A 12-page static website built as a team project, based on redesigned layouts created in Figma.",
        thumbnail: "User/image/p2.png",
        role: "Front-end Developer",
        type: "Team Project",
        year: "7/7/2025 - 24/7/2025",
        featured: false,
        githubUrl: "https://github.com/ChickenPTT/DuAnCk_TKGD",
        demoUrl: null,
        techStack: ["HTML", "CSS", "JavaScript"],
        overview: "Write a short paragraph about the problem this project solves and your goal for it.",
        features: [
            "12 fully responsive static pages",
            "Led a team through Figma-to-code implementation",
            "Consistent design system across pages"
        ],
        challenges: "Describe a technical challenge you faced and how you solved it.",
        gallery: ["User/image/p2.png"]
    },
    {
        id: "website-Cake-Tea",
        name: "Website Cake Tea",
        shortDesc: "A modern, responsive portfolio website built with Java, HTML, CSS, and JavaScript to showcase my skills and projects.",
        thumbnail: "User/image/p3.png",
        role: "FullStack Developer",
        type: "Personal Project",
        year: "5/4/2026 - 20/4/2026",
        featured: true,
        githubUrl: "https://github.com/ChickenPTT/Personal_Portfolio_Website",
        demoUrl: null,
        techStack: ["Java", "Spring Boot", "Thymeleaf", "HTML", "CSS", "JavaScript"],
        overview: "Write a short paragraph about the problem this project solves and your goal for it.",
        features: [
            "Dark / Light theme toggle",
            "Responsive layout across devices",
            "Contact form with validation"
        ],
        challenges: "Describe a technical challenge you faced and how you solved it.",
        gallery: ["User/image/p3.png"]
    }

];

// 2 project show o main page
document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('featured-projects-container');
    if (!container || typeof projectsData === 'undefined') return;

    // Chỉ lấy project có featured: true và tối đa 2 project
    const featured = projectsData.filter(p => p.featured).slice(0, 2);

    container.innerHTML = featured.map(project => `
        <div class="project-card">
            <div class="project-image">
                <div class="project-tag">${project.type}</div>
                <img src="${project.thumbnail}" alt="${project.name}">
            </div>
            <div class="project-info">
                <h3 class="project-name">${project.name}</h3>
                <p class="project-desc">${project.shortDesc}</p>

                <div class="project-meta-label">PROJECT INFO</div>

                <div class="project-meta">
                    <div class="project-meta-row">
                        <span class="meta-key">Year</span>
                        <span class="meta-value">${project.year}</span>
                    </div>
                    <div class="project-meta-row">
                        <span class="meta-key">Role</span>
                        <span class="meta-value">${project.role}</span>
                    </div>
                </div>

                <div class="project-links">
                    <a href="/project-detail?id=${encodeURIComponent(project.id)}" class="project-link">
                        VIEW DETAILS
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                    </a>
                    <a href="${project.githubUrl}" class="project-link" target="_blank">
                        SEE ON GITHUB
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
});