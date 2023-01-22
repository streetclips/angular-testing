import { ProductAMock } from '../../src/app/core/mocks/product.mock'
import { AuthMock } from '../../src/app/core/mocks/user.mock'

describe('Search', () => {

  beforeEach(() => {
    cy.intercept(
      { method: 'get', url: /products\/\d+/ },
      { body: ProductAMock }
    ).as('getProduct')

    localStorage.setItem('access_token', JSON.stringify(AuthMock.access_token))
    localStorage.setItem('refresh_token', JSON.stringify(AuthMock.refresh_token))
    localStorage.setItem('cart_' + AuthMock.access_token, JSON.stringify([]))
  })

  it('Should fetch product', () => {
    cy.visit('/product/1')
    cy.wait('@getProduct')

    cy.get('.product-title').and('have.text', ProductAMock.title)
  })

  it('Should redirect to login on add to cart if user is not logged in', () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    cy.visit('/product/1')
    cy.wait('@getProduct')

    cy.get('button#add-to-cart-btn').click()

    cy.url().should('include', '/auth/login')
  })

  it('Should add product to cart', () => {
    cy.visit('/product/1')
    cy.wait('@getProduct')

    cy.get('button#add-to-cart-btn').click()
    cy.get('button#cart-btn').click()

    cy.get('.cart-item').and('have.length', 1)
  })

  it('Should remove product from cart', () => {
    cy.visit('/product/1')
    cy.wait('@getProduct')

    cy.get('button#add-to-cart-btn').click()
    cy.get('button#remove-from-cart-btn').click()
    cy.get('button#cart-btn').click()

    cy.get('.cart-item').and('have.length', 0)
  })

})
