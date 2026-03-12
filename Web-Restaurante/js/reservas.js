document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formReserva");
  const btnReserva = document.getElementById("btnReserva");
  const mensajeReserva = document.getElementById("mensajeReserva");

  if (!form) return;

  // Sustituye estos valores por los tuyos de EmailJS
  const EMAILJS_PUBLIC_KEY = "RnDeIRINTPp14Mx5Q";
  const EMAILJS_SERVICE_ID = "service_cyk18k8";
  const EMAILJS_TEMPLATE_ID = "template_0cugirl";

  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (btnReserva) {
      btnReserva.disabled = true;
      btnReserva.textContent = "Enviando...";
    }

    if (mensajeReserva) {
      mensajeReserva.className = "alert d-none mt-3";
      mensajeReserva.textContent = "";
    }

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);

      if (mensajeReserva) {
        mensajeReserva.className = "alert alert-success mt-3";
        mensajeReserva.textContent =
          "Reserva enviada correctamente. Te responderemos lo antes posible.";
      }

      form.reset();
    } catch (error) {
      console.error("Error al enviar la reserva:", error);

      if (mensajeReserva) {
        mensajeReserva.className = "alert alert-danger mt-3";
        mensajeReserva.textContent =
          "No se pudo enviar la reserva. Revisa la configuración de EmailJS e inténtalo de nuevo.";
      }
    } finally {
      if (btnReserva) {
        btnReserva.disabled = false;
        btnReserva.textContent = "Confirmar reserva";
      }
    }
  });
});
