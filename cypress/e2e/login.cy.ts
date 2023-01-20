import { AuthMock, UserAMock } from '../../src/app/core/mocks/user.mock'

describe('Login', () => {

  beforeEach(() => {
    cy.intercept(
      { method: 'post', url: /login/ },
      { body: AuthMock }
    ).as('login')
  })

  it('Must be logged out at start', () => {
    cy.visit('/auth/login')
    expect(localStorage.getItem('access_token')).to.be.equal(null)
  })

  it('Must be logged in after login submit', () => {
    cy.visit('/auth/login')

    cy.get('input[type=email]').type(UserAMock.email)
    cy.get('input[type=password]').type(UserAMock.password)
    cy.get('button[type=submit]').click()

    cy.wait('@login').then(() => {
      expect(localStorage.getItem('access_token')).to.be.equal(JSON.stringify(AuthMock.access_token))
      expect(localStorage.getItem('refresh_token')).to.be.equal(JSON.stringify(AuthMock.refresh_token))
    })
  })
})
