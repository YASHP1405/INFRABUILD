// navbar.js
const navbarHTML = `
<nav id="navbar" class="fixed w-full z-[100] transition-all duration-300 py-6">
    <div class="container mx-auto px-6">
        <div class="flex items-center justify-between bg-glassBg border border-glassBorder backdrop-blur-xl rounded-full px-6 py-3 shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-glassBg">
            <!-- Logo -->
            <a href="#" class="flex flex-row items-center gap-3 group">
                <div class="w-10 h-10 rounded-full border border-glassBorder bg-gradient-to-br from-deepSpace to-slate-900 group-hover:border-electricBlue transition-all flex items-center justify-center relative shadow-[0_0_15px_rgba(37,99,235,0.2)]">
                    <div class="absolute inset-0 bg-electricBlue/20 rounded-full blur group-hover:bg-electricBlue/40 transition-all"></div>
                    <svg class="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <span class="text-xl font-space font-bold tracking-tight text-white group-hover:text-electricBlue transition-colors">InfraBuild</span>
            </a>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center space-x-1 lg:space-x-3 text-sm font-medium">
                <a href="#hero" class="nav-link px-4 py-2 rounded-full text-slate-300 hover:text-white transition-all relative">Home</a>
                <a href="#products" class="nav-link px-4 py-2 rounded-full text-slate-300 hover:text-white transition-all relative">Products</a>
                <a href="#projects" class="nav-link px-4 py-2 rounded-full text-slate-300 hover:text-white transition-all relative">Projects</a>
                <a href="#leadership" class="nav-link px-4 py-2 rounded-full text-slate-300 hover:text-white transition-all relative">Leadership</a>
                <a href="#contact" class="nav-link px-4 py-2 rounded-full text-slate-300 hover:text-white transition-all relative">Contact</a>
            </div>

            <!-- CTA -->
            <div class="hidden md:flex items-center">
                <a href="#contact" class="px-6 py-2 rounded-full bg-white text-deepSpace font-bold hover:bg-slate-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] md:text-sm">Initiate <span class="ml-1 text-electricBlue/80">&rarr;</span></a>
            </div>

            <!-- Mobile Menu Toggle -->
            <button id="mobile-menu-btn" class="md:hidden text-white p-2 focus:outline-none">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
        </div>
    </div>

    <!-- Mobile Panel -->
    <div id="mobile-panel" class="fixed inset-0 bg-deepSpace/95 backdrop-blur-3xl z-[100] transform translate-x-full transition-transform duration-500 flex flex-col items-center justify-center space-y-8 h-screen w-full">
        <button id="mobile-close-btn" class="absolute top-8 right-8 text-white p-2 focus:outline-none hover:text-electricBlue">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <a href="#hero" class="mobile-link text-3xl font-space font-bold text-white hover:text-electricBlue transition-colors">Home</a>
        <a href="#products" class="mobile-link text-3xl font-space font-bold text-white hover:text-electricBlue transition-colors">Products</a>
        <a href="#projects" class="mobile-link text-3xl font-space font-bold text-white hover:text-electricBlue transition-colors">Projects</a>
        <a href="#leadership" class="mobile-link text-3xl font-space font-bold text-white hover:text-electricBlue transition-colors">Leadership</a>
        <a href="#contact" class="mobile-link text-3xl font-space font-bold text-white hover:text-electricBlue transition-colors">Contact</a>
        <a href="#contact" class="mt-8 px-8 py-3 rounded-full bg-white text-deepSpace font-bold hover:bg-slate-200 mobile-link">Start Project</a>
    </div>
</nav>
`;

document.getElementById('navbar-placeholder').innerHTML = navbarHTML;

// Navbar scroll logic
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.remove('py-6');
        nav.classList.add('py-2');
    } else {
        nav.classList.remove('py-2');
        nav.classList.add('py-6');
    }
});

// Mobile menu logic
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileCloseBtn = document.getElementById('mobile-close-btn');
const mobilePanel = document.getElementById('mobile-panel');
const mobileLinks = document.querySelectorAll('.mobile-link');

function toggleMenu() {
    mobilePanel.classList.toggle('translate-x-full');
    if (mobilePanel.classList.contains('translate-x-full')) {
        document.body.style.overflow = 'auto';
    } else {
        document.body.style.overflow = 'hidden';
    }
}

mobileBtn.addEventListener('click', toggleMenu);
mobileCloseBtn.addEventListener('click', toggleMenu);
mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
