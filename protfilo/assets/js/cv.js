/* --- Tailwind Configuration --- */
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'Inter', 'sans-serif'],
                siliguri: ['Hind Siliguri', 'sans-serif'],
                serif: ['Georgia', 'serif'],
            },
            colors: {
                neonBlue: '#00f3ff',
                neonPurple: '#bc13fe',
            }
        }
    }
}

/* --- App Logic --- */
const state = { 
    lang: null, 
    image: null, 
    primaryColor: '#2c3e50', 
    mode: 'professional'
};

const i18n = {
    en: {
        name: "Full Name", email: "Email", phone: "Phone", address: "Present Address",
        jobTitle: "Job Title", objective: "OBJECTIVE", description: "Industrial Training",
        education: "EDUCATION", experience: "WORK EXPERIENCE", activities: "Activities",
        skills: "SKILLS", languages: "LANGUAGES",
        certificates: "HONORS & AWARDS",
        interests: "INTERESTS", dob: "Date of Birth",
        imgLabel: "Upload Photo", colorLabel: "Theme Color",
        
        father: "Father's Name", mother: "Mother's Name", permAddr: "Permanent Address",
        marital: "Marital Status", nid: "NID", religion: "Religion", nationality: "Nationality",
        sex: "Sex", blood: "Blood Group", height: "Height",

        h_contact: "CONTACT", h_skills: "SKILLS", h_edu: "EDUCATION",
        h_exp: "WORK EXPERIENCE", h_act: "ACTIVITIES", h_cert: "HONORS & AWARDS", h_int: "INTERESTS",
        h_p_details: "PERSONAL DETAILS", h_decl: "DECLARATION", h_sig: "Signature",

        eduHelper: "Format: <b>Degree</b> , <b>Institute</b> , <b>Year</b> , <b>Group</b> , <b>Board</b> , <b>GPA</b>",
        expHelper: "Format: <b>Company</b> , <b>Designation</b> , <b>Duration</b> , <b>Location</b>",
    },
    bn: {
        name: "পূর্ণ নাম", email: "ইমেইল", phone: "মোবাইল", address: "বর্তমান ঠিকানা",
        jobTitle: "পেশা / পদবী", objective: "ক্যারিয়ার অবজেক্টিভ", description: "ইন্ডাস্ট্রিয়াল ট্রেনিং",
        education: "শিক্ষা", experience: "কাজের অভিজ্ঞতা", activities: "কার্যক্রম",
        skills: "দক্ষতা", languages: "ভাষাসমূহ",
        certificates: "সার্টিফিকেট", interests: "আগ্রহ", dob: "জন্ম তারিখ",
        imgLabel: "ছবি আপলোড করুন", colorLabel: "থিম কালার",
        
        father: "পিতার নাম", mother: "মাতার নাম", permAddr: "স্থায়ী ঠিকানা",
        marital: "বৈবাহিক অবস্থা", nid: "জাতীয় পরিচয়পত্র", religion: "ধর্ম", nationality: "জাতীয়তা",
        sex: "লিঙ্গ", blood: "রক্তের গ্রুপ", height: "উচ্চতা",

        h_contact: "যোগাযোগ", h_skills: "দক্ষতা", h_edu: "শিক্ষা",
        h_exp: "অভিজ্ঞতা", h_act: "কার্যক্রম", h_cert: "সম্মাননা", h_int: "আগ্রহ",
        h_p_details: "ব্যক্তিগত তথ্য", h_decl: "ঘোষণা", h_sig: "স্বাক্ষর",

        eduHelper: "লিখুন: <b>ডিগ্রি</b> , <b>প্রতিষ্ঠান</b> , <b>সাল</b> , <b>গ্রুপ</b> , <b>বোর্ড</b> , <b>ফলাফল</b>",
        expHelper: "লিখুন: <b>কোম্পানি</b> , <b>পদবী</b> , <b>সময়কাল</b> , <b>স্থান</b>",
    }
};

function showLanguageModal(mode) {
    state.mode = mode;
    if(mode === 'professional') state.primaryColor = '#2d8f85'; 
    else state.primaryColor = '#103138'; 
    
    document.getElementById('landing-view').classList.add('hidden');
    document.getElementById('lang-modal').classList.remove('hidden');
}

