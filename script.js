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
        chars = chars + "0123456789" // 숫자 추가
    }
    if (setting.symbol) {
        chars = chars + "!@#$%^&*()-_=+" // 각종 기호 추가
    }
    if (setting.capital) {
        chars = chars + "ABCDEFGHIJKLMNOPQRSTUVWXYZ" // 대문자 추가
    }
    if (setting.small) {
        chars = chars + "abcdefghijklmnopqrstuvwxyz" // 소문자 추가
    }
    if (setting.removeSimilar) {
        chars = chars.replace(/01|i|I|O/g, "") // 헷갈리는 스트링 제거
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
