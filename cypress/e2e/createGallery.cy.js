/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";
import { loginPage } from "../pageObjects/loginPOM";
import { createGallery } from "../pageObjects/createGalleryPOM";
import { allGalleries } from "../pageObjects/allGalleriesObject"

describe("create gallery test", () =>{
    let galleryId;

    let galleryData = {
        galleryTitle: faker.random.word(),
        galleryDescription: faker.random.words(),
        galleryImageUrl: "https://thrivethemes.com/wp-content/uploads/2018/05/photo-jpeg-example.jpg",
        secondGalleryImageUrl: "http://staffmobility.eu/sites/default/files/isewtweetbg.jpg",
        galleryImageWrongFormat: "https://cdn-icons-png.flaticon.com/512/29/29264.ico",
        galleryTitleBlank: " "

    }

    before("log into the app", () =>{
        cy.visit("/");
        allGalleries.loginLink.click()
        cy.url().should("include", "/login");

        loginPage.login(Cypress.env("userEmail"), Cypress.env("userPassword"))
        loginPage.loginButton.click();

        cy.visit("/create");
        cy.url().should("include", "/create");

        createGallery.createGalleryHeading.should("be.visible")
        .and("have.text", "Create Gallery")

        createGallery.titleLabel.should("be.visible");
        createGallery.descriptionLabel.should("be.visible");
        createGallery.imagesLabel.should("be.visible");
        createGallery.submitButton.should("be.visible");
    })

    it("create gallery with wrong image format", ()=>{
        cy.intercept(
            "POST",
            "https://gallery-api.vivifyideas.com/api/galleries"
        ).as("invalidGalleryCreationAttempt");

        createGallery.createNewGallery(
            galleryData.galleryTitle,
            galleryData.galleryDescription,
            galleryData.galleryImageWrongFormat
        );

        cy.wait("@invalidGalleryCreationAttempt").then(interception =>{
            expect(interception.response.statusCode).to.eq(422);
            expect(interception.response.body.id).to.not.exist;
        })
        createGallery.alertMessage.should("be.visible")
        .and("have.text", "Wrong format of image")
        .and("have.css", "background-color", 'rgb(248, 215, 218)');
        cy.url().should("include", "/create");
    })

    it("create gallery with blank input field for title", () =>{
        cy.intercept(
            "POST",
            "https://gallery-api.vivifyideas.com/api/galleries"
        ).as("noTitleGalleryAttempt");

        createGallery.createGalleryHeading.should("be.visible")
        .and("have.text", "Create Gallery")
        createGallery.createNewGallery(
            galleryData.galleryTitleBlank,
            galleryData.galleryDescription,
            galleryData.galleryImageUrl
        );

        cy.wait("@noTitleGalleryAttempt").then(interception =>{
            expect(interception.response.statusCode).to.eq(422);
            expect(interception.response.body.message).to.have.contain("The given data was invalid.")
        })

        cy.url().should("include", "/create");
        createGallery.alertMessage.should("be.visible")
        .and("have.text", "The title field is required.")
        .and("have.css", "background-color", 'rgb(248, 215, 218)');
    })

    it("fill in gallery data then click cancel", () =>{
        cy.intercept(
            "POST",
            "https://gallery-api.vivifyideas.com/api/galleries"
        ).as("cancelCreatingGallery")

        createGallery.createGalleryHeading.should("be.visible")
        .and("have.text", "Create Gallery")

        createGallery.cancelCreatingGallery(
            galleryData.galleryTitle,
            galleryData.galleryDescription,
            galleryData.galleryImageUrl
        );
        createGallery.cancelButton.click()

        cy.wait("@cancelCreatingGallery").then(interception =>{
            expect(interception.response.statusCode).to.eq(201);
            expect(interception.response.body.id).to.not.exist;
        })

        cy.url().should("not.include", "/create");
        allGalleries.singleGallery.should("have.length", 10);
    })

    it("create gallery with valid data", () =>{
        cy.intercept(
            "POST",
            "https://gallery-api.vivifyideas.com/api/galleries"
        ).as("galleryCreation");

        createGallery.createGalleryHeading.should("be.visible")
        .and("have.text", "Create Gallery")

        createGallery.createNewGallery(
            galleryData.galleryTitle,
            galleryData.galleryDescription,
            galleryData.galleryImageUrl
        );

        cy.wait("@galleryCreation").then(interception =>{
            expect(interception.response.body.title).to.eq(galleryData.galleryTitle)
            expect(interception.response.body.description).to.eq(galleryData.galleryDescription)
            galleryId = interception.response.body.id;

            cy.visit('/galleries/${galleryId}');
            cy.get("h1").should("have.text", galleryData.galleryTitle)
        });
        cy.url().should("not.include", "/create");
        allGalleries.singleGallery.should("have.length", 10);
        allGalleries.singleGallery
        .first()
        .find('img')
        .should("have.", galleryData.galleryImageUrl)
        allGalleries.allGalleriesHeading.should("be.visible")
        .and("have.text", "All Galleries")
    })

    it.only("redirect to all galleries clicking on All Galleries link", () =>{
        cy.intercept(
            "GET",
            "https://gallery-api.vivifyideas.com/api/galleries?page=1&term="
        ).as("redirectToAllGalleries")

        createGallery.createGalleryHeading.should("be.visible")
        .and("have.text", "Create Gallery")

        createGallery.redirectToAllGalleries(
            galleryData.galleryTitle,
            galleryData.galleryDescription,
            galleryData.galleryImageUrl
        );

        cy.wait("@redirectToAllGalleries").then(interception =>{
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.galleries).to.have.length(10);
        })

        cy.url().should("not.include", "/create");
        allGalleries.singleGallery.should("have.length", 10);   
    })
    
})