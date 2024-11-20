<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="title-toolbar">
        <!-- 24-Hour Clock Display -->
        <div class="clock-display">{{ formattedTime }}</div>
        <ion-title>Reminder(s) for Today</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Reminder(s) for Today</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Notification Popup -->
      <div v-if="showNotification" class="notification" @click="goToInstructionReminder">
        <button class="close-btn" @click.stop="hideNotification">×</button>
        Reminder to take your medication!
      </div>

      <div class="reminder-list">
        <ion-card 
          v-for="(reminder, index) in reminders" 
          :key="index" 
          class="reminder-card"
          button 
          @click="handleCardClick(reminder)"
        >
          <ion-card-content>
            <p class="time">{{ reminder.time }}</p>
            <div v-for="(med, idx) in reminder.medications" :key="idx" class="medication">
              <p class="med-name">{{ med.name }}, {{ med.dosage }}</p>
              <p class="pill-count">{{ med.pills }} Pill(s)</p>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent } from '@ionic/vue';

const reminders = [
  {
    time: '8:00 AM',
    medications: [
      { name: 'Paracetamol', dosage: '500mg', pills: 2 },
    ],
  },
  {
    time: '02:00 PM',
    medications: [
      { name: 'Paracetamol', dosage: '500mg', pills: 2 },
      { name: 'Aspirin', dosage: '100mg', pills: 2 },
    ],
  },
  {
    time: '8:00 PM',
    medications: [
      { name: 'Paracetamol', dosage: '500mg', pills: 2 },
      { name: 'Ibuprofen', dosage: '200mg', pills: 2 },
    ],
  },
];

// Clock logic
const clock = ref(new Date(2024, 0, 1, 13, 59, 56)); // Initial date at 07:59 AM

// Notification visibility state
const showNotification = ref(false);

// Reactive formatted time
const formattedTime = ref(formatTime(clock.value));

// Router instance
const router = useRouter();

function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert to 12-hour format
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
}

// Update the time every second
let timer: number;
onMounted(() => {
  timer = setInterval(() => {
    clock.value.setSeconds(clock.value.getSeconds() + 1); // Increment time by 1 second
    formattedTime.value = formatTime(clock.value);

    // Check if it's exactly 02:00 PM and show notification if true
    if (formattedTime.value === '2:00:00 PM') {
      showNotification.value = true;
    }
  }, 1000); // 1 second interval
});

onUnmounted(() => {
  clearInterval(timer);
});

function handleCardClick(reminder) {
  console.log("Reminder clicked:", reminder);
  // Navigate to /tabs/tab2 with reminder details as query parameters
  router.push({ 
    path: '/tabs/tab2', 
    query: { 
      time: reminder.time, 
      medications: JSON.stringify(reminder.medications) 
    }
  });
}

function hideNotification() {
  showNotification.value = false;
}

// Navigate to Instruction Reminder page and close notification
function goToInstructionReminder() {
  showNotification.value = false;
  router.push('/reminder/InstructionReminder');
}
</script>

<style scoped>
.clock-display {
  font-size: 2em; /* Larger font size for clock display */
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  color: #333;
}

.title-toolbar {
  margin-bottom: 20px; /* Adjust this value as needed for desired spacing */
}

/* Notification styling */
.notification {
  position: relative;
  margin-top: 20px; /* Space below the title */
  background-color: #ffeb3b;
  color: #333;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  max-width: 30%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

/* Close button styling */
.close-btn {
  position: absolute;
  top: 5px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}

.reminder-list {
  padding: 16px;
}

.reminder-card {
  margin-bottom: 16px;
}

.time {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 5px;
}

.medication {
  margin-top: 5px;
}

.med-name {
  font-weight: bold;
}

.pill-count {
  color: #666;
  font-size: 0.9em;
}
</style>
