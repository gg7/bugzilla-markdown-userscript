// ==UserScript==
// @name         Bugzilla Markdown Comments
// @description  Use Markdown on Bugzilla
// @version      0.2
// @author       George Gaydarov
// @match        https://bugzilla.*.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/gg7/bugzilla-markdown-userscript/master/bugzilla-markdown.userscript.js
// @updateURL    https://raw.githubusercontent.com/gg7/bugzilla-markdown-userscript/master/bugzilla-markdown.userscript.js
// ==/UserScript==

/* inspired by https://gist.github.com/paulirish/1343518 */

GM_addStyle('blockquote { line-height: 0.5em; }');
GM_addStyle('.bz_comment > pre.bz_comment_text p { margin: 0; }');
GM_addStyle('.bz_comment > pre { margin: 0; }');

(function bugzillaMarkdownify(){
  'use strict';

  if (!window.showdown){
    var scr = document.createElement('script');
    scr.onload = bugzillaMarkdownify;
    scr.src = 'https://cdn.rawgit.com/showdownjs/showdown/1.8.6/dist/showdown.min.js';
    document.body.appendChild(scr);
    return;
  }

  [].forEach.call( document.querySelectorAll('.bz_comment > pre.bz_comment_text'), function fn(elem) {
    var commentText = elem.innerText;
    elem.innerHTML = (new showdown.Converter()).makeHtml(commentText);
  });
}());
