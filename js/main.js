document.addEventListener('DOMContentLoaded', () => {
    const revealEls = document.querySelectorAll('.reveal-on-scroll, .reveal-descend');
    const growEls = document.querySelectorAll('.reveal-grow');
    const skillsBanner = document.getElementById('skills-banner');

    // depois que um elemento "reveal-grow" termina de crescer, ele comeca
    // a balancar devagar sozinho (usado no homem-aranha e nos icones de habilidade)
    growEls.forEach((el) => {
        el.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'transform' && el.classList.contains('is-visible')) {
                el.classList.add('swinging');
            }
        });
    });

    // homem-aranha e icones de habilidade so aparecem depois que a teia pousa
    const showGrowEls = () => growEls.forEach(el => el.classList.add('is-visible'));
    if (skillsBanner) {
        skillsBanner.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'transform' && skillsBanner.classList.contains('is-visible')) {
                showGrowEls();
            }
        });
    } else {
        showGrowEls();
    }

    if (!('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('is-visible'));
        showGrowEls();
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    revealEls.forEach(el => observer.observe(el));

    // se por algum motivo o elemento nunca entrar no criterio do observer
    // (ex: tela muito alta), garante que o conteudo apareca de qualquer jeito
    window.setTimeout(() => {
        revealEls.forEach(el => el.classList.add('is-visible'));
        showGrowEls();
    }, 4000);

    // ====================== modal de experiencia ======================
    const experiences = {
        internship: {
            label: 'ESTÁGIO — TECNOLOGIA / DESENVOLVIMENTO',
            title: 'Estagiária de Tecnologia',
            text: `
                <p>Comecei minha trajetória profissional na área de tecnologia aos 16 anos, ainda durante o ensino médio. Nesse período, tive a oportunidade de conhecer diferentes etapas do desenvolvimento de software e atuar em áreas como <strong>Qualidade de Software (QA), Banco de Dados e automação de testes.</strong></p>
                <p>Trabalhei com <strong>SQL Server</strong>, análise e validação de dados, além do desenvolvimento de automações utilizando <strong>Selenium com C# e ChromeDriver.</strong> Também tive contato com ferramentas e processos relacionados ao acompanhamento de aplicações e qualidade das entregas.</p>
                <p>Essa experiência foi fundamental para minha formação, principalmente por me permitir entender que uma aplicação não termina no código: existem dados, testes, integrações, usuários e diversos processos trabalhando juntos para que tudo funcione.</p>
                <p>Foi também nesse período que comecei a descobrir em qual parte desse universo eu realmente queria me aprofundar: <strong>desenvolvimento Back-end.</strong></p>
            `
        },
        developer: {
            label: 'BACK-END — DESENVOLVIMENTO',
            title: 'Desenvolvedora Back-end Júnior',
            text: `
                <p>Depois da experiência como estagiária, passei a atuar diretamente como desenvolvedora Back-end, área na qual encontrei minha principal paixão dentro da tecnologia.</p>
                <p>Atualmente trabalho principalmente com <strong>C# e .NET</strong>, desenvolvendo e mantendo <strong>APIs REST</strong>, atuando em uma arquitetura baseada em <strong>microsserviços</strong> e realizando integrações entre diferentes sistemas e serviços.</p>
                <p>No dia a dia, também trabalho com tecnologias e ferramentas como <strong>SQL Server, PostgreSQL, RabbitMQ, Kafka, Azure, Git, Azure DevOps, Swagger, Kibana e Grafana</strong>, além de contribuir na manutenção e modernização de sistemas legados.</p>
                <p>Apesar do Back-end ser meu foco, minha experiência anterior me ajuda a enxergar a aplicação de forma mais ampla. Por isso, também atuo quando necessário no <strong>Front-end, principalmente com Angular</strong>, transitando entre diferentes partes do sistema para entender problemas e construir soluções.</p>
                <p>Mais do que simplesmente desenvolver funcionalidades, gosto de entender <strong>por que algo precisa ser feito, como as diferentes partes se conectam e onde pode existir um problema antes que ele chegue à produção.</strong></p>
                <p>Afinal, depois de alguns anos na área, acho que desenvolvi meu próprio tipo de <em>Spider-Sense</em>: ele geralmente começa a apitar quando vejo um bug escondido no meio do código. 🕷️</p>
            `
        }
    };

    const modal = document.getElementById('experienceModal');
    const modalLabel = document.getElementById('modalLabel');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');

    const openExperience = (type) => {
        const experience = experiences[type];
        if (!modal || !experience) return;
        modalLabel.textContent = experience.label;
        modalTitle.textContent = experience.title;
        modalText.innerHTML = experience.text;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeExperience = () => {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-experience]').forEach((card) => {
        card.addEventListener('click', () => openExperience(card.dataset.experience));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openExperience(card.dataset.experience);
            }
        });
    });

    document.querySelectorAll('[data-close-modal]').forEach((el) => {
        el.addEventListener('click', closeExperience);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeExperience();
    });

    // ====================== abas de formacao ======================
    document.querySelectorAll('.education-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            document.querySelectorAll('.education-tab').forEach((t) => {
                t.classList.toggle('active', t === tab);
                t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
            });

            document.querySelectorAll('.education-panel').forEach((panel) => {
                panel.classList.toggle('active', panel.dataset.panel === target);
            });
        });
    });
});
