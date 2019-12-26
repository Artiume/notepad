<p align="center">
  <img src="https://i.imgur.com/yduVWCu.png" height="120" />
</p>

Notepad provides a painless interface for publishing professional articles. It exposes a minimalist frontend for
editing and publishing articles using markdown formatting.

Notepad is written in NodeJS and is extremely efficient. It's lightweight and can be installed with a single command on
most server environments.

Furthermore, it provides a minimalist interface for viewing your articles:

![screenshot](https://i.imgur.com/VdghQLF.png)

## API

All endpoints that modify the database require a valid `Authorization` header.

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

## Configuration

A [sample configuration file](config.example.json) is provided in the repository.

**Available options are as follows:**

- `secret` (type: _`string`_) - Secret used to sign JWTs. (Note: generate a long string with a password manager)
- `database` (type: [_`SequelizeOptions`_](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor)) - Standard sequelize connection options

## Running Locally

You can run Notepad locally in development mode for testing by cloning the repository, installing dependencies with `yarn`, and finally running the development server with `yarn dev`.

### Debugging

I use Visual Studio Code to debug Notepad, here is a sample debug configuration:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Launch Program",
  "cwd": "${workspaceFolder}",
  "program": "${workspaceFolder}/src/index.ts",
  "preLaunchTask": "npm: build",
  "console": "integratedTerminal",
  "outFiles": ["${workspaceFolder}/dist/**/*.js"]
}
```

## Building from Source

Notepad can be built very easily from source. First clone this repository, then install dependencies with `yarn`. After that is complete simply run `yarn build` to build the application, when that is complete run `yarn start` to start the application.

## Running with Docker

As of now we have no image on the docker hub. To run with docker, please clone this repository, modify `docker-compose.yml` for your needs and then run `docker-compose up`.

## Contributing

1. Fork this repository to your own GitHub account and then clone it locally.
2. Ensure that you have Docker or Node installed on your machine.
3. While developing, ensure that you are formatting all code with prettier, you can do this by running `yarn format`.
4. Before commiting, please run `yarn lint` and `yarn typecheck` and correct any errors.
5. Commit any changes, then open a pull request.

### Architecture

The codebase is written in Typescript, and is contained in the `src` directory.

The file structure consists of the following folders:

- `middlewares` - Contains middlewares used by various routes
- `models` - Contains Sequelize database models
- `routes` - Contains express routers for API endpoints
- `lib` - Contains various helper and setup functions
- `typings` - Contains Typescript type and interface declerations

### Styling

Prettier is used to format the code. It's formatted automatically when you commit, or by running `yarn format`. Prettier is configured to use 2 spaces, single quotes, and no semi colons. Please stick to these conventions when writing code as well. It helps if you configure your editor to automatically format files when you save them. There are plugins to do this in most popular editors.

### Linting

TSLint is used to lint the code. You can run `yarn lint` to see the lint output. TSLint is configured to match the styling options set by Prettier. A few other rules have also been configured such as ordered imports. It helps if you configure your editor to display linting output inline. I recommend using Visual Studio Code since it has very good typescript support.

### Testing

As of now, tests have not yet been written. Progress is being tracked in [#12][i12].

## License

Notepad is licensed under [the MIT license](LICENSE.md).

[i12]: https://github.com/notepad/notepad/issues/12