function selectLang(lang) {
    state.lang = lang;
    document.getElementById('lang-modal').classList.add('hidden');
    document.getElementById('app-view').classList.remove('hidden');
    document.getElementById('app-view').classList.add('flex');
    buildForm();
    generatePreview(); 
}

function buildForm() {
    const formContainer = document.getElementById('cv-form');
    formContainer.innerHTML = '';
    const t = i18n[state.lang];

    const createInput = (id, label, type = 'text', isArea = false, helperText = null) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'relative pt-4';
        let input = isArea ? document.createElement('textarea') : document.createElement('input');
        if (isArea) input.rows = 4; else input.type = type;
        input.id = id;
        input.className = 'floating-input block w-full appearance-none bg-transparent border-b-2 border-gray-600 px-0 py-2 text-white focus:outline-none focus:border-neonBlue transition-colors peer placeholder-transparent';
        input.placeholder = label;
        input.addEventListener('input', generatePreview);
        const lbl = document.createElement('label');
        lbl.innerText = label;
        lbl.className = 'absolute left-0 top-4 text-gray-400 text-sm transition-all duration-300 transform -translate-y-0 scale-100 origin-[0] peer-focus:-translate-y-7 peer-focus:text-neonBlue peer-focus:scale-85 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:scale-85 pointer-events-none';
        wrapper.appendChild(input);
        wrapper.appendChild(lbl);
        if(helperText) {
            const helpDiv = document.createElement('div');
            helpDiv.className = 'format-helper';
            helpDiv.innerHTML = `Use <span class="highlight">Comma (,)</span> to separate.<br>${helperText}`;
            wrapper.appendChild(helpDiv);
        }
        return wrapper;
    };

    formContainer.appendChild(createInput('inp-name', t.name));
    formContainer.appendChild(createInput('inp-job', t.jobTitle));
    
    const pdLabel = document.createElement('h3');
    pdLabel.className = "text-neonBlue text-sm font-bold uppercase mt-4 border-b border-gray-700 pb-1";
    pdLabel.innerText = "Personal Details (For Page 2)";
    formContainer.appendChild(pdLabel);

    formContainer.appendChild(createInput('inp-father', t.father));
    formContainer.appendChild(createInput('inp-mother', t.mother));
    formContainer.appendChild(createInput('inp-dob', t.dob, 'text', false, "Ex: 31-12-2000, Place"));
    formContainer.appendChild(createInput('inp-perm-addr', t.permAddr));
    formContainer.appendChild(createInput('inp-marital', t.marital));
    formContainer.appendChild(createInput('inp-nationality', t.nationality));
    formContainer.appendChild(createInput('inp-nid', t.nid));
    formContainer.appendChild(createInput('inp-religion', t.religion));
    
    const rowDiv = document.createElement('div');
    rowDiv.className = "grid grid-cols-2 gap-4";
    const divSex = createInput('inp-sex', t.sex);
    const divBlood = createInput('inp-blood', t.blood);
    rowDiv.appendChild(divSex);
    rowDiv.appendChild(divBlood);
    formContainer.appendChild(rowDiv);
    
    formContainer.appendChild(createInput('inp-height', t.height));

    const colorWrapper = document.createElement('div');
    colorWrapper.className = 'flex items-center gap-4 mt-6';
    const colorInp = document.createElement('input');
    colorInp.type = 'color';
    colorInp.id = 'inp-color';
    colorInp.value = state.primaryColor;
    colorInp.className = 'h-10 w-10 bg-transparent border-none cursor-pointer';
    colorInp.addEventListener('input', (e) => { state.primaryColor = e.target.value; generatePreview(); });
    const colorLbl = document.createElement('span');
    colorLbl.innerText = t.colorLabel;
    colorLbl.className = 'text-gray-300';
    colorWrapper.appendChild(colorInp);
    colorWrapper.appendChild(colorLbl);
    formContainer.appendChild(colorWrapper);

    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'mt-4 border border-dashed border-gray-500 rounded-lg p-4 text-center hover:border-neonBlue transition';
    const imgInp = document.createElement('input');
    imgInp.type = 'file';
    imgInp.accept = 'image/*';
    imgInp.className = 'hidden';
    imgInp.id = 'inp-image';
    const imgBtn = document.createElement('label');
    imgBtn.htmlFor = 'inp-image';
    imgBtn.innerHTML = `<i class="fa-solid fa-cloud-arrow-up text-2xl text-neonBlue mb-2"></i><br>${t.imgLabel}`;
    imgBtn.className = 'cursor-pointer text-gray-300 block';
    imgInp.addEventListener('change', handleImageUpload);
    imgWrapper.appendChild(imgInp);
    imgWrapper.appendChild(imgBtn);
    formContainer.appendChild(imgWrapper);

    formContainer.appendChild(createInput('inp-obj', t.objective, 'text', true));
    formContainer.appendChild(createInput('inp-edu', t.education, 'text', true, t.eduHelper));
    formContainer.appendChild(createInput('inp-exp', t.experience, 'text', true, t.expHelper));
    formContainer.appendChild(createInput('inp-desc', t.description, 'text', true));
    
    formContainer.appendChild(createInput('inp-phone', t.phone, 'tel'));
    formContainer.appendChild(createInput('inp-email', t.email, 'email'));
    formContainer.appendChild(createInput('inp-loc', t.address));
    
    formContainer.appendChild(createInput('inp-skills', t.skills, 'text', true));
    formContainer.appendChild(createInput('inp-lang', t.languages));
    formContainer.appendChild(createInput('inp-cert', t.certificates, 'text', true));
    formContainer.appendChild(createInput('inp-int', t.interests, 'text', true));
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) { state.image = evt.target.result; generatePreview(); }
        reader.readAsDataURL(file);
    }
}

