# Compile js and CSS

Node - 16.17.0
NPM  - 8.15.0

JS
==

1) Run npm install to root directory of moodle
2) Open root/.grunt/tasks/stylelint.js file.
3) Comment "files: getCoreThemeMatches()," and replace with "files: ['!scss/**/*.scss'],"
4) navigate to remui directory (Optional)
5) run - grunt amd --root=theme/remui
6) npm run amd

CSS
===

1) Run Core grunt css -
	npm run css (Node script command for grunt css)
	grunt css (Original Grunt css command)
2) Run gulp to compile styles
	gulp styles
3) Run gulp with watch
	gulp
