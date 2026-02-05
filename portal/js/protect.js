// Protect paid week pages
// Save as: /portal/js/protect.js

(function() {
    // Get week number from URL
    const path = window.location.pathname;
    let weekNum = 1;
    
    if (path.includes('week2')) weekNum = 2;
    else if (path.includes('week3')) weekNum = 3;
    else if (path.includes('week4')) weekNum = 4;
    else if (path.includes('week5')) weekNum = 5;
    else if (path.includes('week6')) weekNum = 6;
    else if (path.includes('week7')) weekNum = 7;
    
    // Week 1 is always free
    if (weekNum === 1) return;
    
    // Load auth system
    const script = document.createElement('script');
    script.src = '/js/stripe-auth.js';
    
    script.onload = function() {
        if (!window.maatAuth || !window.maatAuth.checkWeek(weekNum)) {
            // No access - redirect to hall of truth
            alert('Access requires payment. Redirecting to Hall of Truth.');
            window.location.href = '/hall-of-truth.html';
        } else {
            // Has access - add logout button
            addLogoutButton();
        }
    };
    
    script.onerror = function() {
        // Can't load auth - assume no access
        window.location.href = '/hall-of-truth.html';
    };
    
    document.head.appendChild(script);
    
    function addLogoutButton() {
        setTimeout(() => {
            const btn = document.createElement('button');
            btn.innerHTML = 'Logout';
            btn.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(212,175,55,0.2);
                color: #D4AF37;
                border: 1px solid #D4AF37;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                z-index: 10000;
                font-family: 'Cinzel', serif;
            `;
            btn.onclick = () => {
                if (confirm('Leave sacred space?')) {
                    window.maatAuth.clearAccess();
                    window.location.href = '/hall-of-truth.html';
                }
            };
            document.body.appendChild(btn);
        }, 1000);
    }
})();
