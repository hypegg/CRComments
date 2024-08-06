// Define translations
const translations = {
    en: {
        header: 'Welcome to CRComments!',
        text: 'Thank you for installing CRComments!\n\nThis extension is not affiliated with Crunchyroll® or its brands. Our goal is to provide a healthy and interactive community for users to discuss their favorite anime shows.',
        button: 'Got it!'
    },
    es: {
        header: '¡Bienvenido a CRComments!',
        text: '¡Gracias por instalar CRComments!\n\nEsta extensión no está afiliada con Crunchyroll® ni sus marcas. Nuestro objetivo es proporcionar una comunidad saludable e interactiva para que los usuarios discutan sus programas de anime favoritos.',
        button: '¡Entendido!'
    },
    fr: {
        header: 'Bienvenue sur CRComments !',
        text: 'Merci d\'avoir installé CRComments !\n\nCette extension n\'est pas affiliée à Crunchyroll® ni à ses marques. Notre objectif est de fournir une communauté saine et interactive pour que les utilisateurs puissent discuter de leurs émissions d\'anime préférées.',
        button: 'Compris !'
    },
    de: {
        header: 'Willkommen bei CRComments!',
        text: 'Danke, dass Sie CRComments installiert haben!\n\nDiese Erweiterung ist nicht mit Crunchyroll® oder seinen Marken verbunden. Unser Ziel ist es, eine gesunde und interaktive Gemeinschaft zu bieten, in der die Nutzer über ihre Lieblings-Animes diskutieren können.',
        button: 'Verstanden!'
    },
    ja: {
        header: 'CRCommentsへようこそ！',
        text: 'CRCommentsをごインストールいただきありがとうございます！\n\nこの拡張機能はCrunchyroll®またはそのブランドとは提携していません。私たちの目標は、ユーザーが好きなアニメ番組について議論できる健全でインタラクティブなコミュニティを提供することです。',
        button: 'わかりました！'
    },
    ko: {
        header: 'CRComments에 오신 것을 환영합니다!',
        text: 'CRComments를 설치해 주셔서 감사합니다!\n\n이 확장 프로그램은 Crunchyroll® 또는 그 브랜드와 제휴되어 있지 않습니다. 우리의 목표는 사용자가 좋아하는 애니메이션 쇼에 대해 논의할 수 있는 건강하고 상호작용적인 커뮤니티를 제공하는 것입니다.',
        button: '알겠습니다!'
    },
    zh: {
        header: '欢迎使用 CRComments！',
        text: '感谢您安装 CRComments！\n\n此扩展与 Crunchyroll® 或其品牌无关。我们的目标是提供一个健康互动的社区，让用户讨论他们最喜欢的动漫节目。',
        button: '知道了！'
    },
    it: {
        header: 'Benvenuto in CRComments!',
        text: 'Grazie per aver installato CRComments!\n\nQuesta estensione non è affiliata con Crunchyroll® o i suoi marchi. Il nostro obiettivo è fornire una comunità sana e interattiva in cui gli utenti possano discutere dei loro programmi anime preferiti.',
        button: 'Ho capito!'
    },
    nl: {
        header: 'Welkom bij CRComments!',
        text: 'Bedankt voor het installeren van CRComments!\n\nDeze extensie is niet verbonden met Crunchyroll® of zijn merken. Ons doel is om een gezonde en interactieve gemeenschap te bieden waarin gebruikers hun favoriete animeprogramma’s kunnen bespreken.',
        button: 'Begrepen!'
    },
    pt: {
        header: 'Bem-vindo ao CRComments!',
        text: 'Obrigado por instalar o CRComments!\n\nEsta extensão não é afiliada ao Crunchyroll® ou suas marcas. Nosso objetivo é proporcionar uma comunidade saudável e interativa para os usuários discutirem seus animes favoritos.',
        button: 'Entendi!'
    },
    'pt-BR': {
        header: 'Bem-vindo ao CRComments!',
        text: 'Obrigado por instalar o CRComments!\n\nEsta extensão não é afiliada ao Crunchyroll® ou suas marcas. Nosso objetivo é promover uma comunidade saudável e interativa para os usuários discutirem seus animes favoritos.',
        button: 'Entendi!'
    },
    ru: {
        header: 'Добро пожаловать в CRComments!',
        text: 'Спасибо за установку CRComments!\n\nЭто расширение не связано с Crunchyroll® или его брендами. Наша цель — предоставить здоровое и интерактивное сообщество для обсуждения любимых аниме-шоу.',
        button: 'Понятно!'
    }
};


// Function to display the welcome overlay
function displayWelcomeOverlay() {
    // Get the user's language (e.g., 'en-US', 'es-ES', 'pt-BR', 'ru-RU')
    const userLang = navigator.language.split('-')[0]; // Extract the language code

    // Select the appropriate translation
    const { header, text, button } = translations[userLang] || translations.en;

    // Create the overlay container
    const overlayContainer = document.createElement('div');
    overlayContainer.id = 'welcome-overlay';
    overlayContainer.style.position = 'fixed';
    overlayContainer.style.top = '0';
    overlayContainer.style.left = '0';
    overlayContainer.style.width = '100%';
    overlayContainer.style.height = '100%';
    overlayContainer.style.background = 'rgba(0, 0, 0, 0.5)';
    overlayContainer.style.display = 'flex';
    overlayContainer.style.justifyContent = 'center';
    overlayContainer.style.alignItems = 'center';
    overlayContainer.style.zIndex = '1000';

    // Create the overlay content
    const overlayContent = document.createElement('div');
    overlayContent.style.background = '#23252B';
    overlayContent.style.padding = '20px';
    overlayContent.style.borderRadius = '10px';
    overlayContent.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    overlayContent.style.width = '400px';
    overlayContent.style.maxWidth = '90%';

    // Adds the icon on the overlay
    const overlayIcon = document.createElement('img');
    overlayIcon.style.width = '50px';
    overlayIcon.style.height = '50px';
    overlayIcon.style.float = 'right';
    overlayIcon.src = 'https://www.google.com/logos/fnbx/animal_paws/cat_kp_dm.gif';

    // Create the overlay header
    const overlayHeader = document.createElement('h2');
    overlayHeader.style.marginTop = '0';
    overlayHeader.style.marginBottom = '10px';
    overlayHeader.style.fontSize = '18px';
    overlayHeader.style.fontWeight = 'bold';
    overlayHeader.style.color = '#ff640a';
    overlayHeader.innerText = header;

    // Create the overlay text
    const overlayText = document.createElement('p');
    overlayText.style.marginBottom = '20px';
    overlayText.innerText = text;

    // Create the overlay button
    const overlayButton = document.createElement('button');
    overlayButton.style.background = '#ff640a';
    overlayButton.style.padding = '10px 20px';
    overlayButton.style.border = 'none';
    overlayButton.style.cursor = 'pointer';
    overlayButton.innerText = button;

    // Add event listener to the button
    overlayButton.addEventListener('click', () => {
        // Dispatch a custom event to the content script
        const event = new CustomEvent('setHasSeenWelcomeOverlay');
        document.dispatchEvent(event);
        overlayContainer.remove();

    });

    // Add the overlay content to the overlay container
    overlayContent.appendChild(overlayIcon);
    overlayContent.appendChild(overlayHeader);
    overlayContent.appendChild(overlayText);
    overlayContent.appendChild(overlayButton);

    // Add the overlay container to the page
    document.body.appendChild(overlayContainer);
    overlayContainer.appendChild(overlayContent);
}

// Call the function to display the welcome overlay
displayWelcomeOverlay();
