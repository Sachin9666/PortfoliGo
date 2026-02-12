document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('portfolio-form');
    const generateBtn = document.getElementById('generate-btn');
    const skillsInput = document.getElementById('skills-input');
    const skillsTags = document.getElementById('skills-tags');
    const addItemBtns = document.querySelectorAll('.add-item-btn');

    const profileImageInput = document.getElementById('profileImage');
    const previewImg = document.getElementById('preview-img');
    const previewPlaceholder = document.getElementById('preview-placeholder');

    let skills = [];
    let profileImageBase64 = '';

    // Helper: Update Button Visual State
    function updateButtonState() {
        const isValid = form.checkValidity();
        if (isValid) {
            generateBtn.classList.remove('disabled');
        } else {
            generateBtn.classList.add('disabled');
        }
    }

    // Handle Profile Image Upload
    profileImageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                profileImageBase64 = event.target.result;
                previewImg.src = profileImageBase64;
                previewImg.style.display = 'block';
                previewPlaceholder.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    // Helper: Add Skill Tag
    function addSkillTag(tag) {
        if (!tag || skills.includes(tag)) return;
        skills.push(tag);
        const tagEl = document.createElement('div');
        tagEl.className = 'tag';
        tagEl.innerHTML = `${tag} <i class="fas fa-times" data-tag="${tag}"></i>`;
        tagEl.querySelector('i').addEventListener('click', (e) => {
            const tagToRemove = e.target.dataset.tag;
            skills = skills.filter(s => s !== tagToRemove);
            tagEl.remove();
            updateButtonState();
        });
        skillsTags.appendChild(tagEl);
        updateButtonState();
    }

    // Helper: Add Dynamic Item (Education/Projects)
    function addDynamicItem(type, data = null) {
        const container = document.getElementById(`${type}-list`);
        if (!container) return;

        const item = document.createElement('div');
        item.className = 'dynamic-item';

        if (type === 'education') {
            item.innerHTML = `
                <button type="button" class="remove-item" title="Remove Item"><i class="fas fa-trash"></i></button>
                <div class="grid-layout">
                    <div class="form-group">
                        <label>School / University</label>
                        <input type="text" name="school" placeholder="Harvard University" value="${data ? (data.school || '') : ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Degree</label>
                        <input type="text" name="degree" placeholder="B.S. Computer Science" value="${data ? (data.degree || '') : ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Graduation Year</label>
                        <input type="text" name="gradYear" placeholder="2024" value="${data ? (data.gradYear || '') : ''}">
                    </div>
                </div>
            `;
        } else if (type === 'projects') {
            item.innerHTML = `
                <button type="button" class="remove-item" title="Remove Item"><i class="fas fa-trash"></i></button>
                <div class="grid-layout">
                    <div class="form-group">
                        <label>Project Title</label>
                        <input type="text" name="projectTitle" placeholder="E-commerce App" value="${data ? (data.title || data.projectTitle || '') : ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Link / GitHub</label>
                        <input type="url" name="projectLink" placeholder="https://github.com/..." value="${data ? (data.link || data.projectLink || '') : ''}">
                    </div>
                    <div class="form-group full-width">
                        <label>Project Description</label>
                        <textarea name="projectDesc" placeholder="Briefly describe what you built...">${data ? (data.desc || data.projectDesc || '') : ''}</textarea>
                    </div>
                </div>
            `;
        } else if (type === 'experience') {
            item.innerHTML = `
                <button type="button" class="remove-item" title="Remove Item"><i class="fas fa-trash"></i></button>
                <div class="grid-layout">
                    <div class="form-group">
                        <label>Company</label>
                        <input type="text" name="company" placeholder="Google" value="${data ? (data.company || '') : ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Role</label>
                        <input type="text" name="role" placeholder="Software Engineer" value="${data ? (data.role || '') : ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Duration</label>
                        <input type="text" name="duration" placeholder="Jan 2022 - Present" value="${data ? (data.duration || '') : ''}">
                    </div>
                    <div class="form-group full-width">
                        <label>Description</label>
                        <textarea name="expDesc" placeholder="What did you achieve?">${data ? (data.desc || data.expDesc || '') : ''}</textarea>
                    </div>
                </div>
            `;
        } else if (type === 'certifications') {
            item.innerHTML = `
                <button type="button" class="remove-item" title="Remove Item"><i class="fas fa-trash"></i></button>
                <div class="grid-layout">
                    <div class="form-group">
                        <label>Certification Name</label>
                        <input type="text" name="certName" placeholder="AWS Certified Solutions Architect" value="${data ? (data.name || '') : ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Issuer</label>
                        <input type="text" name="issuer" placeholder="Amazon Web Services" value="${data ? (data.issuer || '') : ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Year</label>
                        <input type="text" name="year" placeholder="2023" value="${data ? (data.year || '') : ''}">
                    </div>
                    <div class="form-group">
                        <label>Credential Link</label>
                        <input type="url" name="link" placeholder="https://..." value="${data ? (data.link || '') : ''}">
                    </div>
                </div>
            `;
        }

        item.querySelector('.remove-item').addEventListener('click', () => {
            item.remove();
            updateButtonState();
        });

        container.appendChild(item);
        updateButtonState();
    }

    // Helper: Populate Form with Saved Data
    function populateForm(data) {
        const mapping = {
            'name': data.personal.name,
            'title': data.personal.title,
            'about': data.personal.about,
            'email': data.personal.email,
            'phone': data.personal.phone,
            'location': data.personal.location,
            'github': data.social.github,
            'linkedin': data.social.linkedin,
            'twitter': data.social.twitter,
            'portfolio-url': data.social.website
        };

        for (const [id, value] of Object.entries(mapping)) {
            const el = document.getElementById(id);
            if (el) el.value = value || '';
        }

        // Profile Image
        if (data.personal.profileImage) {
            profileImageBase64 = data.personal.profileImage;
            previewImg.src = profileImageBase64;
            previewImg.style.display = 'block';
            previewPlaceholder.style.display = 'none';
        }

        skillsTags.innerHTML = '';
        skills = [];
        if (data.skills && Array.isArray(data.skills)) {
            data.skills.forEach(addSkillTag);
        }

        const eduList = document.getElementById('education-list');
        eduList.innerHTML = '';
        if (data.education && data.education.length > 0) {
            data.education.forEach(edu => addDynamicItem('education', edu));
        } else {
            addDynamicItem('education');
        }

        const projectList = document.getElementById('projects-list');
        projectList.innerHTML = '';
        if (data.projects && data.projects.length > 0) {
            data.projects.forEach(project => addDynamicItem('projects', project));
        } else {
            addDynamicItem('projects');
        }

        const experienceList = document.getElementById('experience-list');
        experienceList.innerHTML = '';
        if (data.experience && data.experience.length > 0) {
            data.experience.forEach(exp => addDynamicItem('experience', exp));
        } else {
            addDynamicItem('experience');
        }

        const certificationsList = document.getElementById('certifications-list');
        if (certificationsList) {
            certificationsList.innerHTML = '';
            if (data.certifications && data.certifications.length > 0) {
                data.certifications.forEach(cert => addDynamicItem('certifications', cert));
            } else {
                addDynamicItem('certifications');
            }
        }

        if (data.template) {
            const radio = document.querySelector(`input[name="template"][value="${data.template}"]`);
            if (radio) radio.checked = true;
        }

        updateButtonState();
    }

    // Save Data
    function saveFormData() {
        const formData = new FormData(form);
        const data = {
            personal: {
                name: formData.get('name'),
                title: formData.get('title'),
                about: formData.get('about'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                location: formData.get('location'),
                profileImage: profileImageBase64
            },
            social: {
                github: formData.get('github'),
                linkedin: formData.get('linkedin'),
                twitter: formData.get('twitter'),
                website: formData.get('portfolio-url')
            },
            skills: skills,
            education: [],
            projects: [],
            experience: [],
            certifications: [],
            template: formData.get('template')
        };

        document.querySelectorAll('#education-list .dynamic-item').forEach(item => {
            const school = item.querySelector('[name="school"]').value;
            const degree = item.querySelector('[name="degree"]').value;
            if (school || degree) {
                data.education.push({
                    school: school,
                    degree: degree,
                    gradYear: item.querySelector('[name="gradYear"]').value
                });
            }
        });

        document.querySelectorAll('#projects-list .dynamic-item').forEach(item => {
            const title = item.querySelector('[name="projectTitle"]').value;
            if (title) {
                data.projects.push({
                    title: title,
                    link: item.querySelector('[name="projectLink"]').value,
                    desc: item.querySelector('[name="projectDesc"]').value
                });
            }
        });

        document.querySelectorAll('#experience-list .dynamic-item').forEach(item => {
            const company = item.querySelector('[name="company"]').value;
            if (company) {
                data.experience.push({
                    company: company,
                    role: item.querySelector('[name="role"]').value,
                    duration: item.querySelector('[name="duration"]').value,
                    desc: item.querySelector('[name="expDesc"]').value
                });
            }
        });

        document.querySelectorAll('#certifications-list .dynamic-item').forEach(item => {
            const name = item.querySelector('[name="certName"]').value;
            if (name) {
                data.certifications.push({
                    name: name,
                    issuer: item.querySelector('[name="issuer"]').value,
                    year: item.querySelector('[name="year"]').value,
                    link: item.querySelector('[name="link"]').value
                });
            }
        });

        Storage.save(data);
    }

    // Initial Load
    const savedData = Storage.load();
    if (savedData) {
        populateForm(savedData);
    } else {
        addDynamicItem('education');
        addDynamicItem('projects');
        addDynamicItem('certifications');
    }

    // Listeners
    addItemBtns.forEach(btn => {
        btn.addEventListener('click', () => addDynamicItem(btn.dataset.type));
    });

    skillsInput.addEventListener('keydown', (e) => {
        if (e.key === ',' || e.key === 'Enter') {
            e.preventDefault();
            const val = skillsInput.value.trim().replace(',', '');
            if (val) addSkillTag(val);
            skillsInput.value = '';
        }
    });

    form.addEventListener('input', updateButtonState);

    // Template card click helper
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', () => {
            const radio = card.parentElement.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
                updateButtonState();
            }
        });
    });

    // Main Generate Click
    generateBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Ensure browser shows what's missing
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        saveFormData();
        window.location.href = 'preview.html';
    });
});
