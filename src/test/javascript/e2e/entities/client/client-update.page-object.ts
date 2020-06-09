import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ClientUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('borditApp.client.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  firstNameInput: ElementFinder = element(by.css('input#client-firstName'));

  patronimInput: ElementFinder = element(by.css('input#client-patronim'));

  lastNameInput: ElementFinder = element(by.css('input#client-lastName'));

  ageInput: ElementFinder = element(by.css('input#client-age'));

  emailInput: ElementFinder = element(by.css('input#client-email'));

  photoInput: ElementFinder = element(by.css('input#file_photo'));
}
