// ---------- PROJECT DATA ----------
const projects = [
  {
    id: 1,
    title: "E‑Commerce Platform",
    category: "web",
    tech: ["React", "Node.js", "MongoDB"],
    desc: "A full‑stack marketplace with payment integration, user dashboards, and an admin panel.",
    img: "images/project1.jpg"
  },
  {
    id: 2,
    title: "FitTrack Mobile App",
    category: "mobile",
    tech: ["Flutter", "Firebase"],
    desc: "Cross‑platform fitness tracker that syncs workout data and offers personalized plans.",
    img: "images/project2.jpg"
  },
  {
    id: 3,
    title: "Banking Dashboard Redesign",
    category: "uiux",
    tech: ["Figma", "Adobe XD"],
    desc: "UX overhaul of a fintech dashboard, improving navigation and data visualization clarity.",
    img: "images/project3.jpg"
  },
  {
    id: 4,
    title: "Sales Data Analyzer",
    category: "data",
    tech: ["Python", "Pandas", "Power BI"],
    desc: "Automated reporting tool that cleans, analyzes, and visualizes quarterly sales data.",
    img: "images/project4.jpg"
  },
  {
    id: 5,
    title: "Weather Widget",
    category: "web",
    tech: ["JavaScript", "REST API"],
    desc: "Lightweight weather widget used by several local news sites.",
    img: "images/project5.jpg"
  },
  {
    id: 6,
    title: "AR Business Card",
    category: "other",
    tech: ["Unity", "Vuforia"],
    desc: "Augmented reality business card that displays a 3D portfolio when scanned.",
    img: "images/project6.jpg"
  }
];

// ---------- ARTICLES DATA ----------
const articles = [
  {
    title: "A Practical Guide to CSS Grid",
    summary: "Learn how to build complex layouts without losing your sanity.",
    full: "CSS Grid is a two‑dimensional layout system. Start with `display: grid`, define columns and rows, and place items. Use `fr` units for flexible tracks, and explore `grid-template-areas` for readability. Remember to always consider accessibility and reordering."
  },
  {
    title: "Understanding React Hooks",
    summary: "useState and useEffect explained with real examples.",
    full: "Hooks let you use state and lifecycle features inside functional components. `useState` returns a state variable and an updater function. `useEffect` runs side effects after render. Be careful with dependency arrays to avoid infinite loops."
  },
  {
    title: "Why Accessibility Matters",
    summary: "Building inclusive web experiences benefits everyone.",
    full: "Accessibility (a11y) is not optional. Use semantic HTML, ARIA labels where needed, ensure keyboard navigation, and maintain color contrast. It improves SEO and makes your app usable by people with disabilities."
  }
];

// ---------- DOM ELEMENTS ----------
const projectsGrid = document.querySelector('.projects-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('project-modal');
const overlay = document.querySelector('.overlay');
const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalDesc = document.getElementById('modal-desc');
const modalTech = document.getElementById('modal-tech');
const closeModalBtn = document.querySelector('.close-modal');
const articlesGrid = document.querySelector('.articles-grid');
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const successMsg = document.getElementById('success-message');

// ---------- RENDER PROJECTS ----------
function renderProjects(filter = 'all') {
  projectsGrid.innerHTML = '';
  projects
    .filter(p => filter === 'all' || p.category === filter)
    .forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-id', p.id);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View details for ${p.title}`);
      card.innerHTML = `
        <img src="${p.img}" alt="${p.title} screenshot" loading="lazy" />
        <div class="card-body">
          <h3>${p.title}</h3>
          <p>${p.tech.join(' · ')}</p>
        </div>
      `;
      projectsGrid.appendChild(card);
    });
}

// ---------- FILTER HANDLING ----------
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(btn.dataset.filter);
  });
});

// ---------- MODAL LOGIC ----------
function openModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;
  modalTitle.textContent = project.title;
  modalImg.src = project.img;
  modalImg.alt = `${project.title} screenshot`;
  modalDesc.textContent = project.desc;
  modalTech.textContent = `Technologies: ${project.tech.join(', ')}`;
  modal.hidden = false;
  overlay.hidden = false;
  modalTitle.focus();
}

function closeModal() {
  modal.hidden = true;
  overlay.hidden = true;
}

// Event delegation for project cards (click and keyboard)
projectsGrid.addEventListener('click', e => {
  const card = e.target.closest('.project-card');
  if (card) openModal(Number(card.dataset.id));
});

projectsGrid.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const card = e.target.closest('.project-card');
    if (card) {
      e.preventDefault(); // prevent page scroll on Space
      openModal(Number(card.dataset.id));
    }
  }
});

closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
});

// ---------- RENDER ARTICLES ----------
function renderArticles() {
  articlesGrid.innerHTML = '';
  articles.forEach((article, i) => {
    const card = document.createElement('article');
    card.className = 'article-card';
    card.innerHTML = `
      <h3>${article.title}</h3>
      <p class="summary">${article.summary}</p>
      <div class="full-text" hidden>${article.full}</div>
      <button class="read-more" aria-expanded="false" data-id="${i}">Read More</button>
    `;
    articlesGrid.appendChild(card);
  });

  // Toggle read more
  articlesGrid.addEventListener('click', e => {
    const btn = e.target.closest('.read-more');
    if (!btn) return;
    const card = btn.closest('.article-card');
    const fullText = card.querySelector('.full-text');
    const isHidden = fullText.hidden;
    fullText.hidden = !isHidden;
    btn.setAttribute('aria-expanded', !isHidden);
    btn.textContent = isHidden ? 'Read Less' : 'Read More';
  });
}

// ---------- CONTACT FORM VALIDATION ----------
function showError(input, message) {
  const errorSpan = input.nextElementSibling;
  errorSpan.textContent = message;
  input.setAttribute('aria-invalid', 'true');
}

function clearError(input) {
  const errorSpan = input.nextElementSibling;
  errorSpan.textContent = '';
  input.removeAttribute('aria-invalid');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  let isValid = true;

  if (nameInput.value.trim() === '') {
    showError(nameInput, 'Please enter your name.');
    isValid = false;
  } else {
    clearError(nameInput);
  }

  if (emailInput.value.trim() === '') {
    showError(emailInput, 'Email address is required.');
    isValid = false;
  } else if (!validateEmail(emailInput.value)) {
    showError(emailInput, 'Please enter a valid email (e.g., name@example.com).');
    isValid = false;
  } else {
    clearError(emailInput);
  }

  if (isValid) {
    successMsg.hidden = false;
    contactForm.reset();
    setTimeout(() => {
      successMsg.hidden = true;
    }, 4000);
  }
});

// ---------- INITIAL RENDER ----------
renderProjects();
renderArticles();