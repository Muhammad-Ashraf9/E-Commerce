const footer = `   <footer class="bg-dark ">
        <div class="container">
            <div class="row">
              <div class="col-6">
                  <ul >
                    <li><a href="#">About us</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Android App</a></li>
                    <li><a href="#">IOS App</a></li>
                  </ul>
                </div>
                <div id="footBrands" class="col-6">
                  <ul>
                    <li><a id="ff" href="#"><i class="fa-brands fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                    <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                    <li><a href="#"><i class="fa-brands fa-x-twitter"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
      </footer>`;

export default function renderFooter(element) {
  element.insertAdjacentHTML("beforeend", footer);
}
