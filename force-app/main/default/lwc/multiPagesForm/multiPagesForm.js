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
        this.contactBirthdate = ev.target.value
    }

    handleCountry(ev) {
        this.contactCountry = ev.target.value
    }

    handlePhone(ev) {
        this.contactPhone = ev.target.value
    }

    handleSubmit(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }

    handleSuccess(event) {
        this.isComplete = true
        this.currentStep = 'complete'
        const payload = event.detail;
        const toast = new ShowToastEvent({
            title: 'Get Help',
            message: 'New Contact ' + payload.fields.LastName.value,
            variant: 'success'
        });
        this.dispatchEvent(toast);
    }
}