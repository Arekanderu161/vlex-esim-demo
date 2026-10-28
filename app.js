"use strict";
// Illustrative combinations only; these are not authoritative device records.
const demoKnown = new Set(["iphone15|usa", "iphone15|europe", "iphone14|usa", "iphone14|europe", "pixel8|usa", "pixel8|europe"]);
const form = document.querySelector("#checker-form");
const result = document.querySelector("#result");
const resultContent = document.querySelector("#result-content");
const plansMessage = document.querySelector("#plans-message");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const model = document.querySelector("#model");
  const region = document.querySelector("#region");
  const country = document.querySelector("#country");
  const known = demoKnown.has(`${model.value}|${region.value}`);
  resultContent.replaceChildren();
  const status = document.createElement("span");
  status.className = known ? "status" : "status unknown";
  status.textContent = known ? "✓ ПОДТВЕРЖДЕНО В ДЕМО-БАЗЕ" : "? НЕИЗВЕСТНО";
  const title = document.createElement("h2");
  title.textContent = known ? "В демо-базе есть поддержка eSIM" : "Недостаточно данных для проверки";
  const details = document.createElement("p");
  details.textContent = `${model.selectedOptions[0].text} · ${region.selectedOptions[0].text} → ${country.value}. ` + (known ? "Для этой комбинации в демонстрационной базе указана поддержка eSIM." : "Для этой комбинации нет подтверждения в демонстрационной базе. Это не означает, что eSIM не поддерживается.");
  resultContent.append(status, title, details);
  plansMessage.hidden = true;
  result.hidden = false;
  result.focus();
  result.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start"});
});
document.querySelector("#plans").addEventListener("click", () => { plansMessage.hidden = false; });
function edit() { result.hidden = true; document.querySelector("#model").focus(); }
document.querySelector("#again").addEventListener("click", edit);
document.querySelector("#close-result").addEventListener("click", edit);
