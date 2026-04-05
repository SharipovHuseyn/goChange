/**
 * Mobile Menu Handler
 * Управляет открытием и закрытием мобильного меню
 */

// ========================
// DOM Elements
// ========================
const burgerButton = document.querySelector('.header__burger');
const mobileMenuOverlay = document.querySelector('.mobile__menu__overlay');
const mobileMenu = document.querySelector('.mobile__menu');
const closeMenuButton = document.querySelector('.mobile__menu__close');
const mobileMenuLinks = document.querySelectorAll('.mobile__menu__link');

// ========================
// Menu State
// ========================
let isMenuOpen = false;

// ========================
// Menu Toggle Function
// ========================
function toggleMenu() {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    openMenu();
  } else {
    closeMenu();
  }
}

// ========================
// Open Menu
// ========================
function openMenu() {
  mobileMenuOverlay.classList.add('active');
  mobileMenu.classList.add('active');
  burgerButton.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent body scroll
}

// ========================
// Close Menu
// ========================
function closeMenu() {
  mobileMenuOverlay.classList.remove('active');
  mobileMenu.classList.remove('active');
  burgerButton.classList.remove('active');
  document.body.style.overflow = 'auto'; // Enable body scroll
}

// ========================
// Event Listeners
// ========================

// Open menu on burger button click
burgerButton.addEventListener('click', toggleMenu);

// Close menu on X button click
closeMenuButton.addEventListener('click', closeMenu);

// Close menu when clicking overlay
mobileMenuOverlay.addEventListener('click', closeMenu);

// Close menu when clicking on menu links
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior for demo
    closeMenu();
    // You can add your navigation logic here
  });
});

// ========================
// Responsive Behavior
// ========================
// Close menu if window is resized above breakpoint
window.addEventListener('resize', () => {
  if (window.innerWidth >= 975 && isMenuOpen) {
    closeMenu();
  }
});


/**
 * Form Handler
 * Управляет переключением табов и логикой формы
 */

// ========================
// DOM Elements for Form
// ========================
// const formTabs = document.querySelectorAll('.form__tab');
// const formRestartBtn = document.querySelector('.form__restart');
// const formInputs = {
//   spend: document.querySelector('.form__input__group:nth-of-type(1) .form__input'),
//   receive: document.querySelector('.form__input__group:nth-of-type(2) .form__input'),
// };
// const formSelect = document.querySelectorAll('.form__select');

// // safety: ensure the elements exist before using them



// // ========================
// // Form Tab Toggle
// // ========================
// formTabs.forEach(tab => {
//   tab.addEventListener('click', () => {
//     // Remove active class from all tabs
//     formTabs.forEach(t => t.classList.remove('active'));
//     // Add active class to clicked tab
//     tab.classList.add('active');
    
//     // Get tab name
//     const tabName = tab.getAttribute('data-tab');
//     // You can add logic here to switch between buy/sell
//     console.log('Switched to:', tabName);
//   });
// });

// // ========================
// // Form Restart Button
// // ========================
// if (formRestartBtn) {
//   formRestartBtn.addEventListener('click', () => {
//     // Reset input values if available
//     if (formInputs.spend) formInputs.spend.value = '6000';
//     if (formInputs.receive) formInputs.receive.value = '0.8511';
    
//     // Add rotation animation
//     formRestartBtn.style.transform = 'rotate(-360deg)';
//     setTimeout(() => {
//       formRestartBtn.style.transform = '';
//     }, 300);
//   });
// } else {
//   console.warn('formRestartBtn not found');
// }

// // ========================
// // Input Value Change Handler
// // ========================
// if (formInputs.spend && formInputs.receive) {
//   formInputs.spend.addEventListener('input', (e) => {
//     // Calculate output based on input
//     const value = parseFloat(e.target.value) || 0;
//     // Simple calculation (can be replaced with API call)
//     formInputs.receive.value = (value * 0.000141833).toFixed(4);
//   });
// }

// // ========================
// // Form Submit
// // ========================
// const cryptoForm = document.querySelector('.crypto__form');
// if (cryptoForm) {
//   cryptoForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     console.log('Form submitted');
//     // Add your form submission logic here
//   });
// } else {
//   console.warn('cryptoForm not found');
// }


// /**
//  * Custom Select Handler
//  * Управляет кастомными селектами с иконками
//  */

// // ========================
// // DOM Elements for Custom Select
// // ========================
// const customSelects = document.querySelectorAll('.custom__select');

