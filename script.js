document.getElementById("psbtn").addEventListener("click", function () {
    const pwoutput = document.getElementById("password");

    let password = "",
        char,
        chars = "";

    if (document.getElementById("number").checked) {
        chars = chars + "0123456789"
    }
    if (document.getElementById("symbol").checked) {
        chars = chars + "!@#$%^&*()_+-=`~[]{};:'\",.<>/\\|"
    }
    if (document.getElementById("capital").checked) {
        chars = chars + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if (document.getElementById("small").checked) {
        chars = chars + "abcdefghijklmnopqrstuvwxyz"
    }
    if (document.getElementById("rs").checked) {
        chars = chars.replace(/01|i|I|O/g, "")
    }

    for (let i = 0; i < document.getElementById("pwlength").value; i++) {
        const random = Math.floor(Math.random() * chars.length);
        char = chars.charAt(random);
        password = password + char
    }

    pwoutput.innerText = password;

    if (document.getElementById("as").checked) {
        const select = document.createRange()
        select.selectNode(pwoutput),
        window.getSelection().removeAllRanges(),
        window.getSelection().addRange(select),
        document.execCommand("copy");
    }
})
