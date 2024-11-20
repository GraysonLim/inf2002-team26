<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Set Reminder</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" color="light">
      <ion-list :inset="true">
        <ion-item>
          <ion-input 
            v-model="medicationName" 
            label="Medication Name" 
            label-placement="floating" 
            fill="outline" 
            placeholder="Enter text"
            :color="medicationName ? 'primary' : 'danger'">
            <div slot="label">Medication Name <ion-text color="danger">(Required)</ion-text></div>
          </ion-input>
          <ion-button @click="toggleMic" fill="clear" color="primary">
            <ion-icon :icon="isRecording ? mic : micOff"></ion-icon>
            <span v-if="!isRecording">Start</span>
            <span v-if="isRecording">Stop</span>
          </ion-button>
        </ion-item>
        <ion-item v-if="!medicationName && showErrors">
          <ion-text color="danger">Medication Name is required.</ion-text>
        </ion-item>
      </ion-list>

      <ion-list :inset="true">
        <ion-item>
          <ion-select v-model="quantity" label="Quantity" label-placement="floating" fill="outline" interface="popover">
            <ion-select-option value="100">100</ion-select-option>
            <ion-select-option value="200">200</ion-select-option>
            <ion-select-option value="500">500</ion-select-option>
          </ion-select>
          <ion-select v-model="dosage" label="Dosage" label-placement="floating" fill="outline" interface="popover">
            <ion-select-option value="mg">mg</ion-select-option>
            <ion-select-option value="g">g</ion-select-option>
            <ion-select-option value="ml">ml</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <ion-list :inset="true">
        <ion-item>
          <ion-select v-model="frequency" label="Frequency" label-placement="floating" fill="outline" interface="popover">
            <ion-select-option value="daily">Daily</ion-select-option>
            <ion-select-option value="weekly">Weekly</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <ion-list :inset="true">
        <ion-item>
          <ion-datetime-button datetime="datetime"></ion-datetime-button>
          <ion-modal :keep-contents-mounted="true">
            <ion-datetime id="datetime" presentation="time" v-model="selectedDateTime" :format-options="formatOptions"></ion-datetime>
          </ion-modal>
          <ion-button fill="clear" color="primary" @click="addTime" slot="end">
            <ion-icon name="add-circle-outline"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>

      <!-- Display Transcription Result -->
      <ion-item v-if="transcription">
        <ion-label>Your input: {{ transcription }}</ion-label>
      </ion-item>

      <ion-note color="medium" class="ion-margin-horizontal">
        Your comments will be kept anonymous and will only be used to improve the reliability of our products.
      </ion-note>

      <ion-button expand="block" @click="validateAndSave" class="ion-padding-horizontal ion-padding-top">
        Save
      </ion-button>
      <ion-button expand="block" color="medium" @click="cancel" class="ion-padding-horizontal">
        Reset
      </ion-button>

      <!-- Alert for Confirmation -->
      <ion-alert
        :is-open="showConfirm"
        header="Reminder Saved"
        message="Your reminder has been saved successfully."
        :buttons="[{ text: 'OK', handler: () => { showConfirm = false; saveReminder(); router.push('/tabs/tab2'); } }]"
      />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonSelect, IonSelectOption, IonDatetime, IonDatetimeButton, IonModal, IonBackButton, IonAlert, IonText, IonIcon } from '@ionic/vue';
import { mic, micOff } from 'ionicons/icons';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const medicationName = ref('');
const quantity = ref(null);
const dosage = ref(null);
const frequency = ref(null);
const showErrors = ref(false);
const showConfirm = ref(false);
const selectedTimes = ref<string[]>([]); // Array to hold added times
const transcription = ref(''); // Holds the transcription result
const isRecording = ref(false); // Controls mic start/stop state
const selectedDateTime = ref(''); // Holds the datetime value

const formatOptions = {
  time: { hour: '2-digit', minute: '2-digit' },
};

// Mock transcription function to simulate speech-to-text
const toggleMic = () => {
  isRecording.value = !isRecording.value;
  if (!isRecording.value) {
    // Stop recording and set transcription
    transcription.value = "Aspirin 500 mg daily 08:00 AM";
    medicationName.value = "Aspirin";
    quantity.value = "500";
    dosage.value = "mg";
    frequency.value = "daily";
    selectedDateTime.value = "08:00"; // Set datetime to 8:00 AM
  } else {
    // Start recording logic here
    transcription.value = ''; // Clear previous transcription
  }
};

const addTime = () => {
  const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  selectedTimes.value.push(newTime);
};

const validateAndSave = () => {
  showErrors.value = !medicationName.value;
  if (medicationName.value) {
    showConfirm.value = true;
  }
};

const saveReminder = () => {
  console.log('Reminder saved with details:', { medicationName: medicationName.value, quantity: quantity.value, dosage: dosage.value, frequency: frequency.value, selectedDateTime: selectedDateTime.value });
};

const cancel = () => {
  medicationName.value = '';
  quantity.value = null;
  dosage.value = null;
  frequency.value = null;
  selectedTimes.value = [];
  transcription.value = ''; // Clear transcription
  selectedDateTime.value = ''; // Clear datetime
};
</script>

<style scoped>
ion-note {
  display: block;
}
</style>
