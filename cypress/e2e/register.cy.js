/// <reference types = "Cypress"/>
// Arrow function () => {}

describe("registration test", () => {
    function makeId(length) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
      let email = `${makeId(5)}@test.com`;

    it("register with valid credentials", () => {
        cy.visit("https://gallery-app.vivifyideas.com")
        cy.get('a[href="/register"]').click()
        cy.get("#first-name").type("Marko")
        cy.get("#last-name").type("Marko")
        cy.get("#email").type(email)
        cy.get("#password").type("test1234")
        cy.get("#password-confirmation").type("test1234")
        cy.get('input[type="checkbox"]').click()
        cy.get("button").click()
        cy.url().should("not.include", "/register")

    })

    it("register with invalid email format", () => {
        cy.visit("https://gallery-app.vivifyideas.com")
        cy.get('a[href="/register"]').click()
        cy.get("#first-name").type("Marko")
        cy.get("#last-name").type("Marko")
        cy.get("#email").type("markogmail.com")
        cy.get("#password").type("test1234")
        cy.get("#password-confirmation").type("test1234")
        cy.get('input[type="checkbox"]').click()
        cy.get("button").click()
        cy.url().should("not.include", "/register")

    })

    it("register with alhpanumeric 'first name' input field", () => {
        cy.visit("https://gallery-app.vivifyideas.com")
        cy.get('a[href="/register"]').click()
        cy.get("#first-name").type("Marko33")
        cy.get("#last-name").type("Marko")
        cy.get("#email").type(email)
        cy.get("#password").type("test1234")
        cy.get("#password-confirmation").type("test1234")
        cy.get('input[type="checkbox"]').click()
        cy.get("button").click()
        cy.url().should("not.include", "/register")

    })

    it("register with invalid password format", () => {
        cy.visit("https://gallery-app.vivifyideas.com")
        cy.get('a[href="/register"]').click()
        cy.get("#first-name").type("Marko")
        cy.get("#last-name").type("Marko")
        cy.get("#email").type(email)
        cy.get("#password").type("test12")
        cy.get("#password-confirmation").type("test12")
        cy.get('input[type="checkbox"]').click()
        cy.get("button").click()
        cy.url().should("not.include", "/register")

    })

    it("register with unconfirmed password", () => {
        cy.visit("https://gallery-app.vivifyideas.com")
        cy.get('a[href="/register"]').click()
        cy.get("#first-name").type("Marko")
        cy.get("#last-name").type("Marko")
        cy.get("#email").type(email)
        cy.get("#password").type("test1234")
        cy.get("#password-confirmation").type("test12")
        cy.get('input[type="checkbox"]').click()
        cy.get("button").click()
        cy.url().should("not.include", "/register")
    })

    it("register with unchecked terms and conditions", () => {
        cy.visit("https://gallery-app.vivifyideas.com")
        cy.get('a[href="/register"]').click()
        cy.get("#first-name").type("Marko")
        cy.get("#last-name").type("Marko")
        cy.get("#email").type(email)
        cy.get("#password").type("test1234")
        cy.get("#password-confirmation").type("test1234")
        cy.get("button").click()
        cy.url().should("not.include", "/register")
    })

    it.only("register with blank first name", () => {
        cy.visit("https://gallery-app.vivifyideas.com")
        cy.get('a[href="/register"]').click()
        cy.get("#first-name").type(" ")
        cy.get("#last-name").type("Marko")
        cy.get("#email").type(email)
        cy.get("#password").type("test1234")
        cy.get("#password-confirmation").type("test1234")
        cy.get('input[type="checkbox"]').click()
        cy.get("button").click()
        cy.url().should("not.include", "/register")
    })





})