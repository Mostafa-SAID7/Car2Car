<script setup lang="ts">
import { ArrowRight, MessageCircle, Send } from 'lucide-vue-next'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref('')
const subscribed = ref(false)

function subscribe() {
  if (!email.value.trim()) return
  subscribed.value = true
}
</script>

<template>
  <footer class="footer-shell">
    <div class="footer-contact-grid">
      <a href="tel:+18005008493" class="contact-card contact-card-phone">
        <span class="contact-label">Toll-free phone</span>
        <strong>1 800 500 84 93</strong>
      </a>

      <div class="contact-card contact-card-social">
        <span class="contact-label">Messengers</span>
        <div class="social-icons" aria-label="Messengers">
          <a href="https://wa.me" target="_blank" rel="noreferrer" aria-label="WhatsApp"
            ><MessageCircle :size="15" :stroke-width="2.8"
          /></a>
          <a
            href="https://vk.com"
            target="_blank"
            rel="noreferrer"
            aria-label="ВКонтакте"
            class="vk-icon"
            >vk</a
          >
          <a href="https://t.me" target="_blank" rel="noreferrer" aria-label="Telegram"
            ><Send :size="14" :stroke-width="2.8"
          /></a>
        </div>
      </div>

      <a href="mailto:hello@torque.app" class="contact-card contact-card-email">
        <span class="contact-label">Email</span>
        <strong>hello@torque.app</strong>
      </a>
    </div>

    <div class="footer-panel">
      <div class="footer-panel-top">
        <div class="newsletter-block">
          <h2>Subscribe to our newsletter</h2>
          <form v-if="!subscribed" class="newsletter-form" @submit.prevent="subscribe">
            <label class="sr-only" for="footer-email">Your email</label>
            <input
              id="footer-email"
              v-model="email"
              required
              type="email"
              placeholder="Your email"
            />
            <button type="submit" aria-label="Подписаться"><ArrowRight :size="19" /></button>
          </form>
          <p v-else class="subscribed-message">Thanks! You’re on the list.</p>
          <label class="consent-row"
            ><input type="checkbox" required /> <span>I agree to the data policy</span></label
          >
        </div>

        <div class="footer-links-grid">
          <div>
            <p class="link-heading">About Torque</p>
            <nav>
              <RouterLink to="/onboarding">Our story</RouterLink>
              <RouterLink to="/shop">Reviews</RouterLink>
              <RouterLink to="/checkout">Delivery</RouterLink>
              <RouterLink to="/search">Contact us</RouterLink>
            </nav>
          </div>
          <div>
            <p class="link-heading">Oil catalog</p>
            <nav>
              <RouterLink to="/shop">Synthetic</RouterLink>
              <RouterLink to="/shop">Semi-synthetic</RouterLink>
              <RouterLink to="/shop">Mineral</RouterLink>
            </nav>
          </div>
          <div>
            <RouterLink to="/profile" class="standalone-link">For partners</RouterLink>
          </div>
          <div>
            <RouterLink to="/search" class="standalone-link">Help center</RouterLink>
          </div>
        </div>
      </div>

      <div class="footer-panel-bottom">
        <RouterLink to="/" class="footer-brand">TORQUE</RouterLink>
        <div class="legal-links">
          <span>© Torque, 2025</span>
          <a href="#">Privacy policy</a>
          <a href="#">Partner agreement</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-shell {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 clamp(16px, 2.9vw, 42px) 14px;
  color: #f4f5f7;
}

.footer-contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.62fr) minmax(116px, 0.54fr) minmax(210px, 1fr);
  gap: 18px;
  margin-bottom: 24px;
}

.contact-card {
  position: relative;
  display: flex;
  min-height: 105px;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 10px;
  background: #151515;
  padding: 17px 19px 14px;
  text-decoration: none;
  transition:
    border-color 180ms ease,
    background 180ms ease;
}