// --- Helpers ---

// 1. HELPER: Turns Commas into New Lines (For Personal Details like DOB)
const parseDetailValue = (str) => {
    if(!str) return '';
    return str.split(',').map(s => s.trim()).join('<br>');
};

// 2. HELPER: Honors & Awards (Bold Years)
const parseCerts = (str) => {
    if(!str) return '';
    return str.split(/,|\n/).filter(l => l.trim() !== '').map(line => {
        const text = line.trim();
        if(text.includes(':')) {
            const splitIndex = text.indexOf(':');
            const year = text.substring(0, splitIndex);
            const desc = text.substring(splitIndex + 1);
            return `<div class="mb-3 text-xs text-white font-normal leading-relaxed" style="color: white !important;">
                <span class="font-bold text-neonBlue" style="color: #00f3ff !important;">${year}:</span> ${desc}
            </div>`;
        }
        return `<div class="mb-2 text-xs text-white font-normal" style="color: white !important;">• ${text}</div>`;
    }).join('');
};

// 3. HELPER: Interests (Dash List)
const parseInterests = (str) => {
    if(!str) return '';
    return `<ul class="list-none space-y-2 mt-1 text-xs text-white font-normal" style="color: white !important;">
        ${str.split(/,|\n/).filter(i => i.trim() !== '').map(i => 
            `<li class="flex items-start"><span class="mr-2 text-neonBlue" style="color: #00f3ff !important;">-</span> ${i.trim()}</li>`
        ).join('')}
    </ul>`;
};

// Standard helpers
const parseList = (str) => {
    if(!str) return '';
    return `<ul class="list-none space-y-1 mt-1 text-xs text-white font-normal" style="color: white !important;">${str.split(',').filter(i => i.trim() !== '').map(i => `<li class="flex items-start"><span class="mr-2">•</span> ${i.trim()}</li>`).join('')}</ul>`;
};

const parseTags = (str) => {
    if(!str) return '';
    return `<div class="flex flex-wrap gap-2 mt-2">${str.split(',').filter(i => i.trim() !== '').map(i => `<span class="bg-white/20 px-2 py-1 rounded text-xs text-white font-medium" style="color: white !important;">${i.trim()}</span>`).join('')}</div>`;
};

const safeText = (text) => {
    if(!text) return '';
    return text.split('\n').map(line => `<div class="mb-1" style="color: #000000 !important; overflow-wrap: break-word; word-break: break-word;">${line}</div>`).join('');
};

