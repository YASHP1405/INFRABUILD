// ================= SPLASH SCREEN =================
const splash = document.getElementById('splash');
window.addEventListener('load', () => {
  setTimeout(() => {
    splash.classList.add('hidden');
  }, 2600);
});

// ================= LIQUID GLASS THEME TOGGLE =================
const toggle = document.getElementById('themeToggle');

const setInitialTheme = () => {
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  if (prefersLight) {
    document.body.classList.add('light');
  }
};

toggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
});

setInitialTheme();

// ================= SCROLL-TRIGGERED EVENT COLUMN =================
const eventScroll = document.getElementById('eventScroll');

const checkEventScroll = () => {
  // show on the 1st page
  if (window.scrollY > 50) {
    eventScroll?.classList.add('visible');
  }
  // optional: hide again if user scrolls back up near the top
  // (remove this block if you want it to stay visible once shown)
  // event column stays visible once triggered (no hide on scroll up)
};

window.addEventListener('scroll', checkEventScroll, { passive: true });

// ================= GSAP SCROLL ANIMATIONS (NeonRain Style) =================
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Animate hero text on load
  gsap.fromTo('.animate-hero', 
    { y: 50, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 2.8 }
  );

  // Stagger reveal for grid items
  const grids = ['.expertise-grid', '.case-grid', '.mission-grid', '.fire-grid', '.leader-grid'];
  grids.forEach(gridClass => {
    const grid = document.querySelector(gridClass);
    if (grid) {
      const cards = grid.children;
      gsap.fromTo(cards, 
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  });

  // Handle generic .reveal elements (like the About card)
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    // Only animate if it's not already inside one of the grids we just animated
    if (!el.closest('.expertise-grid, .case-grid, .mission-grid, .fire-grid, .leader-grid, .section-title, .section h2')) {
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  });

  // Mask reveal for section titles (wrapping inner text for visual wipe effect)
  const titles = document.querySelectorAll('.section-title, .section h2');
  titles.forEach(title => {
    // Only wrap text nodes or simple inline content to avoid breaking icons
    if (!title.querySelector('br, img')) {
      const text = title.innerHTML;
      title.innerHTML = `<span style="display:inline-block; overflow:hidden; vertical-align:top; padding-bottom:5px;"><span style="display:inline-block;" class="title-inner">${text}</span></span>`;
      
      gsap.fromTo(title.querySelector('.title-inner'),
        { yPercent: 120 },
        {
          yPercent: 0, duration: 1.2, ease: "power4.out",
          scrollTrigger: {
            trigger: title,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
    } else {
      // Fallback simple fade up if title is complex
      gsap.fromTo(title, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: title, start: "top 90%" } });
    }
  });
}

// ================= MODAL =================
const productCards = document.querySelectorAll('.product-card');
const modalOverlay  = document.getElementById('modal-overlay');

if (modalOverlay) {
  productCards.forEach(card => {
    card.addEventListener('click', () => {
      const modalId = card.dataset.modal;
      const modal = document.getElementById(modalId);
      openModal(modal);
    });
  });

  modalOverlay.addEventListener('click', () => {
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) closeModal(activeModal);
  });

  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      closeModal(modal);
    });
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.style.display = 'block';          // must set display before class
  requestAnimationFrame(() => {
    modal.classList.add('active');
  });
  if (modalOverlay) modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('active');
  if (modalOverlay) modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => {
    if (!modal.classList.contains('active')) modal.style.display = '';
  }, 380);
}

// ================= TILT EFFECT =================
if (typeof VanillaTilt !== 'undefined') {
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
    max: 12,
    speed: 400,
    glare: true,
    'max-glare': 0.4,
  });
}

