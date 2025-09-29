![Laravel](https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg)
![React](https://cdn.worldvectorlogo.com/logos/react-2.svg)
![MySQL](https://raw.githubusercontent.com/inertiajs/.github/master/LOGO.png)

## 🚀 Sistema de Facturação

Aplicação web desenvolvido no **Laravel, React e Inertia** para gestão e emissão de faturas, 
com autenticação de utilizadores, dashboard interativo e relatórios de vendas.:

## ✨Principais Funcionalidades
- Autenticação e registo de utilizadores
- Dashboard com estatísticas
- Gestão de clientes e produtos
- Emissão de faturas em PDF
- Relatórios filtráveis
## Tecnologias Usadas
- [Laravel 11](https://laravel.com/)
- [React](https://react.dev/)
- [Inertia.js](https://inertiajs.com/)
- [Docker / Laravel Sail](https://laravel.com/docs/sail)
- MySQL

## Instalação

1. Clonar o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo

2. Copiar o Arquivo .env:
    ```bash
   cp .env.example .env

3. Instale as Dependências:
    ```bash
    ./vendor/bin/sail composer install
4. Suba o containers:
    ```bash
    ./vendor/bin/sail up -d
5. Gerar a chave da aplicação:
    ```bash
    ./vendor/bin/sail artisan key:generate
6. Rodar migrations:
    ```bash
    ./vendor/bin/sail artisan migrate
7. Iniciar o servidor de desenvolvimento:
    ```bash
    ./vendor/bin/sail artisan serve
    ./vendor/bin/sail npm run dev
## 🧪 Testes
1. Para rodar os testes automatizados:
    ```bash
    ./vendor/bin/sail artisan test
## 📂 Estrutura do Projecto
    ```bash
        ├── app/                # Código principal da aplicação Laravel
        ├── database/           # Migrations e seeders  
        ├── resources/js/       # Código React + Inertia
        ├── routes/             # Definição de rotas
        ├── tests/              # Testes automatizados (PHPUnit / Pest)
        ├── docker-compose.yml  # Configuração Docker Sail
        └── README.md           # Documentação
## 🤝 Contribuições
    1. Faça um fork do projecto
    2. Crie uma branch (git checkout -b feature/nova-funcionalidade)
    3. Faça commit das alterações (git commit -m 'Adicionei nova funcionalidade')
    4. Faça push para a branch (git push origin feature/nova-funcionalidade)
    5. Abra um Pull Request
## 📜 Licença
Este projecto está licenciado sob a [MIT license](https://opensource.org/licenses/MIT).

## 📧 Contacto
    Autor: Sérgio Chisevo
    Email: newchisevo@hotmail.com
    LinkedIn: https://www.linkedin.com/in/sérgio-chisevo-96547090/

## Créditos
Este projecto foi desenvolvido com base nas aulas do The Codeholic [(link do canal YouTube)](https://www.youtube.com/@TheCodeholic), 
que disponibilizou o conteúdo para fins de estudo e portfólio.