// --- NORMAL MODE PARSERS ---
const parseExperienceNormal = (str) => {
    if(!str) return '';
    return str.split('\n').filter(l => l.trim() !== '').map(line => {
        const parts = line.split(',');
        if(parts.length < 2) return `<div class="mb-2" style="color: #000000 !important; overflow-wrap: break-word;">${line}</div>`;
        return `<div class="mb-5 text-sm flex items-start" style="color: #000000 !important;">
            <span class="mr-2 mt-1 text-xs text-black" style="color: #000000 !important;">■</span>
            <table class="w-full bio-table" style="color: #000000 !important; table-layout: fixed;">
                <tr><td class="w-40 font-medium align-top" style="color: #000000 !important;">Company</td><td class="px-2 align-top">:</td><td class="align-top" style="color: #000000 !important; overflow-wrap: break-word; word-break: break-word;">${parts[0]?.trim()}</td></tr>
                <tr><td class="w-40 font-medium align-top" style="color: #000000 !important;">Designation</td><td class="px-2 align-top">:</td><td class="align-top" style="color: #000000 !important; overflow-wrap: break-word; word-break: break-word;">${parts[1]?.trim()}</td></tr>
                <tr><td class="w-40 font-medium align-top" style="color: #000000 !important;">Duration</td><td class="px-2 align-top">:</td><td class="align-top" style="color: #000000 !important; overflow-wrap: break-word; word-break: break-word;">${parts[2]?.trim()}</td></tr>
                ${parts[3] ? `<tr><td class="w-40 font-medium align-top" style="color: #000000 !important;">Location</td><td class="px-2 align-top">:</td><td class="align-top" style="color: #000000 !important; overflow-wrap: break-word; word-break: break-word;">${parts[3]?.trim()}</td></tr>` : ''}
            </table>
        </div>`;
    }).join('');
};

const parseEducationNormal = (str) => {
    if(!str) return '';
    return str.split('\n').filter(l => l.trim() !== '').map(line => {
        const parts = line.split(',');
        if(parts.length < 2) return `<div class="mb-4 text-sm" style="color: #000000 !important; overflow-wrap: break-word;">${line}</div>`;
        let stacked = '';
        if(parts[3]) stacked += `<div class="text-sm leading-tight" style="color: #000000 !important;">- Group: ${parts[3]}</div>`;
        if(parts[4]) stacked += `<div class="text-sm leading-tight" style="color: #000000 !important;">- Board: ${parts[4]}</div>`;
        if(parts[5]) stacked += `<div class="text-sm leading-tight" style="color: #000000 !important;">- Result: ${parts[5]}</div>`;
        return `
        <div class="mb-6 flex items-start" style="color: #000000 !important;">
            <span class="mr-3 mt-1.5 text-xs" style="color: #000000 !important;">●</span>
            <div class="w-full">
                <div class="font-bold text-base leading-tight" style="color: #000000 !important; overflow-wrap: break-word;">${parts[0]}</div>
                <div class="flex justify-between items-baseline mt-1 mb-1" style="color: #000000 !important;">
                    <div class="text-sm font-medium" style="color: #000000 !important; overflow-wrap: break-word;">${parts[1]}</div>
                    <div class="text-sm font-bold text-right" style="color: #000000 !important;">${parts[2]}</div>
                </div>
                ${stacked}
            </div>
        </div>`;
    }).join('');
};

// Renders the Personal Details Table (Shared by both modes now)
const renderPersonalDetailsTable = (val, t) => {
    const fields = [
        { k: t.name, v: val('inp-name') },
        { k: t.father, v: val('inp-father') },
        { k: t.mother, v: val('inp-mother') },
        { k: t.dob, v: val('inp-dob') },
        { k: t.permAddr, v: val('inp-perm-addr') },
        { k: t.marital, v: val('inp-marital') },
        { k: t.nid, v: val('inp-nid') },
        { k: t.religion, v: val('inp-religion') },
        { k: "Nationality", v: val('inp-nationality') || "Bangladeshi (By birth)" },
        { k: t.sex, v: val('inp-sex') },
        { k: t.blood, v: val('inp-blood') },
        { k: t.height, v: val('inp-height') },
    ];
    const activeFields = fields.filter(f => f.v && f.v.trim() !== '');
    if(activeFields.length === 0) return '';
    
    // Using table-layout: fixed to prevent overflow
    return `
    <div class="mb-6">
        ${getGradientHeader(t.h_p_details)}
        <table class="w-full text-sm bio-table mt-4" style="color: #000000 !important; table-layout: fixed;">
            ${activeFields.map(f => `
                <tr>
                    <td class="py-1 font-medium w-48 align-top" style="color: #000000 !important;">${f.k}</td>
                    <td class="py-1 px-2 align-top">:</td>
                    <td class="py-1 align-top font-medium" style="color: #000000 !important; overflow-wrap: break-word; word-break: break-word;">${parseDetailValue(f.v)}</td>
                </tr>
            `).join('')}
        </table>
    </div>`;
};

