/* =========================================================
   EMOTIONS PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     CONFIG
  ======================================================= */

  const SUPABASE_FUNCTION_URL =
    "https://pttolejekzkqbingzzwj.supabase.co/functions/v1/smart-task";


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
     PROTECTED ACCESS
  ======================================================= */

  async function verifyAccessToken() {

    const params =
      new URLSearchParams(
        window.location.search
      );


    const token =
      params.get("access");


    if (!token) {

      return false;

    }


    const cleanToken =
      token.trim();


    if (!cleanToken) {

      return false;

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

            body:
              JSON.stringify({
                token:
                  cleanToken
              })

          }
        );


      const responseText =
        await response.text();


      let result;


      try {

        result =
          JSON.parse(
            responseText
          );

      } catch {

        result = {
          allowed: false
        };

      }


      console.log(
        "ACCESS CHECK:",
        response.status,
        result
      );


      if (
        !response.ok ||
        !result.allowed
      ) {

        return false;

      }


      const protectedUK =
        document.getElementById(
          "protected-content"
        );


      const protectedEN =
        document.getElementById(
          "protected-content-en"
        );


      if (protectedUK) {

        protectedUK.style.display =
          "block";

      }


      if (protectedEN) {

        protectedEN.style.display =
          "block";

      }
      /* ---------------------------------------------------
         USER HAS ACCESS
         Hide "Get access" CTA
      --------------------------------------------------- */
      
      document
        .querySelectorAll(".emotion-support")
        .forEach(section => {
      
          section.classList.add(
           "access-hidden"
         );
      
        });
      
      
      return true;


    } catch (error) {

      console.error(
        "Access verification failed:",
        error
      );


      return false;

    }

  }


  verifyAccessToken();


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


        /*
         * The form may use requestEmail or,
         * for compatibility with the current HTML,
         * requestContact as the email field.
         */
        const email =
          document.getElementById(
            "requestEmail"
          )?.value.trim() ||
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

        const currentLanguage =
           document.getElementById("page-en")?.style.display !== "none"
             ? "en"
             : "uk"; 


        /* ---------------------------------------------------
           EMAIL VALIDATION
        --------------------------------------------------- */

        const emailPattern =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!name) {

          if (accessStatus) {

            accessStatus.style.display =
              "block";

            accessStatus.textContent =
              "Будь ласка, введи ім'я.";

          }

          return;

        }


        if (!email) {

          if (accessStatus) {

            accessStatus.style.display =
              "block";

            accessStatus.textContent =
              "Будь ласка, введи email.";

          }

          return;

        }


        if (!emailPattern.test(email)) {

          if (accessStatus) {

            accessStatus.style.display =
              "block";

            accessStatus.textContent =
              "Будь ласка, введи коректний email.";

          }

          return;

        }


        if (!paymentMethod) {

          if (accessStatus) {

            accessStatus.style.display =
              "block";

            accessStatus.textContent =
              "Будь ласка, обери спосіб оплати.";

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

                  email,

                  contact:
                    "",

                  payment_method:
                    paymentMethod,

                  message,

                  language:
                   currentLanguage
                   
                })

              }
            );


          const responseText =
            await response.text();


          let result;


          try {

            result =
              JSON.parse(
                responseText
              );

          } catch {

            result = {
              ok: false,
              error:
                responseText
            };

          }


          console.log(
            "SUPABASE RESPONSE:",
            response.status,
            result
          );


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
              "Помилка: " +
              (
                error?.message ||
                String(error)
              );

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
