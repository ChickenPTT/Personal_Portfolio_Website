document.addEventListener('DOMContentLoaded', function () {
    const content = document.getElementById('project-detail-content');
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    const project = typeof projectsData !== 'undefined'
        ? projectsData.find(p => p.id === id)
        : null;

    // Trường hợp không tìm thấy project (id sai hoặc thiếu)
    if (!project) {
        content.innerHTML = `
            <section class="detail-not-found">
                <h1>Project not found</h1>
                <p>The project you're looking for doesn't exist or the link is broken.</p>
                <a href="/projects" class="project-link">
                    BACK TO ALL PROJECTS
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </a>
            </section>
        `;
        return;
    }

    // Cập nhật tiêu đề tab trình duyệt
    document.title = `${project.name} | Phan Tien Thinh`;

    // Tech stack tags
    const techTagsHtml = project.techStack
        .map(t => `<span class='tech-tag'>${t}</span>`)
        .join(',');

    // Key features list
    const featuresHtml = project.features
        .map(f => `<li>${f}</li>`)
        .join('');

    // Gallery images (nếu có nhiều hơn 1 ảnh)
    const galleryHtml = project.gallery && project.gallery.length > 0
        ? project.gallery.map(img => `
            <div class="gallery-item">
                <img src="${img}" alt="${project.name} screenshot">
            </div>
          `).join('')
        : '';

    // Demo link (chỉ hiện nếu có)
    const demoLinkHtml = project.demoUrl
        ? `<a href="${project.demoUrl}" class="project-link" target="_blank">
             LIVE DEMO
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <line x1="7" y1="17" x2="17" y2="7"></line>
                 <polyline points="7 7 17 7 17 17"></polyline>
             </svg>
           </a>`
        : '';

    content.innerHTML = `
        <!-- Back link -->
        <div class="detail-back">
            <a href="/projects" class="detail-back-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                All Projects
            </a>
        </div>

        <!-- Hero -->
        <section class="detail-hero">
            <div class="project-tag">${project.type}</div>
            <h1 class="detail-title">${project.name}</h1>
            <p class="detail-subdesc">${project.shortDesc}</p>

            <div class="project-links detail-hero-links">
                <a href="${project.githubUrl}" class="project-link" target="_blank">
                    SEE ON GITHUB
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </a>
                ${demoLinkHtml}
            </div>

            <div class="detail-cover">
                <img src="${project.thumbnail}" alt="${project.name}">
            </div>
        </section>

        <!-- Main content: 2 columns (content + sidebar meta) -->
        <section class="detail-body">
            <div class="detail-main">
                <div class="detail-block">
                    <h2 class="detail-block-title">Overview</h2>
                    <p class="detail-block-text">${project.overview}</p>
                </div>

                <div class="detail-block">
                    <h2 class="detail-block-title">Key Features</h2>
                    <ul class="detail-features-list">${featuresHtml}</ul>
                </div>

                <div class="detail-block">
                    <h2 class="detail-block-title">Challenges</h2>
                    <p class="detail-block-text">${project.challenges}</p>
                </div>

                ${galleryHtml ? `
                <div class="detail-block">
                    <h2 class="detail-block-title">Gallery</h2>
                    <div class="detail-gallery">${galleryHtml}</div>
                </div>` : ''}
            </div>

            <aside class="detail-sidebar">
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
                    <div class="project-meta-row">
                        <span class="meta-key">Type</span>
                        <span class="meta-value">${project.type}</span>
                    </div>
                </div>

                <div class="project-meta-label">TECH STACK</div>
                <div class="tech-tags detail-tech-tags">${techTagsHtml}</div>
            </aside>
        </section>
    `;
});