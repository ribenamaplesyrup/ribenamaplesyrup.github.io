document.addEventListener('DOMContentLoaded', () => {
    // --- Element References ---
    const infoBtn = document.getElementById('info-btn');
    const projectsBtn = document.getElementById('projects-btn');
    const infoContent = document.getElementById('info-content');
    const projectsContent = document.getElementById('projects-content');
    const projectsGrid = document.querySelector('.projects-grid');
    const projectDetailView = document.getElementById('project-detail-view');

    // This will hold all our project data after one initial fetch
    let projectsData = null;

    // --- Data Fetching ---
    async function fetchProjectData() {
        if (projectsData) return projectsData; // Return cached data if available

        try {
            const response = await fetch('/api/projects.json', { cache: 'no-store' });
            if (!response.ok) throw new Error('Network response was not ok.');
            projectsData = await response.json();
            return projectsData;
        } catch (error) {
            console.error('Failed to fetch project data:', error);
            projectDetailView.innerHTML = '<p>Sorry, projects could not be loaded.</p>';
            return null;
        }
    }

    // --- Core View Switching Logic ---
    function showInfo() {
        infoContent.style.display = 'block';
        projectsContent.style.display = 'none';
        projectDetailView.innerHTML = ''; // <-- ADD THIS LINE
        infoBtn.classList.add('active');
        projectsBtn.classList.remove('active');
        history.pushState(null, '', '/');
    }

    function showProjectsGrid() {
        infoContent.style.display = 'none';
        projectsContent.style.display = 'block';
        projectsGrid.style.display = 'grid'; 
        projectDetailView.innerHTML = ''; // <-- ADD THIS LINE
        projectDetailView.style.display = 'none'; 
        infoBtn.classList.remove('active');
        projectsBtn.classList.add('active');
        history.pushState(null, '', '/');
    }

    // --- Dynamic Project Loading Logic ---
    function showProjectDetail(projectKey) {
        if (!projectsData || !projectsData[projectKey]) {
            projectDetailView.innerHTML = '<p>Sorry, this project could not be found.</p>';
            return;
        }
        
        const project = projectsData[projectKey];

        // This is the HTML structure from your old _layouts/project.html
        const projectHtml = `
            <div id="project-detail-content">
                <header class="project-header">
                    <h2>${project.title}</h2>
                </header>
                <div class="project-content">
                    ${project.content}
                </div>
            </div>`;

        projectsGrid.style.display = 'none'; // Hide grid
        projectDetailView.innerHTML = projectHtml;
        projectDetailView.style.display = 'block'; // Show detail
        window.scrollTo(0, 0);

        // Update UI state
        infoBtn.classList.remove('active');
        projectsBtn.classList.remove('active'); // No button is active in detail view
    }

    // --- Event Listeners ---
    infoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showInfo();
    });

    projectsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showProjectsGrid();
    });

    // Event Delegation for project clicks
    projectsContent.addEventListener('click', (e) => {
        const projectLink = e.target.closest('.project-item-link');
        if (projectLink) {
            e.preventDefault();
            const url = projectLink.getAttribute('href');
            const projectKey = url.replace('.html', ''); // Match the key in our JSON
            history.pushState({ path: url }, '', url);
            showProjectDetail(projectKey);
        }
    });

    // Handle Browser Back/Forward buttons
    window.addEventListener('popstate', (e) => {
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html') {
            showProjectsGrid();
        } else if (path.includes('/projects/')) {
            const projectKey = path.replace('.html', '');
            showProjectDetail(projectKey);
        } else {
            showInfo();
        }
    });

    // --- Initial Page Load Handler ---
    async function initializePage() {
        await fetchProjectData(); // Load all data first
        const path = window.location.pathname;

        if (path.includes('/projects/')) {
            const projectKey = path.replace('.html', '');
            
            // Set initial view state correctly
            infoContent.style.display = 'none';
            projectsContent.style.display = 'block';
            
            showProjectDetail(projectKey);
        } else {
            // Default to the info view
            showInfo();
        }
    }

    initializePage();
});