// // ========================
// // Initialize Custom Selects
// // ========================
// if (customSelects && customSelects.length > 0) {
//   customSelects.forEach(selectContainer => {
//     const trigger = selectContainer.querySelector('.custom__select__trigger');
//     const dropdown = selectContainer.querySelector('.custom__select__dropdown');
//     const options = selectContainer.querySelectorAll('.custom__select__option');
//     const isInline = selectContainer.classList.contains('inline__select');

//     if (!trigger || !dropdown) return; // skip malformed container

//     // Toggle dropdown on trigger click
//     trigger.addEventListener('click', (e) => {
//       e.stopPropagation();
      
//       // Close other dropdowns
//       customSelects.forEach(other => {
//         if (other !== selectContainer) {
//           const otherTrigger = other.querySelector('.custom__select__trigger');
//           const otherDropdown = other.querySelector('[class*="__dropdown"]');
//           if (otherTrigger) otherTrigger.classList.remove('active');
//           if (otherDropdown) otherDropdown.classList.remove('active');
//         }
//       });

//       // Toggle current dropdown
//       trigger.classList.toggle('active');
//       dropdown.classList.toggle('active');
//     });

//     // Handle option selection
//     options.forEach(option => {
//       option.addEventListener('click', (e) => {
//         e.stopPropagation();
        
//         const selectedValue = option.getAttribute('data-value');
//         const selectedIcon = option.querySelector('img');
//         const selectedIconSpan = option.querySelector('.custom__select__icon');
//         const selectedText = option.querySelector('span:last-child').textContent;

//       // Update trigger display
//       const triggerIcon = trigger.querySelector('.custom__select__icon');
//       const triggerValue = trigger.querySelector('.custom__select__value');
//       const triggerIconContainer = trigger.querySelector('.inline__icon__container');

//       if (triggerIconContainer) {
//         // For inline select with icon container
//         const iconContainer = option.querySelector('.inline__icon__container') || option.querySelector('img') || option.querySelector('.custom__select__icon');
        
//         if (selectedIcon) {
//           // Remove old icon and add new one
//           const oldImg = triggerIconContainer.querySelector('img');
//           if (oldImg) oldImg.remove();
//           const newImg = selectedIcon.cloneNode(true);
//           triggerIconContainer.innerHTML = '';
//           triggerIconContainer.appendChild(newImg);
//         } else if (selectedIconSpan) {
//           // For currency icons (text)
//           triggerIconContainer.innerHTML = '';
//           const newSpan = document.createElement('span');
//           newSpan.className = 'custom__select__icon currency__icon';
//           newSpan.textContent = selectedIconSpan.textContent;
//           triggerIconContainer.appendChild(newSpan);
//         }
//       } else {
//         // For regular select
//         if (selectedIcon) {
//           triggerIcon.src = selectedIcon.src;
//         } else if (selectedIconSpan) {
//           triggerIcon.textContent = selectedIconSpan.textContent;
//         }
//       }

//       triggerValue.textContent = selectedText;

//       // Close dropdown
//       trigger.classList.remove('active');
//       dropdown.classList.remove('active');

//       // Mark as selected
//       options.forEach(opt => opt.classList.remove('selected'));
//       option.classList.add('selected');
//     });
//   });
// });

// // Close dropdowns when clicking outside
// document.addEventListener('click', (e) => {
//   customSelects.forEach(selectContainer => {
//     if (!selectContainer.contains(e.target)) {
//       const trigger = selectContainer.querySelector('.custom__select__trigger');
//       const dropdown = selectContainer.querySelector('[class*="__dropdown"]');
//       trigger.classList.remove('active');
//       dropdown.classList.remove('active');
//     }
//   });
// });

// // scroll helper for tracker button
// const trackerBtn = document.querySelector('.hero__tracker__btn');
// const nextSection = document.querySelector('.howitwork__section');
// if (trackerBtn && nextSection) {
//   trackerBtn.style.cursor = 'pointer';
//   trackerBtn.addEventListener('click', () => {
//     nextSection.scrollIntoView({ behavior: 'smooth' });
//   });
// }


// }


document.getElementById("langSelect").addEventListener("change", function () {
    if (this.value == "ru"){
        window.location.href = "index.html";
    } else{
    if (this.value) {
        window.location.href = this.value + ".html";
    }
}
});

document.getElementById("langSelectMob").addEventListener("change", function () {
    if (this.value == "ru"){
        window.location.href = "index.html";
    } else{
    if (this.value) {
        window.location.href = this.value + ".html";
    }
}
});



