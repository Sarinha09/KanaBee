function filterProjects(category) {
    var projects = document.querySelectorAll('.projeto-card');
    projects.forEach(function(project) {
        if (category === 'all' || project.getAttribute('data-filter') === category) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}


function setActive(button) {
    var buttons = document.querySelectorAll('.container-filter button');
    buttons.forEach(function(btn) {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

function loadTranslations(lang) {
    fetch(`translations/${lang}.json`)
        .then(response => response.json())
        .then(translations => {
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                el.textContent = translations[key] || el.textContent;
            });
        })
        .catch(error => console.error('Erro ao carregar as traduções:', error));
}

function toggleMenu() {
    var menu = document.getElementById('language-menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

function changeLanguage(language) {
    var flag = document.getElementById('current-flag');
    var menu = document.getElementById('language-menu');
    var lang = '';

    if (language === 'brasil') {
        flag.src = 'imagens/brasilPixel.png';
        lang = 'pt'; 
    } 
    else if (language === 'eua') {
        flag.src = 'imagens/euaPixel.png';
        lang = 'en'; 
    }
    else if(language == "jp"){
        flag.src = 'imagens/jpPixel.png';
        lang = 'jp'; 

    }
    
    loadTranslations(lang);
    menu.style.display = 'none'; 
}


function toggleSelection(button) {
    document.querySelectorAll('.hiragana-card').forEach(btn => {
        btn.classList.remove('selected');
    });
    button.classList.add('selected');
}

function toggleSelection(button) {
    button.classList.toggle('selected');
    const click = document.getElementById("click-sound");
    click.play();
}

function toggleSelectAll() {
    const buttons = document.querySelectorAll('.hiragana-card');
    const selectAllCheckbox = document.getElementById("selectAllCheckbox");
    const selectAllLabel = document.getElementById("selectAllLabel");

    buttons.forEach(button => {
        if (selectAllCheckbox.checked) {
            button.classList.add("selected");
            const click = document.getElementById("click-sound");
            click.play();
        } else {
            button.classList.remove("selected");
            const click = document.getElementById("click-sound");
            click.play();
        }
    });
}

function toggleRowSelection(checkbox) {
    const row = checkbox.closest('label').nextElementSibling;
    const buttons = row.querySelectorAll('.hiragana-card');
    
    buttons.forEach(button => {
        if (checkbox.checked) {
            button.classList.add("selected");
            const click = document.getElementById("click-sound");
            click.play();
        } else {
            button.classList.remove("selected");
        }
    });
}
