import { CategoryBMock } from '../../src/app/core/mocks/category.mock'
import { ProductBMock } from '../../src/app/core/mocks/product.mock'

describe('Category', () => {

  const productsMock = [ProductBMock, ProductBMock]

  beforeEach(() => {
    cy.intercept(
      { method: 'get', url: /categories/ },
      { body: CategoryBMock }
    ).as('getCategory')

    cy.intercept(
      { method: 'get', url: /products\?/ },
      { body: productsMock }
    ).as('getProducts')

    cy.intercept(
      { method: 'get', url: /products\/\d+/ },
      { body: { ...ProductBMock, price: 123 } }
    ).as('getProductPrice')
  })

  it('Show category name', () => {
    cy.visit('/category/1/slug')
    cy.wait('@getCategory')
    cy.wait('@getProducts')

    cy.get('h1#category-name').and('include.text', CategoryBMock.name)
  })

  it('Get and shows products', () => {
    cy.visit('/category/1/slug')
    cy.wait('@getCategory')
    cy.wait('@getProducts')

    cy.get('.product-item').and('have.length', productsMock.length)
  })

  it('Refresh product prices if category is 2', () => {
    cy.visit('/category/2/slug')
    cy.wait('@getCategory')
    cy.wait('@getProducts')
    cy.wait('@getProductPrice')

    cy.get('.product-item').first().find('.price-badge').and('include.text', '123')
  })

})
