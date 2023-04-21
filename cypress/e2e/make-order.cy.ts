describe('Создание заказа', () => {    
	before(() => {
      cy.visit('http://localhost:3000/react-burger');
	  cy.contains('Соберите бургер');
    });
	
	it('Сборка и оформлениезаказа', () => {
		cy.get('div').contains('Краторная булка N-200i').trigger('dragstart');
		cy.get('[data-test="constructor"]')  
          .trigger('drop');
		cy.get('div').contains('Биокотлета из марсианской Магнолии').trigger('dragstart');
        cy.get('[data-test="constructor-main-sauce"]')   
          .trigger('drop')  ;
		cy.get('div').contains('Соус традиционный галактический').trigger('dragstart');
        cy.get('[data-test="constructor-main-sauce"]')
          .trigger('drop');

		// Переход на страницу авторизации
        cy.get('[data-test="get-order"]').click();
		cy.location().should((loc) => expect(loc.pathname).to.eq('/react-burger/login'));
		
		// Заполнение данных на странице авторизации
		 cy.get('[data-test="email"]').type('reactburger@yandex.ru');
		 cy.get('[data-test="password"]').type('qwe_123');
		 cy.get('[data-test="enter"]').click();
		 cy.wait(500);
		 cy.location().should((loc) => expect(loc.pathname).to.eq('/react-burger'));
		 
		 //Оформлени езаказа
		 cy.get('[data-test="get-order"]').click();
		 cy.get('[data-test="modal"]', { timeout: 25000 }).should('exist');
		 cy.get('[id="modal"]').should('exist');
    });
	
  
	
});
