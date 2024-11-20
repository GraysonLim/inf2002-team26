<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>Refill Medication</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="select-medication-content">
      <div class="medication-container">
        <p class="header-text">Select Medication(s)</p>
        
        <ion-list>
          <ion-item v-for="(medication, index) in medications" :key="index">
            <ion-label>{{ medication }}</ion-label>
            <ion-checkbox slot="end" v-model="selectedMedications[index]"/>
          </ion-item>
        </ion-list>

        <ion-button expand="block" class="next-button" @click="goToNextPage">
          Next
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonCheckbox, IonButton } from '@ionic/vue'; // Import all used Ionic components
import { useRouter } from 'vue-router';

const medications = ["Aspirin", "Ibuprofen", "Paracetamol"];
const selectedMedications = ref(medications.map(() => false));
const router = useRouter();

function goToNextPage() {
  // Logic to go to the next page after selecting medications
  console.log("Next button clicked");
  const selected = medications.filter((_, index) => selectedMedications.value[index]);
  router.push({ name: 'Delivery', query: { medications: JSON.stringify(selected) } });
}
</script>

<style scoped>
.select-medication-content {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

.medication-container {
  max-width: 400px;
  width: 100%;
  margin: auto;
  text-align: left;
}

.header-text {
  font-weight: bold;
  font-size: 1em;
  margin-bottom: 15px;
}

.next-button {
  margin-top: 20px;
  background-color: #3b82f6;
  color: white;
}
</style>
