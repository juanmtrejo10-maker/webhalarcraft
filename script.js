const CLIENT_ID = '1451262371971600477';
const REDIRECT_URI = 'https://halarcraftweb.netlify.app/callback';

// Login Discord
function loginDiscord() {
    const scope = 'identify';
    const url = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}`;
    window.location.href = url;
}

// Simulación de login (hasta que tengamos la function real)
function simulateLogin(userData = {username: 'Usuario#1234', avatar: 'https://cdn.discordapp.com/embed/avatars/0.png'}) {
    localStorage.setItem('discordUser', JSON.stringify(userData));
    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('user-profile').style.display = 'flex';
    document.getElementById('user-name').textContent = userData.username;
    document.getElementById('user-avatar').src = userData.avatar;
    document.getElementById('codigos').style.display = 'block';
    loadClaimedCodes();
}

// Logout
function logout() {
    localStorage.removeItem('discordUser');
    location.reload();
}

// Códigos easter egg
document.querySelectorAll('.easter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const code = btn.dataset.code;
        let claimed = JSON.parse(localStorage.getItem('claimedCodes') || '[]');
        if (!claimed.includes(code)) {
            claimed.push(code);
            localStorage.setItem('claimedCodes', JSON.stringify(claimed));
            alert(`¡Código "${code}" reclamado! Ve a #reclamos en Discord y mandá captura.`);
            btn.style.display = 'none';
            loadClaimedCodes();
        } else {
            alert('Ya reclamaste este código.');
        }
    });
});

function loadClaimedCodes() {
    const el = document.getElementById('claimed-codes');
    let claimed = JSON.parse(localStorage.getItem('claimedCodes') || '[]');
    el.innerHTML = claimed.length ? 'Reclamados: ' + claimed.join(', ') : 'Ningún código reclamado aún.';
}

// Lightbox galería
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').style.display = 'flex';
}
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Cargar si ya logueado (simulado)
document.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('discordUser');
    if (user) simulateLogin(JSON.parse(user));
});
