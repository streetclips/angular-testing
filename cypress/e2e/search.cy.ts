import { CategoriesMock } from '../../src/app/core/mocks/category.mock'
import { ProductBMock, ProductsMock } from '../../src/app/core/mocks/product.mock'

describe('Search', () => {

  beforeEach(() => {
    cy.intercept(
      { method: 'get', url: /categories/ },
      { body: CategoriesMock }
    ).as('getCategory')

    cy.intercept(
      { method: 'get', url: /products\?/ },
      { body: ProductsMock }
    ).as('getProducts')

    cy.intercept(
      { method: 'get', url: /products\/\d+/ },
      { body: { ...ProductBMock, price: 123 } }
    ).as('getProductPrice')
  })

  it('Should fetch products', () => {
    cy.visit('/search')
    cy.wait('@getCategory')
    cy.wait('@getProducts')

    cy.get('.product-item').and('have.length', ProductsMock.length)
  })

  it('Search bar have price range and category filters', () => {
    cy.visit('/search')
    cy.wait('@getCategory')
    cy.wait('@getProducts')

    cy.get('#search-bar select[name=category]').and('exist')
    cy.get('#search-bar select[name=priceRange]').and('exist')
  })

  it('Search bar load filters from url query params', () => {
    cy.visit('/search?category=1&priceRange=0,100&title=something')
    cy.wait('@getCategory')
    cy.wait('@getProducts')

    cy.get('#search-bar select[name=category]').should('have.value', '1')
    cy.get('#search-bar select[name=priceRange]').should('have.value', '0,100')
    cy.get('#search-bar input[name=title]').should('have.value', 'something')
  })

  it('Should change query params on search', () => {
    cy.visit('/search')
    cy.wait('@getCategory')
    cy.wait('@getProducts')

    cy.get('#search-bar select[name=category]').select('1')
    cy.get('#search-bar select[name=priceRange]').select('0,100')
    cy.get('#search-bar input[name=title]').type('something')

    cy.get('button#search-btn').click()

    cy.location('search').should('include', 'category=1')
    cy.location('search').should('include', 'priceRange=0,100')
    cy.location('search').should('include', 'title=something')
  })

})
