/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";
import { loginPage } from "../pageObjects/loginPOM";
import { createGallery } from "../pageObjects/createGalleryPOM";
import { allGalleries } from "../pageObjects/allGalleriesObject"

describe("create gallery test", () =>{
    let existingUser = {
        validEmail: "marko@gmail.com",
        validPassword: "test1234"
    };

    let galleryData = {
        galleryTitle: faker.random.word(),
        galleryDescription: faker.random.words(),
        galleryImageUrl: "https://thrivethemes.com/wp-content/uploads/2018/05/photo-jpeg-example.jpg",
        secondGalleryImageUrl: "http://staffmobility.eu/sites/default/files/isewtweetbg.jpg",
        galleryImageWrongFormat: "https://cdn-icons-png.flaticon.com/512/29/29264.ico",
        galleryTitleBlank: " "

    }

    before("log into the app", () =>{
        cy.visit("/login");
        cy.url().should("include", "/login");
        loginPage.login(existingUser.validEmail, existingUser.validPassword);
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
        cy.wait(1500)
        createGallery.createNewGallery(
            galleryData.galleryTitle,
            galleryData.galleryDescription,
            galleryData.galleryImageWrongFormat
        );
        createGallery.alertMessage.should("be.visible")
        .and("have.text", "Wrong format of image")
        .and("have.css", "background-color", 'rgb(248, 215, 218)');
        cy.url().should("include", "/create");
    })

    it("create gallery with blank input field for title", () =>{
        cy.wait(1500)
        createGallery.createNewGallery(
            galleryData.galleryTitleBlank,
            galleryData.galleryDescription,
            galleryData.galleryImageUrl
        );
        cy.url().should("include", "/create");
        createGallery.alertMessage.should("be.visible")
        .and("have.text", "The title field is required.")
        .and("have.css", "background-color", 'rgb(248, 215, 218)');
    })

    it("fill in gallery data then click cancel", () =>{
        cy.wait(1500)
        createGallery.cancelCreatingGallery(
            galleryData.galleryTitle,
            galleryData.galleryDescription,
            galleryData.galleryImageUrl
        );
        cy.url().should("not.include", "/create");
        allGalleries.singleGallery.should("have.length", 10);
    })

    it("add multiple images", () => {
        cy.wait(1500)
        createGallery.createGalleryWithSecondImage(
            galleryData.galleryTitle,
            galleryData.galleryDescription,
            galleryData.galleryImageUrl,
            galleryData.secondGalleryImageUrl
        )
    })

    it("create gallery with valid data", () =>{
        cy.wait(1500)
        createGallery.createNewGallery(
            galleryData.galleryTitle,
            galleryData.galleryDescription,
            galleryData.galleryImageUrl
        );
        cy.url().should("not.include", "/create");
        allGalleries.singleGallery.should("have.length", 10);
        allGalleries.allGalleriesHeading.should("be.visible")
        .and("have.text", "All Galleries")
    })

    it.only("redirect to all galleries clicking on All Galleries link", () =>{
        cy.wait(1500)
        createGallery.createNewGallery(
            galleryData.galleryTitle,
            galleryData.galleryDescription,
            galleryData.galleryImageUrl
        );
        createGallery.redirectToAllGalleries();
        cy.url().should("not.include", "/create");
        allGalleries.singleGallery.should("have.length", 10);

       
    })
})