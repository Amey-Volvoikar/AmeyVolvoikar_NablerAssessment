const form = document.getElementById('contactForm')
const nameError = document.getElementById('nameErrorMsg')
const emailError = document.getElementById('emailErrorMsg')
const companyError = document.getElementById('companyErrorMsg')
const messageError = document.getElementById('messageErrorMsg')
const successMsg = document.getElementById('successMsg');


const validateName = () => {
    const userName = form.fullName.value
    const userNamePattern = /^[A-Za-z]+$/
    let nameErrorMsg = ''
    if (userName === '' || userName === null) {
        nameErrorMsg = 'Name is required'
    }
    if (userName.length > 0 && userNamePattern.test(userName) === false) {
        nameErrorMsg = 'Name cannot contain number or special characters'
    }
    if (nameErrorMsg.length > 0 ) {
        nameError.innerHTML = nameErrorMsg;
        return false
    }
    else {
        nameError.innerHTML = '';
        return true
    }
}

const validateEmail = () => {
    const email = form.email.value
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let emailErrorMsg = ''
    if (email === '' || email == null || email.length <= 0) {
        emailErrorMsg = 'Email is required'
    }
    if (email.length > 0 && emailPattern.test(String(email).toLowerCase()) === false) {
        emailErrorMsg = 'Incorrect Email format'
    }
    if (emailErrorMsg.length > 0) {
        emailError.innerHTML = emailErrorMsg
        return false
    }
    else {
        emailError.innerHTML = '';
        return true
    }
}

const validateCompanyName = () => {
    const comapany = form.company.value
    let companyErrorMsg = ''
    if (comapany === '' || comapany == null || comapany.length <= 0) {
        companyErrorMsg = 'Comapany name is required'
    }
    if (companyErrorMsg.length > 0) {
        companyError.innerHTML = companyErrorMsg
        return false
    }
    else {
        companyError.innerHTML = '';
        return true
    }
}

const validateMessage = () => {
    const message = form.message.value
    let messageErrorMsg = ''
    if (message === '' || message == null || message.length <= 0) {
        messageErrorMsg = 'Message is required'
    }
    if (message.length > 0 && message.length < 20) {
        messageErrorMsg = 'Message needs to be 20 characters or more'
    }
    if (messageErrorMsg.length > 0) {
        messageError.innerHTML = messageErrorMsg
        return false
    }
    else {
        messageError.innerHTML = '';
        return true
    }
}

form.fullName.addEventListener('keyup', e => {
    validateName()
})
form.email.addEventListener('keyup', e => {
    validateEmail()
})
form.company.addEventListener('keyup', e => {
    validateCompanyName()
})
form.message.addEventListener('keyup', e => {
    validateMessage()
})

form.submit.addEventListener('click', e => {
    e.preventDefault()
    validateName();
    validateEmail();
    validateCompanyName();
    validateMessage();
    if(validateName() && validateEmail() && validateCompanyName() && validateMessage() ){
        successMsg.innerHTML = 'Thank you for getting in touch!'
        const hash = CryptoJS.SHA256(form.email.value).toString();
        localStorage.setItem('email', hash);
        sessionStorage.setItem('email', hash);
        document.cookie = `email=${hash}`
    }
})

form.reset.addEventListener('click', e => {
    // reset error msgs
    nameError.innerHTML = '';
    emailError.innerHTML = '';
    companyError.innerHTML = '';
    messageError.innerHTML = '';
    successMsg.innerHTML = ''

    // clear email hash from localStorage, SessionStorage & Cookie
    delete localStorage.email;
    delete sessionStorage.email;
    document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
})
