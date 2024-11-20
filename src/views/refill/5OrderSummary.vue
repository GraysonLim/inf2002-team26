<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/refill/Delivery"></ion-back-button>
                </ion-buttons>
                <ion-title>Order Summary</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <!-- Patient's Details -->
            <ion-card>
                <ion-card-content>
                    <ion-label class="label-title">Patient's Details:</ion-label>
                    <p class="details-text"><strong>{{ patientName }}</strong></p>
                    <p class="details-text"><strong>{{ patientID }}</strong></p>
                </ion-card-content>
            </ion-card>

            <!-- Selected Medications -->
            <ion-card>
                <ion-card-content>
                    <ion-label class="label-title">Selected Medication(s) to Refill:</ion-label>
                    <p class="details-text"><strong>{{ medications.join(', ') }}</strong></p>
                </ion-card-content>
            </ion-card>

            <!-- Selected Date of Delivery -->
            <ion-card>
                <ion-card-content>
                    <ion-label class="label-title">Selected Date of Delivery:</ion-label>
                    <p class="details-text"><strong>{{ selectedDate }}</strong></p>
                </ion-card-content>
            </ion-card>

            <!-- Selected Timeslot -->
            <ion-card>
                <ion-card-content>
                    <ion-label class="label-title">Selected Timeslot:</ion-label>
                    <p class="details-text"><strong>{{ selectedTimeslot }}</strong></p>
                </ion-card-content>
            </ion-card>

            <!-- Delivery Address -->
            <ion-card>
                <ion-card-content>
                    <ion-label class="label-title">Delivery Address:</ion-label>
                    <p class="details-text"><strong>{{ address }}</strong></p>
                    <p class="details-text"><strong>{{ unitNo }}</strong></p>
                    <p class="details-text"><strong>{{ postalCode }}</strong></p>
                </ion-card-content>
            </ion-card>

            <!-- Confirm Button -->
            <ion-button expand="block" color="primary" @click="confirmOrder">Confirm</ion-button>
        </ion-content>

        <!-- Confirmation Popup -->
        <ion-alert
            :is-open="showConfirmation"
            header="Confirm Order"
            message="Would you like to confirm your order of medication refill?"
            :buttons=alertButtons
        ></ion-alert>
    </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonCheckbox, IonButton } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';

// Using useRoute to retrieve query parameters
const route = useRoute();
const router = useRouter();

const medications = JSON.parse(route.query.medications || '[]');
const selectedDate = route.query.selectedDate || '';
const selectedTimeslot = route.query.selectedTimeslot || '';
const address = route.query.address || '';
const unitNo = route.query.unitNo || '';
const postalCode = route.query.postalCode || '';

// Mock patient details for display
const patientName = "John Doe";
const patientID = "S123467A";

const showConfirmation = ref(false);

const confirmOrder = () => {
    // Show confirmation popup
    showConfirmation.value = true;
};

const alertButtons = [
    {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
            showConfirmation.value = false;
        }
    },
    {
        text: 'OK',
        handler: () => {
            showConfirmation.value = false;
            goToNextPage();
        }
    }
];

const goToNextPage = () => {
    // Navigate to the next page or perform any actions after confirmation
    router.push({name: 'RefillConfirm'});
};
</script>

<style scoped>
.label-title {
    font-size: 1rem;
    color: #333;
    margin-bottom: 8px;
}

.details-text {
    font-size: 1.1rem;
    color: #333;
    margin: 4px 0;
}
</style>