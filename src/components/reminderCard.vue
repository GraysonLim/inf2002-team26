<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ medicineName }}</ion-card-title>
            <ion-card-subtitle>{{ medicineSubtitle }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
            <p><strong>Dosage:</strong> {{ dose }}</p>
            <p><strong>Frequency:</strong> {{ frequency }}</p>
            <p><strong>Time:</strong> {{ time }}</p>
            <p>{{ medicineDescription }}</p>
        </ion-card-content>

        <div class="button-container">
            <ion-button fill="clear" color="warning" @click="goToEdit">Edit</ion-button>
            <ion-button fill="clear" color="danger" @click="showAlert = true">Delete</ion-button>
        </div>

        <ion-alert
            :is-open="showAlert"
            header="Delete this reminder?"
            :buttons="alertButtons"
        ></ion-alert>
    </ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonAlert } from '@ionic/vue';
import { defineComponent, markRaw, ref } from 'vue';
import SetReminder from '@/views/reminder/SetReminder.vue';
import { useRouter } from 'vue-router'; // Import useRouter

export default defineComponent({
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton, IonAlert },
    props: {
        medicineName: { type: String, required: true },
        medicineSubtitle: { type: String, required: true },
        medicineDescription: { type: String, required: true },
        dose: { type: String, required: true },
        frequency: { type: String, required: true },
        time: { type: String, required: true },
    },
    setup() {
        const router = useRouter(); // Initialize the router
        const showAlert = ref(false); // Reactive property for alert visibility

        const alertButtons = [
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Alert canceled');
                    showAlert.value = false; // Hide alert on cancel
                },
            },
            {
                text: 'OK',
                role: 'confirm',
                handler: () => {
                    console.log('Alert confirmed');
                    // Add your delete logic here
                    showAlert.value = false; // Hide alert after confirmation
                },
            },
        ];

        const goToEdit = () => {
            router.push('/reminder/editReminder');
        };

        return {
            showAlert,
            alertButtons,
            goToEdit,
            component: markRaw(SetReminder),
        };
    },
});
</script>

<style scoped>
.button-container {
    display: flex;
    justify-content: flex-end; /* Align buttons to the right */
    margin-top: 10px; /* Add space above the buttons */
}
</style>
