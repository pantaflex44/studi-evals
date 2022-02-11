function makeid(length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}
export function loadMailLinks() {
    const links = document.querySelectorAll("[data-mail]");
    links.forEach((item) => {
        if (item.nodeName.toLowerCase() === "a") {
            let dataMail = item.getAttribute("data-mail");
            item.removeAttribute("data-mail");

            const onmouseenter =
                "this.href='mailto:'+this.dataset.mail.replaceAll(' at ', '@').replaceAll(' point ', '.');";
            const onmouseleave = "this.href='#';";

            const key = "k" + makeid(6).toLowerCase();

            item.setAttribute("href", "#");
            item.setAttribute(`data-${key}`, dataMail);
            item.setAttribute(
                "onmouseenter",
                onmouseenter.replace("dataset.mail.", `dataset.${key}.`)
            );
            item.setAttribute("onmouseleave", onmouseleave);
        }
    });
}

function sanitize(string) {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/gi;
    return string.replace(reg, (match) => map[match]);
}
export function sendMail(btn) {
    btn.disabled = true;
    btn.innerText = "préparation du message...";

    const subjectDom = document.getElementById("contactSubject");
    subjectDom.disabled = true;
    subjectDom.classList.add("disabled");
    const nameDom = document.getElementById("contactName");
    nameDom.disabled = true;
    nameDom.classList.add("disabled");
    const emailDom = document.getElementById("contactEmail");
    emailDom.disabled = true;
    emailDom.classList.add("disabled");
    const bodyDom = document.getElementById("contactMessage");
    bodyDom.disabled = true;
    bodyDom.classList.add("disabled");

    emailjs.init("user_ScBMzSHBurP66GIdXaY7X");

    const templateParams = {
        subject: sanitize(subjectDom.value),
        name: sanitize(nameDom.value),
        from: sanitize(emailDom.value),
        message: sanitize(bodyDom.value),
    };

    btn.innerText = "envoie en cours...";

    emailjs.send("service_lbz32ue", "template_6ukge1a", templateParams).then(
        function (response) {
            btn.innerText = "message envoyé.";
        },
        function (error) {
            btn.innerText = "erreur!";
        }
    );

    setTimeout(() => {
        subjectDom.value = "";
        subjectDom.classList.remove("disabled");
        subjectDom.disabled = false;

        nameDom.value = "";
        nameDom.classList.remove("disabled");
        nameDom.disabled = false;

        emailDom.value = "";
        emailDom.classList.remove("disabled");
        emailDom.disabled = false;

        bodyDom.value = "";
        bodyDom.classList.remove("disabled");
        bodyDom.disabled = false;

        btn.innerText = "envoyer le message";
        btn.disabled = false;
    }, 60000);
}
