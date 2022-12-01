/// <reference types = "Cypress"/>
// Arrow function () => {}

describe("login test", () => {
    it("login with valid credentials", () => {
        cy.visit("https://gallery-app.vivifyideas.com")
        cy.get('a[href="/login"]').click()
        //cy.get('a[class="nav-link nav-buttons"]').first()
        //cy.get('input[id="email"]')
        cy.get("#email").type("kkk@gmail.com")
        cy.get("#password").type("test1234")
        cy.get('button').click()
    })

    // it('logout',() =>{
    //     cy.get(".nav-link").should("have.length", 4)
    //     cy.get(".nav-link").eq(3).click()
    // })

    it("login with invalid credentials", () => {
        cy.visit("https://gallery-app.vivifyideas.com")
        cy.get('a[href="/login"]').click()
        cy.get("#email").type("kkk1@gmail.com")
        cy.get("#password").type("test1234")
        cy.get('button').click()
    })

    it.only("login with invalid email format", () => {
        cy.visit("https://gallery-app.vivifyideas.com")
        cy.get('a[href="/login"]').click()
        cy.get("#email").type("kkk1gmail.com")
        cy.get("#password").type("test1234")
        cy.get('button').click()
    })

    it("login with blank email input field", () => {
        cy.visit("https://gallery-app.vivifyideas.com")
        cy.get('a[href="/login"]').click()
        cy.get("#email").type(" ")
        cy.get("#password").type("test1234")
        cy.get('button').click()
    })

    it("login with both blank fields", () => {
        cy.visit("https://gallery-app.vivifyideas.com")
        cy.get('a[href="/login"]').click()
        cy.get("#email").type(" ")
        cy.get("#password").type(" ")
        cy.get('button').click()
    })
    





})