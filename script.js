window.addEventListener('DOMContentLoaded', () => {
    // تأثير كتابة تلقائي لاسمك
    const typeEffect = (element, text, speed = 100) => {
        let index = 0;
        const type = () => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        };
        type();
    };

    const titleElement = document.getElementById('typedName');
    if (titleElement) {
        typeEffect(titleElement, 'حسام حسن');
    }

    // ظهور العناصر أثناء التمرير
    const scrollElements = document.querySelectorAll('.scroll-fade');
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    scrollElements.forEach(el => scrollObserver.observe(el));

    // تأثير عند الضغط على الأزرار
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            button.classList.add('clicked');
            setTimeout(() => button.classList.remove('clicked'), 200);
        });
    });

    // عنصر لعرض الفيديوهات والصور
    const videoDisplay = document.querySelector('#videoDisplay');
    const imageDisplay = document.querySelector('#imageDisplay');
    const videoForm = document.querySelector('#videoForm');
    const imageForm = document.querySelector('#imageForm');

    // إضافة عداد الزوار
    let visitorCount = localStorage.getItem('visitorCount');

    if (!visitorCount) {
        visitorCount = 1;
    } else {
        visitorCount = parseInt(visitorCount) + 1;
    }

    localStorage.setItem('visitorCount', visitorCount);
    document.getElementById('visitorCount').textContent = `عدد الزوار: ${visitorCount}`;

    // دالة لعرض روابط الوسائل الاجتماعية
    function displaySocialLinks() {
        const socialLinksDisplay = document.querySelector('#socialLinksDisplay');
        socialLinksDisplay.innerHTML = `
            <a href="https://www.facebook.com/profile.php?id=61556301363251" target="_blank">
                <img src="facebook-icon.png" alt="Facebook" width="40">
            </a>
            <a href="https://www.instagram.com/3bgwed/" target="_blank">
                <img src="instagram-icon.png" alt="Instagram" width="40">
            </a>
            <a href="https://www.youtube.com/@3bgwed2003" target="_blank">
                <img src="youtube-icon.png" alt="YouTube" width="40">
            </a>
        `;
    }

    // دالة لعرض الفيديوهات المخزنة
    function displaySavedVideos() {
        const storedVideos = JSON.parse(localStorage.getItem('videoLinks')) || [];
        videoDisplay.innerHTML = '';

        storedVideos.forEach(video => {
            if (isValidURL(video)) {
                let videoURL = video;
                if (videoURL.includes('shorts/')) {
                    const videoId = videoURL.split('shorts/')[1];
                    videoURL = `https://www.youtube.com/embed/${videoId}`;
                }
                const videoElement = document.createElement('iframe');
                videoElement.src = videoURL;
                videoElement.width = "560";
                videoElement.height = "315";
                videoElement.frameBorder = "0";
                videoElement.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
                videoElement.allowFullscreen = true;
                videoDisplay.appendChild(videoElement);
            }
        });
    }

    // دالة لعرض الصور المخزنة
    function displaySavedImages() {
        const storedImages = JSON.parse(localStorage.getItem('imageLinks')) || [];
        imageDisplay.innerHTML = '';

        storedImages.forEach(image => {
            if (isValidURL(image)) {
                const imgElement = document.createElement('img');
                imgElement.src = image;
                imgElement.alt = 'My Work';
                imgElement.style.width = "300px";
                imgElement.style.height = "auto";
                imgElement.style.margin = "10px";
                imageDisplay.appendChild(imgElement);
            }
        });
    }

    // دالة للتحقق من صحة الرابط
    function isValidURL(url) {
        const pattern = /^https?:\/\/[a-zA-Z0-9.-]+(?:\/[^\s]*)?$/;
        return pattern.test(url);
    }

    // التعامل مع إضافة الفيديو
    if (videoForm) {
        videoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const videoInput = document.querySelector('#video');
            let videoLink = videoInput.value.trim();

            if (isValidURL(videoLink)) {
                let storedVideos = JSON.parse(localStorage.getItem('videoLinks')) || [];

                if (videoLink.includes('shorts/')) {
                    const videoId = videoLink.split('shorts/')[1];
                    videoLink = `https://www.youtube.com/embed/${videoId}`;
                }

                storedVideos.push(videoLink);
                localStorage.setItem('videoLinks', JSON.stringify(storedVideos));
                displaySavedVideos();
                alert('تم إضافة الفيديو بنجاح!');
                videoInput.value = '';
            } else {
                alert('يرجى إدخال رابط فيديو صحيح!');
            }
        });
    }

    // التعامل مع إضافة الصور
    if (imageForm) {
        imageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const imageInput = document.querySelector('#image');
            const imageLink = imageInput.value.trim();

            if (isValidURL(imageLink)) {
                let storedImages = JSON.parse(localStorage.getItem('imageLinks')) || [];
                storedImages.push(imageLink);
                localStorage.setItem('imageLinks', JSON.stringify(storedImages));
                displaySavedImages();
                alert('تم إضافة الصورة بنجاح!');
                imageInput.value = '';
            } else {
                alert('يرجى إدخال رابط صورة صحيح!');
            }
        });
    }

    // عرض الروابط الاجتماعية والفيديوهات والصور
    displaySocialLinks();
    displaySavedVideos();
    displaySavedImages();
});
