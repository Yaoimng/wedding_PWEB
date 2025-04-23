/*----------------------------------------------
 * Wedding Invitation Website - Main JavaScript
 * Author: [Your Name]
 * Version: 1.0
 *----------------------------------------------*/

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Global Variables
    const envelopeContainer = document.getElementById('envelope');
    const mainContent = document.getElementById('main-content');
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const sections = document.querySelectorAll('section');
    const animatedElements = document.querySelectorAll('.section-title, .timeline-item, .event-card, .registry-card, .accommodation-card, .gallery-item');
    
    // Envelope Animation & Open Invitation
    document.getElementById('open-invitation').addEventListener('click', function() {
        // Add class to animate envelope
        document.querySelector('.envelope').classList.add('opened');
        
        // Wait for animation to complete then show main content
        setTimeout(function() {
            envelopeContainer.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Trigger initial animations
            animateOnScroll();
        }, 1000);
    });
    
    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Transform hamburger to X
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                menuToggle.click();
            }
        });
    });
    
    // Smooth Scrolling for Navigation Links
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Get the height of the fixed header
            const headerHeight = header.clientHeight;
            
            // Calculate the target position with offset
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // Header Background Change on Scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Call animation function on scroll
        animateOnScroll();
    });
    
    // Map Modal for Location
    const locationButtons = document.querySelectorAll('.location-btn');
    const mapContainer = document.getElementById('location-map');
    const closeMapButton = document.getElementById('close-map');
    
    // Global variable for map
    let map;
    
    // Initialize Google Map
    window.initMap = function() {
        // Default map options
        const mapOptions = {
            zoom: 15,
            center: { lat: 40.7128, lng: -74.0060 }, // Default to NY
            styles: [
                {
                    "featureType": "all",
                    "elementType": "geometry.fill",
                    "stylers": [{ "weight": "2.00" }]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [{ "color": "#f9f3f0" }]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{ "color": "#d4b08c" }]
                }
            ]
        };
        
        // Create the map
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
    };
    
    // Open map modal with location
    locationButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const location = this.getAttribute('data-location');
            
            // If Google Maps API is loaded
            if (typeof google !== 'undefined') {
                const geocoder = new google.maps.Geocoder();
                
                geocoder.geocode({ address: location }, function(results, status) {
                    if (status === 'OK') {
                        map.setCenter(results[0].geometry.location);
                        
                        // Create marker
                        new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                            animation: google.maps.Animation.DROP
                        });
                        
                        // Show map modal
                        mapContainer.classList.add('active');
                    } else {
                        alert('Could not find location: ' + status);
                    }
                });
            } else {
                alert('Maps API not loaded');
            }
        });
    });
    
    // Close map modal
    if (closeMapButton) {
        closeMapButton.addEventListener('click', function() {
            mapContainer.classList.remove('active');
        });
    }
    
    // Close map modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === mapContainer) {
            mapContainer.classList.remove('active');
        }
    });
    
    // Animate elements when they are in viewport
    function animateOnScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If element is in viewport
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initialize animations
    animateOnScroll();
    
    // Social Media Sharing
    const shareButtons = document.querySelectorAll('.social-icons a');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = window.location.href;
            const text = "Join us to celebrate Sarah & Michael's wedding!";
            
            // Get icon class
            const iconClass = this.querySelector('i').className;
            
            // Share based on platform
            if (iconClass.includes('facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
            } else if (iconClass.includes('twitter')) {
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
            } else if (iconClass.includes('instagram')) {
                // Instagram doesn't have a direct share link, just open Instagram
                window.open('https://www.instagram.com', '_blank');
            }
        });
    });
});