document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formReserva");
  const btnReserva = document.getElementById("btnReserva");
  const mensajeReserva = document.getElementById("mensajeReserva");

  if (!form) return;

  const EMAILJS_PUBLIC_KEY = "RnDeIRINTPp14Mx5Q";
  const EMAILJS_SERVICE_ID = "service_cyk18k8";

  // Plantilla que recibe el restaurante
  const EMAILJS_TEMPLATE_ADMIN = "template_0cugirl";

  // Plantilla nueva para confirmar al cliente
  const EMAILJS_TEMPLATE_CLIENTE = "template_lo5tz2c";

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
      // 1. Email al restaurante
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ADMIN, form);

      // 2. Email de confirmación al cliente
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_CLIENTE,
        form,
      );

      if (mensajeReserva) {
        mensajeReserva.className = "alert alert-success mt-3";
        mensajeReserva.textContent =
          "Reserva enviada correctamente. También hemos enviado una confirmación a tu correo.";
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
