<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>History</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div class="date-picker">
        <ion-grid>
          <ion-row>
            <ion-col v-for="(day, index) in days" :key="index" class="day-cell">
              <div
                :class="{ selected: selectedDate === day.date }"
                @click="selectDate(day.date)"
              >
                <p>{{ day.day }}</p>
                <p>{{ day.date }}</p>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <div v-if="selectedDate === 9" class="summary">
        <p>Dose(s) Taken: <span>{{ dosesTaken }}</span></p>
        <p>Dose(s) Missed: <span>{{ dosesMissed }}</span></p>
      </div>

      <div v-if="selectedDate === 9" class="history-list">
        <!-- First Card (Clickable) -->
        <ion-card class="history-card" @click="goToHistoryDetail">
          <ion-card-content>
            <p class="time">{{ history[0].time }}</p>
            <div v-for="(med, idx) in history[0].medications" :key="idx" class="medication">
              <p class="med-name">{{ med.name }}, {{ med.dosage }}</p>
              <ion-icon :icon="med.taken ? checkmarkCircle : closeCircle" :color="med.taken ? 'success' : 'danger'"></ion-icon>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Remaining Cards (Non-clickable) -->
        <ion-card v-for="(historyItem, index) in history.slice(1)" :key="index + 1" class="history-card">
          <ion-card-content>
            <p class="time">{{ historyItem.time }}</p>
            <div v-for="(med, idx) in historyItem.medications" :key="idx" class="medication">
              <p class="med-name">{{ med.name }}, {{ med.dosage }}</p>
              <ion-icon :icon="med.taken ? checkmarkCircle : closeCircle" :color="med.taken ? 'success' : 'danger'"></ion-icon>
            </div>
          </ion-card-content>
        </ion-card>
      </div>

      <!-- Show "No History Found" message for dates other than 9 -->
      <div v-else class="no-history">
        <p>No History Found.</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonButton } from '@ionic/vue';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

const days = [
  { day: 'MON', date: 6 },
  { day: 'TUE', date: 7 },
  { day: 'WED', date: 8 },
  { day: 'THU', date: 9 },
  { day: 'FRI', date: 10 },
];

const selectedDate = ref<number | null>(null);
const dosesTaken = 4;
const dosesMissed = 1;

const history = [
  {
    time: '08:00 AM',
    medications: [
      { name: 'Paracetamol', dosage: '500mg', taken: true },
    ],
  },
  {
    time: '02:00 PM',
    medications: [
      { name: 'Paracetamol', dosage: '500mg', taken: false },
      { name: 'Aspirin', dosage: '100mg', taken: true },
    ],
  },
  {
    time: '08:00 PM',
    medications: [
      { name: 'Paracetamol', dosage: '500mg', taken: true },
      { name: 'Aspirin', dosage: '100mg', taken: true },
    ],
  },
];

const router = useRouter();

function selectDate(date: number) {
  selectedDate.value = date;
}

function goToHistoryDetail() {
  router.push('/history/HistoryDetail');
}
</script>

<style scoped>
.date-picker {
  padding: 16px;
}

.day-cell {
  text-align: center;
  cursor: pointer;
}

.day-cell .selected {
  font-weight: bold;
  color: #000;
}

.summary {
  padding: 16px;
  text-align: center;
  background-color: #f8f8f8;
  border-radius: 8px;
  margin: 16px;
}

.history-list {
  padding: 16px;
}

.history-card {
  margin-bottom: 16px;
   cursor: pointer;
}

.time {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 5px;
}

.medication {
  display: flex;
  align-items: center;
  margin-top: 5px;
}

.med-name {
  flex: 1;
  font-weight: bold;
}

ion-icon {
  font-size: 1.2em;
}

.no-history {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  color: #666;
  font-size: 1.2em;
  font-weight: bold;
}
</style>