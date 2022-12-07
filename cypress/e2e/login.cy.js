/// <reference types = "Cypress"/>

const Locators = require("../fixtures/locators.json")

describe("login test", () => {
    it("login with valid credentials", () => {
        cy.visit("/")
        cy.get(Locators.Login.loginButton).click()
        cy.get(Locators.Common.emailInput).type("kkk@gmail.com")
        cy.get(Locators.Common.passwordInput).type("test1234")
        cy.get(Locators.Common.submitButton).click()
    })

     it('logout',() =>{
         cy.get(".nav-link").should("have.length", 4)
         cy.get(".nav-link").eq(3).click()
     })

    it("login with invalid credentials", () => {
        cy.visit("/login")
        cy.get('a[href="/login"]').click()
        cy.get("#email").type("kkk1@gmail.com")
        cy.get("#password").type("test1234")
        cy.get('button').click()
    })

    it("login with invalid email format", () => {
        cy.visit("/login")
        cy.get('a[href="/login"]').click()
        cy.get("#email").type("kkk1gmail.com")
        cy.get("#password").type("test1234")
        cy.get('button').click()
    })

    it("login with blank email input field", () => {
        cy.visit("/login")
        cy.get('a[href="/login"]').click()
        cy.get("#email").type(" ")
        cy.get("#password").type("test1234")
        cy.get('button').click()
    })

    it("login with both blank fields", () => {
        cy.visit("/login")
        cy.get('a[href="/login"]').click()
        cy.get("#email").type(" ")
        cy.get("#password").type(" ")
        cy.get('button').click()
    })
    
})