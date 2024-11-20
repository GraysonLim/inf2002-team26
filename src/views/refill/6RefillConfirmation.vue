<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button defaultHref="/home"></ion-back-button>
                </ion-buttons>
                <ion-title>Confirmation</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div class="confirmation-container">
                <ion-icon name="checkmark-circle" class="confirmation-icon"></ion-icon>
                <h2 class="confirmation-title">Your request has been submitted</h2>
                <p class="confirmation-message">
                    Please wait 1-2 working day(s) for your request to be approved by our medical staff.
                </p>
                <p class="confirmation-message">
                    Payment will be billed after approval.
                </p>
                
                <ion-button expand="block" color="success" @click="goToHome">OK</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonCheckbox, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => {
    // Navigate back to the Home page
    router.push('/tabs/tab1');
};
</script>

<style scoped>
.confirmation-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
}

.confirmation-icon {
    font-size: 72px;
    color: #4CAF50; /* Green color */
    margin-bottom: 20px;
}

.confirmation-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 10px;
}

.confirmation-message {
    font-size: 1rem;
    color: #666;
    margin-bottom: 10px;
}
</style>
