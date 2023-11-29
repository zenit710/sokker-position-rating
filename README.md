# Sokker Position Rating
Google Chrome Extension for display player ability rating to play at position in sokker.org

## User requirements
You need to enable skill numbers in skill name in your profile settings to be able to get player position rating.

## Development

### System requirements
NPM scripts uses Unix commands, like `cp`. You have to work on some Unix system to develop this extensions without customization.
`node v16.6.2` with `npm v7.20.3` was used by the author.

### First steps
After cloning repository run `npm install`

### Choose web browser
Extension use manifest V3 and some of properties are incompatible between Chrome and Firefox.
You need to choose which one to use by running `npm use:chrome` for Chrome compatibility
or `npm use:firefox` for Firefox compatibilty.

### Build
`npm run build` - builds in production mode

### Watch
`npm run watch` - builds as dev - with sourcemaps and dev settings

### Instalation
To install local extension read <https://developer.chrome.com/docs/extensions/mv2/faq/#faq-dev-01>

### Formatting
#### JavaScript
- `npm run lint` to check is file formatting correct
- `npm run lint:fix` to fix formatting errors

#### SCSS
- `npm run stylelint` to check is file formatting correct
- `npm run stylelint:fix` to fix formatting errors

### Publishing
`npm run publish` - extension code will be build and located in `build` directory.
There will be two `.zip` files: first for Chrome extension and second for Firefox Add-on.

### Visual Studio Code support
You can have automatically formatted code (JS, SCSS) in VSCode in few steps:
1. Install VSCode plugins [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
2. Create file `.vscode/settings.json` if not exists
3. Add configuration:
```
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.fixAll.stylelint": true
    },
    "eslint.validate": ["javascript"]
}
```

## Contact

Contact me via <zenit710@gmail.com>
