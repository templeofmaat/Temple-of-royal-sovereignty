// Simple Token System for Hall of Truth
// Save as: /js/stripe-auth.js

(function() {
    const ACCESS_KEY = 'maat_access_2024';
    
    function hasAccess() {
        const token = localStorage.getItem(ACCESS_KEY);
        if (!token) return false;
        
        try {
            return token.length >= 20 && /[a-zA-Z]/.test(token) && /[0-9]/.test(token);
        } catch {
            return false;
        }
    }
    
    function checkWeek(weekNum) {
        if (weekNum === 1) return true;
        return hasAccess();
    }
    
    function saveToken(token) {
        localStorage.setItem(ACCESS_KEY, token);
        localStorage.setItem('maat_paid_date', new Date().toISOString());
        return true;
    }
    
    function clearAccess() {
        localStorage.removeItem(ACCESS_KEY);
        localStorage.removeItem('maat_paid_date');
    }
    
    window.maatAuth = {
        hasAccess: hasAccess,
        checkWeek: checkWeek,
        saveToken: saveToken,
        clearAccess: clearAccess,
        paymentLink: 'https://buy.stripe.com/5kQcN55xt2EY8ycbZF77O0w'
    };
})();
