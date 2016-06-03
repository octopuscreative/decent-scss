# Decent.scss

A collection of functional CSS utilities as created by the folks at [Octop.us](http://octop.us).

## Setup

To install, run `npm i --save decent-scss`, then `@import` the desired modules. We've left this part open ended on purpose for flexibilitie's sake. The simplest way would be something like `@import '../node_modules/decent-scss/modules/all.scss';` to get all of the modules, making sure to adjust that import to point to the proper directory.

If you're looking for a more elegant solution to including CSS from `node_modules`, you'll find a multitude of resources [here](https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=import+scss+from+node_modules).

## Usage

[Class Reference](https://github.com/octopuscreative/decent-scss/wiki)  
[Example Usage](http://octopuscreative.github.io/decent-scss/index.html)

## Customizing

We've included any configuration variables at the top of each module file so that you're able to tailor fit decent.scss to your project. Simply create a settings file and include or set them inline before you import any of the modules.

## CSS

If that CSS that you're after and you don't care about changing any of the settings, then you can use the files located at `css/decent.css`.

## Rationale

* [About HTML semantics and front-end architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)
* [How not to scale css](https://gist.github.com/mrmrs/5d6c3bf60a9ff410fcec)
* [Expressive CSS](http://johnpolacek.github.io/expressive-css/)
* [CSS Purge](http://csspurge.com/)

## Work in Progress

Please note that this is still a work in progress! [We're keeping tabs on the state of our CSS here](http://cssstats.com/stats?url=http%3A%2F%2Foctopuscreative.github.io%2Fdecent-scss%2Findex.html&ua=Browser%20Default) and actively working on improving both the quality and size of the code. Pull requests are welcome!

Don't forget to exercise moderation when building up your repertoire of utility classes. We recommend using tools like [CSS Stats](http://cssstats.com) to make sure that you're not including a multitude of CSS that doesn't actually get used.

## Development Notes

* Before publishing, make sure to run `npm run prepublish` as you need to make sure you have a compiled css file available.
* Adhere to Stylelint's warnings! We do it and so should you.
