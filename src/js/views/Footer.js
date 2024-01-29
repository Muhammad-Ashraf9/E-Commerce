import { getCurrentUser } from "../model.js";
export default function renderFooter(element) {
  const footer = `
</li>
  <div class="p-2 ps-5 mt-2 bg-light">
    <div class="container-fluid">
      <div class="row text-center p-3">
        <div class="col-lg-3 col-md-6 p-2">
          <div class="d-flex flex-nowrap">
            <img width="40 px" src="../assets/trophy 1.svg" alt="">
            <div class="text-start mx-3">
              <span class="fw-bold fs-6">High Quality</span><br> 
              <span class="fw-light text-secondary">crafted from top materials</span>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 p-2">
          <div class="d-flex flex-nowrap">
            <img width="40 px" src="../assets/guarantee.svg" alt="">
            <div class="text-start mx-3">
              <span class="fw-bold fs-6">Warranty Protection</span><br> 
              <span class="fw-light text-secondary">Over 2 years</span>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 p-2">
          <div class="d-flex flex-nowrap">
            <img width="40 px" src="../assets/shipping.svg" alt="">
            <div class="text-start mx-3">
              <span class="fw-bold fs-6">Free Shipping</span><br> 
              <span class="fw-light text-secondary">Order over 150 $</span>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 p-2">
          <div class="d-flex flex-nowrap">
            <img width="40 px" src="../assets/customer-support.svg" alt="">
            <div class="text-start mx-3">
              <span class="fw-bold fs-6">24 / 7 Support</span><br> 
              <span class="fw-light text-secondary">Dedicated support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer>
  <div class="footer-top">
    <div class="container">
      <div class="row">
        <div id="about" class="col-md-3 footer-about ">
        
          <h3> <img width="60vw" src="../assets/logo.png" alt="logo">  Furniro</h3>
          <p>
            We are a young company selling high quality furniture with low cost, and delivering it to our customer's house to make sure of their comfort and happiness.
          </p>
          <p class="fs-3 fw-bold ">&copy; Furniro Inc.</p>
              </div>
        <div id="contact" class="col-md-4 offset-md-1 footer-contact ">
          <h3 class="pb-3">Contact</h3>
              <p><i class="fas fa-map-marker-alt"></i> 78 madrb st, Mansoura Egypt</p>
              <p><i class="fas fa-phone"></i> Phone: 01094335757</p>
              <p><i class="fas fa-envelope"></i> Email: <a href="mailto:furniro@domain.com">furniro@domain.com</a></p>
              <p><i class="fab fa-telegram"></i> Telegram: 01094335757</p>
              </div>
              <div class="col-md-4 footer-links p">
                <div class="row">
                  <div class="col  ">
                    <h3 class="pb-3">Links</h3>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <p><a class="scroll-link" href="NewMain.html">Home</a></p>
                    <p><a href="Products_tester.html">Products</a></p>
                    <p><a href="cart_page.html">Your Cart</a></p>
                  </div>
                </div>
              </div>
        </div>
    </div>
    <hr>
  <div class="footer-bottom">
    <div class="container">
      <div class="row">
           <div class="col footer-social">
                <a target=blank href="https://www.facebook.com/search/top?q=muhammad%20ashraf"><i class="fab fa-facebook-f"></i></a> 
                <a target=blank href="https://twitter.com/AbdoUsama18"><i class="fab fa-twitter"></i></a> 
                <a target=blank href="https://www.instagram.com/abd_usama/?igshid=ZDdkNTZiNTM%3D"><i class="fab fa-instagram"></i></a> 
                <a target=blank href="https://github.com/Muhammad-Ashraf9/E-Commerce"><i class="fab fa-github"></i></a>
              </div>
         </div>
    </div>
  </div>
  </div>
</footer>`;
  element.insertAdjacentHTML("beforeend", footer);
}
