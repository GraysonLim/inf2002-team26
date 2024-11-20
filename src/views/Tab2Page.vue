<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Reminder</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" color="light">

      <ion-button expand="block" class="ion-padding-horizontal ion-padding-top" href="/reminder/setReminder">
        Add Reminder
        <ion-icon slot="end" :icon="addCircleOutline"></ion-icon>
      </ion-button>

      <ion-button expand="block" class="ion-padding-horizontal ion-padding-top" href="/reminder/AudiosetReminder">
        Add Reminder (Audio)
        <ion-icon slot="end" :icon="addCircleOutline"></ion-icon>
      </ion-button>

      <h3 class="ion-padding-horizontal">Active Reminders</h3>

      <div v-for="(reminder, index) in reminders" :key="index">
        <reminderCard 
          :medicineName="reminder.name" 
          :medicineSubtitle="reminder.subtitle" 
          :medicineDescription="reminder.description"
          :dose="reminder.dose"
          :frequency="reminder.frequency"
          :time="reminder.time">
        </reminderCard>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { addCircleOutline } from 'ionicons/icons';
import reminderCard from '@/components/reminderCard.vue';

// Sample reminders data
const reminders = [
  { 
    name: 'Aspirin', 
    subtitle: 'Pain Relief', 
    description: 'Used to reduce pain and inflammation.', 
    dose: '500 mg', 
    frequency: 'Daily', 
    time: '08:00 AM' 
  },
  { 
    name: 'Amoxicillin', 
    subtitle: 'Antibiotic', 
    description: 'Used to treat bacterial infections.', 
    dose: '250 mg', 
    frequency: 'Twice a day', 
    time: '09:00 AM and 09:00 PM' 
  },
  { 
    name: 'Metformin', 
    subtitle: 'Diabetes', 
    description: 'Helps control blood sugar levels.', 
    dose: '1000 mg', 
    frequency: 'Daily', 
    time: '10:00 AM' 
  },
  { 
    name: 'Lisinopril', 
    subtitle: 'Blood Pressure', 
    description: 'Used to treat high blood pressure.', 
    dose: '10 mg', 
    frequency: 'Daily', 
    time: '07:00 AM' 
  },
  { 
    name: 'Omeprazole', 
    subtitle: 'Antacid', 
    description: 'Used to treat acid reflux.', 
    dose: '20 mg', 
    frequency: 'Once daily', 
    time: '30 minutes before breakfast' 
  },
  { 
    name: 'Atorvastatin', 
    subtitle: 'Cholesterol', 
    description: 'Helps lower cholesterol levels.', 
    dose: '40 mg', 
    frequency: 'Daily', 
    time: '10:00 PM' 
  },
];
</script>

<style scoped>
  ion-note {
    display: block;
  }
</style>
