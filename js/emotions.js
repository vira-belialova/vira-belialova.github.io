/* =========================================================
   EMOTIONS PAGE — JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     LANGUAGE SWITCH
     ======================================================= */

  const pageUK =
    document.getElementById("page-uk");

  const pageEN =
    document.getElementById("page-en");

  const languageButtons =
    document.querySelectorAll(
      ".lang-switch span[data-lang]"
    );


  function setLanguage(lang) {

    if (!pageUK || !pageEN) return;


    if (lang === "en") {

      pageUK.classList.remove("active");
      pageEN.classList.add("active");

      pageUK.style.display = "none";
      pageEN.style.display = "block";

      document.documentElement.lang = "en";

    } else {

      pageEN.classList.remove("active");
      pageUK.classList.add("active");

      pageEN.style.display = "none";
      pageUK.style.display = "block";

      document.documentElement.lang = "uk";

    }


    languageButtons.forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.lang === lang
      );

    });


    window.scrollTo({
      top: 0,
      behavior: "auto"
    });

  }


  languageButtons.forEach(button => {

    button.addEventListener("click", (event) => {

      event.preventDefault();

      const lang =
        button.dataset.lang;

      if (!lang) return;

      setLanguage(lang);

    });

  });


  /* DEFAULT LANGUAGE */

  setLanguage("uk");


  /* =======================================================
     DONATION MODAL
     ======================================================= */

  const modal = document.querySelector(".donate-modal");
  const closeButton = document.querySelector(".close-modal");

  if (modal) {

    /* -------------------------------------------------------
       OPEN MODAL
       ------------------------------------------------------- */

    document.querySelectorAll(
      '[data-donate], .donate-button, .open-donate'
    ).forEach(button => {

      button.addEventListener("click", (event) => {

        event.preventDefault();

        modal.classList.add("active");

        document.body.classList.add("modal-open");

      });

    });


    /* -------------------------------------------------------
       CLOSE MODAL
       ------------------------------------------------------- */

    if (closeButton) {

      closeButton.addEventListener("click", () => {

        closeDonationModal();

      });

    }


    /* -------------------------------------------------------
       CLICK OUTSIDE
       ------------------------------------------------------- */

    modal.addEventListener("click", (event) => {

      if (event.target === modal) {

        closeDonationModal();

      }

    });


    /* -------------------------------------------------------
       ESC
       ------------------------------------------------------- */

    document.addEventListener("keydown", (event) => {

      if (
        event.key === "Escape" &&
        modal.classList.contains("active")
      ) {

        closeDonationModal();

      }

    });

  }


  function closeDonationModal() {

    if (!modal) return;

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");

  }


  /* =======================================================
     DONATION TABS
     ======================================================= */

  const tabButtons =
    document.querySelectorAll(".donate-tabs .tab-btn");

  const tabContents =
    document.querySelectorAll(".donate-modal .tab-content");


  tabButtons.forEach(button => {

    button.addEventListener("click", () => {

      const target =
        button.dataset.tab ||
        button.getAttribute("data-target");


      if (!target) return;


      /* deactivate buttons */

      tabButtons.forEach(btn => {

        btn.classList.remove("active");

      });


      /* hide contents */

      tabContents.forEach(content => {

        content.classList.remove("active");

      });


      /* activate selected */

      button.classList.add("active");


      const targetElement =
        document.getElementById(target);


      if (targetElement) {

        targetElement.classList.add("active");

      }

    });

  });


  /* =======================================================
     COPY BUTTON
     ======================================================= */

  document.querySelectorAll(".copy-btn").forEach(button => {

    button.addEventListener("click", async () => {

      const targetSelector =
        button.dataset.copy;

      let text = "";


      if (targetSelector) {

        const element =
          document.querySelector(targetSelector);

        if (element) {

          text =
            element.textContent.trim();

        }

      } else {

        const wallet =
          document.querySelector(".wallet-address");

        if (wallet) {

          text =
            wallet.textContent.trim();

        }

      }


      if (!text) return;


      try {

        await navigator.clipboard.writeText(text);

        const originalText =
          button.textContent;

        button.textContent =
          "Copied ✓";


        setTimeout(() => {

          button.textContent =
            originalText;

        }, 1800);


      } catch (error) {

        console.error(
          "Copy failed:",
          error
        );

      }

    });

  });


  /* =======================================================
     SHOW / HIDE WALLET
     ======================================================= */

  document.querySelectorAll(".show-wallet").forEach(button => {

    button.addEventListener("click", () => {

      const wallet =
        document.querySelector(".wallet-address");

      if (!wallet) return;


      wallet.hidden =
        !wallet.hidden;


      button.textContent =
        wallet.hidden
          ? "Show wallet"
          : "Hide wallet";

    });

  });


  /* =======================================================
     REFLECTION BOXES
     ======================================================= */

  document.querySelectorAll(".reflection-toggle").forEach(button => {

    button.addEventListener("click", () => {

      const box =
        button.nextElementSibling;

      if (!box) return;


      box.classList.toggle("open");


      const isOpen =
        box.classList.contains("open");


      button.textContent =
        isOpen
          ? "Close reflection"
          : "Write a reflection";

    });

  });


  /* =======================================================
     SCROLL ANIMATIONS
     ======================================================= */

  const animatedElements =
    document.querySelectorAll(
      ".emotion-step, " +
      ".emotion-video-container, " +
      ".emotion-ending-content, " +
      ".emotion-support-content"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.15
        }
      );


    animatedElements.forEach(element => {

      observer.observe(element);

    });

  } else {

    animatedElements.forEach(element => {

      element.classList.add("visible");

    });

  }


  /* =======================================================
     NAVIGATION HIDE ON SCROLL
     ======================================================= */

  const nav =
    document.querySelector(".emotions-nav");


  if (nav) {

    let lastScrollY =
      window.scrollY;


    window.addEventListener(
      "scroll",
      () => {

        const currentScrollY =
          window.scrollY;


        if (
          currentScrollY > lastScrollY &&
          currentScrollY > 100
        ) {

          nav.classList.add(
            "nav-hidden"
          );

        } else {

          nav.classList.remove(
            "nav-hidden"
          );

        }


        lastScrollY =
          currentScrollY;

      },
      {
        passive: true
      }
    );

  }


  /* =======================================================
     SMOOTH ANCHOR SCROLL
     ======================================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(link => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href");


      if (
        !targetId ||
        targetId === "#"
      ) return;


      const target =
        document.querySelector(targetId);


      if (!target) return;


      event.preventDefault();


      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });
  /* =======================================================
     ACCESS REQUEST FORM
     ======================================================= */

  const accessRequestForm =
    document.getElementById("accessRequestForm");

  const requestStatus =
    document.getElementById("requestStatus");


  if (accessRequestForm) {

    accessRequestForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();


        const name =
          document.getElementById("requestName")?.value.trim() || "";

        const contact =
          document.getElementById("requestContact")?.value.trim() || "";

        const paymentMethod =
          document.getElementById("requestPayment")?.value || "";

        const message =
          document.getElementById("requestMessage")?.value.trim() || "";


        if (!name || !contact || !paymentMethod) {

          if (requestStatus) {

            requestStatus.style.display = "block";

            requestStatus.textContent =
              "Будь ласка, заповни всі обов'язкові поля.";

          }

          return;

        }


        /* ---------------------------------------------------
           LOADING
        --------------------------------------------------- */

        const submitButton =
          accessRequestForm.querySelector(
            'button[type="submit"]'
          );


        if (submitButton) {

          submitButton.disabled = true;

          submitButton.textContent =
            "Надсилаємо...";

        }


        if (requestStatus) {

          requestStatus.style.display = "block";

          requestStatus.textContent =
            "Надсилаємо запит...";

        }


        try {

          const response =
            await fetch(
              "https://pttolejekzkqbingzzwj.supabase.co/functions/v1/smart-task",
              {

                method: "POST",

                headers: {
                  "Content-Type": "application/json"
                },

                body: JSON.stringify({

                  access_request: {

                    name,
                    contact,
                    payment_method: paymentMethod,
                    message

                  }

                })

              }
            );


          const result =
            await response.json();


          if (!response.ok || result.ok === false) {

            throw new Error(
              result.error ||
              "Request failed"
            );

          }


          /* -------------------------------------------------
             SUCCESS
          ------------------------------------------------- */

          if (requestStatus) {

            requestStatus.style.display = "block";

            requestStatus.textContent =
              "Запит надіслано 🤍 Ми зв'яжемося з тобою.";

          }


          accessRequestForm.reset();


          if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
              "Надіслати запит";

          }


        } catch (error) {

          console.error(
            "Access request failed:",
            error
          );


          if (requestStatus) {

            requestStatus.style.display = "block";

            requestStatus.textContent =
              "Не вдалося надіслати запит. Спробуй ще раз.";

          }


          if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
              "Надіслати запит";

          }

        }

      }
    );

  }
});
