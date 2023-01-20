import { CategoryBMock } from '../../src/app/core/mocks/category.mock'
import { ProductBMock } from '../../src/app/core/mocks/product.mock'

describe('Category', () => {

  beforeEach(() => {
    cy.intercept(
      { method: 'get', url: /categories/ },
      { body: CategoryBMock }
    ).as('getCategory')

    cy.intercept(
      { method: 'get', url: /products\?/ },
      { body: [ProductBMock, ProductBMock] }
    ).as('getProducts')

    cy.intercept(
      { method: 'get', url: /products\/\d+/ },
      { body: { ...ProductBMock, price: 123 } }
    ).as('getProductPrice')
  })

  it.only('Show category name', () => {
    cy.visit('/category/1/slug')
    cy.wait('@getCategory')
    cy.wait('@getProducts')

    cy.get('h1#category-name').and('include.text', CategoryBMock.name)
  })

  it.only('Get and shows products', () => {
    cy.visit('/category/1/slug')
    cy.wait('@getCategory')
    cy.wait('@getProducts')

    cy.get('.card').and('have.length', 2)
  })

  it.only('Refresh product prices if category is 2', () => {
    cy.visit('/category/2/slug')
    cy.wait('@getCategory')
    cy.wait('@getProducts')
    cy.wait('@getProductPrice')

    cy.get('.card').first().find('#price-badge').and('include.text', '123')
  })

})
