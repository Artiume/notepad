<p align="center">
  <img src="https://i.imgur.com/IoHETwA.png" height="120" />
</p>

**⚠️ Warning: Notepad is currently a Work-In-Progress (WIP), as a hobby project of [@danteissaias](https://github.com/danteissaias). Until we release the first stable version, the project software may not actually be buildable.**

Notepad provides a painless interface for publishing professional articles. It exposes a minimalist user interface for editing and publishing articles using markdown formatting.

Notepad is written in NodeJS and is extremely efficient. It's lightweight and can be installed with a few commands on **all** server environments through the power of Docker.

Furthermore, it provides a minimalist interface for viewing your articles (and of course it has a built in dark mode):

![screenshot](https://i.imgur.com/fQ8mK1e.png)

![dark mode screenshot](https://i.imgur.com/Nxgh0Hl.png)

## API

All endpoints that create, update or delete values require a valid `Authorization` header obtained by authenticating a valid user.

### Authorization

- [x] `POST /api/auth/login` Authenticate User

### Users

- [x] `GET /api/users` List Users

- [x] `POST /api/users` Create User

- [x] `GET /api/users/{user-id}` Get User

- [x] `POST /api/users/me` Get Current Authenticated User

- [ ] `UPDATE /api/users/{user-id}` Update User

- [x] `DELETE /api/user/{user-id}` Delete User

### Articles

- [x] `GET /api/articles` List Articles

- [x] `POST /api/articles` Create Article

- [x] `GET /api/articles/{article-id}` Get Article

- [ ] `UPDATE /api/articles/{article-id}` Update Article

- [x] `DELETE /api/articles/{article-id}` Delete Article

## Running Notepad

There are a variety of ways to run Notepad.

### Running Locally

We've made it extremely easy to develop Notepad. To run Notepad locally in development mode it's only 3 simple steps:

1. Run `git clone https://github.com/notepad/notepad.git`
2. Run `yarn`
3. Run `yarn dev`

### Building from Source

We've made it extremely easy to build Notepad from source. To run Notepad locally it's only 4 simple steps:

1. Run `git clone https://github.com/notepad/notepad.git`
2. Run `yarn`
3. Run `yarn build`
4. Run `yarn start`

### Running with Docker

There is currently no official Notepad image on the Docker Hub. To run Notepad with Docker clone this repository, edit `docker-compose.yml` and run `docker-compose up`.

## Contributing

1. Fork this repository to your own GitHub account and then clone it locally.
2. Pre-commit hooks have been configured to lint, format and typecheck code.
3. Commit any changes, then open a pull request.

### Architecture

Notepad is structured as a monorepo using `yarn` workspaces, workspaces are stored in the `packages/` folder. The workspaces that have been configured are as follows:

`ui` - This workspace contains all frontend code.

`api` - This workspace contains all backend code.

### Formatting

We use Prettier to format Notepad. Prettier has been configured per our personal preference. A pre-commit hook has been configured in order to ensure that all code is submitted follows our preference.

### Linting

We use ESLint to lint Notepad. ESLint has been configured to match the styling options defined in `.prettierrc`. A selection of other rules such as `eslint-plugin-import/sort-imports` have also been configured. When developing Notepad, it's recommended to find a plugin for your editor that displays linting issues inline as this helps bring your attention to issues.

## Attributions

- Architecture: [nice-boys/product-boilerplate](https://github.com/nice-boys/product-boilerplate)
- Design: [rauchg/blog](https://github.com/rauchg/blog)

## License

Notepad is licensed under [the MIT license](LICENSE.md).

[i12]: https://github.com/notepad/notepad/issues/12
