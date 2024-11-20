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
    <ion-content :fullscreen="true">
      <div class="healthhub-container">
        <img src="@/assets/healthhub_logo.png" alt="HealthHub Logo" class="healthhub-logo" />
        <ion-button @click="goToHealthHub" expand="block" class="retrieve-button">
          Retrieve prescription(s) from HealthHub SG
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonBackButton, IonButtons } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goToHealthHub() {
  router.push({ name: 'HealthHub' }); // Navigate to the HealthHub route
}
</script>

<style scoped>
.healthhub-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.healthhub-logo {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}

.retrieve-button {
  margin-top: 20px;
}
</style>
