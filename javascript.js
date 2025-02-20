// import { todayDeal } from "./todayDeal.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
  
  import { 
    getFirestore, 
    collection, 
    addDoc, 
    setDoc, 
    getDocs, 
    onSnapshot, 
    doc, 
    deleteDoc 
  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
  

const firebaseConfig = {
  apiKey: "AIzaSyCJ7RFaClh-5MSeLBGIXQPp-ASLjL6dShE",
  authDomain: "fir-d4c36.firebaseapp.com",
  projectId: "fir-d4c36",
  storageBucket: "fir-d4c36.firebasestorage.app",
  messagingSenderId: "522426955922",
  appId: "1:522426955922:web:4bb9c7c1bcb61bf07c0e4b",
  measurementId: "G-2VMPLENKEY"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const todayDealRef = collection(db, "todayDeals");







let slideBtnLeft = document.getElementById("slide-btn-left")
let slideBtnRight = document.getElementById("slide-btn-right")
let imgItem = document.querySelectorAll(".image-item")


console.log(imgItem.length - 1)

let startSlider = 0
let endSlider = (imgItem.length - 1) * 100  

slideBtnLeft.addEventListener("click", handleLeftBtn)

function handleLeftBtn() {
    if (startSlider < 0) {
        startSlider = startSlider + 100;
    }
    imgItem.forEach(element => {
        element.style.transform = `translateX(${startSlider}%)`;
    })
}

slideBtnRight.addEventListener("click", handleRightBtn)

function handleRightBtn() {
    if (startSlider >= -endSlider + 100) {
        startSlider = startSlider - 100;
    }
    imgItem.forEach(element => {
        element.style.transform = `translateX(${startSlider}%)`;
    })

}

function renderSlideAuto() {

    if (startSlider >= -endSlider + 100) {
        handleRightBtn()
    }
    else {
        startSlider = 0;
    }
}
setInterval(renderSlideAuto, 2000);





const sidebarNavigationEl = document.getElementById("sidebar-container-navigation-id")
const sidebarOpenNavigationEl = document.getElementById("open-nav-sidebar")
const sidebarCloseNavigationEl = document.getElementById("sidebar-navigation-close")




sidebarOpenNavigationEl.addEventListener("click", () => {
    sidebarNavigationEl.classList.toggle("slidebar-show")
})
sidebarCloseNavigationEl.addEventListener("click", () => {
    sidebarNavigationEl.classList.toggle("slidebar-show")
})



const todayDealProductListEl = document.querySelector(".today_deals_product_list");
const today_deal_btn_prevEl = document.getElementById("today_deal_btn_prev");
const today_deal_btn_nextEl = document.getElementById("today_deal_btn_next");

const pageSize = 4;
let currentPage = 0;
let todayDeal = [];
let totalPages = 0;


onSnapshot(todayDealRef, (snapshot) => {
    todayDeal =    snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    totalPages = Math.ceil(todayDeal.length / pageSize);
    renderPage();
});


function renderPage() {
    todayDealProductListEl.innerHTML = "";  

    let start = currentPage * pageSize;
    let end = start + pageSize;
    let currentItems = todayDeal.slice(start, end);

    currentItems.forEach((item) => {
        let itemHTML = `
        <div class="today_deals_product_item">
            <div class="todayDeals_product_image">
                <img src=${item.img} />
            </div>
            <div class="discount_Contaienr">
                <a href="#">Up to ${item.discount}% off</a>
                <a href="#">${item.DealOfDay}</a>
            </div>
            <p>${item.desc}</p>
        </div>
        `;
        todayDealProductListEl.innerHTML += itemHTML;
    });

    
    today_deal_btn_prevEl.disabled = currentPage === 0;
    today_deal_btn_nextEl.disabled = currentPage === totalPages - 1;
}


today_deal_btn_prevEl.addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        renderPage();
    }
});

today_deal_btn_nextEl.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
        currentPage++;
        renderPage();
    }
});


renderPage();