// Inline Style for Headers
const getLineHeader = (text) => `<div class="flex items-center mb-4 mt-2"><h3 class="text-lg font-bold uppercase tracking-widest mr-4" style="font-family: 'Roboto', sans-serif; color: #000000 !important;">${text}</h3><div class="flex-grow border-t border-gray-400 mt-1"></div></div>`;

const getGradientHeader = (text) => `<div style="background: linear-gradient(to right, ${state.primaryColor} 0%, #a0a0a0 60%, #ffffff 100%); border: 1px solid #000; padding: 2px 8px; margin-bottom: 12px; margin-top: 24px;"><h3 class="font-bold text-white uppercase tracking-wider text-base font-serif" style="text-shadow: 1px 1px 0 #000;">${text}</h3></div>`;

// PROFESSIONAL MODE PARSERS
const parseTimelineItems = (str) => {
    if(!str) return '';
    return str.split('\n').filter(l => l.trim() !== '').map(line => {
        const parts = line.split(',');
        if(parts.length < 2) return `<div class="mb-3 text-sm" style="color: #000000 !important; overflow-wrap: break-word;">${line}</div>`;
        return `<div class="mb-5" style="overflow-wrap: break-word; word-break: break-word;">
            <div class="font-bold text-sm uppercase" style="color: #000000 !important;">${parts[0].trim()}</div>
            <div class="text-xs mb-1 font-medium" style="color: #000000 !important;">${parts[2]?.trim()}</div>
            <div class="text-sm font-semibold" style="color: #000000 !important;">${parts[1]?.trim()}</div>
            ${parts[3] ? `<div class="text-sm mt-1" style="color: #000000 !important;">${parts[3].trim()}</div>` : ''}
        </div>`;
    }).join('');
};

const parseEducationProf = (str) => {
     if(!str) return '';
    return str.split('\n').filter(l => l.trim() !== '').map(line => {
        const parts = line.split(',');
        if(parts.length < 3) return `<div class="mb-3 text-sm" style="color: #000000 !important; overflow-wrap: break-word;">${line}</div>`;
        const details = [];
        if(parts[3]) details.push(`Group: ${parts[3]}`);
        if(parts[4]) details.push(`Board: ${parts[4]}`);
        if(parts[5]) details.push(`Result: ${parts[5]}`);
        return `<div class="mb-5" style="overflow-wrap: break-word; word-break: break-word;">
            <div class="font-bold text-sm uppercase" style="color: #000000 !important;">${parts[0].trim()}</div>
            <div class="text-xs mb-1 font-medium" style="color: #000000 !important;">${parts[2].trim()}</div>
            <div class="text-sm font-semibold" style="color: #000000 !important;">${parts[1].trim()}</div>
            ${details.length > 0 ? `<div class="text-xs mt-1 italic font-medium" style="color: #000000 !important;">${details.join(' | ')}</div>` : ''}
        </div>`;
    }).join('');
}

