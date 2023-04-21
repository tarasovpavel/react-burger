describe('Открытие модалки с ингредиентом, проверка его содержимого и закрытие', () => {
    before(() => {
      cy.visit('http://localhost:3000');
	  cy.contains('Соберите бургер');
    });

  
    it('Открытие, Проверка содержимого,  Закрытие модального окна', () => {
		cy.get('div').contains('Краторная булка N-200i').click();
		cy.get('[id="modal"]').should('exist');
		cy.get('[id="modal"]').as('ingredientModal');
		 
		 cy.get('@ingredientModal').get('div').contains('Детали ингредиента');
		 cy.get('@ingredientModal').get('[src="https://code.s3.yandex.net/react/code/bun-02-large.png"]');
		 cy.get('[data-test="data-ingredient-calories"]').should('contain.text', '420'); 
		 cy.get('[data-test="data-ingredient-name"]').should('contain.text', 'Краторная булка N-200i'); 
		 cy.get('[data-test="data-ingredient-proteins"]').should('contain.text', '80'); 
		  cy.get('[data-test="data-ingredient-fat"]').should('contain.text', '24'); 
		  cy.get('[data-test="data-ingredient-carbohydrates"]').should('contain.text', '53');  
		 
		cy.get('[data-test="close-icon"]')
         .find('svg')
		  .click();
		  
		 
    });

   

  });
  