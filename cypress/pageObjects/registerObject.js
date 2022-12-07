
class AuthRegister{
    get firstNameInput(){
        return cy.get('#first-name')
    }

    get lastNameInput(){
        return cy.get('#last-name')
    }

    get emailInput(){
        return cy.get('#email')
    }

    get passwordInput(){
        return cy.get('#password')
    }

    get confirmedPasswordInput(){
        return cy.get('#password-confirmation')
    }

    get checkboxTAC(){
        
        return cy.get("input[type='checkbox']")
    }

    get submitButton(){
        return cy.get('button')
    }

    register(firstNameInput, lastNameInput, emailInput, password, password, checkboxTAC, submitButton){
        this.firstNameInput.type(firstName)
        this.lastNameInput.type(lastName)
        this.emailInput.type(email)
        this.password.type(password)
        this.password.type(password)
        this.checkboxTAC.check()
        this.submitButton.click()
    }
}

export const AuthRegister = new AuthRegister()

