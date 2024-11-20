import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      },
      {
        path: 'tab4',
        component: () => import('@/views/Tab4Page.vue')
      }
    ]
  },
  {
    path: '/history/',
    component: TabsPage,
    children: [
      {
        path: 'HistoryDetail',
        component: () => import('@/views/history/HistoryDetail.vue')
      }
    ]
  },
  {
  path: '/refill/',
  component: TabsPage,
  children: [
    {
      path: 'HealthHub',
      name: 'HealthHub', // Add a name for easier navigation
      component: () => import('@/views/refill/1HealthHub.vue')
    },
    {
      path: '/refill/Singpass',
      name: 'Singpass', // Use this name in `goToSingpassLogin` function
      component: () => import('@/views/refill/2Singpass.vue')
    },
    {
      path: '/refill/choose-med',
      name: 'ChooseMed',
      component: () => import('@/views/refill/3ChooseMed.vue') // Ensure the path and filename match
    },
    {
      path: '/refill/Delivery',
      name: 'Delivery',
      component: () => import('@/views/refill/4DeliveryDetails.vue')
    },
    {
      path: '/refill/OrderSummary',
      name: 'OrderSummary',
      component: () => import('@/views/refill/5OrderSummary.vue')
    },
    {
      path: '/refill/RefillConfirmation',
      name: 'RefillConfirm',
      component: () => import('@/views/refill/6RefillConfirmation.vue')
    },
  ]
  },
  {
    path: '/reminder/',
    component: TabsPage,
    children: [
      {
        path: 'SetReminder',
        component: () => import('@/views/reminder/SetReminder.vue')
      },
      {
        path: 'AudioSetReminder',
        component: () => import('@/views/reminder/AudioSetReminder.vue')
      },
      {
        path: 'EditReminder',
        component: () => import('@/views/reminder/EditReminder.vue')
      },
      {
        path: 'InstructionReminder',
        component: () => import('@/views/reminder/InstructionReminder.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
