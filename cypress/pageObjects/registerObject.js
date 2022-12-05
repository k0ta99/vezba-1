const { get } = require("cypress/types/lodash")

class authRegister{
    get firstName(){
        return cy.get('#first-name')
    }

    get lastName(){
        return cy.get('#last-name')
    }

    get email(){
        return cy.get('#email')
    }

    get password(){
        return cy.get('#password')
    }

    get confirmedPassword(){
        return cy.get('#password-confirmation')
    }

    get acceptedTAC(){
        return cy.get("input[type='checkbox']")
    }

    get submit(){
        return cy.get('button')
    }

    register(firstName, lastName, email, password, confirmedPassword, acceptedTAC, submit){
        this.firstName.type(firstName)
        this.lastName.type(lastName)
        this.email.type(email)
        this.password.type(password)
        this.confirmedPassword.type(confirmedPassword)
        this.acceptedTAC.click()
        this.submit.click()
    }
}

export const authRegister = new authRegister()