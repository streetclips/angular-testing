import { CategoriesMock } from '../../src/app/core/mocks/category.mock'
import { AuthMock } from '../../src/app/core/mocks/user.mock'
import { CartMock } from '../../src/app/core/mocks/shopping-cart.mock'
import { PaymentMethodMock } from '../../src/app/core/mocks/payment-method.mock'

describe('Search', () => {

  beforeEach(() => {
    cy.intercept(
      { method: 'get', url: /categories/ },
      { body: CategoriesMock }
    ).as('getCategory')

    localStorage.setItem('access_token', JSON.stringify(AuthMock.access_token))
    localStorage.setItem('refresh_token', JSON.stringify(AuthMock.refresh_token))
    localStorage.setItem('cart_' + AuthMock.access_token, JSON.stringify(CartMock))
  })

  it('Should show error on invalid payment info', () => {
    cy.visit('/checkout/payment')

    cy.get('input[name=cardNumber]').type('invalid')
    cy.get('select[name=expirationMonth]').select(PaymentMethodMock.expirationMonth.toString())
    cy.get('select[name=expirationYear]').select(PaymentMethodMock.expirationYear.toString())
    cy.get('input[name=cvv]').type(PaymentMethodMock.cvv)

    cy.get('button#pay-btn').click()

    cy.get('app-alert').and('exist')
  })

  it('Should redirect to success page on valid payment info', () => {
    cy.visit('/checkout/payment')

    cy.get('input[name=cardNumber]').type(PaymentMethodMock.cardNumber)
    cy.get('select[name=expirationMonth]').select(PaymentMethodMock.expirationMonth.toString())
    cy.get('select[name=expirationYear]').select(PaymentMethodMock.expirationYear.toString())
    cy.get('input[name=cvv]').type(PaymentMethodMock.cvv)

    cy.get('button#pay-btn').click()

    cy.url().should('include', '/checkout/success')
  })
})
