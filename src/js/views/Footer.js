export default function renderFooter(element) {
  const footer = `
  <div class="p-2 ps-5 mt-2">
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
        <div class="col-md-3 footer-about ">
        
          <h3> <img width="60vw" src="../assets/logo.png" alt="logo">  Furniro</h3>
          <p>
            We are a young company always looking for new and creative ideas to help you with our products in your everyday work.
          </p>
          <p>&copy; Furniro Inc.</p>
              </div>
        <div class="col-md-4 offset-md-1 footer-contact ">
          <h3 class="pb-3">Contact</h3>
              <p><i class="fas fa-map-marker-alt"></i> Via Rossini 10, 10136 Turin Italy</p>
              <p><i class="fas fa-phone"></i> Phone: (0039) 333 12 68 347</p>
              <p><i class="fas fa-envelope"></i> Email: <a href="mailto:hello@domain.com">hello@domain.com</a></p>
              <p><i class="fab fa-skype"></i> Skype: you_online</p>
              </div>
              <div class="col-md-4 footer-links p">
                <div class="row">
                  <div class="col  ">
                    <h3 class="pb-3">Links</h3>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <p><a class="scroll-link" href="#top-content">Home</a></p>
                    <p><a href="#">Features</a></p>
                    <p><a href="#">How it works</a></p>
                    <p><a href="#">Our clients</a></p>
                  </div>
                  <div class="col-md-6">
                    <p><a href="#">Plans &amp; pricing</a></p>
                    <p><a href="#">Affiliates</a></p>
                    <p><a href="#">Terms</a></p>
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
                <a href="#"><i class="fab fa-facebook-f"></i></a> 
                <a href="#"><i class="fab fa-twitter"></i></a> 
                <a href="#"><i class="fab fa-google-plus-g"></i></a> 
                <a href="#"><i class="fab fa-instagram"></i></a> 
                <a href="#"><i class="fab fa-pinterest"></i></a>
              </div>
         </div>
    </div>
  </div>
  </div>
  
</footer>`;
  element.insertAdjacentHTML("beforeend", footer);
}
