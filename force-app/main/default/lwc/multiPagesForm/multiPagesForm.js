import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MultiPagesForm extends LightningElement {
    contactName = ''
    contactBirthdate = ''
    contactCountry = ''
    contactPhone = ''

    nameExists = false

    currentStep = '1'
    isComplete = false

    isContactCreated = false

    handleStep(ev) {
        this.currentStep = ev.target.value
    }

    handleName(ev) {
        this.contactName = (ev.detail.salutation || '') + (ev.detail.firstName || '') + ' ' + (ev.detail.lastName || '')
        if (ev.detail.lastName === '' || ev.detail.lastName === null) {
            this.nameExists = false
        } else {
            this.nameExists = true
        }
    }

    handleBirthdate(ev) {
        if (new Date(ev.target.value) > new Date() || new Date(ev.target.value) < new Date('1900-01-01')) {
            const toast = new ShowToastEvent({
                title: 'Wrong birthdate value',
                message: "The birthdate you selected is not valid. It has been set to today's date.",
                variant: 'info'
            });
            this.dispatchEvent(toast);
            this.contactBirthdate = new Date().toISOString()
        } else {
            this.contactBirthdate = ev.target.value
        }
    }

    handleCountry(ev) {
        this.contactCountry = ev.target.value
    }


    phoneValidation(ev){
        if(!Number(ev.key) && ev.key !== '0' || ev.target.value.length > 10) {
            ev.preventDefault()
        }
    }

    handlePhone(ev) {
        this.contactPhone = ev.target.value
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const fields = ev.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleSuccess(ev) {
        this.isComplete = true
        this.currentStep = 'complete'
        const payload = ev.detail;
        const toast = new ShowToastEvent({
            title: 'Success',
            message: 'The new contact named '
                + (payload.fields.FirstName.value || '')
                + ' '
                + payload.fields.LastName.value + ' has been added successfuly.',
            variant: 'success'
        });
        this.dispatchEvent(toast);
        this.isContactCreated = true
    }

    handleError(ev) {
        const toast = new ShowToastEvent({
            title: 'Error',
            message: ev.detail.message,
            variant: 'error'
        });
        this.dispatchEvent(toast);
    }
}