class allGalleries{
    get searchInputField(){
        return cy.get("input[type='text']")
    }

    get filterButton(){
        return cy.get('button')
    }

    get myGalleries(){
        return cy.get("a[href='/my-galleries']")
    }

    get createGallery(){
        return cy.get('a[href="/create"]')
    }

    get loadMore(){
        return cy.get('button[class="btn btn-custom"]')
    }

    get logout(){
        return cy.get(".nav-link").eq(3)
    }

    allGalleries(searchInputField, filterButton, myGalleries, createGallery, loadMore, logout){
        this.searchInputField.type(searchInputField)
        this.filterButton.click()
        this.myGalleries.click()
        this.createGallery.click()
        this.loadMore.click()
        this.logout.click()
    }
}

export const allGalleries = new allGalleries()