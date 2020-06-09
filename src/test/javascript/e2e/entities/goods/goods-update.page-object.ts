import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class GoodsUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('borditApp.goods.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  nameInput: ElementFinder = element(by.css('input#goods-name'));

  priceInput: ElementFinder = element(by.css('input#goods-price'));

  imageInput: ElementFinder = element(by.css('input#file_image'));

  categorySelect = element(by.css('select#goods-category'));
}
