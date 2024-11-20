<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/tab1"></ion-back-button>
        </ion-buttons>
        <ion-title>Instructions</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="content">
      <!-- Greeting Section -->
      <div class="greeting">
        <p>Hello Mr John Doe, please take your medications scheduled for 02:00PM</p>
      </div>

     <!-- Static Voice Instructions Display with Imported Speaker Icon -->
      <div class="voice-instructions">
        <ion-icon :icon="volumeMedium" class="speaker-icon"></ion-icon>
        <p>Voice Instructions</p>
      </div>

      <!-- Medications List -->
      <div v-for="(medication, index) in medications" :key="index" class="medication-card">
        <div class="medication-info">
          <div class="med-header">
            <!-- Medication name and dosage on the left -->
            <p class="med-name">{{ medication.name }}, {{ medication.dosage }}</p>
            <!-- Display medication image on the right -->
            <img
              v-if="medication.image"
              :src="medication.image"
              alt="Medication image"
              class="med-image"
            />
          </div>
          <div class="instructions">
            <p><strong>Instructions:</strong></p>
            <ul>
              <li v-for="(instruction, idx) in medication.instructions" :key="idx">{{ instruction }}</li>
            </ul>
          </div>
        </div>
        <!-- Action Buttons or Status Display -->
        <div v-if="!medication.status" class="actions">
          <ion-button color="success" @click="confirmAction('take', medication)">Take</ion-button>
          <ion-button color="danger" @click="confirmAction('skip', medication)">Skip</ion-button>
        </div>
        <div v-else :class="['status-display', medication.status === 'Taken' ? 'taken' : 'skipped']">
          <ion-icon :icon="medication.status === 'Taken' ? checkmarkCircle : closeCircle"></ion-icon>
          <span>{{ medication.status }}</span>
        </div>
      </div>

      <!-- Confirmation Alert -->
      <ion-alert
        :is-open="showAlert"
        :header="alertHeader"
        message="Are you sure you want to proceed?"
        :buttons="[ 
          { text: 'Cancel', role: 'cancel', handler: () => (showAlert = false) },
          { text: 'Yes', handler: () => performAction() }
        ]"
      ></ion-alert>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonToggle, IonIcon, IonButton } from '@ionic/vue';
import { volumeMedium, checkmarkCircle, closeCircle } from 'ionicons/icons';

// Sample medication data
const medications = [
  {
    name: 'Paracetamol',
    dosage: '500mg',
    instructions: ['Take 2 dose(s)', 'May be taken with / without food'],
    image: '/paracetamol.jpeg',
    status: null // Track the status (Taken, Skipped, or null)
  },
  {
    name: 'Aspirin',
    dosage: '100mg',
    instructions: ['Take 2 dose(s)', 'Take after food'],
    image: '/aspirin.png',
    status: null
  }
];

// Alert state and handler functions
const showAlert = ref(false);
const alertHeader = ref('');
let actionType = '';
let selectedMedication = null;

function confirmAction(action: string, medication) {
  actionType = action;
  selectedMedication = medication;
  alertHeader.value = action === 'take' ? 'Confirm Take' : 'Confirm Skip';
  showAlert.value = true;
}

function performAction() {
  if (actionType === 'take') {
    markAsTaken(selectedMedication);
  } else if (actionType === 'skip') {
    markAsSkipped(selectedMedication);
  }
  showAlert.value = false;
}

function markAsTaken(medication) {
  medication.status = 'Taken';
}

function markAsSkipped(medication) {
  medication.status = 'Skipped';
}
</script>

<style scoped>
.content {
  padding: 16px;
}

.greeting {
  font-size: 1.1em;
  margin-bottom: 20px;
  text-align: center;
}

.voice-instructions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
}

.icon {
  font-size: 1.5em;
}

.medication-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.medication-info {
  margin-bottom: 10px;
}

.med-header {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Pushes image to the right */
}

.med-image {
  width: 104px; /* Size for the image */
  height: 104px;
  border-radius: 4px;
}

.med-name {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 5px;
}

.instructions ul {
  padding-left: 20px;
  margin: 0;
}

.actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
</style>
