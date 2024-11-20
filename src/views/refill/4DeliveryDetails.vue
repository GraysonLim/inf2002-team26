<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/refill/choose-med"></ion-back-button>
                </ion-buttons>
                <ion-title>Refill Delivery</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <form @submit.prevent="handleFormSubmit">
                <ion-card>
                    <ion-card-content>
                        <ion-card class="medication-box">
                        <ion-card-content class="medication-container">
                            <p class="custom-label"><strong>Selected Medication(s) to Refill:</strong></p>
                            <p class="medication-list">{{ selectedMedications.join(', ') }}</p>
                        </ion-card-content>
                        </ion-card>
                        
                        <ion-card>
                        <ion-item class="date-display" lines="none">
                            <p v-if="selectedDateText" class="selected-date-text">Selected Date: {{ selectedDateText }}</p>
                        </ion-item>

                        <ion-item lines="none">
                            <ion-label position="stacked">Select Date of Delivery</ion-label>
                            <ion-datetime
                            display-format="DD MMMM YYYY"
                            placeholder="Select Date"
                            :value="selectedDate"
                            @ionChange="updateSelectedDate"
                            :min="minDate"
                            presentation="date"
                            required
                            ></ion-datetime>
                        </ion-item>
                        </ion-card>
                        
                        <ion-item>
                        <ion-label position="stacked">Select Preferred Timeslot</ion-label>
                        <ion-select 
                            :value="selectedTimeslot"
                            @ionChange="(e) => selectedTimeslot = e.detail.value"
                            required
                        >
                            <ion-select-option value="08:00AM - 12:00PM">08:00AM - 12:00PM</ion-select-option>
                            <ion-select-option value="12:00PM - 04:00PM">12:00PM - 04:00PM</ion-select-option>
                            <ion-select-option value="04:00PM - 08:00PM">04:00PM - 08:00PM</ion-select-option>
                        </ion-select>
                        </ion-item>

                        <ion-item>
                        <ion-label position="stacked">Delivery Address</ion-label>
                        <ion-input
                            placeholder="Address"
                            :value="address"
                            @ionChange="e => address = e.detail.value"
                            required
                        ></ion-input>
                        <p v-if="errors.address" class="error">{{ errors.address }}</p>

                        <ion-input
                            placeholder="Unit No."
                            :value="unitNo"
                            @ionChange="e => unitNo = e.detail.value"
                            required
                        ></ion-input>
                        <p v-if="errors.unitNo" class="error">{{ errors.unitNo }}</p>

                        <ion-input
                            placeholder="Postal Code"
                            :value="postalCode"
                            @ionChange="e => postalCode = e.detail.value"
                            required
                        ></ion-input>
                        <p v-if="errors.postalCode" class="error">{{ errors.postalCode }}</p>
                        </ion-item>

                        <ion-button expand="block" type="submit">View Summary</ion-button>
                    </ion-card-content>
                </ion-card>
            </form>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonCheckbox, IonButton } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const selectedMedications = ref<string[]>(JSON.parse(route.query.medications as string || '[]'));

// Calculate tomorrow's date in the format YYYY-MM-DD
const today = new Date();
today.setDate(today.getDate() + 1); // Move to tomorrow
const minDate = today.toISOString().split('T')[0]; // Get YYYY-MM-DD format

const selectedDate = ref('');
const selectedDateText = ref('');

const selectedTimeslot = ref('');
const address = ref('');
const unitNo = ref('');
const postalCode = ref('');
const errors = ref({});
const formSubmitted = ref(false);

// Update the displayed date text when the date is selected
const updateSelectedDate = (event: CustomEvent) => {
    const date = event.detail.value;
    if (date) {
        selectedDate.value = date.split('T')[0]; // Update selectedDate with the chosen date
        selectedDateText.value = new Date(date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
};

const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedDate.value) {
        newErrors.date = 'Please select a delivery date';
    }
    if (!selectedTimeslot.value) {
        newErrors.timeslot = 'Please select a delivery timeslot';
    }
    if (!address.value) {
        newErrors.address = 'Please enter your delivery address';
    }
    if (!unitNo.value) {
        newErrors.unitNo = 'Please enter your unit number';
    }
    if (!postalCode.value) {
        newErrors.postalCode = 'Please enter your postal code';
    }

    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
};

const handleFormSubmit = () => {
    console.log("Selected Date: ", selectedDate.value);
    console.log("Selected Timeslot: ", selectedTimeslot.value);
    console.log("Address: ", address.value);
    console.log("Unit No: ", unitNo.value);
    console.log("Postal Code: ", postalCode.value);

    if (validateForm()) {
        router.push({
            name: 'OrderSummary',
            query: {
                medications: JSON.stringify(selectedMedications.value),
                selectedDate: selectedDate.value,
                selectedTimeslot: selectedTimeslot.value,
                address: address.value,
                unitNo: unitNo.value,
                postalCode: postalCode.value,
            },
        });
    }
};

</script>

<style scoped>
.medication-box {
    background-color: #e0e0e0;
    border-radius: 8px;
    margin: 0;
    padding: 5px;
    width: 100%;
    box-shadow: none;
}

.medication-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.custom-label {
    color: #333;
    font-size: 1em;
}

.medication-list {
    margin-top: 5px;
    color: #333;
    font-size: 1em;
}

.selected-date-text {
  font-size: 1em;
  color: #333;
  margin-bottom: 10px;
  font-weight: bold;
}

.error {
    color: red;
    font-size: 0.9em;
}
</style>
