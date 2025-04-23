document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Target wedding date - format: YYYY-MM-DD
    const weddingDate = new Date('2025-09-15T14:00:00').getTime();
    
    // Update countdown every second
    const countdown = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();
        
        // Find the distance between now and the wedding date
        const distance = weddingDate - now;
        
        // If the countdown is finished, display a message
        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = "<h3>Our Wedding Day Has Arrived!</h3>";
            return;
        }
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Add leading zeros if needed
        const formattedDays = days < 10 ? '0' + days : days;
        const formattedHours = hours < 10 ? '0' + hours : hours;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
        
        // Display the result
        document.getElementById('days').textContent = formattedDays;
        document.getElementById('hours').textContent = formattedHours;
        document.getElementById('minutes').textContent = formattedMinutes;
        document.getElementById('seconds').textContent = formattedSeconds;
    }, 1000);
});

