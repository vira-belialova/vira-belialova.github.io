/* =========================================================
   EMOTIONS PAGE — JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {


  /* =======================================================
     LANGUAGE SWITCH
  ======================================================= */

  const languageButtons =
    document.querySelectorAll(
      ".lang-switch [data-lang]"
    );


  const pages = {
    uk: document.getElementById("page-uk"),
    en: document.getElementById("page-en")
  };


  window.setLanguage = function (lang) {

    /* Fallback */

    if (lang !== "uk" && lang !== "en") {
      lang = "uk";
    }


    /* Show selected language only */

    Object.entries(pages).forEach(
      ([key, page]) => {

        if (!page) return;

        page.classList.toggle(
          "active",
          key === lang
        );

      }
    );


    /* Update language switch */

    languageButtons.forEach(button => {

      const isActive =
        button.dataset.lang === lang;


      button.classList.toggle(
        "active",
        isActive
      );


      button.setAttribute(
        "aria-pressed",
        String(isActive)
      );

    });


    /* Update HTML language */

    document.documentElement.lang =
      lang;


    /* Remember selected language */

    localStorage.setItem(
      "emotions-language",
      lang
    );

  };


  /* =======================================================
     LANGUAGE BUTTON EVENTS
  ======================================================= */

  languageButtons.forEach(button => {


    /* Mouse / touch */

    button.addEventListener(
      "click",
      () => {

        window.setLanguage(
          button.dataset.lang
        );

      }
    );


    /* Keyboard */

    button.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          window.setLanguage(
            button.dataset.lang
          );

        }

      }
    );

  });


  /* =======================================================
     INITIAL LANGUAGE
  ======================================================= */

  const savedLanguage =
    localStorage.getItem(
      "emotions-language"
    );


  window.setLanguage(
    savedLanguage === "en"
      ? "en"
      : "uk"
  );


  /* =======================================================
     DONATION MODAL
  ======================================================= */

  const modal =
    document.getElementById("donateModal");


  const closeButton =
    document.getElementById("closeModal");


  function openDonationModal() {

    if (!modal) return;

    modal.classList.add("active");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add(
      "modal-open"
    );

  }


  function closeDonationModal() {

    if (!modal) return;

    modal.classList.remove("active");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );

    document.body.classList.remove(
      "modal-open"
    );

  }


  /* =======================================================
     SUPPORT BUTTONS
  ======================================================= */

  document.querySelectorAll(
    "#emotionsDonateBtn, " +
    "#emotionsDonateBtnEn, " +
    "[data-donate], " +
    ".donate-button, " +
    ".open-donate"
  ).forEach(button => {

    button.addEventListener(
      "click",
      event => {

        event.preventDefault();

        openDonationModal();

      }
    );

  });


  /* =======================================================
     CLOSE MODAL
  ======================================================= */

  if (closeButton) {

    closeButton.addEventListener(
      "click",
      () => {

        closeDonationModal();

      }
    );

  }


  /* =======================================================
     CLICK OUTSIDE MODAL
  ======================================================= */

  if (modal) {

    modal.addEventListener(
      "click",
      event => {

        if (
          event.target === modal
        ) {

          closeDonationModal();

        }

      }
    );

  }


  /* =======================================================
     ESC
  ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        modal &&
        modal.classList.contains("active")
      ) {

        closeDonationModal();

      }

    }
  );


  /* =======================================================
     DONATION TABS
  ======================================================= */

  const tabButtons =
    document.querySelectorAll(
      ".donate-tabs .tab-btn"
    );


  const tabContents =
    document.querySelectorAll(
      ".donate-modal .tab-content"
    );


  tabButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const target =
          button.dataset.tab ||
          button.dataset.target;


        if (!target) return;


        /* Deactivate all buttons */

        tabButtons.forEach(btn => {

          btn.classList.remove(
            "active"
          );

          btn.setAttribute(
            "aria-selected",
            "false"
          );

        });


        /* Hide all contents */

        tabContents.forEach(content => {

          content.classList.remove(
            "active"
          );

        });


        /* Activate selected button */

        button.classList.add(
          "active"
        );

        button.setAttribute(
          "aria-selected",
          "true"
        );


        /* Activate selected content */

        const targetElement =
          document.getElementById(
            target
          );


        if (targetElement) {

          targetElement.classList.add(
            "active"
          );

        }

      }
    );

  });


  /* =======================================================
     COPY BUTTONS
  ======================================================= */

  document.querySelectorAll(
    ".copy-btn"
  ).forEach(button => {

    button.addEventListener(
      "click",
      async () => {

        let text = "";


        /* ---------------------------------------------------
           Generic data-copy
        --------------------------------------------------- */

        const targetSelector =
          button.dataset.copy;


        if (targetSelector) {

          const element =
            document.querySelector(
              targetSelector
            );


          if (element) {

            text =
              element.textContent.trim();

          }

        }


        /* ---------------------------------------------------
           USDT wallet
        --------------------------------------------------- */

        if (
          !text &&
          button.id === "copyWallet"
        ) {

          const wallet =
            document.getElementById(
              "walletAddress"
            );


          if (wallet) {

            text =
              wallet.textContent.trim();

          }

        }


        /* ---------------------------------------------------
           Wise
        --------------------------------------------------- */

        if (
          !text &&
          button.id === "copyWise"
        ) {

          const wise =
            document.querySelector(
              "#wise .card-number"
            );


          if (wise) {

            text =
              wise.textContent.trim();

          }

        }


        /* ---------------------------------------------------
           A-Bank
        --------------------------------------------------- */

        if (
          !text &&
          button.id === "copyCard"
        ) {

          const card =
            document.querySelector(
              "#card .card-number"
            );


          if (card) {

            text =
              card.textContent.trim();

          }

        }


        if (!text) return;


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
            1800
          );


        } catch (error) {

          console.error(
            "Copy failed:",
            error
          );

        }

      }
    );

  });


  /* =======================================================
     SHOW / HIDE WALLET
  ======================================================= */

  const showWalletButton =
    document.getElementById(
      "showWallet"
    );


  const walletAddress =
    document.getElementById(
      "walletAddress"
    );


  if (
    showWalletButton &&
    walletAddress
  ) {

    showWalletButton.addEventListener(
      "click",
      () => {

        const isHidden =
          walletAddress.style.display ===
          "none";


        walletAddress.style.display =
          isHidden
            ? "block"
            : "none";


        showWalletButton.textContent =
          isHidden
            ? "Hide wallet"
            : "Show wallet";

      }
    );

  }


  /* =======================================================
     REFLECTION BOXES
  ======================================================= */

  document.querySelectorAll(
    ".reflection-toggle"
  ).forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const box =
          button.nextElementSibling;


        if (!box) return;


        box.classList.toggle(
          "open"
        );


        const isOpen =
          box.classList.contains(
            "open"
          );


        /* Detect current language */

        const activePage =
          document.querySelector(
            ".language-page.active"
          );


        const isEnglish =
          activePage?.id === "page-en";


        button.textContent =
          isOpen
            ? (
                isEnglish
                  ? "Close reflection"
                  : "Закрити"
              )
            : (
                isEnglish
                  ? "Pause & reflect"
                  : "Зупинитися і записати"
              );

      }
    );

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
        entries => {

          entries.forEach(entry => {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            entry.target.classList.add(
              "visible"
            );


            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.15
        }
      );


    animatedElements.forEach(
      element => {

        observer.observe(
          element
        );

      }
    );

  } else {

    animatedElements.forEach(
      element => {

        element.classList.add(
          "visible"
        );

      }
    );

  }


  /* =======================================================
     NAVIGATION HIDE ON SCROLL
  ======================================================= */

  const nav =
    document.querySelector(
      ".emotions-nav"
    );


  if (nav) {

    let lastScrollY =
      window.scrollY;


    window.addEventListener(
      "scroll",
      () => {

        const currentScrollY =
          window.scrollY;


        /* Always show near top */

        if (
          currentScrollY <= 100
        ) {

          nav.classList.remove(
            "nav-hidden"
          );

        }


        /* Scrolling down */

        else if (
          currentScrollY > lastScrollY
        ) {

          nav.classList.add(
            "nav-hidden"
          );

        }


        /* Scrolling up */

        else {

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

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute(
            "href"
          );


        if (
          !targetId ||
          targetId === "#"
        ) {

          return;

        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


  /* =======================================================
     ACCESS REQUEST FORM
  ======================================================= */

  const accessForm =
    document.getElementById(
      "accessRequestForm"
    );


  const requestStatus =
    document.getElementById(
      "requestStatus"
    );


  if (accessForm) {

    accessForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const name =
          document.getElementById(
            "requestName"
          )?.value.trim();


        const contact =
          document.getElementById(
            "requestContact"
          )?.value.trim();


        const payment =
          document.getElementById(
            "requestPayment"
          )?.value;


        const message =
          document.getElementById(
            "requestMessage"
          )?.value.trim();


        /* Validation */

        if (
          !name ||
          !contact ||
          !payment
        ) {

          if (requestStatus) {

            requestStatus.hidden =
              false;

            requestStatus.style.display =
              "block";

            requestStatus.textContent =
              "Будь ласка, заповни всі обов'язкові поля.";

          }

          return;

        }


        /* Temporary front-end handling */

        console.log(
          "Access request:",
          {
            name,
            contact,
            payment,
            message
          }
        );


        if (requestStatus) {

          requestStatus.hidden =
            false;

          requestStatus.style.display =
            "block";

          requestStatus.textContent =
            "Дякуємо! Запит отримано.";

        }


        accessForm.reset();

      }
    );

  }

});
