// chat.js - Floating AI Assistant Widget

const chatHTML = `
<div id="ai-chat-container" class="fixed bottom-6 right-6 z-[200] flex flex-col items-end pointer-events-none">
    
    <!-- Chat Window -->
    <div id="chat-window" class="pointer-events-auto bg-deepSpace/90 backdrop-blur-2xl border border-glassBorder rounded-2xl w-80 mb-4 overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.2)] transform transition-all duration-300 scale-0 origin-bottom-right opacity-0 flex flex-col h-[400px]">
        
        <!-- Header -->
        <div class="bg-gradient-to-r from-electricBlue to-neonPurple p-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span class="text-white font-bold text-sm tracking-wide">Nexus AI Terminal</span>
            </div>
            <button id="close-chat" class="text-white hover:text-slate-200 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>

        <!-- Chat History -->
        <div id="chat-history" class="p-4 flex-1 overflow-y-auto flex flex-col gap-4 relative">
            <div class="text-xs text-center text-slate-500 my-2">Secure Connection Established</div>
            
            <div class="flex flex-col gap-1 items-start">
                <span class="text-[10px] text-electricBlue uppercase font-bold ml-2 tracking-wider">Nexus AI</span>
                <div class="bg-glassBg border border-glassBorder rounded-2xl rounded-tl-sm px-4 py-2 text-sm text-slate-200">
                    Hello. I am the InfraBuild autonomous agent. How can I assist with your infrastructure queries today?
                </div>
            </div>

            <!-- Pre-defined questions -->
            <div class="flex flex-wrap gap-2 mt-2" id="quick-actions">
                <button class="quick-btn text-xs bg-black/40 border border-slate-700 hover:border-electricBlue rounded-full px-3 py-1 text-slate-300 transition-colors">What do you do?</button>
                <button class="quick-btn text-xs bg-black/40 border border-slate-700 hover:border-neonPurple rounded-full px-3 py-1 text-slate-300 transition-colors">Start a project</button>
                <button class="quick-btn text-xs bg-black/40 border border-slate-700 hover:border-softCyan rounded-full px-3 py-1 text-slate-300 transition-colors">Tech stack</button>
            </div>
        </div>

        <!-- Input Area -->
        <div class="p-3 border-t border-glassBorder bg-black/40">
            <form id="chat-form" class="flex gap-2">
                <input type="text" id="chat-input" placeholder="Type command..." class="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none px-2" autocomplete="off">
                <button type="submit" class="text-electricBlue hover:text-white transition-colors p-1">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
            </form>
        </div>
    </div>

    <!-- Toggle Button -->
    <button id="chat-toggle" class="pointer-events-auto w-14 h-14 rounded-full bg-gradient-to-br from-electricBlue to-neonPurple text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-110 transition-transform relative group">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-softCyan border-2 border-deepSpace"></span>
    </button>

</div>
`;

document.getElementById('ai-chat-widget').innerHTML = chatHTML;

const chatToggle = document.getElementById('chat-toggle');
const closeChat = document.getElementById('close-chat');
const chatWindow = document.getElementById('chat-window');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatHistory = document.getElementById('chat-history');
const quickBtns = document.querySelectorAll('.quick-btn');

let chatOpen = false;

function toggleChat() {
    chatOpen = !chatOpen;
    if (chatOpen) {
        chatWindow.classList.remove('scale-0', 'opacity-0');
        chatWindow.classList.add('scale-100', 'opacity-100');
    } else {
        chatWindow.classList.add('scale-0', 'opacity-0');
        chatWindow.classList.remove('scale-100', 'opacity-100');
    }
}

chatToggle.addEventListener('click', toggleChat);
closeChat.addEventListener('click', toggleChat);

function addUserMessage(msg) {
    const html = `
    <div class="flex flex-col gap-1 items-end mt-2 animate-fade-in-up">
        <span class="text-[10px] text-slate-400 uppercase font-bold mr-2 tracking-wider">User</span>
        <div class="bg-electricBlue/20 border border-electricBlue/40 rounded-2xl rounded-tr-sm px-4 py-2 text-sm text-white">
            ${msg}
        </div>
    </div>
    `;
    chatHistory.insertAdjacentHTML('beforeend', html);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function addSystemMessage(msg) {
    // Remove typing indicator if exists
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();

    const html = `
    <div class="flex flex-col gap-1 items-start mt-2 animate-fade-in-up">
        <span class="text-[10px] text-electricBlue uppercase font-bold ml-2 tracking-wider">Nexus AI</span>
        <div class="bg-glassBg border border-glassBorder rounded-2xl rounded-tl-sm px-4 py-2 text-sm text-slate-200">
            ${msg}
        </div>
    </div>
    `;
    chatHistory.insertAdjacentHTML('beforeend', html);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function showTyping() {
    const html = `
    <div id="typing-indicator" class="flex flex-col gap-1 items-start mt-2">
        <span class="text-[10px] text-electricBlue uppercase font-bold ml-2 tracking-wider">Nexus AI</span>
        <div class="bg-glassBg border border-glassBorder rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center max-w-[60px]">
            <div class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style="animation-delay: 0.2s"></div>
        </div>
    </div>
    `;
    chatHistory.insertAdjacentHTML('beforeend', html);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function handleLogic(query) {
    showTyping();
    document.getElementById('quick-actions')?.remove(); // remove quick actions

    setTimeout(() => {
        let resp = "I form intelligent topologies. Could you elaborate on what specifically you are looking for?";
        const q = query.toLowerCase();

        if (q.includes("what do you do") || q.includes("infrabuild")) {
            resp = "InfraBuild is an advanced platform that scales Next-Gen AI, Cloud Computing, and Data Systems autonomously with complete reliability. We build the architecture of tomorrow.";
        } else if (q.includes("start") || q.includes("project")) {
            resp = "Excellent. You can start a project by clicking 'Start a Project' above or dropping your email in the initialization form below.";
        } else if (q.includes("tech") || q.includes("stack")) {
            resp = "Our ecosystem runs on hyper-optimized nodes built in Go, Rust, and Python for the heavy lifting. The edges run on highly scalable Next.js and Vercel infrastructure.";
        } else if (q.includes("hello") || q.includes("hi")) {
            resp = "Hello context. Welcome to the central hub. How can I facilitate your connection?";
        }

        addSystemMessage(resp);
    }, 1200);
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = chatInput.value.trim();
    if (val) {
        addUserMessage(val);
        chatInput.value = '';
        handleLogic(val);
    }
});

quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.innerText;
        addUserMessage(text);
        handleLogic(text);
    });
});
