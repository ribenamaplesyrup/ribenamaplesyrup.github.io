document.addEventListener('DOMContentLoaded', () => {
    const infoBtn = document.getElementById('info-btn');
    const projectsBtn = document.getElementById('projects-btn');
    const infoContent = document.getElementById('info-content');
    const projectsContent = document.getElementById('projects-content');
    const projectsGrid = document.querySelector('.projects-grid');
    const projectDetailView = document.getElementById('project-detail-view');

    // --- Core View Switching Logic ---

    function showInfo() {
        infoContent.style.display = 'block';
        projectsContent.style.display = 'none';
        infoBtn.classList.add('active');
        projectsBtn.classList.remove('active');
    }

    function showProjects() {
        // --- ADDED CODE: Find and stop the SoundCloud player ---
        const soundcloudIframe = projectDetailView.querySelector('.soundcloud-embed iframe');
        if (soundcloudIframe) {
            soundcloudIframe.src = ''; // This unloads the iframe and stops the audio
        }

        infoContent.style.display = 'none';
        projectsContent.style.display = 'block';
        projectsGrid.style.display = 'grid';
        projectDetailView.style.display = 'none';
        infoBtn.classList.remove('active');
        projectsBtn.classList.add('active');
    }

    // --- Dynamic Project Loading Logic ---

    async function loadProject(url) {
        // 1. Show a loading state and deselect the portfolio button
        // ADDED: Deselect the 'Portfolio' button to show we are in a detail view
        projectsBtn.classList.remove('active');
        projectDetailView.innerHTML = '<p class="loading-message">Loading project...</p>';
        projectsGrid.style.display = 'none';
        projectDetailView.style.display = 'block';
        window.scrollTo(0, 0);

        try {
            // 2. Fetch the content of the project page
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok.');
            const pageText = await response.text();

            // 3. Parse the fetched HTML and extract the content
            const parser = new DOMParser();
            const doc = parser.parseFromString(pageText, 'text/html');
            const projectHtml = doc.getElementById('project-detail-content').innerHTML;

            // 4. Inject the content (Back button has been removed)
            // MODIFIED: The back button link is no longer added here.
            projectDetailView.innerHTML = projectHtml;

        } catch (error) {
            projectDetailView.innerHTML = '<p>Sorry, there was an error loading this project.</p>';
            console.error('Fetch error:', error);
        }
    }

    // --- Event Listeners ---

    infoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showInfo();
        history.pushState(null, '', '/');
    });

    projectsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showProjects();
        history.pushState(null, '', '/');
    });

    // Event Delegation: Listen for clicks on the main projects container
    projectsContent.addEventListener('click', (e) => {
        // Check if a project link was clicked
        const projectLink = e.target.closest('.project-item-link');
        if (projectLink) {
            e.preventDefault();
            const url = projectLink.getAttribute('href');
            loadProject(url);
            history.pushState({ path: url }, '', url);
        }

        // REMOVED: The event listener for the dynamic 'back' button is no longer needed.
    });

    // Handle Browser Back/Forward buttons
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.path) {
            loadProject(e.state.path);
        } else {
            showProjects();
        }
    });

    // Initial page load check
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
        projectsBtn.click();
        loadProject(window.location.pathname);
    }
});

