<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="/tabs/tab3"></ion-back-button>
        </ion-buttons>
        <ion-title>History Details</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <!-- Display Date -->
      <div class="date-display">
        <p>09 October 2024, Thursday</p>
      </div>

      <!-- Medication Detail Card -->
      <ion-card class="medication-detail-card">
        <ion-card-header>
          <ion-card-title>
            <ion-icon name="alarm-outline"></ion-icon> 08:00 AM
          </ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <!-- Medication Name and Dosage -->
          <div class="medication-info">
            <p class="med-name">Paracetamol, 500mg</p>
            <ion-icon :icon="checkmarkCircle" color="success"></ion-icon>
          </div>

          <!-- Quantity Taken and Actual Time -->
          <p><strong>Qty Taken:</strong> 2</p>
          <p><strong>Actual Time Taken:</strong> 08:05 AM</p>

          <!-- Additional Information -->
          <div class="info-section">
            <p><strong>Information:</strong></p>
            <ul>
              <li>For pain relief</li>
              <li>May be taken with / without food</li>
            </ul>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButtons, IonBackButton } from '@ionic/vue';
import { checkmarkCircle } from 'ionicons/icons';
</script>

<style scoped>
.date-display {
  text-align: center;
  font-size: 1.1em;
  margin-top: 16px;
  color: #666;
}

.medication-detail-card {
  margin-top: 20px;
  padding: 16px;
}

.medication-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.med-name {
  font-weight: bold;
  font-size: 1.2em;
}

.info-section {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
}

.info-section p {
  margin: 0;
  font-weight: bold;
}

.info-section ul {
  margin: 5px 0 0 15px;
}

ion-icon {
  font-size: 1.2em;
  color: #4caf50;
}
</style>