// ================= CUSTOM CANVAS LOGO =================
(function initCanvasLogo() {
  const canvas = document.getElementById('c');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 450, H = 430;
  const cx = W / 2, cy = H / 2 - 10;
  const R = 155; // scaled down radius

  let t = 0;

  function circle(x, y, r, fill, stroke, lw=1.5) {
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI*2);
    if(fill) { ctx.fillStyle=fill; ctx.fill(); }
    if(stroke) { ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.stroke(); }
  }

  function roundRect(x, y, w, h, r, fill, stroke, lw=1.5) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r); ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h); ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    if(fill) { ctx.fillStyle=fill; ctx.fill(); }
    if(stroke) { ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.stroke(); }
  }

  function drawGear(x, y, outerR, innerR, teeth, angle, fillCol, strokeCol) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    for (let i = 0; i < teeth; i++) {
      const a1 = (i / teeth) * Math.PI * 2 - Math.PI/teeth*0.4;
      const a2 = (i / teeth) * Math.PI * 2 + Math.PI/teeth*0.4;
      const a3 = ((i+0.5) / teeth) * Math.PI * 2 - Math.PI/teeth*0.3;
      const a4 = ((i+0.5) / teeth) * Math.PI * 2 + Math.PI/teeth*0.3;
      ctx.lineTo(Math.cos(a1)*outerR, Math.sin(a1)*outerR);
      ctx.lineTo(Math.cos(a2)*outerR, Math.sin(a2)*outerR);
      ctx.lineTo(Math.cos(a3)*innerR, Math.sin(a3)*innerR);
      ctx.lineTo(Math.cos(a4)*innerR, Math.sin(a4)*innerR);
    }
    ctx.closePath();
    ctx.fillStyle = fillCol; ctx.fill();
    ctx.strokeStyle = strokeCol; ctx.lineWidth = 1.5; ctx.stroke();
    circle(0, 0, innerR*0.62, fillCol, strokeCol, 1.5);
    ctx.save();
    const isLight = document.body.classList.contains('light');
    circle(0, 0, innerR*0.22, isLight ? '#f0f2fc' : '#1e2e44', strokeCol, 1.2);
    ctx.restore();
    ctx.restore();
  }

  function drawCloud(x, y, sc, alpha) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(sc, sc);
    ctx.globalAlpha = alpha;
    const blobs = [[0,0,22],[20,8,17],[-20,6,16],[36,-2,13],[-36,-2,11]];
    blobs.forEach(([bx,by,br])=>{ circle(bx, by, br, '#ffffff', null); });
    blobs.forEach(([bx,by,br])=>{ circle(bx, by, br, null, '#c8dff0', 1.2); });
    ctx.restore();
  }

  function drawNetwork(x, y, pulse) {
    ctx.save();
    ctx.translate(x, y);
    const nodes = [[0,0],[38,28],[35,-24],[74,7]];
    const edges = [[0,1],[0,2],[1,3],[2,3]];
    edges.forEach(([a,b])=>{
      ctx.beginPath();
      ctx.moveTo(nodes[a][0], nodes[a][1]);
      ctx.lineTo(nodes[b][0], nodes[b][1]);
      ctx.strokeStyle = 'rgba(120,180,230,0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
    nodes.forEach(([nx,ny],i)=>{
      const pr = 1 + Math.sin(pulse + i*1.2)*0.3;
      if(i===1 || i===3) {
        ctx.save();
        ctx.translate(nx, ny);
        ctx.rotate(Math.PI/4);
        roundRect(-9*pr,-9*pr,18*pr,18*pr,2,'#ffffff','#a0c8e8',1.5);
        ctx.restore();
      } else {
        circle(nx, ny, 7*pr, '#ffffff', '#a0c8e8', 1.5);
      }
    });
    ctx.save();
    ctx.translate(nodes[1][0], nodes[1][1]-4);
    ctx.beginPath();
    ctx.moveTo(0,-8); ctx.lineTo(7,4); ctx.lineTo(-7,4); ctx.closePath();
    ctx.fillStyle='#e8a000'; ctx.fill();
    ctx.restore();
    ctx.restore();
  }

  function drawDottedLine(pts, offset, col) {
    const segments = [];
    let totalLen = 0;
    for(let i=0;i<pts.length-1;i++){
      const dx=pts[i+1][0]-pts[i][0], dy=pts[i+1][1]-pts[i][1];
      const len=Math.sqrt(dx*dx+dy*dy);
      segments.push({x0:pts[i][0],y0:pts[i][1],x1:pts[i+1][0],y1:pts[i+1][1],len,cumLen:totalLen});
      totalLen+=len;
    }
    const DOT_SPACING = 14;
    const DOT_COUNT = Math.floor(totalLen / DOT_SPACING);
    for(let i=0;i<DOT_COUNT;i++){
      const dist = ((i/DOT_COUNT + offset)%1) * totalLen;
      let seg = segments[segments.length-1];
      for(let s of segments){ if(s.cumLen+s.len>=dist){ seg=s; break; } }
      const u=(dist-seg.cumLen)/seg.len;
      const px=seg.x0+(seg.x1-seg.x0)*u;
      const py=seg.y0+(seg.y1-seg.y0)*u;
      const edge=Math.min(i,DOT_COUNT-i)/(DOT_COUNT*0.2);
      const a=Math.min(1,edge);
      ctx.beginPath();
      ctx.arc(px,py,2.2,0,Math.PI*2);
      ctx.fillStyle=col.replace(')',`,${a})`).replace('rgb','rgba');
      ctx.fill();
    }
  }

  function drawCloudParticles(x, y, time) {
    const PARTS = 12;
    const explodeR = (Math.sin(time*1.5)*0.5+0.5) * 28;
    for(let i=0;i<PARTS;i++){
      const a = (i/PARTS)*Math.PI*2 + time*0.3;
      const px = x + Math.cos(a)*explodeR;
      const py = y + Math.sin(a)*explodeR*0.6;
      const alpha = 0.15 + explodeR/28*0.5;
      circle(px, py, 2.5+explodeR/28*2, `rgba(180,220,255,${alpha})`, null);
    }
  }

  function drawBars(x, y) {
    const data = [0.5, 0.75, 1.0, 0.82];
    const maxH = 52;
    data.forEach((v,i)=>{
      const bh = v*maxH;
      const bx = x + i*16;
      const by = y - bh;
      ctx.fillStyle = (i===2||i===3) ? '#e8a000' : '#3a80cc';
      ctx.fillRect(bx, by, 11, bh);
      ctx.strokeStyle = (i===2||i===3) ? '#c07000' : '#1a5090';
      ctx.lineWidth = 1;
      ctx.strokeRect(bx, by, 11, bh);
    });
  }

  // Draw arrow (modified strictly off relative 'x' and 'y')
  function drawArrow(x, y, bob) {
    const ay = y + bob;
    ctx.fillStyle = '#e8a000';
    ctx.strokeStyle = '#c07000';
    ctx.lineWidth = 1.5;
    roundRect(x-12, ay-35, 24, 70, 3, '#e8a000', '#c07000', 1.5);
    ctx.beginPath();
    ctx.moveTo(x, ay-70);
    ctx.lineTo(x+30, ay-35);
    ctx.lineTo(x-30, ay-35);
    ctx.closePath();
    ctx.fillStyle='#e8a000'; ctx.fill();
    ctx.strokeStyle='#c07000'; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle='rgba(255,180,0,0.4)';
    roundRect(x-5, ay-35, 10, 70, 2, 'rgba(255,200,50,0.3)', null);
  }

  function drawSwoosh() {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, cy+R*0.08, R*1.08, R*0.22, 0, Math.PI*0.08, Math.PI*0.92);
    ctx.strokeStyle='#1a5ca0';
    ctx.lineWidth=8;
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx, cy+R*0.08, R*1.08, R*0.22, 0, Math.PI*0.08, Math.PI*0.92);
    ctx.strokeStyle='rgba(26,92,160,0.4)';
    ctx.lineWidth=14;
    ctx.stroke();
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    t += 0.016;

    const midY = cy;
    
    // Check if light mode
    const isLight = document.body.classList.contains('light');

    const glowColorOuter = isLight ? 'rgba(106,92,255,0.08)' : 'rgba(26,108,200,0.14)';
    const glowColorInner = isLight ? 'rgba(232,160,0,0.06)'  : 'rgba(232,160,0,0.05)';
    
    const glow = ctx.createRadialGradient(cx, cy-20, R*0.3, cx, cy-20, R*1.3);
    glow.addColorStop(0, glowColorOuter);
    glow.addColorStop(0.6, glowColorInner);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0,0,W,H);

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, midY, R, Math.PI, 0);
    ctx.closePath();
    const blueGrad = ctx.createRadialGradient(cx-40, midY-80, 20, cx, midY, R);
    blueGrad.addColorStop(0, '#2a7fd4');
    blueGrad.addColorStop(0.6,'#1558a8');
    blueGrad.addColorStop(1, '#0c3470');
    ctx.fillStyle = blueGrad;
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, midY, R, 0, Math.PI);
    ctx.closePath();
    const darkGrad = ctx.createRadialGradient(cx, midY+60, 10, cx, midY, R);
    darkGrad.addColorStop(0, isLight ? '#f4f6fc' : '#1e2e44');
    darkGrad.addColorStop(1, isLight ? '#e2e6fa' : '#0d1825');
    ctx.fillStyle = darkGrad;
    ctx.fill();
    ctx.restore();

    drawSwoosh();

    ctx.beginPath();
    ctx.moveTo(cx-R, midY); ctx.lineTo(cx+R, midY);
    ctx.strokeStyle= isLight ? 'rgba(90,160,220,0.4)' : 'rgba(90,160,220,0.8)';
    ctx.lineWidth=3; ctx.stroke();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, midY, R-2, Math.PI, 0);
    ctx.closePath();
    ctx.clip();

    drawBars(cx - 90, midY - 20);
    drawArrow(cx, midY + 30, Math.sin(t*1.6)*8);

    const cloudX = cx - 72, cloudY = midY - 86;
    drawCloud(cloudX, cloudY, 0.9, 1);
    drawCloudParticles(cloudX, cloudY, t);

    drawNetwork(cx + 28, midY - 105, t*2.2);

    drawDottedLine([[cx+18, midY-100],[cx+38, midY-115],[cx+78, midY-105]], (t*0.22)%1, 'rgb(100,180,230)');
    drawDottedLine([[cx+78, midY-105],[cx+95, midY-75],[cx+93, midY-40]], (t*0.22+0.3)%1, 'rgb(100,180,230)');
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, midY, R-2, 0, Math.PI);
    ctx.closePath();
    ctx.clip();

    // Adjust gears color logic based on light/dark mode
    const gearExt1 = isLight ? '#b0b8cc' : '#2a3e58';
    const gearInt1 = isLight ? '#8a95aa' : '#4a6a8a';
    const gearExt2 = isLight ? '#9aa4bb' : '#1e2e42';
    const gearInt2 = isLight ? '#7a8599' : '#3a5878';
    const gearExt3 = isLight ? '#cbd4e6' : '#253344';
    const gearInt3 = isLight ? '#abb4cc' : '#3a5470';
    
    drawGear(cx+45,  midY+60, 36, 28, 12,  t*1.1,  gearExt1, gearInt1);
    drawGear(cx-8,   midY+48, 24, 18,  9, -t*1.65, gearExt2, gearInt2);
    drawGear(cx-52,  midY+64, 18, 14,  8,  t*2.1,  gearExt3, gearInt3);

    drawCloud(cx-72, midY+56, 0.60, 0.75);
    drawCloudParticles(cx-72, midY+56, t+1.5);

    const sY = midY + 8 + Math.sin(t*1.6)*3;
    roundRect(cx-7, sY, 14, 52, 3, '#e8a000', '#c07000', 1.5);

    drawDottedLine([[cx-72, midY+56],[cx-36, midY+45],[cx-5, midY+25]], (t*0.28+0.5)%1, 'rgb(80,140,200)');
    ctx.restore();

    ctx.beginPath();
    ctx.arc(cx, midY, R, 0, Math.PI*2);
    ctx.strokeStyle='rgba(80,150,220,0.9)';
    ctx.lineWidth=4;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, midY, R+3, 0, Math.PI*2);
    ctx.strokeStyle='rgba(26,108,200,0.3)';
    ctx.lineWidth=8;
    ctx.stroke();

    requestAnimationFrame(draw);
  }

  draw();
})();

// ================= CONTACT FORM =================
const form = document.getElementById('contactFor');
if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const button     = form.querySelector('button');
    const successMsg = form.querySelector('.form-success');
    button.classList.add('loading');
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method:  'POST',
        body:    formData,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        form.reset();
        successMsg.style.display = 'block';
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Network error. Please try later.');
    }
    button.classList.remove('loading');
  });
}
