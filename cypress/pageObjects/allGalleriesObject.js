class AllGalleries{

    get allGalleriesHeading(){
        return cy.get("h1");
    }

    get loginLink(){
        return cy.get(".nav-link").eq(1);
    }

    get registerLink(){
        return cy.get(".nav-link").eq(2);
    }

    get searchInput(){
        return cy.get("input[type='text']")
    }

    get filterButton(){
        return cy.get('button').first()
    }

    get myGalleriesLink(){
        return cy.get("a[href='/my-galleries']")
    }

    get createGalleryLink(){
        return cy.get('a[href="/create"]')
    }

    get loadMoreButton(){
        return cy.get('button').last()
    }

    get singleGallery(){
        return cy.get(".cell");
    }

    get singleGalleryTitle(){
        return cy.get(".box-title").eq(0);
    }

    get galleriesGrid(){
        return cy.get(".grid");
    }
    
    get galleryHeading(){
        return this.singleGallery.find("h2")
    }

    get galleryAuthor(){
        return this.singleGallery.find("p")
    }

    get galleryCreationgDate(){
        return this.singleGallery.find("small");
    }

    get galleryImage(){
        return cy.get("img");
    }

    search(searchTerm){
        this.searchInput.type(searchTerm);
        this.filterButton.click();
    }
}

export const allGalleries = new AllGalleries()