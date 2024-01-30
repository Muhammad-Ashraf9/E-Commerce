import handleSignIn from "../auth/signin.js";


export function renderModal(element) {
  const modal = ` <div class="modal fade" id="signIn" aria-labelledby="signIn" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header d-flex flex-row justify-content-between">
                <span class="modal-title fs-5 text-black " id="signIn">Sign in</span>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
  <form novalidate id="loginForm">
        <div class="input-group">
          <div class="form-floating">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
            />
            <label for="email">Email address</label>
          </div>
          <div class="invalid-feedback email">Please choose a valid Email.</div>
        </div>
        <div class="input-group has-validation">
          <div class="form-floating mt-3">
            <input
              type="password"
              class="form-control mt-3"
              id="password"
              placeholder="Password"
              aria-describedby="invalidCheckPasswordFeedback"
            />

            <label for="password">Password</label>
          </div>
          <div
            class="invalid-feedback password"
            id="invalidCheckPasswordFeedback"
          >
            Password must be at least 8 characters, at least a symbol, upper and
            lower case letters and a number.
          </div>
        </div>
        <div class="form-check mt-3">
          <input
            class="form-check-input"
            type="checkbox"
            value="showPassword"
            id="showPasswordCheckBox"
          />
          <label class="form-check-label" for="showPasswordCheckBox">
            show password
          </label>
        </div>

        <button class="btn btn-warning py-2 w-100 mt-3" type="submit">Login</button>
          </form>
            </div>
            <p class="text-center">Dont have an account? click here to <a href="signup.html" class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"> signup </a></p>
          </div>
        </div>`;
  element.insertAdjacentHTML("beforeend", modal);
  handleSignIn();
}