function generatePreview() {
    const container = document.getElementById('cv-preview-container');
    const t = i18n[state.lang];
    const val = (id) => document.getElementById(id) ? document.getElementById(id).value : '';
    const themeColor = state.primaryColor;

    container.style.transform = 'none';
    container.style.display = 'block'; // ALWAYS BLOCK to separate sections
    container.style.height = '100%'; 

    if (state.mode === 'professional') {
        // --- PROFESSIONAL MODE (SPLIT LAYOUT) ---
        // 1. Top Section: Flexbox (Sidebar + Main) -> Allows sidebar to stretch alongside main content on Page 1
        // 2. Bottom Section: Block (Personal Details) -> Breaks out of the 2-column layout to be full width
        
        container.innerHTML = `
        <!-- Top Section: 2 Columns (Sidebar + Main Content) -->
        <div class="flex flex-row items-stretch bg-white min-h-[200mm]">
            <!-- LEFT SIDEBAR (35%) -->
            <div style="width: 35%; background-color: ${themeColor}; padding: 1.5rem; color: white; overflow-wrap: break-word; word-break: break-word;">
               <div class="flex justify-center mb-8 pt-4">
                    <div class="w-32 h-32 rounded-full border-4 border-white/40 overflow-hidden bg-gray-300 flex items-center justify-center">
                        ${state.image ? `<img src="${state.image}" class="w-full h-full object-cover">` : '<i class="fa-solid fa-user text-5xl text-gray-500"></i>'}
                    </div>
                </div>
                <div class="mb-8">
                    <h3 class="text-sm font-bold uppercase tracking-wider mb-2 border-b border-white/40 pb-1" style="color: white !important;">${t.h_contact}</h3>
                    <div class="space-y-3 mt-3 text-xs font-normal" style="color: white !important;">
                        ${val('inp-phone') ? `<p class="flex items-center gap-3"><i class="fa-solid fa-phone"></i> <span>${val('inp-phone')}</span></p>` : ''}
                        ${val('inp-email') ? `<p class="flex items-center gap-3"><i class="fa-solid fa-envelope"></i> <span style="word-break: break-all;">${val('inp-email')}</span></p>` : ''}
                        ${val('inp-loc') ? `<p class="flex items-center gap-3"><i class="fa-solid fa-location-dot"></i> <span>${val('inp-loc')}</span></p>` : ''}
                    </div>
                </div>
                ${val('inp-skills') ? `<div class="mb-8"><h3 class="text-sm font-bold uppercase tracking-wider mb-2 border-b border-white/40 pb-1" style="color: white !important;">${t.h_skills}</h3>${parseTags(val('inp-skills'))}</div>` : ''}
                ${val('inp-lang') ? `<div class="mb-8"><h3 class="text-sm font-bold uppercase tracking-wider mb-2 border-b border-white/40 pb-1" style="color: white !important;">${t.languages}</h3><div class="text-xs font-normal opacity-100">${parseList(val('inp-lang'))}</div></div>` : ''}
                
                ${val('inp-cert') ? `<div class="mb-8">
                    <h3 class="text-sm font-bold uppercase tracking-wider mb-2 border-b border-white/40 pb-1" style="color: white !important;">${t.h_cert}</h3>
                    <div>${parseCerts(val('inp-cert'))}</div>
                </div>` : ''}

                ${val('inp-int') ? `<div class="mb-8">
                    <h3 class="text-sm font-bold uppercase tracking-wider mb-2 border-b border-white/40 pb-1" style="color: white !important;">${t.h_int}</h3>
                    <div>${parseInterests(val('inp-int'))}</div>
                </div>` : ''}
            </div>

            <!-- RIGHT MAIN CONTENT (65%) -->
            <div style="width: 65%; padding: 2.5rem; overflow-wrap: break-word; word-break: break-word;">
               <div class="mb-12">
                    <h1 class="text-4xl font-extrabold uppercase mb-1 tracking-wide" style="color: ${themeColor} !important;">${val('inp-name') || t.name}</h1>
                    <h2 class="text-lg font-medium tracking-wide" style="color: #000000 !important;">${val('inp-job') || t.jobTitle}</h2>
                </div>
                ${val('inp-obj') ? `<div class="mb-8"><div class="flex items-center gap-3 mb-3"><span class="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs" style="background-color: ${themeColor}"><i class="fa-solid fa-circle-user"></i></span><h3 class="text-lg font-bold uppercase" style="color: #000000 !important;">Profile</h3></div><p class="text-xs leading-relaxed text-justify ml-9 font-medium" style="color: #000000 !important;">${safeText(val('inp-obj'))}</p></div>` : ''}
                ${val('inp-edu') ? `<div class="mb-8"><div class="flex items-center gap-3 mb-4"><span class="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs" style="background-color: ${themeColor}"><i class="fa-solid fa-graduation-cap"></i></span><h3 class="text-lg font-bold uppercase" style="color: #000000 !important;">${t.h_edu}</h3></div><div class="ml-9">${parseEducationProf(val('inp-edu'))}</div></div>` : ''}
                ${val('inp-exp') ? `<div class="mb-8"><div class="flex items-center gap-3 mb-4"><span class="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs" style="background-color: ${themeColor}"><i class="fa-solid fa-briefcase"></i></span><h3 class="text-lg font-bold uppercase" style="color: #000000 !important;">${t.h_exp}</h3></div><div class="ml-9">${parseTimelineItems(val('inp-exp'))}</div></div>` : ''}
            </div>
        </div>

        <!-- Bottom Section: Full Width (Personal Details + Sig) -->
        <div class="bg-white px-10 pb-10 w-full" style="overflow-wrap: break-word; word-break: break-word;">
             <!-- Using the shared table renderer -->
             ${renderPersonalDetailsTable(val, t)}
             
             <div class="mt-12 ml-4">
                <div class="w-48 border-t border-black pt-2">
                    <p class="text-xs font-bold uppercase" style="color: #000000 !important;">${t.h_sig}</p>
                </div>
             </div>
        </div>
        `;

    } else {
        // ================== NORMAL MODE (FLOAT LAYOUT) ==================
        
        container.innerHTML = `
        <div class="clearfix" style="width: 100%;">
            
            <!-- SIDEBAR -->
            <div style="float: left; width: 32%; height: 296mm; background-color: ${themeColor}; padding: 1.5rem; color: white; overflow-wrap: break-word; word-break: break-word;">
                <div class="flex justify-center mb-10 pt-4">
                    <div class="w-32 h-32 rounded-full border-4 border-white/30 overflow-hidden bg-gray-300 flex items-center justify-center">
                        ${state.image ? `<img src="${state.image}" class="w-full h-full object-cover">` : '<i class="fa-solid fa-user text-5xl text-gray-500"></i>'}
                    </div>
                </div>
                <div class="mb-8">
                    <h3 class="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b border-white/30" style="color: white !important;">${t.h_contact}</h3>
                    <div class="space-y-2 text-xs font-normal opacity-100" style="color: white !important;">
                        ${val('inp-phone') ? `<p class="flex items-center gap-2"><i class="fa-solid fa-phone"></i> <span>${val('inp-phone')}</span></p>` : ''}
                        ${val('inp-email') ? `<p class="flex items-center gap-2"><i class="fa-solid fa-envelope"></i> <span style="word-break: break-all;">${val('inp-email')}</span></p>` : ''}
                        ${val('inp-loc') ? `<p class="flex items-center gap-2"><i class="fa-solid fa-location-dot"></i> <span>${val('inp-loc')}</span></p>` : ''}
                    </div>
                </div>
                ${val('inp-skills') ? `<div class="mb-8"><h3 class="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b border-white/30" style="color: white !important;">${t.h_skills}</h3><div class="text-xs font-normal opacity-100" style="color: white !important;">${parseList(val('inp-skills'))}</div></div>` : ''}
                ${val('inp-lang') ? `<div class="mb-8"><h3 class="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b border-white/30" style="color: white !important;">${t.languages}</h3><div class="text-xs font-normal opacity-100" style="color: white !important;">${parseList(val('inp-lang'))}</div></div>` : ''}
                
                ${val('inp-cert') ? `<div class="mb-8">
                    <h3 class="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b border-white/30" style="color: white !important;">${t.h_cert}</h3>
                    <div class="text-xs font-normal opacity-100 leading-relaxed" style="color: white !important;">
                        ${parseCerts(val('inp-cert'))}
                    </div>
                </div>` : ''}

                ${val('inp-int') ? `<div class="mb-8">
                    <h3 class="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b border-white/30" style="color: white !important;">${t.h_int}</h3>
                    <div class="text-xs font-normal opacity-100 leading-relaxed" style="color: white !important;">
                        ${parseInterests(val('inp-int'))}
                    </div>
                </div>` : ''}
            </div>
            
            <!-- CONTENT -->
            <div style="width: 100%; box-sizing: border-box; padding: 2rem; overflow-wrap: break-word; word-break: break-word;">
                <!-- Header -->
                 <div style="margin-left: 34%; margin-bottom: 2rem;">
                    <h1 class="text-3xl font-bold uppercase mb-1" style="color: ${themeColor} !important;">${val('inp-name') || t.name}</h1>
                    <h2 class="text-sm font-semibold uppercase tracking-widest" style="color: #000000 !important;">${val('inp-job') || t.jobTitle}</h2>
                </div>

                ${val('inp-obj') ? `<div style="margin-left: 34%; margin-bottom: 1.5rem;">
                    ${getLineHeader('OBJECTIVE')}
                    <p class="text-sm leading-relaxed text-justify font-medium" style="color: #000000 !important;">${safeText(val('inp-obj'))}</p>
                </div>` : ''}

                ${val('inp-edu') ? `<div style="margin-left: 34%; margin-bottom: 1.5rem;">
                    ${getLineHeader(t.h_edu)}
                    <div class="mt-3">${parseEducationNormal(val('inp-edu'))}</div>
                </div>` : ''}
                
                ${val('inp-exp') ? `<div style="margin-left: 34%; margin-bottom: 1.5rem;">
                    ${getLineHeader(t.h_exp)}
                    <div class="mt-3">${parseTimelineItems(val('inp-exp'))}</div>
                </div>` : ''}

                <!-- WRAPPING CONTENT -->
                
                ${val('inp-desc') ? `<div style="clear: both; padding-top: 1rem; margin-bottom: 1.5rem;">
                    ${getGradientHeader('Industrial Training / Description')}
                    <p class="text-sm leading-relaxed mt-2 text-justify font-medium" style="color: #000000 !important;">${safeText(val('inp-desc'))}</p>
                </div>` : ''}

                <div style="clear: both;">${renderPersonalDetailsTable(val, t)}</div>

                <div style="clear: both; margin-bottom: 3rem;">
                    ${getGradientHeader(t.h_decl)}
                    <p class="text-sm mt-2 font-medium" style="color: #000000 !important;">It is sincerely acknowledged by me that above all information about myself is true and correct.</p>
                </div>

                <div style="clear: both; margin-top: 4rem;">
                    <p class="text-sm font-bold mb-8 pl-4" style="color: #000000 !important;">${t.h_sig}</p>
                    <div class="w-56 border-t-2 border-black pt-1">
                        <p class="text-sm font-bold pl-2" style="color: #000000 !important;">${val('inp-name')}</p>
                    </div>
                </div>
            </div>
        </div>`;
    }

    if(window.innerWidth < 1024) {
         container.style.transform = 'scale(0.6)';
    }
}

