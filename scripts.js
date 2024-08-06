document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("close-btn");
  const bannerImg = document.getElementById("cta-banner-img");

  const images = [
    "./banners/CTA-banner1.jpg",
    "./banners/CTA-banner2.jpg",
    "./banners/CTA-banner3.jpg",
    "./banners/CTA-banner4.jpg",
  ];

  function showPopup() {
    popup.style.display = "flex"; // Show the popup
    setTimeout(() => {
      popup.style.display = "none"; // Hide the popup after 15 seconds
    }, 15000);
  }

  // FOR TESTING PURPOSES - SET TO 10 SECONDS

  // function checkCookie() {
  //   const lastShown = getCookie("popupShown");
  //   const now = new Date();
  //   const testDuration = 10 * 1000; // 10 seconds for testing purposes

  //   if (!lastShown || now - new Date(lastShown) >= testDuration) {
  //     const imageIndex = getImageIndex();
  //     bannerImg.src = images[imageIndex];
  //     showPopup();
  //     setCookie("popupShown", now.toISOString(), 0.00011574); // Set cookie for 10 seconds
  //   }
  // }

  // Function to check the cookie and determine if the popup should be shown
  function checkCookie() {
    const lastShown = getCookie("popupShown");
    const now = new Date();
    const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    if (!lastShown || now - new Date(lastShown) >= sevenDays) {
      const imageIndex = getImageIndex();
      bannerImg.src = images[imageIndex];
      showPopup();
      setCookie("popupShown", now.toISOString(), 7); // Set cookie for 7 days
    }
  }
  // Function to set a cookie
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  // Function to get a cookie value by name
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Function to get the image index, ensuring sequential rotation
  function getImageIndex() {
    const imageIndex = getCookie("imageIndex");
    if (imageIndex !== null) {
      return parseInt(imageIndex);
    } else {
      const now = new Date();
      const weekNumber = Math.floor(now.getTime() / (7 * 24 * 60 * 60 * 1000));
      const newIndex = weekNumber % images.length;
      setCookie("imageIndex", newIndex, 7); // Store the new index in a cookie for 7 days
      return newIndex;
    }
  }

  // FOR TESTING PURPOSES - SET TO 10 SECONDS
  // function getImageIndex() {
  //   const imageIndex = getCookie("imageIndex");
  //   if (imageIndex !== null) {
  //     return parseInt(imageIndex);
  //   } else {
  //     const now = new Date();
  //     const testDuration = 10 * 1000; // 10 seconds for testing purposes
  //     const periodNumber = Math.floor(now.getTime() / testDuration);
  //     const newIndex = periodNumber % images.length;
  //     setCookie("imageIndex", newIndex, 0.00011574); // Store the new index in a cookie for 10 seconds
  //     return newIndex;
  //   }
  // }

  // Event listener to close the popup when the close button is clicked
  closeBtn.addEventListener("click", function () {
    popup.style.display = "none";
  });

  // Initial check to possibly show the popup based on the cookie
  checkCookie();
});
