import React, { useEffect, useRef, useState } from "react";

import emailjs, { init } from "@emailjs/browser";
import Reaptcha from "reaptcha";

export default function ContactForm() {
    const sanitize = (text) => {
        let txt = text ? text : "";
        const map = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2F;",
        };
        const reg = /[&<>"'/]/gi;
        return txt.replace(reg, (match) => map[match]);
    };

    const [isAlert, setIsAlert] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [sending, setSending] = useState(false);
    const [sended, setSended] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const submitButton = useRef();
    const nameField = useRef();
    const emailField = useRef();
    const subjectField = useRef();
    const messageField = useRef();

    const defaultFieldState = { content: "", isValid: false, isInvalid: false };

    const [name, setName] = useState({ ...defaultFieldState });
    const handleNameChange = (e) => {
        const val = e.target.value;
        const ok = val !== "";
        setName({
            ...defaultFieldState,
            content: val,
            isValid: ok,
            isInvalid: !ok,
        });
    };

    const [email, setEmail] = useState({ ...defaultFieldState });
    const handleEmailChange = (e) => {
        const val = e.target.value;
        const ok =
            val !== "" &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
        setEmail({
            ...defaultFieldState,
            content: val,
            isValid: ok,
            isInvalid: !ok,
        });
    };

    const [subject, setSubject] = useState({ ...defaultFieldState });
    const handleSubjectChange = (e) => {
        const val = e.target.value;
        const ok = val !== "";
        setSubject({
            ...defaultFieldState,
            content: val,
            isValid: ok,
            isInvalid: !ok,
        });
    };

    const [message, setMessage] = useState({ ...defaultFieldState });
    const handleMessageChange = (e) => {
        const val = e.target.value;
        const ok = val !== "";
        setMessage({
            ...defaultFieldState,
            content: val,
            isValid: ok,
            isInvalid: !ok,
        });
    };

    const handleCaptchaVerify = () => {
        setCaptchaVerified(true);
    };

    useEffect(() => {
        submitButton.current.disabled =
            !name.isValid ||
            !email.isValid ||
            !subject.isValid ||
            !message.isValid ||
            !captchaVerified;
    }, [name, email, subject, message, captchaVerified]);

    useEffect(() => {
        nameField.current.focus();
    }, []);

    let formTimeout = null;
    const sendEmail = (e) => {
        e.preventDefault();

        if (formTimeout) {
            clearTimeout(formTimeout);
        }

        setIsAlert(false);
        setIsSuccess(false);

        if (
            !name.isValid ||
            !email.isValid ||
            !subject.isValid ||
            !message.isValid ||
            !captchaVerified
        ) {
            setIsAlert(true);
            return;
        }

        setSending(true);
        setSended(false);

        const templateParams = {
            subject: sanitize(subject.content),
            name: sanitize(name.content),
            from: sanitize(email.content),
            message: sanitize(message.content),
        };

        submitButton.current.innerText = "envoie en cours...";
        init(process.env.EMAILJS_USERID);
        emailjs
            .send(
                process.env.EMAILJS_SERVICEID,
                process.env.EMAILJS_TEMPLATEID,
                templateParams
            )
            .then(() => {
                setIsSuccess(true);
                setSended(true);
            })
            .catch((error) => {
                setIsAlert(true);
                setSending(false);
                return;
            });

        formTimeout = setTimeout(() => {
            setIsAlert(false);
            setIsSuccess(false);

            setName({ ...defaultFieldState });
            setEmail({ ...defaultFieldState });
            setSubject({ ...defaultFieldState });
            setMessage({ ...defaultFieldState });
            setCaptchaVerified(false);

            setSending(false);
            setSended(false);

            nameField.current.scrollIntoView();
            nameField.current.focus();
        }, 60000);
    };

    return (
        <section className="contactForm">
            {isAlert && (
                <div className="row alert">
                    Une erreur est survenue. Impossible d'envoyer le message.
                </div>
            )}
            {isSuccess && (
                <div className="row success">
                    Message envoyé avec succès.
                    <br />
                    <br />
                    Pour limiter les spams, le formualaire reste désactivé
                    environ 60s après l'envoie du message.
                </div>
            )}
            <form onSubmit={sendEmail} autoComplete="none">
                <div className="row">
                    <input
                        type="text"
                        placeholder="Nom et Prénom"
                        aria-label="Nom et Prénom"
                        autoComplete="none"
                        required
                        autoFocus
                        ref={nameField}
                        value={name.content}
                        onChange={handleNameChange}
                        onBlur={handleNameChange}
                        disabled={sending}
                        className={[
                            name.isValid ? "valid" : "",
                            name.isInvalid ? "invalid" : "",
                        ].join(" ")}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        aria-label="Votre adresse email"
                        required
                        autoComplete="none"
                        ref={emailField}
                        value={email.content}
                        onChange={handleEmailChange}
                        disabled={sending}
                        className={[
                            email.isValid ? "valid" : "",
                            email.isInvalid ? "invalid" : "",
                        ].join(" ")}
                    />
                </div>
                <div className="row">
                    <input
                        type="text"
                        placeholder="Sujet"
                        aria-label="Sujet du message"
                        required
                        autoComplete="none"
                        ref={subjectField}
                        value={subject.content}
                        onChange={handleSubjectChange}
                        disabled={sending}
                        className={[
                            subject.isValid ? "valid" : "",
                            subject.isInvalid ? "invalid" : "",
                        ].join(" ")}
                    />
                </div>
                <div className="row">
                    <textarea
                        rows="5"
                        placeholder="Message"
                        aria-label="Message"
                        required
                        autoComplete="none"
                        ref={messageField}
                        value={message.content}
                        onChange={handleMessageChange}
                        disabled={sending}
                        className={[
                            message.isValid ? "valid" : "",
                            message.isInvalid ? "invalid" : "",
                        ].join(" ")}
                    />
                </div>
                <div className="row">
                    <Reaptcha
                        sitekey={process.env.RECAPTCHA_API_KEY}
                        onVerify={handleCaptchaVerify}
                    />
                </div>
                <div className="row">
                    <button
                        className="btn"
                        ref={submitButton}
                        disabled={sending}
                    >
                        {sending && !sended
                            ? "envoie en cours..."
                            : sended
                            ? "veuillez patienter quelques secondes..."
                            : "envoyer le message"}
                    </button>
                </div>
            </form>
        </section>
    );
}