// --- PDF DOWNLOADER ---
function downloadPDF() {
    const originalElement = document.getElementById('cv-preview-container');
    const name = document.getElementById('inp-name')?.value || 'CV';
    const btn = document.querySelector('button[onclick="downloadPDF()"]');
    
    const stage = document.createElement('div');
    stage.id = 'pdf-stage';
    stage.style.position = 'absolute'; 
    stage.style.left = '0px'; 
    stage.style.top = '0px';
    stage.style.width = '210mm'; 
    stage.style.margin = '0';
    stage.style.padding = '0';
    stage.style.backgroundColor = 'white'; 
    stage.style.zIndex = '-9999'; 

    const clone = originalElement.cloneNode(true);
    clone.style.transform = 'none'; 
    clone.style.margin = '0';
    clone.style.boxShadow = 'none';
    clone.style.width = '100%';
    clone.style.height = 'auto'; 

    stage.appendChild(clone);
    document.body.appendChild(stage);

    const opt = { 
        margin: 0, 
        filename: `${name}_Resume.pdf`, 
        image: { type: 'jpeg', quality: 0.98 }, 
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            windowWidth: 794, 
            width: 794, 
            x: 0, 
            y: 0, 
            scrollX: 0, 
            scrollY: 0
        }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
    };

    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

    html2pdf().set(opt).from(clone).save().then(() => { 
        document.body.removeChild(stage); 
        btn.innerHTML = originalText; 
    }).catch(err => {
        console.error(err);
        document.body.removeChild(stage);
        btn.innerHTML = originalText;
        alert('PDF generation failed. Please try on a Desktop.');
    });
}