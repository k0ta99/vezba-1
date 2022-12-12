/// <reference types="Cypress" />

import { loginPage } from "../pageObjects/loginPOM"
import { allGalleries } from "../pageObjects/allGalleriesObject"

describe("all galleries test", () => {

    let searchTerm = "novi sad 3 slike";

    before("log into the app", () => {
        cy.visit("/login");

        cy.url().should("include", "/login");
        loginPage.loginHeading.should("be.visible")
        .and("have.text", "Please login");

        loginPage.login(Cypress.env("userEmail"), Cypress.env("userPassword"));

        cy.url().should("include", "/login"); 
    })

    it("test pagination", () => {
        cy.intercept(
            "GET",
            "https://gallery-api.vivifyideas.com/api/galleries?page=2&term="
        ).as("loadMoreGalleries");

        allGalleries.singleGallery.should("have.length", 10);
        allGalleries.loadMoreButton.click();
        allGalleries.singleGallery.should("have.length", 20);

        cy.wait("@loadMoreGalleries").then(interception =>{
            console.log("INTERCEPTION", interception);
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.galleries).to.have.length(10);
        })
    })

    it("all galleries loaded", () =>{
        AllGalleries.singleGallery.should("have.length", 10)
        allGalleriesObject.galleryImage.should("have.length", 1);
    });

    it("redirect to single gallery", () =>{
        cy.intercept(
            "GET",
            "https://gallery-api.vivifyideas.com/api/galleries/2340"
        ).as("singleGalleryRedirection")

        allGalleries
        .singleGallery
        .first()
        .find("a").first()
        .click()

         allGalleries.allGalleriesHeading.should("not.be", "visible");
         cy.url().should("include", "/galleries");

         cy.wait("@singleGalleryRedirection").then(interception =>{
            expect(interception.response.statusCode).to.eq(200)
            expect(interception.response.body.image_url).to.exist()
         })
    })

    it("search for existing gallery", () =>{
        cy.intercept(
            "GET",
            "https://gallery-api.vivifyideas.com/api/galleries?page=1&term=novi sad 3 slike"
        ).as("gallerySearch")

        allGalleries.search(searchTerm);
        allGalleries.singleGallery.should("have.length", 1);

        cy.wait("@gallerySearch").then(interception =>{
            expect(interception.response.statusCode).to.eq(200)   
        })
    })

})