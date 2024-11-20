<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Edit Reminder</ion-title> <!-- Updated title -->
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
            <ion-select-option value="c">c</ion-select-option>
            <ion-select-option value="tbsp">tbsp</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <ion-list :inset="true">
        <ion-item>
          <ion-select v-model="frequency" label="Frequency" label-placement="floating" fill="outline" interface="popover">
            <ion-select-option value="daily">Daily</ion-select-option>
            <ion-select-option value="weekly">Weekly</ion-select-option>
            <ion-select-option value="one-time">One-Time</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>

      <ion-list :inset="true">
        <ion-item>
          <ion-datetime-button datetime="datetime"></ion-datetime-button>
          <ion-modal :keep-contents-mounted="true">
            <ion-datetime id="datetime" presentation="time" :format-options="formatOptions" :value="time"></ion-datetime>
          </ion-modal>
          <ion-button fill="clear" color="primary" @click="addTime" slot="end">
            <ion-icon name="add-circle-outline"></ion-icon>
          </ion-button>
        </ion-item>
      </ion-list>

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
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonSelect, IonSelectOption, IonDatetime, IonDatetimeButton, IonModal, IonBackButton, IonAlert, IonText } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Import useRouter
const router = useRouter(); // Initialize the router

const medicationName = ref('Aspirin'); // Default value
const quantity = ref('500'); // Default quantity
const dosage = ref('mg'); // Default dosage
const frequency = ref('daily'); // Default frequency
const time = ref('2024-11-05T08:00'); // Default time for 8 AM
const showErrors = ref(false);
const showConfirm = ref(false);
const selectedTimes = ref<string[]>([]); // Array to hold added times

const formatOptions = {
  date: {
    weekday: 'short',
    month: 'long',
    day: '2-digit',
  },
  time: {
    hour: '2-digit',
    minute: '2-digit',
  },
};

// Function to add time to the list
const addTime = () => {
  const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  selectedTimes.value.push(newTime);
  console.log('Added time:', newTime); // Log the added time
};

const validateAndSave = () => {
  showErrors.value = !medicationName.value;
  if (medicationName.value) {
    showConfirm.value = true;
  }
};

const saveReminder = () => {
  // Perform save logic here
  console.log('Reminder saved with details:', { medicationName: medicationName.value, quantity: quantity.value, dosage: dosage.value, frequency: frequency.value, selectedTimes: selectedTimes.value });
};

const cancel = () => {
  // Reset to default values
  medicationName.value = '';
  quantity.value = 500; // Reset to default quantity
  dosage.value = 'mg'; // Reset to default dosage
  frequency.value = 'daily'; // Reset to default frequency
  selectedTimes.value = []; // Clear the times
};

</script>

<style scoped>
ion-note {
  display: block;
}
</style>
