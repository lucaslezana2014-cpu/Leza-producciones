// ===========================
// FUNCIONALIDAD GENERAL
// ===========================

// Menu móvil
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Cerrar menú al hacer scroll
window.addEventListener('scroll', () => {
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// ===========================
// MODALES
// ===========================

// Funcionalidad de modales
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Botones para abrir modales
document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = btn.getAttribute('data-modal');
        openModal(modalId);
    });
});

// Cerrar modales
document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});

// Cerrar modal al hacer click fuera
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// ===========================
// PORTFOLIO - FILTRADO
// ===========================

const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover clase active de todos los botones
        filterBtns.forEach(b => b.classList.remove('active'));
        // Agregar clase active al botón clickeado
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'todos' || category === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ===========================
// PORTFOLIO - REPRODUCCIÓN DE VIDEOS
// ===========================

document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const videoUrl = btn.getAttribute('data-video');
        const iframe = document.getElementById('videoIframe');
        if (iframe) {
            iframe.src = videoUrl;
            openModal('videoModal');
        }
    });
});

// Limpiar video al cerrar modal
document.addEventListener('click', (e) => {
    if (e.target.closest('.modal-close') && e.target.closest('#videoModal')) {
        const iframe = document.getElementById('videoIframe');
        if (iframe) {
            iframe.src = '';
        }
    }
});

// ===========================
// PORTFOLIO - LIGHTBOX
// ===========================

document.querySelectorAll('.lightbox-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const imageUrl = btn.getAttribute('data-image');
        const lightboxImage = document.getElementById('lightboxImage');
        if (lightboxImage) {
            lightboxImage.src = imageUrl;
            openModal('lightboxModal');
        }
    });
});

// ===========================
// FORMULARIOS
// ===========================

// Formulario de contacto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(contactForm);
        
        // Aquí podrías enviar los datos a un servidor
        console.log('Formulario de contacto enviado');
        
        // Mostrar mensaje de éxito
        showNotification('¡Mensaje enviado exitosamente!', 'success');
        
        // Limpiar formulario
        contactForm.reset();
    });
}

// Formulario de presupuesto
const presupuestoForm = document.querySelector('.presupuesto-form');
if (presupuestoForm) {
    presupuestoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Obtener datos del formulario
        const formData = new FormData(presupuestoForm);
        
        // Aquí podrías enviar los datos a un servidor
        console.log('Solicitud de presupuesto enviada');
        
        // Mostrar mensaje de éxito
        showNotification('¡Solicitud de presupuesto enviada!', 'success');
        
        // Limpiar formulario
        presupuestoForm.reset();
        
        // Cerrar modal
        closeModal('presupuesto');
    });
}

// ===========================
// NOTIFICACIONES
// ===========================

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Eliminar notificación después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===========================
// SCROLL SUAVE Y NAVEGACIÓN ACTIVA
// ===========================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// ANIMACIONES AL SCROLL
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.servicio-card, .portfolio-item, .blog-card, .team-member').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// AGREGAR ESTILOS PARA ANIMACIONES
// ===========================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

console.log('✅ Script cargado exitosamente');