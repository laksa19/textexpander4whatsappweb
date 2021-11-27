// ==UserScript==
// @name         Text Expander for WhatsApp Web
// @namespace    https://github.com/laksa19/textexpander4whatsappweb
// @version      0.1
// @description  Text Expander for WhatsApp Web
// @author       Laksamadi Guko
// @match        https://web.whatsapp.com/*
// @icon         https://laksa19.github.io/textexpander4whatsappweb/favicon.png
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let textlist = [
        {
            text: "/hi",
            expand: "Hi firend🙋‍♂️"
        },
        {
            text: "test",
            expand: "this is a test message,\n you can ignore it."
        },
    ]


    function findText(txt,find) {
        return txt.text === find
    }


    $('body').click(()=>{
        if(typeof $('div[title="Type a message"]') !== "undefined"){
            var inputText = $('div[title="Type a message"]')
            inputText.keyup(()=>{
                setTimeout(()=>{
                    let textExpand = textlist.find(txt => findText(txt,inputText.html()));
                    if(inputText.html() == textExpand.text){
                        inputText.html('');
                        inputText.focus();
                        document.execCommand('insertText', false, textExpand.expand);
                    }
                },500);

            })
        }
    })


})();
