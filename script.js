const modal = document.getElementById("contactModal");
const selectedService = document.getElementById("selectedService");
const telegram = document.getElementById("telegramLink");
const whatsapp = document.getElementById("whatsappLink");
const snapchat = document.getElementById("snapchatLink");
const bot = document.getElementById("botLink");
const langSwitch = document.getElementById("langSwitch");
let language = "ar";
let currentService = "";

const links = {
  telegram: "https://t.me/zzuto",
  whatsapp: "https://wa.me/message/QL3PPOR63AE3E1",
  snapchat: "https://snapchat.com/t/Hii0BFTw",
  bot: "https://t.me/MONTAR_bot"
};

function openService(card) {
  currentService = language === "ar" ? card.dataset.service : card.dataset.serviceEn;
  selectedService.textContent = currentService;
  const message = language === "ar"
    ? `مرحباً، أرغب بالاستفسار عن خدمة: ${currentService}`
    : `Hello, I would like to inquire about: ${currentService}`;
  telegram.href = `${links.telegram}?text=${encodeURIComponent(message)}`;
  // WhatsApp share endpoint preserves the supplied contact destination and pre-fills the service message.
  whatsapp.href = `${links.whatsapp}?text=${encodeURIComponent(message)}`;
  snapchat.href = links.snapchat;
  bot.href = `${links.bot}?start=${encodeURIComponent("service_" + (card.dataset.service || "inquiry").replaceAll(" ", "_"))}`;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll(".service-card").forEach(card => card.addEventListener("click", () => openService(card)));
document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

function setLanguage(next) {
  language = next;
  const isArabic = next === "ar";
  document.documentElement.lang = next;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.getElementById("langLabel").textContent = isArabic ? "English" : "العربية";
  document.querySelectorAll("[data-ar][data-en]").forEach(el => {
    el.innerHTML = isArabic ? el.dataset.ar : el.dataset.en;
  });
  if (modal.classList.contains("show")) {
    document.getElementById("modalTitle").textContent = isArabic ? "تواصل معنا" : "Contact us";
    const activeCard = [...document.querySelectorAll(".service-card")].find(c =>
      (isArabic ? c.dataset.service : c.dataset.serviceEn) === currentService
    );
    if (activeCard) openService(activeCard);
  }
}
langSwitch.addEventListener("click", () => setLanguage(language === "ar" ? "en" : "ar"));
document.getElementById("year").textContent = new Date().getFullYear();