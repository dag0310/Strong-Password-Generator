let setting = {
    "number": true,
    "symbol": false,
    "capital": true,
    "small": true,
    "removeSimilar": false,
    "autoCopy": true,
    "length": 20
};
const pwoutput = document.getElementById("password");

function init() {
    const storage = localStorage.getItem("pw-setting");

    storage && (
        setting = JSON.parse(storage)
    ),

    [...document.querySelectorAll("input[type=checkbox]")].forEach(input => {
        input.checked = setting[input.id]
    }),

    document.getElementById("pwlength").value = setting.length
}

function createChars() {
    let chars = "";

    if (setting.number) {
        chars = chars + "0123456789"
    }
    if (setting.symbol) {
        chars = chars + "!@#$%^&*()-_=+"
    }
    if (setting.capital) {
        chars = chars + "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if (setting.small) {
        chars = chars + "abcdefghijklmnopqrstuvwxyz"
    }
    if (setting.removeSimilar) {
        chars = chars.replace(/01|i|I|O/g, "")
    }

    return chars;
}

function saveSetting() {
    localStorage.setItem("pw-setting", JSON.stringify(setting))
}

init(),

document.getElementById("psbtn").addEventListener("click", () => {
    const chars = createChars();

    let password = "",
        tmp;

    for (let i = 0; i < document.getElementById("pwlength").value; i++) {
        const random = Math.floor(Math.random() * chars.length);
        tmp = chars.charAt(random);
        password = password + tmp
    }

    pwoutput.innerText = password;

    if (setting.autoCopy) {
        const select = document.createRange()
        select.selectNode(pwoutput),
        window.getSelection().removeAllRanges(),
        window.getSelection().addRange(select),
        document.execCommand("copy");
    }
}),

[...document.querySelectorAll(".settings")].forEach(a => {
    a.addEventListener("click", () => {
        const target = a.querySelector("input");

        setting[target.id] = target.checked,
        saveSetting()
    })
}),

document.getElementById("pwlength").addEventListener("change", function() {
    setting.length = this.value,
    saveSetting()
});
