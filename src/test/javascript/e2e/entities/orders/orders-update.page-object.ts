import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class OrdersUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('borditApp.orders.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  dateInput: ElementFinder = element(by.css('input#orders-date'));

  clientSelect = element(by.css('select#orders-client'));
}
