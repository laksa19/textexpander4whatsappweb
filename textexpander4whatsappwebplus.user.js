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
            text: "ppj",
            expand: "Subdomain kakak sudah diperpanjang.\nTerimaksi telah menggunakan layanan Mikhmon Online.\nSemoga usahanya makin lancar, amin 🙏\n\nUntuk cek tanggal expired bisa menggunakan format berikut:\n/info xxx.mikhmon.link atau\n/info xxx.mikhmon.net\nsesuaikan xxx dengan akun kakak"
        },
        {
            text: "ext",
            expand: "\nHai kakak,\nSebelum perpanjang akun pastikan akunnya masih terdaftar di server,\ndengan cara membuka url Mikhmon Online kakak di browser atau balas menggunakan format berikut:\n/info xxx.mikhmon.link atau\n/info xxx.mikhmon.net\nsesuaikan xxx dengan akun kakak.\n\nUntuk perpanjangan akun silakan konfirmasi bukti pembayaran dengan keterangan pembayaran untuk  Subdomain yang didaftarkan.\n\nGunakan *ppj* agar tidak dijawab robot.\nContoh : _ppj gogonet.mikhmon.link_\n\nPembayaran bisa melalui rekening berikut.\n\nBCA : 7880150086\nBRI : 057401010892505\nOVO : 082244431352\nDANA : 082244431352\n\nAN : Gusti Komang Laksamadi\n\n*Khusus OVO, selain transfer sesama OVO nominal harus ditambkan Rp 1.000.\n\nPaket 1 Bulan Rp 35.000\nPaket 5 Bulan Rp 120.000\n\nJam operasional\nSenin - Jumat 08:00 - 20:00 WIB\nSabtu - Minggu 09:00 -  18:00 WIB\n\nTerima Kasih 🙏"
        },

        {
            text: "mail",
            expand: "Subdomain kakak berhasil didaftarkan, silakan cek email untuk panduan instalasi Mikhmon Online, sesuai dengan email yang didaftarkan.\n\nCatatan:\nEmail tidak secepat chat, harap bersabar.\nSilakan cek di inbox atau di spam\nJika dalam waktu 5 menit email blm diterima, silakan hubungi di WA  ini lagi.\n\nTerima kasih telah menggunakan layanan Mikhmon Online.\n\nSemoga usahanya makin lancar, amin 🙏"
        },
        {
            text: "/sub",
            expand: "Subdomain yang mana?\nContoh:\nhttps://demo.mikhmon.link\nhttps://demo.mikhmon.net"
        },
        {
            text: "bb",
            expand: "Tolong konfirmasi bukti pembayaran🙏"
        },
        {
            text: "ckon",
            expand: "Penanganannya bisa dicoba untuk disable dan enablekan kembali vpnnya.\nJika masih belum terkoneksi coba ganti service vpnnya ke OVPN, PPTP atau SSTP client.\nUntuk akun vpnnya sama seperti akun L2TP yang diberikan di email panduan.\nKhusus untuk OVPN port yang digunakan 1199 dengan mode Ethernet. Contoh pembuatan OVPN client bisa dilihat di link berikut https://laksa19.github.io/img/ovpn-client.png"
        }
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
            <button id="rbtn`+key+`" onclick="clickRB(this.title)" style="margin-right:5px; color :#fff; background: #08c65b; border: none; border-radius:3px; text-align: center; vertical-align: middle; text-decoration: none; font-size: 14px; cursor: pointer; padding: 5px 12px;" title="`+value.expand+`">`+value.text+`</button>
            <script>
            $('#rbtn`+key+`').
            </script>`)
        })

    }


})();
