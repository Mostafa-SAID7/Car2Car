import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import CatalogPage from '@/pages/CatalogPage.vue'
import ProductPage from '@/pages/ProductPage.vue'
import CartPage from '@/pages/CartPage.vue'
import CheckoutPage from '@/pages/CheckoutPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import SearchPage from '@/pages/SearchPage.vue'
import VehiclePage from '@/pages/VehiclePage.vue'
import OnboardingPage from '@/pages/OnboardingPage.vue'
import ErrorPage from '@/pages/ErrorPage.vue'
import { reportError } from '@/lib/errors'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/onboarding', name: 'onboarding', component: OnboardingPage },
    { path: '/shop', name: 'shop', component: CatalogPage },
    { path: '/search', name: 'search', component: SearchPage },
    { path: '/product/:slug', name: 'product', component: ProductPage },
    { path: '/vehicle', name: 'vehicle', component: VehiclePage },
    { path: '/cart', name: 'cart', component: CartPage },
    { path: '/checkout', name: 'checkout', component: CheckoutPage },
    { path: '/profile', name: 'profile', component: ProfilePage },
    { path: '/error', name: 'error', component: ErrorPage },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: ErrorPage, props: { kind: 'not-found' } },
  ],
})

router.onError((error) => {
  reportError(error, 'router navigation')
})

export default router
