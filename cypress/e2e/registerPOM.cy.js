/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";
import { registerPage } from "../pageObjects/registerPage.js";
import { loginPage } from "../pageObjects/loginPOM"
import { allGalleries } from "../pageObjects/allGalleriesObject.js";

describe("register POM", () => {
  let randomUser = {
    randomEmail: faker.internet.email(),
    randomFirstName: faker.name.firstName(),
    randomLastName: faker.name.lastName(),
    randomPassword: faker.internet.password(),
    invalidRandomEmail: faker.internet.color() + "gmail.com",
    existingEmail: "marko@gmail.com",
    passwordConfirmation: "drugo",
    invalidPassword: faker.name.firstName()
  };

  before("register page assertations", () =>{
    cy.visit("/register");
    registerPage.checkboxTOS.should("not.be.checked");
    registerPage.registerHeading.should("be.visible")
    .and("have.text", "Register");
  })

  beforeEach("visit register page", () => {
    cy.visit("/");
    allGalleries.registerLink.click();
    cy.url().should("include", "/register");
  });

  it("register with valid data", () => {
    cy.intercept(
      "POST",
      "https://gallery-api.vivifyideas.com/api/auth/register"
    ).as("successfullRegister")

    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.randomEmail,
      randomUser.randomPassword,
      randomUser.randomPassword
    );
    cy.wait("@successfullRegister").then(interception =>{
       expect(interception.response.statusCode).to.eq(200);
       expect(interception.response.body.acces_token).to.exist;
       expect(interception.request.body.email).to.contain(randomUser.randomEmail)

    })
    cy.url().should("not.include", "/register");
  });

  it("register with invalid email address", () => {
    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.invalidRandomEmail,
      randomUser.randomPassword
    );

    registerPage.checkboxTOS.should("be.checked");    
    cy.url().should("include", "/register");
  });

  it("register with existing email address", () => {
    cy.intercept(
      "POST",
      "https://gallery-api.vivifyideas.com/api/auth/register"
    ).as("existingEmailAttempt")

    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.existingEmail,
      randomUser.randomPassword
    );
      
    cy.wait("@existingEmailAttempt").then(interception => {
      expect(interception.response.statusCode).to.eq(422)
      expect(interception.response.body.message).to.include("The given data was invalid.")
    })

    registerPage.checkboxTOS.should("be.checked");
    registerPage.alertMessage.should("be.visible")
    .and("exist")
    .and("have.length", 1)
    .and("have.text" , "The email has already been taken.")    
    cy.url().should("include", "/register");
  });

  it("register with invalid password format", () => {
    cy.intercept(
      "POST",
      "https://gallery-api.vivifyideas.com/api/auth/register"
    ).as("invalidPasswordAttempt")

    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.randomEmail,
      randomUser.invalidPassword
    )

    cy.wait("@invalidPasswordAttempt").then(interception => {
      expect(interception.response.statusCode).to.eq(422)
      expect(interception.response.body.message).to.include("The given data was invalid.")
    })
})

it.only("register via BE", () =>{
  cy.request(
    "POST",
    "https://gallery-api.vivifyideas.com/api/auth/register",
    {
     email: randomUser.randomEmail,
     first_name: randomUser.randomFirstName,
     last_name: randomUser.randomLastName,
     password: randomUser.randomPassword,
     password_confirmation: randomUser.randomPassword,
     terms_and_conditions: true
    }
  );

  cy.visit("/login")
  loginPage.login(randomUser.randomEmail, randomUser.randomPassword)
})

});