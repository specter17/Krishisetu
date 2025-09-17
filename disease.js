document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const uploadBox = document.getElementById('upload-box');
    const imageUpload = document.getElementById('image-upload');
    const analyzeBtn = document.getElementById('analyze-btn');
    const resultPlaceholder = document.getElementById('result-placeholder');
    const resultContent = document.getElementById('result-content');
    const previewImage = document.getElementById('preview-image');
    const diseaseName = document.getElementById('disease-name');
    const diseaseConfidence = document.getElementById('disease-confidence');
    const cropTypeResult = document.getElementById('crop-type-result');
    const diseaseSymptoms = document.getElementById('disease-symptoms');
    const treatmentList = document.getElementById('treatment-list');
    const preventionList = document.getElementById('prevention-list');

    // Mock disease database (in a real app, this would come from an API)
    const diseaseDatabase = {
        wheat: [
            {
                name: "Wheat Rust",
                symptoms: "Reddish-brown pustules on leaves and stems that can spread quickly",
                treatment: [
                    "Apply fungicides containing propiconazole or tebuconazole",
                    "Remove and destroy infected plants",
                    "Plant resistant varieties in future seasons"
                ],
                prevention: [
                    "Practice crop rotation with non-host crops",
                    "Avoid excessive nitrogen fertilization",
                    "Plant resistant varieties when available"
                ]
            },
            {
                name: "Powdery Mildew",
                symptoms: "White powdery spots on leaves that may turn yellow and die",
                treatment: [
                    "Apply sulfur-based fungicides",
                    "Improve air circulation around plants",
                    "Remove severely infected leaves"
                ],
                prevention: [
                    "Avoid dense planting",
                    "Water plants at the base to keep foliage dry",
                    "Choose resistant varieties"
                ]
            }
        ],
        rice: [
            {
                name: "Rice Blast",
                symptoms: "Diamond-shaped lesions with gray centers and brown margins on leaves",
                treatment: [
                    "Apply fungicides containing tricyclazole or azoxystrobin",
                    "Reduce nitrogen fertilizer application",
                    "Ensure proper water management"
                ],
                prevention: [
                    "Plant resistant varieties",
                    "Avoid excessive nitrogen fertilization",
                    "Practice field sanitation between seasons"
                ]
            }
        ],
        potato: [
            {
                name: "Late Blight",
                symptoms: "Water-soaked lesions that turn brown and spread rapidly in wet conditions",
                treatment: [
                    "Apply copper-based fungicides",
                    "Remove and destroy infected plants immediately",
                    "Reduce leaf wetness by improving air circulation"
                ],
                prevention: [
                    "Use certified disease-free seed potatoes",
                    "Practice crop rotation (3-4 years)",
                    "Avoid overhead irrigation"
                ]
            }
        ]
    };

    // Handle drag and drop events
    uploadBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });

    uploadBox.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });

    uploadBox.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        if (e.dataTransfer.files.length) {
            imageUpload.files = e.dataTransfer.files;
            handleImageUpload();
        }
    });

    // Handle click on upload box
    uploadBox.addEventListener('click', function() {
        imageUpload.click();
    });

    // Handle file selection
    imageUpload.addEventListener('change', handleImageUpload);

    function handleImageUpload() {
        const file = imageUpload.files[0];
        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                analyzeBtn.disabled = false;
                
                // Show preview (for demo purposes)
                resultPlaceholder.style.display = 'none';
                resultContent.style.display = 'block';
                
                // Set a temporary "analyzing" state
                diseaseName.textContent = "Analyzing...";
                diseaseConfidence.textContent = "";
                cropTypeResult.textContent = "";
                diseaseSymptoms.textContent = "";
                treatmentList.innerHTML = "";
                preventionList.innerHTML = "";
            };
            
            reader.readAsDataURL(file);
        }
    }

    // Handle analyze button click
    analyzeBtn.addEventListener('click', function() {
        if (!imageUpload.files.length) return;
        
        // Simulate analysis (in a real app, this would call an API)
        simulateDiseaseDetection();
    });

    function simulateDiseaseDetection() {
        // Show loading state
        diseaseName.textContent = "Analyzing image...";
        diseaseConfidence.textContent = "";
        cropTypeResult.textContent = "";
        diseaseSymptoms.textContent = "";
        treatmentList.innerHTML = "";
        preventionList.innerHTML = "";
        
        // Simulate API delay
        setTimeout(function() {
            // Get selected crop type or try to detect
            const cropType = document.getElementById('crop-type').value;
            
            // For demo purposes, randomly select a disease from the database
            let detectedCrop = cropType;
            if (!detectedCrop || detectedCrop === 'auto-detect') {
                // If auto-detect, pick a random crop for demo
                const crops = Object.keys(diseaseDatabase);
                detectedCrop = crops[Math.floor(Math.random() * crops.length)];
            }
            
            // Get diseases for this crop
            const cropDiseases = diseaseDatabase[detectedCrop] || [];
            
            if (cropDiseases.length > 0) {
                // Select a random disease for this crop
                const randomDisease = cropDiseases[Math.floor(Math.random() * cropDiseases.length)];
                const confidence = (Math.random() * 30 + 70).toFixed(0); // Random confidence 70-100%
                
                // Display results
                diseaseName.textContent = randomDisease.name;
                diseaseConfidence.textContent = `Confidence: ${confidence}%`;
                cropTypeResult.textContent = `Crop: ${detectedCrop.charAt(0).toUpperCase() + detectedCrop.slice(1)}`;
                diseaseSymptoms.textContent = randomDisease.symptoms;
                
                // Add treatments
                treatmentList.innerHTML = '';
                randomDisease.treatment.forEach(treatment => {
                    const li = document.createElement('li');
                    li.textContent = treatment;
                    treatmentList.appendChild(li);
                });
                
                // Add prevention tips
                preventionList.innerHTML = '';
                randomDisease.prevention.forEach(tip => {
                    const li = document.createElement('li');
                    li.textContent = tip;
                    preventionList.appendChild(li);
                });
            } else {
                // No diseases found for this crop
                diseaseName.textContent = "No diseases detected";
                diseaseConfidence.textContent = "";
                cropTypeResult.textContent = `Crop: ${detectedCrop.charAt(0).toUpperCase() + detectedCrop.slice(1)}`;
                diseaseSymptoms.textContent = "The image appears to show a healthy plant.";
                treatmentList.innerHTML = "<li>No treatment needed</li>";
                preventionList.innerHTML = "<li>Continue current care practices</li>";
            }
        }, 2000); // 2 second delay to simulate processing
    }
});