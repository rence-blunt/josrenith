document.addEventListener("DOMContentLoaded", () => {
  // ----- Group card click event on home page -----
  document.querySelectorAll(".group-card").forEach(card => {
    card.addEventListener("click", () => {
      const group = card.getAttribute("data-group");
      window.location.href = `group-form.html?group=${encodeURIComponent(group)}`;
    });
  });

  // ----- Load group name on form page -----
  const params = new URLSearchParams(window.location.search);
  const group = params.get("group");
  if (group) {
    const formTitle = document.getElementById("form-title");
    if (formTitle) formTitle.innerText = `${group} - Member Form`;
    
    // If you want to keep group as a hidden field, make sure it exists in the form HTML
    const groupInput = document.getElementById("group");
    if (groupInput) groupInput.value = group;
  }

  // ----- Elements -----
  const form = document.getElementById("groupForm");
  const formMessage = document.getElementById("form-message");
  const dayStudentRadio = document.getElementById("dayStudent");
  const hostelerRadio = document.getElementById("hosteler");
  const hostelContainer = document.getElementById("hostelContainer");
  const hostelSelect = document.getElementById("hostel");
  const yearSelect = document.getElementById("year");
  const customYearInput = document.getElementById("customYear");

  // ----- Toggle hostel dropdown based on student type -----
  function toggleHostel() {
    if (hostelerRadio && hostelerRadio.checked) {
      hostelContainer.style.display = "block";
      hostelSelect.required = true;
    } else {
      hostelContainer.style.display = "none";
      hostelSelect.required = false;
      hostelSelect.value = "";
    }
  }

  // ----- Toggle custom year input if "Other" selected -----
  function toggleCustomYear() {
    if (yearSelect && yearSelect.value === "Other") {
      customYearInput.style.display = "block";
      customYearInput.required = true;
    } else {
      customYearInput.style.display = "none";
      customYearInput.required = false;
      customYearInput.value = "";
    }
  }

  // Attach event listeners for toggling
  if (dayStudentRadio && hostelerRadio) {
    dayStudentRadio.addEventListener("change", toggleHostel);
    hostelerRadio.addEventListener("change", toggleHostel);
  }
  if (yearSelect) {
    yearSelect.addEventListener("change", toggleCustomYear);
  }

  // Initialize visibility on load
  toggleHostel();
  toggleCustomYear();

  // ----- Optional: Toggle info text boxes when clicking on question mark icons -----
  document.querySelectorAll(".info-icon").forEach(icon => {
    icon.addEventListener("click", () => {
      const infoId = icon.getAttribute("data-info");
      const infoBox = document.getElementById(infoId);
      if (infoBox.style.display === "block") {
        infoBox.style.display = "none";
      } else {
        infoBox.style.display = "block";
      }
    });
  });

  // ----- Handle form submission -----
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Collect form data
      const data = {
        group: form.group ? form.group.value : "", // make sure to add a hidden input with id="group" if needed
        fullName: form.fullName.value,
        mobileNumber: form.mobileNumber.value,
        email: form.email.value,
        studentType: hostelerRadio && hostelerRadio.checked ? "Hosteler" : "Day Student",
        hostel: hostelSelect.value || null,
        dob: form.dob.value,
        year: yearSelect.value === "Other" ? customYearInput.value : yearSelect.value,
        hometown: form.hometown.value,
        comment: form.comment.value,
      };

      try {
        const res = await fetch("http://localhost:5000/api/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        if (res.ok) {
          formMessage.textContent = "Submission successful!";
          form.reset();
          toggleHostel();
          toggleCustomYear();
        } else {
          formMessage.textContent = "Submission failed. Please try again.";
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        formMessage.textContent = "Network error. Please check your connection.";
      }
    });
  }
});

// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDC6sfUR6XBVsbihLY9BdIVJGfVMsH8tJM",
  authDomain: "josrenithdata.firebaseapp.com",
  projectId: "josrenithdata",
  storageBucket: "josrenithdata.appspot.com",
  messagingSenderId: "927727164934",
  appId: "1:927727164934:web:571201ca8783b143c76d87",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


document.getElementById("groupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    fullName: document.getElementById("fullName").value,
    mobileNumber: document.getElementById("mobileNumber").value,
    email: document.getElementById("email").value,
    studentType: document.querySelector('input[name="studentType"]:checked')?.value,
    hostel: document.getElementById("hostel").value || "",
    dob: document.getElementById("dob").value,
    year: document.getElementById("year").value === "Other"
           ? document.getElementById("customYear").value
           : document.getElementById("year").value,
    hometown: document.getElementById("hometown").value,
    comment: document.getElementById("comment").value,
    timestamp: new Date().toISOString()
  };

  try {
    await addDoc(collection(db, "groupData"), formData);
    document.getElementById("form-message").innerText = "Form submitted successfully!";
    document.getElementById("groupForm").reset();
  } catch (err) {
    console.error("Error adding document: ", err);
    document.getElementById("form-message").innerText = "Error submitting form.";
  }
});
