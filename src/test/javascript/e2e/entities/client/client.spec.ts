/* tslint:disable no-unused-expression */
import { browser } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import ClientComponentsPage, { ClientDeleteDialog } from './client.page-object';
import ClientUpdatePage from './client-update.page-object';
import ClientDetailsPage from './client-details.page-object';

import {
  clear,
  click,
  getRecordsCount,
  isVisible,
  selectLastOption,
  waitUntilAllDisplayed,
  waitUntilAnyDisplayed,
  waitUntilCount,
  waitUntilDisplayed,
  waitUntilHidden,
} from '../../util/utils';

import path from 'path';

const expect = chai.expect;

describe('Client e2e test', () => {
  let navBarPage: NavBarPage;
  let updatePage: ClientUpdatePage;
  let detailsPage: ClientDetailsPage;
  let listPage: ClientComponentsPage;
  let deleteDialog: ClientDeleteDialog;
  const fileToUpload = '../../../../../main/webapp/content/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);
  let beforeRecordsCount = 0;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    await navBarPage.login('admin', 'admin');
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });

  it('should load Clients', async () => {
    await navBarPage.getEntityPage('client');
    listPage = new ClientComponentsPage();

    await waitUntilAllDisplayed([listPage.title, listPage.footer]);

    expect(await listPage.title.getText()).not.to.be.empty;
    expect(await listPage.createButton.isEnabled()).to.be.true;

    await waitUntilAnyDisplayed([listPage.noRecords, listPage.table]);
    beforeRecordsCount = (await isVisible(listPage.noRecords)) ? 0 : await getRecordsCount(listPage.table);
  });
  describe('Create flow', () => {
    it('should load create Client page', async () => {
      await listPage.createButton.click();
      updatePage = new ClientUpdatePage();

      await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

      expect(await updatePage.title.getText()).to.match(/Create or edit a Client/);
    });

    it('should create and save Clients', async () => {
      await updatePage.firstNameInput.sendKeys('firstName');
      expect(await updatePage.firstNameInput.getAttribute('value')).to.match(/firstName/);

      await updatePage.patronimInput.sendKeys('patronim');
      expect(await updatePage.patronimInput.getAttribute('value')).to.match(/patronim/);

      await updatePage.lastNameInput.sendKeys('lastName');
      expect(await updatePage.lastNameInput.getAttribute('value')).to.match(/lastName/);

      await updatePage.ageInput.sendKeys('5');
      expect(await updatePage.ageInput.getAttribute('value')).to.eq('5');

      await updatePage.emailInput.sendKeys('email');
      expect(await updatePage.emailInput.getAttribute('value')).to.match(/email/);

      await waitUntilDisplayed(updatePage.photoInput);
      await updatePage.photoInput.sendKeys(absolutePath);

      expect(await updatePage.saveButton.isEnabled()).to.be.true;
      await updatePage.saveButton.click();

      await waitUntilHidden(updatePage.saveButton);
      expect(await isVisible(updatePage.saveButton)).to.be.false;

      await waitUntilDisplayed(listPage.successAlert);
      expect(await listPage.successAlert.isDisplayed()).to.be.true;

      await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      expect(await listPage.records.count()).to.eq(beforeRecordsCount + 1);
    });

    describe('Details, Update, Delete flow', () => {
      after(async () => {
        const deleteButton = listPage.getDeleteButton(listPage.records.last());
        await click(deleteButton);

        deleteDialog = new ClientDeleteDialog();
        await waitUntilDisplayed(deleteDialog.dialog);

        expect(await deleteDialog.title.getAttribute('id')).to.match(/borditApp.client.delete.question/);

        await click(deleteDialog.confirmButton);
        await waitUntilHidden(deleteDialog.dialog);

        expect(await isVisible(deleteDialog.dialog)).to.be.false;
        expect(await listPage.dangerAlert.isDisplayed()).to.be.true;

        await waitUntilCount(listPage.records, beforeRecordsCount);
        expect(await listPage.records.count()).to.eq(beforeRecordsCount);
      });

      it('should load details Client page and fetch data', async () => {
        const detailsButton = listPage.getDetailsButton(listPage.records.last());
        await click(detailsButton);

        detailsPage = new ClientDetailsPage();

        await waitUntilAllDisplayed([detailsPage.title, detailsPage.backButton, detailsPage.firstDetail]);

        expect(await detailsPage.title.getText()).not.to.be.empty;
        expect(await detailsPage.firstDetail.getText()).not.to.be.empty;

        await click(detailsPage.backButton);
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });

      it('should load edit Client page, fetch data and update', async () => {
        const editButton = listPage.getEditButton(listPage.records.last());
        await click(editButton);

        await waitUntilAllDisplayed([updatePage.title, updatePage.footer, updatePage.saveButton]);

        expect(await updatePage.title.getText()).not.to.be.empty;

        await updatePage.firstNameInput.clear();
        await updatePage.firstNameInput.sendKeys('modified');
        expect(await updatePage.firstNameInput.getAttribute('value')).to.match(/modified/);

        await updatePage.patronimInput.clear();
        await updatePage.patronimInput.sendKeys('modified');
        expect(await updatePage.patronimInput.getAttribute('value')).to.match(/modified/);

        await updatePage.lastNameInput.clear();
        await updatePage.lastNameInput.sendKeys('modified');
        expect(await updatePage.lastNameInput.getAttribute('value')).to.match(/modified/);

        await clear(updatePage.ageInput);
        await updatePage.ageInput.sendKeys('6');
        expect(await updatePage.ageInput.getAttribute('value')).to.eq('6');

        await updatePage.emailInput.clear();
        await updatePage.emailInput.sendKeys('modified');
        expect(await updatePage.emailInput.getAttribute('value')).to.match(/modified/);

        await updatePage.saveButton.click();

        await waitUntilHidden(updatePage.saveButton);

        expect(await isVisible(updatePage.saveButton)).to.be.false;
        expect(await listPage.infoAlert.isDisplayed()).to.be.true;
        await waitUntilCount(listPage.records, beforeRecordsCount + 1);
      });
    });
  });
});
