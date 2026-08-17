<!-- =========================================================
     MODAL FALLBACK / VISUAL BEHAVIOUR
========================================================= -->

<script>

  /*
   * Keeps the modal independent from the page layout.
   * Existing emotions.js functionality is preserved.
   */

  document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("donateModal");
    const closeButton = document.getElementById("closeModal");

    const openButtons = [
      document.getElementById("emotionsDonateBtn"),
      document.getElementById("emotionsDonateBtnEn")
    ].filter(Boolean);


    function openAccessModal() {

      if (!modal) return;

      modal.style.display = "flex";

      requestAnimationFrame(function () {
        modal.classList.add("show");
      });

      document.body.style.overflow = "hidden";
    }


    function closeAccessModal() {

      if (!modal) return;

      modal.classList.remove("show");

      setTimeout(function () {
        modal.style.display = "none";
      }, 250);

      document.body.style.overflow = "";
    }


    openButtons.forEach(function (button) {

      button.addEventListener("click", function (event) {

        event.preventDefault();

        openAccessModal();

      });

    });


    if (closeButton) {

      closeButton.addEventListener("click", closeAccessModal);

      closeButton.addEventListener("keydown", function (event) {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          closeAccessModal();

        }

      });

    }


    if (modal) {

      modal.addEventListener("click", function (event) {

        if (event.target === modal) {
          closeAccessModal();
        }

      });

    }


    document.addEventListener("keydown", function (event) {

      if (event.key === "Escape") {
        closeAccessModal();
      }

    });


    /* PAYMENT TABS */

    const tabs = document.querySelectorAll(".donate-tabs .tab-btn");
    const contents = document.querySelectorAll(".tab-content");


    tabs.forEach(function (tab) {

      tab.addEventListener("click", function () {

        const target = tab.dataset.tab;

        tabs.forEach(function (item) {
          item.classList.remove("active");
        });

        contents.forEach(function (content) {
          content.classList.remove("active");
        });

        tab.classList.add("active");

        const targetContent = document.getElementById(target);

        if (targetContent) {
          targetContent.classList.add("active");
        }

      });

    });


    /* COPY WISE */

    const copyWise = document.getElementById("copyWise");

    if (copyWise) {

      copyWise.addEventListener("click", async function () {

        try {

          await navigator.clipboard.writeText(
            "BE82 9053 0838 8568"
          );

          const originalText = copyWise.textContent;

          copyWise.textContent = "Copied";

          setTimeout(function () {
            copyWise.textContent = originalText;
          }, 1500);

        } catch (error) {

          console.error("Could not copy Wise details.", error);

        }

      });

    }


    /* COPY CARD */

    const copyCard = document.getElementById("copyCard");

    if (copyCard) {

      copyCard.addEventListener("click", async function () {

        try {

          await navigator.clipboard.writeText(
            "4323 3450 5365 5222"
          );

          const originalText = copyCard.textContent;

          copyCard.textContent = "Copied";

          setTimeout(function () {
            copyCard.textContent = originalText;
          }, 1500);

        } catch (error) {

          console.error("Could not copy card number.", error);

        }

      });

    }


    /* COPY USDT */

    const copyWallet = document.getElementById("copyWallet");

    if (copyWallet) {

      copyWallet.addEventListener("click", async function () {

        try {

          await navigator.clipboard.writeText(
            "TLg3NrPEcMphcXSrAWVdmLc9QmAhAwKJ5G"
          );

          const originalText = copyWallet.textContent;

          copyWallet.textContent = "Copied";

          setTimeout(function () {
            copyWallet.textContent = originalText;
          }, 1500);

        } catch (error) {

          console.error("Could not copy wallet address.", error);

        }

      });

    }


    /* SHOW USDT WALLET */

    const showWallet = document.getElementById("showWallet");
    const walletAddress = document.getElementById("walletAddress");

    if (showWallet && walletAddress) {

      showWallet.addEventListener("click", function () {

        const isHidden =
          walletAddress.style.display === "none";

        walletAddress.style.display =
          isHidden ? "block" : "none";

        showWallet.textContent =
          isHidden ? "Hide wallet" : "Show wallet";

      });

    }

  });

</script>
