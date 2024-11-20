<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>singpass</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="singpass-content">
      <div class="singpass-container">
        <p class="header-text">Log in with Singpass</p>
        <p class="subheader-text">Your trusted digital identity</p>
        
        <div class="tab-selector">
          <span class="active-tab">Singpass app</span>
          <span class="inactive-tab">Password login</span>
        </div>

        <p class="instruction-text">Tap QR code to log in with Singpass app</p>
        
        <div class="qr-container" @click="simulateLogin">
          <img src="@/assets/qr_code.png" alt="Singpass QR Code" class="qr-code" />
        </div>
        
        <p class="app-link">Don't have Singpass app? <a href="#">Download now</a></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function simulateLogin() {
  alert("Logging in...");
  setTimeout(() => {
    alert("Login successfully!");
    router.push({ name: 'ChooseMed' }); // Navigate to ChooseMed route
  }, 1000); // Wait for 1 second to simulate login process
}
</script>

<style scoped>
.singpass-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full viewport height for vertical centering */
  padding: 20px;
  box-sizing: border-box;
}

.singpass-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.header-text {
  font-weight: bold;
  font-size: 1.2em;
  margin-top: 10px;
}

.subheader-text {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 20px;
}

.tab-selector {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.active-tab {
  font-weight: bold;
  color: #e53935;
  border-bottom: 2px solid #e53935;
  padding-bottom: 5px;
}

.inactive-tab {
  color: #999;
}

.instruction-text {
  font-size: 1em;
  margin-bottom: 15px;
}

.qr-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.qr-code {
  width: 200px;
  height: 200px;
  border: 2px solid #e53935;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}

.app-link {
  font-size: 0.9em;
  color: #1e88e5;
}
</style>
