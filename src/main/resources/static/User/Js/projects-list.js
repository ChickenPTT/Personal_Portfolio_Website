/* Renders project cards on the Home page (#home-projects) and the Projects page (#project-list). */
document.addEventListener('DOMContentLoaded', function () {
    if (typeof projectsData === 'undefined') return;
    const ui = ProjectUI;

    // Home: one large card + two small cards (same layout as the article cards)
    const home = document.getElementById('home-projects');
    if (home) {
        const [first, ...rest] = projectsData;
        const small = rest.slice(0, 2).map(p => `
            <a class="card project-small reveal" href="${ui.detailUrl(p)}">
                <span class="dot-date">${ui.escape(p.year)}</span>
                <h3>${ui.escape(p.name)}</h3>
                <p>${ui.escape(p.shortDesc)}</p>
                <span class="text-link">View project ${ui.arrow}</span>
            </a>`).join('');

        home.innerHTML = `
            <a class="card card-glow project-feature reveal" href="${ui.detailUrl(first)}">
                <span class="dot-date">${ui.escape(first.year)} · ${ui.escape(first.type)}</span>
                <h3>${ui.escape(first.name)}</h3>
                <p>${ui.escape(first.overview)}</p>
                <div class="tags">${ui.tags(first, 6)}</div>
                <span class="text-link">View project ${ui.arrow}</span>
            </a>
            <div class="project-row">${small}</div>`;
        if (window.observeReveal) window.observeReveal(home);
    }

    // Projects page: alternating media / text rows
    const list = document.getElementById('project-list');
    if (list) {
        list.innerHTML = projectsData.map(p => `
            <a class="card project-item reveal" href="${ui.detailUrl(p)}">
                <div class="project-media">${ui.cover(p)}</div>
                <div class="project-body">
                    <span class="dot-date">${ui.escape(p.year)}${p.status ? ' · ' + ui.escape(p.status) : ''}</span>
                    <h2>${ui.escape(p.name)}</h2>
                    <p>${ui.escape(p.shortDesc)}</p>
                    <div class="project-meta"><span>Role <b>${ui.escape(p.role)}</b></span><span>Type <b>${ui.escape(p.type)}</b></span></div>
                    <div class="tags">${ui.tags(p, 6)}</div>
                    <span class="text-link">View details ${ui.arrow}</span>
                </div>
            </a>`).join('');
        if (window.observeReveal) window.observeReveal(list);
    }
});
