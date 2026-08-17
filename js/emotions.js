/* =========================================================
   EMOTIONS PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     NAVIGATION HIDE / SHOW
  ======================================================= */

  const nav = document.querySelector(".emotions-nav");

  if (nav) {

    let lastScrollY = window.scrollY;

    window.addEventListener(
      "scroll",
      () => {

        const currentScrollY =
          window.scrollY;

        if (
          currentScrollY > lastScrollY &&
          currentScrollY > 120
        ) {

          nav.classList.add("nav-hidden");

        } else {

          nav.classList.remove("nav-hidden");

        }

        lastScrollY = currentScrollY;

      },
      { passive: true }
    );

  }


  /* =======================================================
     LANGUAGE SWITCH
  ======================================================= */

  const pageUK =
    document.getElementById("page-uk");

  const pageEN =
    document.getElementById("page-en");

  const langButtons =
    document.querySelectorAll(
      ".lang-switch span"
    );


  function setLanguage(language) {

    if (!pageUK || !pageEN) {
      return;
    }


    if (language === "en") {

      pageUK.style.display = "none";
      pageEN.style.display = "block";

    } else {

      pageUK.style.display = "block";
      pageEN.style.display = "none";

    }


    langButtons.forEach(button => {

      const buttonLanguage =
        button.dataset.lang;

      button.classList.toggle(
        "active",
        buttonLanguage === language
      );

    });


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


  langButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const language =
          button.dataset.lang;

        if (language) {
          setLanguage(language);
        }

      }
    );

  });


  let savedLanguage = "uk";

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

  setLanguage(savedLanguage);


  /* =======================================================
     DONATION MODAL
  ======================================================= */

  const modal =
    document.querySelector(".donate-modal");


  if (modal) {

    const openButtons =
      document.querySelectorAll(
        ".donate-link[data-donate], " +
        ".emotion-button[data-donate], " +
        "[data-open-donation]"
      );


    const closeButton =
      modal.querySelector(".close-modal");


    function openModal() {

      modal.classList.add("active");

      document.body.classList.add(
        "modal-open"
      );

    }


    function closeModal() {

      modal.classList.remove("active");

      document.body.classList.remove(
        "modal-open"
      );

    }


    openButtons.forEach(button => {

      button.addEventListener(
        "click",
        event => {

          event.preventDefault();

          openModal();

        }
      );

    });


    if (closeButton) {

      closeButton.addEventListener(
        "click",
        event => {

          event.preventDefault();

          closeModal();

        }
      );

    }


    /* -------------------------------------------------------
       CLICK OUTSIDE MODAL
    ------------------------------------------------------- */

    modal.addEventListener(
      "click",
      event => {

        if (
          event.target === modal
        ) {

          closeModal();

        }

      }
    );


    /* -------------------------------------------------------
       ESC
    ------------------------------------------------------- */

    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape" &&
          modal.classList.contains("active")
        ) {

          closeModal();

        }

      }
    );


    /* =======================================================
       DONATION TABS
    ======================================================= */

    const tabs =
      modal.querySelectorAll(
        ".donate-tabs .tab-btn"
      );

    const contents =
      modal.querySelectorAll(
        ".tab-content"
      );


    tabs.forEach(tab => {

      tab.addEventListener(
        "click",
        () => {

          const target =
            tab.dataset.tab;

          if (!target) {
            return;
          }


          tabs.forEach(item => {

            item.classList.remove(
              "active"
            );

          });


          contents.forEach(content => {

            content.classList.remove(
              "active"
            );

          });


          tab.classList.add(
            "active"
          );


          const targetContent =
            modal.querySelector(
              `.tab-content[data-tab-content="${target}"]`
            );


          if (targetContent) {

            targetContent.classList.add(
              "active"
            );

          }

        }
      );

    });


    /* =======================================================
       COPY BUTTONS
    ======================================================= */

    const copyButtons =
      modal.querySelectorAll(
        ".copy-btn"
      );


    copyButtons.forEach(button => {

      button.addEventListener(
        "click",
        async () => {

          const targetSelector =
            button.dataset.copy;

          if (!targetSelector) {
            return;
          }


          const target =
            modal.querySelector(
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

    });


    /* =======================================================
       SHOW WALLET
    ======================================================= */

    const walletButtons =
      modal.querySelectorAll(
        ".show-wallet"
      );


    walletButtons.forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const targetSelector =
            button.dataset.target;


          if (!targetSelector) {
            return;
          }


          const target =
            modal.querySelector(
              targetSelector
            );


          if (!target) {
            return;
          }


          const isHidden =
            target.style.display === "none";


          target.style.display =
            isHidden
              ? "block"
              : "none";

        }
      );

    });

  }


  /* =======================================================
     REFLECTION TOGGLES
  ======================================================= */

  const reflectionButtons =
    document.querySelectorAll(
      ".reflection-toggle"
    );


  reflectionButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const targetId =
          button.dataset.target;

        if (!targetId) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) {
          return;
        }


        target.classList.toggle(
          "open"
        );

      }
    );

  });


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

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

            }

          });

        },
        {
          threshold: 0.15
        }
      );


    animatedElements.forEach(
      element => observer.observe(element)
    );

  } else {

    animatedElements.forEach(
      element =>
        element.classList.add("visible")
    );

  }

});
