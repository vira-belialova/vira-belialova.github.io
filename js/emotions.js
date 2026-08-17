/* =========================================================
   EMOTIONS PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     CONFIG
  ======================================================= */

  const SUPABASE_FUNCTION_URL =
    "https://YOUR_PROJECT_REF.supabase.co/functions/v1/access-request";


  /* =======================================================
     NAVIGATION HIDE / SHOW
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
          currentScrollY > 120
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
      { passive: true }
    );

  }


  /* =======================================================
     LANGUAGE SWITCH
  ======================================================= */

  const pageUK =
    document.getElementById(
      "page-uk"
    );

  const pageEN =
    document.getElementById(
      "page-en"
    );

  const langButtons =
    document.querySelectorAll(
      ".lang-switch [data-lang]"
    );


  function setLanguage(language) {

    if (
      !pageUK ||
      !pageEN
    ) {

      return;

    }


    if (
      language === "en"
    ) {

      pageUK.style.display =
        "none";

      pageEN.style.display =
        "block";

    } else {

      pageUK.style.display =
        "block";

      pageEN.style.display =
        "none";

      language =
        "uk";

    }


    langButtons.forEach(
      button => {

        button.classList.toggle(
          "active",
          button.dataset.lang === language
        );

      }
    );


    try {

      localStorage.setItem(
        "emotions-language",
        language
      );

    } catch (error) {

      console.warn(
        "Could not save language:",
        error
      );

    }

  }


  window.setLanguage =
    setLanguage;


  langButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();


          const language =
            button.dataset.lang;


          if (language) {

            setLanguage(
              language
            );

          }

        }
      );

    }
  );


  let savedLanguage =
    "uk";


  try {

    savedLanguage =
      localStorage.getItem(
        "emotions-language"
      ) || "uk";

  } catch (error) {

    console.warn(
      "Could not read language:",
      error
    );

  }


  setLanguage(
    savedLanguage
  );


  /* =======================================================
     REFLECTION TOGGLES
  ======================================================= */

  const reflectionButtons =
    document.querySelectorAll(
      ".reflection-toggle"
    );


  function toggleReflection(
    button
  ) {

    if (!button) {
      return;
    }


    const target =
      button.nextElementSibling;


    if (!target) {
      return;
    }


    target.classList.toggle(
      "open"
    );

  }


  window.toggleReflection =
    toggleReflection;


  reflectionButtons.forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          toggleReflection(
            button
          );

        }
      );

    }
  );


  /* =======================================================
     DONATION MODAL
  ======================================================= */

  const donationModal =
    document.getElementById(
      "donateModal"
    );


  if (donationModal) {

    const closeButton =
      donationModal.querySelector(
        ".close-modal"
      );


    const donationButtons =
      document.querySelectorAll(
        "#emotionsDonateBtn, " +
        "#emotionsDonateBtnEn, " +
        "[data-open-donation], " +
        "[data-donate]"
      );


    function openDonationModal() {

      donationModal.style.display =
        "flex";


      requestAnimationFrame(
        () => {

          donationModal.classList.add(
            "active"
          );

          donationModal.classList.add(
            "show"
          );

        }
      );


      document.body.classList.add(
        "modal-open"
      );

      document.body.style.overflow =
        "hidden";

    }


    function closeDonationModal() {

      donationModal.classList.remove(
        "active"
      );

      donationModal.classList.remove(
        "show"
      );


      setTimeout(
        () => {

          if (
            !donationModal.classList.contains(
              "active"
            ) &&
            !donationModal.classList.contains(
              "show"
            )
          ) {

            donationModal.style.display =
              "none";

          }

        },
        250
      );


      document.body.classList.remove(
        "modal-open"
      );

      document.body.style.overflow =
        "";

    }


    donationButtons.forEach(
      button => {

        button.addEventListener(
          "click",
          event => {

            event.preventDefault();

            openDonationModal();

          }
        );

      }
    );


    if (closeButton) {

      closeButton.addEventListener(
        "click",
        event => {

          event.preventDefault();

          closeDonationModal();

        }
      );


      closeButton.addEventListener(
        "keydown",
        event => {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            closeDonationModal();

          }

        }
      );

    }


    donationModal.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          donationModal
        ) {

          closeDonationModal();

        }

      }
    );


    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape" &&
          donationModal.classList.contains(
            "active"
          )
        ) {

          closeDonationModal();

        }

      }
    );


    /* =====================================================
       DONATION TABS
    ===================================================== */

    const tabs =
      donationModal.querySelectorAll(
        ".donate-tabs .tab-btn"
      );

    const contents =
      donationModal.querySelectorAll(
        ".tab-content"
      );


    tabs.forEach(
      tab => {

        tab.addEventListener(
          "click",
          event => {

            event.preventDefault();


            const target =
              tab.dataset.tab;


            if (!target) {
              return;
            }


            tabs.forEach(
              item => {

                item.classList.remove(
                  "active"
                );

              }
            );


            contents.forEach(
              content => {

                content.classList.remove(
                  "active"
                );

              }
            );


            tab.classList.add(
              "active"
            );


            let targetContent =
              donationModal.querySelector(
                `.tab-content[data-tab-content="${target}"]`
              );


            if (!targetContent) {

              targetContent =
                donationModal.querySelector(
                  `#${target}`
                );

            }


            if (targetContent) {

              targetContent.classList.add(
                "active"
              );

            }

          }
        );

      }
    );


    /* =====================================================
       COPY BUTTONS
    ===================================================== */

    const copyButtons =
      donationModal.querySelectorAll(
        ".copy-btn"
      );


    copyButtons.forEach(
      button => {

        button.addEventListener(
          "click",
          async event => {

            event.preventDefault();


            let targetSelector =
              button.dataset.copy;


            if (!targetSelector) {

              if (
                button.id ===
                "copyWallet"
              ) {

                targetSelector =
                  "#walletAddress";

              } else if (
                button.id ===
                "copyWise"
              ) {

                targetSelector =
                  ".tab-content#wise .card-number";

              } else if (
                button.id ===
                "copyCard"
              ) {

                targetSelector =
                  ".tab-content#card .card-number";

              }

            }


            if (!targetSelector) {
              return;
            }


            const target =
              donationModal.querySelector(
                targetSelector
              );


            if (!target) {
              return;
            }


            const text =
              target.textContent.trim();


            try {

              await navigator.clipboard.writeText(
                text
              );


              const originalText =
                button.textContent;


              button.textContent =
                "Copied ✓";


              setTimeout(
                () => {

                  button.textContent =
                    originalText;

                },
                1500
              );


            } catch (error) {

              console.error(
                "Copy failed:",
                error
              );

            }

          }
        );

      }
    );


    /* =====================================================
       SHOW WALLET
    ===================================================== */

    const walletButtons =
      donationModal.querySelectorAll(
        ".show-wallet"
      );


    walletButtons.forEach(
      button => {

        button.addEventListener(
          "click",
          event => {

            event.preventDefault();


            let targetSelector =
              button.dataset.target;


            if (!targetSelector) {

              if (
                button.id ===
                "showWallet"
              ) {

                targetSelector =
                  "#walletAddress";

              }

            }


            if (!targetSelector) {
              return;
            }


            const target =
              donationModal.querySelector(
                targetSelector
              );


            if (!target) {
              return;
            }


            const isHidden =
              target.style.display ===
                "none" ||
              getComputedStyle(
                target
              ).display ===
                "none";


            target.style.display =
              isHidden
                ? "block"
                : "none";


            button.textContent =
              isHidden
                ? "Hide wallet"
                : "Show wallet";

          }
        );

      }
    );

  }


  /* =======================================================
     ACCESS REQUEST PANEL
  ======================================================= */

  const accessButton =
    document.getElementById(
      "openAccessRequest"
    );

  const accessPanel =
    document.getElementById(
      "accessRequestPanel"
    );


  if (
    accessButton &&
    accessPanel
  ) {

    accessButton.addEventListener(
      "click",
      event => {

        event.preventDefault();


        const isHidden =
          accessPanel.style.display ===
            "none" ||
          getComputedStyle(
            accessPanel
          ).display ===
            "none";


        accessPanel.style.display =
          isHidden
            ? "block"
            : "none";


        if (isHidden) {

          setTimeout(
            () => {

              accessPanel.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });

            },
            50
          );

        }

      }
    );

  }


  /* =======================================================
     ACCESS REQUEST FORM
  ======================================================= */

  const accessForm =
    document.getElementById(
      "accessRequestForm"
    );

  const accessStatus =
    document.getElementById(
      "requestStatus"
    );


  if (accessForm) {

    accessForm.addEventListener(
      "submit",
      async event => {

        event.preventDefault();


        const submitButton =
          accessForm.querySelector(
            'button[type="submit"]'
          );


        const name =
          document.getElementById(
            "requestName"
          )?.value.trim();


        const contact =
          document.getElementById(
            "requestContact"
          )?.value.trim();


        const paymentMethod =
          document.getElementById(
            "requestPayment"
          )?.value;


        const message =
          document.getElementById(
            "requestMessage"
          )?.value.trim();


        if (
          !name ||
          !contact ||
          !paymentMethod
        ) {

          if (accessStatus) {

            accessStatus.style.display =
              "block";

            accessStatus.textContent =
              "Будь ласка, заповни ім'я, контакт і спосіб оплати.";

          }

          return;

        }


        /* ---------------------------------------------------
           UI: SENDING
        --------------------------------------------------- */

        if (submitButton) {

          submitButton.disabled =
            true;

          submitButton.textContent =
            "Надсилання...";

        }


        if (accessStatus) {

          accessStatus.style.display =
            "block";

          accessStatus.textContent =
            "Надсилаємо запит...";

        }


        try {

          const response =
            await fetch(
              SUPABASE_FUNCTION_URL,
              {

                method: "POST",

                headers: {

                  "Content-Type":
                    "application/json"

                },

                body: JSON.stringify({

                  type:
                    "access_request",

                  name,

                  contact,

                  payment_method:
                    paymentMethod,

                  message

                })

              }
            );


          const result =
            await response.json();


          if (
            !response.ok ||
            !result.ok
          ) {

            throw new Error(
              result.error ||
              "Request failed"
            );

          }


          /* -------------------------------------------------
             SUCCESS
          ------------------------------------------------- */

          if (accessStatus) {

            accessStatus.style.display =
              "block";

            accessStatus.textContent =
              "Дякуємо! Запит отримано. Ми зв'яжемося з тобою.";

          }


          accessForm.reset();


        } catch (error) {

          console.error(
            "Access request error:",
            error
          );


          if (accessStatus) {

            accessStatus.style.display =
              "block";

            accessStatus.textContent =
              "Не вдалося надіслати запит. Спробуй ще раз або напиши нам напряму.";

          }

        } finally {

          if (submitButton) {

            submitButton.disabled =
              false;

            submitButton.textContent =
              "Надіслати запит";

          }

        }

      }
    );

  }


  /* =======================================================
     SIMPLE SCROLL REVEALS
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
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

              }

            }
          );

        },
        {
          threshold: 0.15
        }
      );


    animatedElements.forEach(
      element =>
        observer.observe(
          element
        )
    );

  } else {

    animatedElements.forEach(
      element =>
        element.classList.add(
          "visible"
        )
    );

  }


  /* =======================================================
     HERO — ALWAYS VISIBLE
  ======================================================= */

  document
    .querySelectorAll(
      ".emotion-hero-content"
    )
    .forEach(
      element => {

        element.classList.add(
          "visible"
        );

        element.style.opacity =
          "1";

        element.style.visibility =
          "visible";

      }
    );

});
