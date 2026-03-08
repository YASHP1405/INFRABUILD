const products = [
    {
        title: "Cloud Compute",
        desc: "Elastic, serverless execution environments powered by anti-gravity architecture for microsecond scaling.",
        features: ["Auto-scaling Node.js", "Serverless Functions", "Zero-trust Security"],
        stack: ["Kubernetes", "Rust", "Go"],
        icon: `<svg class="w-8 h-8 text-electricBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>`,
        gradient: "from-electricBlue",
        shadowHover: "hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]",
        textHover: "group-hover:text-electricBlue"
    },
    {
        title: "Data Platforms",
        desc: "High-throughput streaming databases with real-time replication and zero-latency indexing globally.",
        features: ["Real-time Sync", "Distributed Ledger", "High Availability"],
        stack: ["PostgreSQL", "Kafka", "Redis"],
        icon: `<svg class="w-8 h-8 text-softCyan" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>`,
        gradient: "from-softCyan",
        shadowHover: "hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]",
        textHover: "group-hover:text-softCyan"
    },
    {
        title: "AI Solutions",
        desc: "Neural network APIs, automated model fine-tuning, and LLM inference clusters built for the future.",
        features: ["Custom LLMs", "Inference APIs", "Vector DB"],
        stack: ["PyTorch", "TensorFlow", "CUDA"],
        icon: `<svg class="w-8 h-8 text-neonPurple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`,
        gradient: "from-neonPurple",
        shadowHover: "hover:shadow-[0_0_30px_rgba(107,33,168,0.4)]",
        textHover: "group-hover:text-neonPurple"
    },
    {
        title: "Web Systems",
        desc: "Headless content systems integrated natively with Web3, Edge computing, and static generation nodes.",
        features: ["Edge Rendering", "Headless CMS", "Global CDN"],
        stack: ["React", "Next.js", "Vercel"],
        icon: `<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>`,
        gradient: "from-white",
        shadowHover: "hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]",
        textHover: "group-hover:text-white"
    }
];

const container = document.getElementById('product-cards-container');

let html = '';
products.forEach((p) => {
    html += `
    <div class="product-card glow-on-hover rounded-3xl bg-glassBg border border-glassBorder backdrop-blur-xl p-8 relative flex flex-col justify-between cursor-pointer group shadow-2xl transition-all duration-300 transform" 
         data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-glare data-tilt-max-glare="0.2">
        <div>
            <div class="w-16 h-16 rounded-2xl bg-gradient-to-br ${p.gradient} to-transparent bg-opacity-20 border border-glassBorder flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg ${p.shadowHover}">
                ${p.icon}
            </div>
            <h3 class="text-2xl font-space font-bold text-white mb-3 transition-colors ${p.textHover}">${p.title}</h3>
            <p class="text-slate-400 mb-6 group-hover:text-slate-300 transition-colors">${p.desc}</p>
        </div>
        <div>
            <div class="flex flex-wrap gap-2 mb-6">
                ${p.stack.map(s => `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-deepSpace border border-glassBorder text-slate-300 transition-colors group-hover:border-slate-500">${s}</span>`).join('')}
            </div>
            <button class="flex items-center gap-2 text-sm font-bold text-white transition-colors ${p.textHover}" onclick="alert('Opening Tech Modal for ${p.title}...')">
                Explore Core <span class="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
        </div>
    </div>
    `;
});

container.innerHTML = html;
