import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class OrderPointUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('borditApp.orderPoint.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  numberInput: ElementFinder = element(by.css('input#order-point-number'));

  goodsSelect = element(by.css('select#order-point-goods'));

  ordersSelect = element(by.css('select#order-point-orders'));
}
