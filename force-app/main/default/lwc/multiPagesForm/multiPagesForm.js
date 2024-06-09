import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class MultiPagesForm extends LightningElement {
    contactName = ''
    contactBirthdate = ''
    contactCountry = ''
    contactPhone = ''

    handleName(ev){
        this.contactName = (ev.detail.salutation || '') + (ev.detail.firstName || '') + ' ' + (ev.detail.lastName || '')
    }

    handleBirthdate(ev){
        this.contactBirthdate = ev.target.value
    }

    handleCountry(ev){
        this.contactCountry = ev.target.value
    }

    handlePhone(ev){
        this.contactPhone = ev.target.value
    }

    handleSubmit(event) {
        // event.preventDefault()
        console.log('submit', event.detail.fields)
    }

    handleSuccess(event) {
        const payload = event.detail;
        const toast = new ShowToastEvent({
            title: 'Get Help',
            message: 'New Contact ' + payload.fields.LastName.value,
        });
        this.dispatchEvent(toast);
    }
}