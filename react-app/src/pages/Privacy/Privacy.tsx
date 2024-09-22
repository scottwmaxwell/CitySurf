function Privacy({ modalOpen }: any) {
  return (
    <div
      className={"container justify-content-center main-content " + modalOpen}
    >
      <div className="row justify-content-center">
        <div className="col justify-content-center">
          <h3 className="header">Privacy.</h3>

          <p>
            <strong>Your Privacy Matters to Us!</strong>
          </p>
          <p>
            We respect your privacy, and we're committed to being transparent
            about how we handle your data.
          </p>

          <ul>
            <li>
              <strong style={{ color: "orange" }}>
                Data Collection by Mapbox
              </strong>
              <br />
              Please be aware that the Mapbox API, which is used on the Discover
              page, collects user data as outlined in their{" "}
              <a style={{ color: "orange" }}>privacy policy</a>. We encourage
              you to review their policy to understand what data is collected
              and how it is used.
            </li>
            <li>
              <strong>No Account, No Data Stored By Us</strong>
              <br />
              If you choose not to sign up for an account, we won't store any
              personal data. You can explore our services freely without sharing
              any information with us.
            </li>
            <li>
              <strong>When You Sign Up</strong>
              <br />
              If you decide to create an account, we'll need some basic
              information to make it work:
              <ul>
                <li>
                  <strong>Email Address:</strong> We store this so you can log
                  in and receive any necessary communications from us.
                </li>
                <li>
                  <strong>Password:</strong> We securely store an encrypted
                  version of your password. This means even we can't see your
                  actual password—your security is important to us.
                </li>
                <li>
                  <strong>Saved Cities:</strong> We store the cities you choose
                  to save so that you can easily access them later. These saved
                  cities are tied to your account for your convenience.
                </li>
              </ul>
            </li>
            <li>
              <strong>Contributing Data</strong>
              <br />
              If you provide metrics about your city, we store this information
              to help improve the community’s understanding of different areas.
              However, we do this anonymously—these metrics are not linked back
              to you in any way.
            </li>
            <li>
              <strong>That's It!</strong>
              <br />
              We believe in keeping things simple and clear. We don’t collect
              any unnecessary data, and we don’t share your information with
              third parties. Your data is yours, and we're just here to help you
              make the most of our services.
            </li>
          </ul>

          <p>
            <strong>Questions?</strong>
            <br />
            If you have any questions about our privacy practices, feel free to
            reach out. We're here to help and ensure you feel safe using our
            services.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Privacy;
