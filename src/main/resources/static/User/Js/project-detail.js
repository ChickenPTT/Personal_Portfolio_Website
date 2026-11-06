/* Renders /project-detail?id=... from projectsData into #project-detail-content. */
document.addEventListener('DOMContentLoaded', function () {
    const content = document.getElementById('project-detail-content');
    if (!content || typeof projectsData === 'undefined') return;
    const ui = ProjectUI;
    const id = new URLSearchParams(window.location.search).get('id');
    const p = projectsData.find(x => x.id === id);

    const backLink = `
        <a href="${ui.url('projects')}" class="back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            All projects
        </a>`;

    if (!p) {
        content.innerHTML = `
            <section class="page-head"><div class="container">
                ${backLink}
                <h1 class="page-title">Project not found</h1>
                <p class="page-lead">The project you're looking for doesn't exist or the link is broken.</p>
            </div></section>`;
        return;
    }

    document.title = `${p.name} | Phan Tien Thinh`;

    const githubIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;
    const extIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>`;

    const actions = [
        p.githubUrl ? `<a class="btn btn-primary" href="${p.githubUrl}" target="_blank" rel="noopener">${githubIcon} View on GitHub</a>` : '',
        ...(p.links || []).map(l => `<a class="btn" href="${l.url}" target="_blank" rel="noopener">${ui.escape(l.label)} ${extIcon}</a>`)
    ].join('');

    const features = p.features.map(f => {
        if (typeof f === 'string') return `<li>${ui.escape(f)}</li>`;
        if (f.type === 'heading') return `<li class="feature-heading">${ui.escape(f.text)}</li>`;
        return `<li>${ui.escape(f.text)}</li>`;
    }).join('');

    const stackGroups = Array.isArray(p.techStack)
        ? `<div class="tags">${ui.tags(p)}</div>`
        : `<dl class="stack-groups">${Object.entries(p.techStack).map(([group, items]) => `
                <div><dt>${ui.escape(group)}</dt><dd class="tags">${items.map(t => `<span class="tag">${ui.escape(t)}</span>`).join('')}</dd></div>`).join('')}
           </dl>`;

    const gallery = (p.gallery || []).length > 1
        ? `<div class="detail-block reveal">
               <h2 class="eyebrow">Gallery</h2>
               <div class="gallery">${p.gallery.map(img => `<a href="${ui.url(img)}" target="_blank" rel="noopener"><img src="${ui.url(img)}" alt="${ui.escape(p.name)} screenshot" loading="lazy"></a>`).join('')}</div>
           </div>`
        : '';

    content.innerHTML = `
        <section class="page-head">
            <div class="container">
                ${backLink}
                <span class="dot-date">${ui.escape(p.year)} · ${ui.escape(p.type)}</span>
                <h1 class="page-title" style="margin-top:14px">${ui.escape(p.name)}</h1>
                <p class="page-lead">${ui.escape(p.shortDesc)}</p>
                <div class="detail-actions">${actions}</div>
                <div class="detail-cover">${ui.cover(p)}</div>
            </div>
        </section>

        <section class="section">
            <div class="container detail-grid">
                <div>
                    <div class="detail-block reveal">
                        <h2 class="eyebrow">Overview</h2>
                        <p>${ui.escape(p.overview)}</p>
                    </div>
                    <div class="detail-block reveal">
                        <h2 class="eyebrow">Key features</h2>
                        <ul class="feature-list">${features}</ul>
                    </div>
                    ${gallery}
                </div>
                <aside class="card detail-side">
                    <div>
                        <div class="side-card-title">Project info</div>
                        <ul class="fact-list">
                            <li><span>Role</span><span>${ui.escape(p.role)}</span></li>
                            <li><span>Type</span><span>${ui.escape(p.type)}</span></li>
                            <li><span>Timeline</span><span>${ui.escape(p.year)}</span></li>
                        </ul>
                    </div>
                    <div>
                        <div class="side-card-title">Tech stack</div>
                        ${stackGroups}
                    </div>
                </aside>
            </div>
        </section>`;

    if (window.observeReveal) window.observeReveal(content);
});
