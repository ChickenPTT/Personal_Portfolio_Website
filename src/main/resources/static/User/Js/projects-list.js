document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('projects-grid');
    const emptyMsg = document.getElementById('projects-empty');
    const filterBtns = document.querySelectorAll('.filter-btn');

    function renderProjects(filter) {
        grid.innerHTML = '';

        const filtered = filter === 'all'
            ? projectsData
            : projectsData.filter(p => p.role === filter);

        if (filtered.length === 0) {
            emptyMsg.style.display = 'block';
            return;
        }
        emptyMsg.style.display = 'none';

        filtered.forEach(project => {
            const card = document.createElement('a');
            card.href = `/project-detail?id=${encodeURIComponent(project.id)}`;
            card.className = 'project-grid-card';

            const techTags = project.techStack
                .slice(0, 3)
                .map(t => `<span class="tech-tag">${t}</span>`)
                .join('');

            card.innerHTML = `
                <div class="project-grid-image">
                    <div class="project-tag">${project.type}</div>
                    <img src="${project.thumbnail}" alt="${project.name}">
                </div>
                <div class="project-grid-info">
                    <span class="project-grid-role">${project.role}</span>
                    <h3 class="project-grid-name">${project.name}</h3>
                    <p class="project-grid-desc">${project.shortDesc}</p>
                    <div class="tech-tags">${techTags}</div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.role);
        });
    });

    renderProjects('all');
});