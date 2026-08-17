/* =========================================================
   EMOTIONS PAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     LANGUAGE
  ========================================================= */

  const pageUk = document.getElementById("page-uk");
  const pageEn = document.getElementById("page-en");

  const languageButtons = document.querySelectorAll(
    ".lang-switch [data-lang]"
  );


  window.setLanguage = function (lang) {

    if (!pageUk || !pageEn) return;

    if (lang === "en") {

      pageUk.classList.remove("active");
      pageEn.classList.add("active");

    } else {

      pageEn.classList.remove("active");
      pageUk.classList.add("active");

      lang = "uk";
    }


    /* Update language switch */

    languageButtons.forEach(function (button) {

      button.classList.toggle(
        "active",
        button.dataset.lang === lang
      );

    });


    /* Remember language */

    try {
      localStorage.setItem("emotionsLanguage", lang);
    } catch (error) {
      /* localStorage may be unavailable */
    }


    /* Update document language */

    document.documentElement.lang = lang;


    /* Close modal when switching language */

    closeDonationModal();
  };


  /* =========================================================
     INITIAL LANGUAGE
  ========================================================= */

  let savedLanguage = "uk";

  try {

    const storedLanguage =
      localStorage.getItem("emotionsLanguage");

    if (storedLanguage === "en" || storedLanguage === "uk") {
      savedLanguage = storedLanguage;
    }

  } catch (error) {
    /* use Ukrainian by default */
  }


  window.setLanguage(savedLanguage);



  /* =========================================================
     REFLECTION BOXES
  ========================================================= */

  window.toggleReflection = function (button) {

    if (!button) return;

    const box = button.nextElementSibling;

    if (!box || !box.classList.contains("reflection-box")) {
      return;
    }


    const isOpen = box.classList.contains("open");

    box.classList.toggle("open", !isOpen);

    button.classList.toggle("active", !isOpen);


    if (!isOpen) {

      setTimeout(function () {

        const textarea = box.querySelector("textarea");

        if (textarea) {
          textarea.focus();
        }

      }, 100);

    }

  };



  /* =========================================================
     DONATION MODAL
  ========================================================= */

  const donateModal =
    document.getElementById("donateModal");

  const closeModalButton =
    document.getElementById("closeModal");

  const donateButtonUk =
    document.getElementById("emotionsDonateBtn");

  const donateButtonEn =
    document.getElementById("emotionsDonateBtnEn");


  function openDonationModal() {

    if (!donateModal) return;

    donateModal.classList.add("active");

    document.body.classList.add("modal-open");


    /* Always open first tab */

    activateDonationTab("paypal");


    /* Prevent background scroll */

    document.body.style.overflow = "hidden";

  }


  window.openDonationModal = openDonationModal;



  function closeDonationModal() {

    if (!donateModal) return;

    donateModal.classList.remove("active");

    document.body.classList.remove("modal-open");

    document.body.style.overflow = "";

  }


  window.closeDonationModal = closeDonationModal;



  /* Donation buttons */

  if (donateButtonUk) {

    donateButtonUk.addEventListener(
      "click",
      openDonationModal
    );

  }


  if (donateButtonEn) {

    donateButtonEn.addEventListener(
      "click",
      openDonationModal
    );

  }



  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  if (closeModalButton) {

    closeModalButton.addEventListener(
      "click",
      closeDonationModal
    );


    closeModalButton.addEventListener(
      "keydown",
      function (event) {

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



  /* Close by clicking outside */

  if (donateModal) {

    donateModal.addEventListener(
      "click",
      function (event) {

        if (event.target === donateModal) {
          closeDonationModal();
        }

      }
    );

  }



  /* Close by Escape */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        donateModal &&
        donateModal.classList.contains("active")
      ) {

        closeDonationModal();

      }

    }
  );



  /* =========================================================
     DONATION TABS
  ========================================================= */

  const tabButtons =
    document.querySelectorAll(".donate-tabs .tab-btn");

  const tabContents =
    document.querySelectorAll(".donate-modal .tab-content");


  function activateDonationTab(tabName) {

    tabButtons.forEach(function (button) {

      button.classList.toggle(
        "active",
        button.dataset.tab === tabName
      );

    });


    tabContents.forEach(function (content) {

      content.classList.toggle(
        "active",
        content.id === tabName
      );

    });

  }


  tabButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        const tabName = button.dataset.tab;

        if (tabName) {
          activateDonationTab(tabName);
        }

      }
    );

  });



  /* =========================================================
     COPY BUTTONS
  ========================================================= */

  async function copyText(text, button) {

    if (!text) return;

    try {

      await navigator.clipboard.writeText(text);

      showCopySuccess(button);

    } catch (error) {

      /* Fallback for older browsers */

      const textarea =
        document.createElement("textarea");

      textarea.value = text;

      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.select();

      try {
        document.execCommand("copy");
        showCopySuccess(button);
      } catch (copyError) {
        console.error("Copy failed:", copyError);
      }

      document.body.removeChild(textarea);

    }

  }



  function showCopySuccess(button) {

    if (!button) return;

    const originalText =
      button.dataset.originalText ||
      button.textContent;

    button.dataset.originalText = originalText;

    button.textContent = "Copied ✓";

    button.classList.add("copied");


    setTimeout(function () {

      button.textContent = originalText;

      button.classList.remove("copied");

    }, 1800);

  }



  /* Wise */

  const copyWise =
    document.getElementById("copyWise");


  if (copyWise) {

    copyWise.addEventListener(
      "click",
      function () {

        const details =
          "BE82 9053 0838 8568";

        copyText(details, copyWise);

      }
    );

  }



  /* Card */

  const copyCard =
    document.getElementById("copyCard");


  if (copyCard) {

    copyCard.addEventListener(
      "click",
      function () {

        const cardNumber =
          "4323 3450 5365 5222";

        copyText(cardNumber, copyCard);

      }
    );

  }



  /* =========================================================
     CRYPTO WALLET
  ========================================================= */

  const copyWallet =
    document.getElementById("copyWallet");

  const showWallet =
    document.getElementById("showWallet");

  const walletAddress =
    document.getElementById("walletAddress");


  const wallet =
    "TLg3NrPEcMphcXSrAWVdmLc9QmAhAwKJ5G";


  if (copyWallet) {

    copyWallet.addEventListener(
      "click",
      function () {

        copyText(wallet, copyWallet);

      }
    );

  }


  if (showWallet && walletAddress) {

    showWallet.addEventListener(
      "click",
      function () {

        const isHidden =
          walletAddress.style.display === "none";


        if (isHidden) {

          walletAddress.style.display = "block";

          showWallet.textContent = "Hide wallet";

        } else {

          walletAddress.style.display = "none";

          showWallet.textContent = "Show wallet";

        }

      }
    );

  }



  /* =========================================================
     ACCESS REQUEST
  ========================================================= */

  const openAccessRequest =
    document.getElementById("openAccessRequest");

  const accessRequestPanel =
    document.getElementById("accessRequestPanel");


  if (openAccessRequest && accessRequestPanel) {

    openAccessRequest.addEventListener(
      "click",
      function () {

        const isOpen =
          accessRequestPanel.style.display !== "none";


        if (isOpen) {

          accessRequestPanel.style.display = "none";

          openAccessRequest.textContent =
            "Отримати доступ";

        } else {

          accessRequestPanel.style.display = "block";

          openAccessRequest.textContent =
            "Сховати";

          setTimeout(function () {

            accessRequestPanel.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });

          }, 50);

        }

      }
    );

  }



  /* =========================================================
     ACCESS REQUEST FORM
  ========================================================= */

  const accessForm =
    document.getElementById("accessRequestForm");

  const requestStatus =
    document.getElementById("requestStatus");


  if (accessForm) {

    accessForm.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();


        const name =
          document.getElementById("requestName")?.value.trim();

        const contact =
          document.getElementById("requestContact")?.value.trim();

        const payment =
          document.getElementById("requestPayment")?.value;

        const message =
          document.getElementById("requestMessage")?.value.trim();


        if (!name || !contact || !payment) {

          showRequestStatus(
            "Будь ласка, заповни обов'язкові поля.",
            "error"
          );

          return;

        }


        /*
         * IMPORTANT:
         * Тут поки немає backend/API.
         *
         * Тому форма не відправляє дані нікуди.
         * Якщо у тебе вже є endpoint — вставимо його сюди.
         */


        console.log(
          "Access request:",
          {
            name,
            contact,
            payment,
            message
          }
        );


        showRequestStatus(
          "Дякуємо! Запит отримано.",
          "success"
        );


        accessForm.reset();

      }
    );

  }



  function showRequestStatus(message, type) {

    if (!requestStatus) return;

    requestStatus.textContent = message;

    requestStatus.style.display = "block";

    requestStatus.classList.remove(
      "success",
      "error"
    );

    requestStatus.classList.add(type);

  }



  /* =========================================================
     PROTECTED CONTENT
  ========================================================= */

  /*
   * There are TWO #protected-content elements in the HTML:
   * one inside UA and one inside EN.
   *
   * Therefore we intentionally use querySelectorAll()
   * instead of getElementById().
   */

  const protectedBlocks =
    document.querySelectorAll("#protected-content");


  window.setProtectedContentVisible = function (visible) {

    protectedBlocks.forEach(function (block) {

      block.style.display =
        visible ? "" : "none";

    });

  };



  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        const targetId =
          link.getAttribute("href");

        if (!targetId || targetId === "#") {
          return;
        }


        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });



  /* =========================================================
     FINAL INITIALIZATION
  ========================================================= */

  console.log(
    "Emotions page initialized."
  );

});