.contact-card:hover {
  border-color: rgba(245, 167, 16, 0.65);
  background: #191919;
}
.contact-card-phone::before {
  position: absolute;
  inset: -40px -25px -35px 100px;
  background: repeating-radial-gradient(
    ellipse at 57% 47%,
    transparent 0 11px,
    rgba(255, 255, 255, 0.075) 12px 13px,
    transparent 14px 20px
  );
  content: '';
  opacity: 0.75;
  transform: rotate(-7deg) scale(1.2, 0.72);
}

.contact-label,
.link-heading {
  position: relative;
  color: #e5e5e5;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.contact-card strong {
  position: relative;
  color: #f5a710;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.contact-card-social {
  padding-right: 12px;
  padding-left: 18px;
}
.social-icons {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #f5a710;
}
.social-icons a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  text-decoration: none;
  transition:
    color 180ms ease,
    transform 180ms ease;
}
.social-icons a:hover {
  color: #ffc233;
  transform: translateY(-1px);
}
.vk-icon {
  font-family: Arial, sans-serif;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: -0.08em;
}
.contact-card-email strong {
  font-size: 16px;
  letter-spacing: 0.03em;
}

.footer-panel {
  min-height: 265px;
  overflow: hidden;
  border-radius: 9px 9px 48px 48px;
  background: #2c2c2c;
  padding: 30px 33px 27px;
}
.footer-panel-top {
  display: grid;
  grid-template-columns: minmax(0, 337px) minmax(180px, 195px);
  justify-content: space-between;
  gap: 48px;
}
.newsletter-block h2 {
  margin: 0 0 13px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.015em;
}
.newsletter-form {
  display: flex;
  max-width: 337px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.54);
}
.newsletter-form input {
  min-width: 0;
  height: 29px;
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  color: white;
  font-size: 12px;
}
.newsletter-form input::placeholder {
  color: #777;
}
.newsletter-form button {
  display: grid;
  height: 24px;
  width: 56px;
  place-items: center;
  border: 1px solid #c5962c;
  border-radius: 20px;
  background: transparent;
  color: #dcae3f;
  transition:
    background 180ms ease,
    color 180ms ease;
}
.newsletter-form button:hover {
  background: #f5a710;
  color: #2c2c2c;
}
.consent-row {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 7px;
  color: #858585;
  font-size: 8px;
}
.consent-row input {
  height: 10px;
  width: 10px;
  margin: 0;
  accent-color: #f5a710;
}
.subscribed-message {
  color: #f5a710;
  font-size: 12px;
}
.footer-links-grid {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  column-gap: 35px;
  row-gap: 24px;
}
.link-heading,
.standalone-link {
  margin: 0 0 8px;
  color: #f0f0f0;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: none;
}
.footer-links-grid nav {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.footer-links-grid nav a {
  color: #858585;
  font-size: 9px;
  text-decoration: none;
  transition: color 180ms ease;
}
.footer-links-grid nav a:hover,
.standalone-link:hover {
  color: #f5a710;
}
.standalone-link {
  display: inline-block;
}
.footer-panel-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 58px;
}
.footer-brand {
  color: #f5a710;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-decoration: none;
}
.legal-links {
  display: flex;
  align-items: center;
  gap: 27px;
  margin-top: 7px;
  color: #777;
  font-size: 8px;
}
.legal-links a {
  color: inherit;
  text-decoration: none;
}
.legal-links a:hover {
  color: #c7c7c7;
}

@media (max-width: 700px) {
  .footer-shell {
    padding: 0 16px 10px;
  }
  .footer-contact-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 12px;
  }
  .contact-card-phone {
    grid-column: 1 / -1;
  }
  .contact-card {
    min-height: 90px;
    padding: 13px 14px 12px;
  }
  .contact-card strong,
  .contact-card-email strong {
    font-size: 13px;
  }
  .footer-panel {
    border-radius: 8px 8px 30px 30px;
    padding: 24px 18px 22px;
  }
  .footer-panel-top {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .footer-links-grid {
    column-gap: 18px;
  }
  .footer-panel-bottom {
    margin-top: 40px;
  }
  .legal-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px 14px;
    text-align: center;
  }
}
</style>
