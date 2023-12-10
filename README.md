# HelpBot Frontend

The Helpbot service leverages Matrix-Synapse, a powerful open-source communication protocol, to serve as the backbone of its chat service. This robust combination ensures secure, real-time messaging capabilities for seamless interactions between users and the chatbot .


### Features


- Home page
 ![image](https://github.com/gavin-go-dang/HelpBot-FrontEnd/assets/133732281/4d22eceb-02c7-4dd4-b030-e9f0fbf1d17e)

- Chat widget
 ![image](https://github.com/gavin-go-dang/HelpBot-FrontEnd/assets/133732281/9c93fde0-f300-4a6f-917a-ee98933fb477)

- Dashboard
 ![image](https://github.com/gavin-go-dang/HelpBot-FrontEnd/assets/133732281/614f8df0-21df-4788-b151-3153f0a21f05)

- Manage chatbot
  ![image](https://github.com/gavin-go-dang/HelpBot-FrontEnd/assets/133732281/8e83b96d-f02f-4ed1-9153-b5d06d5b3751)

- Installation Instructions
 ![image](https://github.com/gavin-go-dang/HelpBot-FrontEnd/assets/133732281/7be1b2fb-3394-4471-bac1-2ea02e4f91ee)

- Custom script chat
 ![image](https://github.com/gavin-go-dang/HelpBot-FrontEnd/assets/133732281/fbb3a93b-1b15-433f-9474-61e51c75db22)

- Custom style widget
![image](https://github.com/gavin-go-dang/HelpBot-FrontEnd/assets/133732281/a42250b5-63e2-424e-8b16-fb2ee69fc0f4)

- Profile
![image](https://github.com/gavin-go-dang/HelpBot-FrontEnd/assets/133732281/d5aba68e-6eaa-45f8-9838-6a76054cb2be)


### Requirements

- Node.js 16+ and npm

### Getting started

Run the following command on your local environment:

```shell
git clone https://github.com/gavin-go-dang/HelpBot-FrontEnd.git
cd HelpBot-Frontend
npm install
```

Then, you can run locally in development mode with live reload:

```shell
npm run dev
```

Open http://localhost:3000 with your favorite browser to see your project.

### Set up enviroment variable

Create a Clerk account at [Clerk.com](https://clerk.com?utm_source=github&utm_medium=sponsorship&utm_campaign=nextjs-boilerplate) and create a new application in Clerk Dashboard. Then, copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` into `.env.local` file (not tracked by Git):

```shell
# Configure environment variables


# Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin/default
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

NEXT_PUBLIC_DJANGO_API_PREFIX=
NEXT_PUBLIC_DESTINATION=

NEXT_PUBLIC_BASE_URL_SYNAPSE=
NEXT_PUBLIC_ACCESS_TOKEN_ROOM_SYNAPSE=
NEXT_PUBLIC_USER_ID_SYNAPSE=
NEXT_PUBLIC_TEST_ROOM_SYNAPSE_ID=
NEXT_PUBLIC_TEST_SENDER=

NEXT_PUBLIC_BASE_URL=

NEXT_PUBLIC_API_KEY_FIREBASE=
NEXT_PUBLIC_AUTH_DOMAIN=
NEXT_PUBLIC_PROJECT_ID=
NEXT_PUBLIC_STORAGE_BUCKET=
NEXT_PUBLIC_MESSAGING_SENDERID=
NEXT_PUBLIC_APP_ID=


NEXT_PUBLIC_DNS_SENDTRY=
```

Now, you can a fully working authentication system with Next.js: Sign up, Sign in, Sign out, Forgot password, Reset password, Update profile, Update password, Update email, Delete account, and more.


### Project structure

```shell
.
├── README.md                       # README file
├── __mocks__                       # Mocks for testing
├── .github                         # GitHub folder
├── .husky                          # Husky configuration
├── .vscode                         # VSCode configuration
├── public                          # Public assets folder
├── src
│   ├── app                         # Next JS Pages (app router)
│   ├── components                  # React components
│   ├── layouts                     # Layouts components
│   ├── libs                        # 3rd party libraries
│   ├── models                      # Database models
│   ├── pages                       # Next JS Pages (page router)
│   ├── pages.test                  # Next JS Pages tests (this avoids tests to be treated as a Next.js pages)
│   ├── styles                      # Styles folder
│   ├── templates                   # Default template
│   ├── validations                 # Validation schemas
│   └── utils                       # Utility functions
└── tsconfig.json                   # TypeScript configuration
```


### Commit Message Format

The project enforces [Conventional Commits](https://www.conventionalcommits.org/) specification. This means that all your commit messages must be formatted according to the specification. To help you write commit messages, the project uses [Commitizen](https://github.com/commitizen/cz-cli), an interactive CLI that guides you through the commit process. To use it, run the following command:

```shell
npm run commit
```

One of the benefits of using Conventional Commits is that it allows us to automatically generate a `CHANGELOG` file. It also allows us to automatically determine the next version number based on the types of commits that are included in a release.

### Deploy to production

You can see the results locally in production mode with:

```shell
$ npm run build
$ npm run start
```

### License

Licensed under the MIT License, Copyright © 2023

See [LICENSE](LICENSE) for more information.



---

