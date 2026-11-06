/*
 * Project data — single source for Home, Projects and Project Detail.
 * Only `projectsData` is shown on the site (the 3 main projects, in display order).
 * `thumbnail: null` renders a styled placeholder cover until a screenshot is added.
 */
const projectsData = [
    {
        id: "ai-learn-code",
        name: "Programming Learning Website with AI Support",
        shortDesc: "A platform for practicing programming through coding exercises, flashcards and quizzes, with automated AI feedback on every submission.",
        thumbnail: null,
        coverGlyph: "</> AI",
        role: "Backend Developer",
        type: "Graduation Thesis",
        year: "09/2026 – Present",
        status: "In progress",
        githubUrl: "https://github.com/ChickenPTT/KLTN_2026_WebsiteLearnCode_AI",
        links: [],
        techStack: {
            "Backend": ["Java 26", "Spring Boot 4.1", "Spring Security (JWT + Refresh Token)", "Spring Data JPA", "Spring AOP"],
            "Frontend": ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Monaco Editor"],
            "Database": ["PostgreSQL"],
            "External services": ["Google Gemini API", "Groq API (fallback)", "Judge0 sandbox"]
        },
        overview: "A web platform that helps learners practice programming through coding exercises, flashcards and quizzes, with automated AI feedback. It integrates Judge0 for online code execution, and Google Gemini (with Groq as a fallback) to analyse code errors and auto-generate new problems from templates.",
        features: [
            "Built a complete full-stack architecture from scratch: REST API, SPA frontend and database design",
            "Multi-layer AI integration (Gemini + Groq fallback) so feedback keeps working when one AI service is unavailable",
            "Real-time code execution and grading for 2 languages (Java, Python) via the Judge0 sandbox",
            "Role-Based Access Control with 2 roles (Student / Admin) and endpoint-level authorization using JWT + refresh tokens",
            "Automated audit logging with Spring AOP that tracks every admin operation",
            "Admin dashboard with weekly submission statistics, success rates and user management"
        ],
        gallery: []
    },
    {
        id: "sugar-petals",
        name: "Sugar Petals – Online Cake & Tea Ordering Platform",
        shortDesc: "An e-commerce platform to browse the menu, apply promo codes and combo deals, and order cakes and teas online for home delivery.",
        thumbnail: "User/image/Main_page.png",
        role: "Backend Developer",
        type: "Team Project",
        year: "06/2026 – 07/2026",
        githubUrl: "https://github.com/ChickenPTT/Web_Java_Cake-Tea",
        links: [],
        techStack: {
            "Backend": ["Java 17", "Spring Boot 4.1", "Spring Security (Form Login + RBAC)", "Spring Data JPA", "Spring AOP", "Spring Mail (SMTP)", "Spring Scheduled Tasks"],
            "Frontend": ["Thymeleaf", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
            "Database": ["MySQL"],
            "External services": ["Gmail SMTP"]
        },
        overview: "An e-commerce platform that lets customers browse the menu, add products to the cart, apply promo codes and combo deals, and order cakes and teas online for home delivery. The system sends automated birthday emails, supports password reset by email, and gives staff an admin dashboard for order and revenue management.",
        features: [
            { type: "heading", text: "Highlights" },
            "Multi-layer promotion system: category-based campaigns, combo deals, promo codes and an automatic 10% birthday discount",
            "REST API endpoints for registration, login, cart management, order placement and order tracking",
            "Relational schema with User, Product, Order, OrderItem, Category, Campaign, Combo and Promotion entities",
            "Order management with status transitions (Pending → Processing → Preparing → Delivered) and payment status tracking",
            { type: "heading", text: "My contributions: customer features" },
            "Menu browsing with search and pagination, product detail pages and a homepage slider",
            "Session-based shopping cart: add, update quantity, remove and clear items",
            "Checkout and per-customer order history",
            "Forgot-password flow with an email reset link"
        ],
        gallery: ["User/image/Main_page.png", "User/image/menupage.png", "User/image/AdminSign.png", "User/image/adminpage.png"]
    },
    {
        id: "aws-goods-quality",
        name: "Automated Goods Quality Monitoring on AWS",
        shortDesc: "A learning project from the AWS First Cloud AI Journey internship: a small serverless system that inspects product images automatically.",
        thumbnail: null,
        coverGlyph: "λ  AWS",
        role: "Cloud Intern",
        type: "AWS Internship Project",
        year: "05/2026 – 08/2026",
        githubUrl: null,
        links: [
            { label: "Internship Report", url: "https://chickenptt.github.io/Intership_Report-AWS-FCAJ/" }
        ],
        techStack: {
            "AWS services": ["AWS Lambda", "Amazon S3", "Amazon DynamoDB", "Amazon SQS", "Amazon Rekognition"]
        },
        overview: "The internship project of my 12-week AWS Workforce Bootcamp (First Cloud AI Journey) at Amazon Web Services Vietnam, and my first real step into the cloud. Following a serverless architecture, product images stored in Amazon S3 are processed by AWS Lambda using Amazon Rekognition, and the inspection results are saved to DynamoDB. It taught me the basics of event-driven design; I'm still deepening my AWS skills beyond the internship.",
        features: [
            { type: "heading", text: "What the project does" },
            "Serverless pipeline combining Lambda, S3, SQS, Rekognition and DynamoDB",
            "Image analysis with Amazon Rekognition to flag goods that fail quality checks",
            { type: "heading", text: "What I learned" },
            "Cloud fundamentals across many AWS services through guided labs",
            "How serverless, event-driven systems fit together",
            "Wrote 3 technical blog posts about AWS for the AWS Study Group FCJ community"
        ],
        gallery: []
    }
];

/* Older projects — kept for reference, not displayed. */
const archivedProjects = [
    {
        id: "portfolio-website",
        name: "Full-Stack Developer Portfolio Website",
        githubUrl: "https://github.com/ChickenPTT/Personal_Portfolio_Website",
        techStack: ["Java", "Spring Boot", "Thymeleaf", "HTML", "CSS", "JavaScript"],
        thumbnail: "User/image/p3.png"
    },
    {
        id: "backend-jakarta-ee",
        name: "Backend Web Application with Java EE (Servlet, JSP, JDBC)",
        githubUrl: "https://github.com/ChickenPTT/Backend-Web-Application-with-Jakarta-EE-Servlet-JSP-JDBC-/tree/laptrinhJavaWeb",
        techStack: ["Java", "Servlet", "JSP", "JDBC", "MySQL"],
        thumbnail: "User/image/P1.png",
        overview: "A learning project to master core Java web technologies: Servlets for request handling, JSP for rendering and JDBC for database access, following MVC. Solved connection overhead by introducing a DBCP connection pool."
    },
    {
        id: "toyota-redesign",
        name: "Redesign Website Toyota Viet Nam",
        githubUrl: "https://github.com/ChickenPTT/DuAnCk_TKGD",
        techStack: ["HTML", "CSS", "JavaScript", "Figma", "Git/GitHub"],
        thumbnail: "User/image/p2.png",
        overview: "Team of four turning a Figma redesign into a multi-page static site; I led the team and set up the branch-per-member Git workflow."
    }
];

/* ---------- Shared render helpers ---------- */
const ProjectUI = {
    escape(s) {
        return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    },
    allTech(p) {
        return Array.isArray(p.techStack) ? p.techStack : Object.values(p.techStack).flat();
    },
    detailUrl(p) {
        return `/project-detail?id=${encodeURIComponent(p.id)}`;
    },
    cover(p) {
        if (p.thumbnail) {
            return `<img src="/${p.thumbnail}" alt="${this.escape(p.name)}" loading="lazy">`;
        }
        return `<div class="cover-placeholder"><div><div class="glyph">${this.escape(p.coverGlyph || p.name.charAt(0))}</div><div class="label">${this.escape(p.type)}</div></div></div>`;
    },
    tags(p, max) {
        const list = this.allTech(p);
        return list.slice(0, max || list.length).map(t => `<span class="tag">${this.escape(t)}</span>`).join('');
    },
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>`
};
