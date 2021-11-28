
// ==UserScript==
// @name         Text Expander for WhatsApp Web +
// @namespace    https://github.com/laksa19/textexpander4whatsappweb
// @version      0.1
// @description  Text Expander for WhatsApp Web with Reply Button
// @author       Laksamadi Guko
// @match        https://web.whatsapp.com/*
// @icon         https://laksa19.github.io/textexpander4whatsappweb/favicon.png
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @require      https://rawgit.com/notifyjs/notifyjs/master/dist/notify.js
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
        if($('#ctr').length < 1){
            addReplyBtn();
        }
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

    function addReplyBtn(){
        $("footer").prepend('<div style="padding:5px 10px 5px 10px;border-left: 1px solid var(--border-stronger);" id="ctr"></div>');

        $("footer").append(`
        <script>
        function clickRB(text){
        var inputText = $('div[title="Type a message"]');
        inputText.html('');
        document.execCommand('insertText', false, text);
        setTimeout(()=>{
        $('span[data-icon="send"]').click();
        },100)
        }
        </script>

        `);


        $.each(textlist, function(key,value) {
            $('#ctr').append(`
            <button id="rbtn`+key+`" onclick="clickRB(this.title)" style="margin-right:5px; color :#fff; background: #08c65b; border: none; border-radius:3px; text-align: center; vertical-align: middle; text-decoration: none; font-size: 14px; cursor: pointer; padding: 5px 12px;" title="`+value.expand+`">`+value.text+`</button>`)
        })

    }


})();
