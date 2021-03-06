describe('Visitor can view on the landing page', () => {

  it('a list of articles successfully', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles',
      response: 'fixture:list_of_articles.json',
      status: 200
    })
    cy.visit('http://localhost:3001')

    let articles = [
      ["#36", "#title_36", "#ingress_36", "#photo_36"],
      ["#37", "#title_37", "#ingress_37", "#photo_37"],
      ["#38", "#title_38", "#ingress_38", "#photo_38"]
    ]

    articles.forEach(article => {
      cy.get(article[0]).within(() => {
        cy.get(article[1]), (article[2])
        cy.get(article[3]).should('have.attr', 'src')
      })
    })
  })

  it('a relevant message if there are no articles in the API database', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:3002/api/v1/articles',
      response: 'fixture:no_list_of_articles.json',
      status: 200
    })
    cy.visit('http://localhost:3001')
    cy.contains('There are no articles at the moment. You can be the first to post your own article and become a neighborhood journalist!')
  })
})
