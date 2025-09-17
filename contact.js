document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const contactForm = document.getElementById('contact-form');
    const faqItems = document.querySelectorAll('.faq-item');
    
    // District data for each state (same as in weather.js)
    const stateDistricts = {
        punjab: ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Fazilka', 
                'Ferozepur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 
                'Mansa', 'Moga', 'Muktsar', 'Pathankot', 'Patiala', 'Rupnagar', 'Sahibzada Ajit Singh Nagar', 
                'Sangrur', 'Shahid Bhagat Singh Nagar', 'Tarn Taran'],
        haryana: ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad', 'Gurugram', 
                 'Hisar', 'Jhajjar', 'Jind', 'Kaithal', 'Karnal', 'Kurukshetra', 'Mahendragarh', 
                 'Nuh', 'Palwal', 'Panchkula', 'Panipat', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat', 
                 'Yamunanagar'],
        up: ['Agra', 'Aligarh', 'Ambedkar Nagar', 'Amethi', 'Amroha', 'Auraiya', 'Ayodhya', 
            'Azamgarh', 'Baghpat', 'Bahraich', 'Ballia', 'Balrampur', 'Banda', 'Barabanki', 
            'Bareilly', 'Basti', 'Bhadohi', 'Bijnor', 'Budaun', 'Bulandshahr', 'Chandauli', 
            'Chitrakoot', 'Deoria', 'Etah', 'Etawah', 'Farrukhabad', 'Fatehpur', 'Firozabad', 
            'Gautam Buddha Nagar', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 
            'Hapur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur Dehat', 
            'Kanpur Nagar', 'Kasganj', 'Kaushambi', 'Kushinagar', 'Lalitpur', 'Lucknow', 'Maharajganj', 
            'Mahoba', 'Mainpuri', 'Mathura', 'Mau', 'Meerut', 'Mirzapur', 'Moradabad', 'Muzaffarnagar', 
            'Pilibhit', 'Pratapgarh', 'Prayagraj', 'Raebareli', 'Rampur', 'Saharanpur', 'Sambhal', 
            'Sant Kabir Nagar', 'Shahjahanpur', 'Shamli', 'Shravasti', 'Siddharthnagar', 'Sitapur', 
            'Sonbhadra', 'Sultanpur', 'Unnao', 'Varanasi'],
        uk: ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun', 'Haridwar', 'Nainital', 
            'Pauri Garhwal', 'Pithoragarh', 'Rudraprayag', 'Tehri Garhwal', 'Udham Singh Nagar', 
            'Uttarkashi'],
        hp: ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Lahaul and Spiti', 
            'Mandi', 'Shimla', 'Sirmaur', 'Solan', 'Una'],
        rajasthan: ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer', 'Bharatpur', 'Bhilwara', 
                  'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dausa', 'Dholpur', 'Dungarpur', 
                  'Hanumangarh', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 
                  'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Rajsamand', 'Sawai Madhopur', 
                  'Sikar', 'Sirohi', 'Sri Ganganagar', 'Tonk', 'Udaipur']
    };
    
    // Populate districts when state is selected
    const stateSelect = document.getElementById('state');
    const districtSelect = document.getElementById('district');
    
    if (stateSelect && districtSelect) {
        stateSelect.addEventListener('change', function() {
            const selectedState = this.value;
            districtSelect.innerHTML = '<option value="">Select your district</option>';
            
            if (selectedState) {
                stateDistricts[selectedState].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district.toLowerCase().replace(/ /g, '-');
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            }
        });
    }
    
    // FAQ functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            item.classList.toggle('active');
        });
    });
    
    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = this.elements['name'].value.trim();
            const phone = this.elements['phone'].value.trim();
            const state = this.elements['state'].value;
            const district = this.elements['district'].value;
            const queryType = this.elements['query-type'].value;
            const message = this.elements['message'].value.trim();
            
            if (!name || !phone || !state || !district || !queryType || !message) {
                alert('Please fill all required fields');
                return;
            }
            
            if (!/^\d{10}$/.test(phone)) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }
            
            // In a real app, you would send this data to a server
            alert(`Thank you for your message, ${name}! Our team will contact you shortly on ${phone}.`);
            this.reset();
        });
    }
    
    // Live chat button functionality
    const liveChatBtn = document.querySelector('.btn-small');
    if (liveChatBtn) {
        liveChatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Our customer support team is available from 9AM to 9PM. Please call or email us outside these hours.');
        });
    }
    
    // View map button functionality
    const viewMapBtn = document.querySelectorAll('.btn-small')[1];
    if (viewMapBtn) {
        viewMapBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://maps.google.com?q=Agriculture+House,Chandigarh', '_blank');
        });
    }
    
    // Start chat button functionality
    const startChatBtn = document.querySelector('.btn-small');
    if (startChatBtn && startChatBtn.textContent === 'Start Chat') {
        startChatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Chat service will open in a new window. Our support team is ready to assist you.');
        });
    }
});