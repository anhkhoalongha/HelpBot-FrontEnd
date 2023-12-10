const Testimonial =() => {
    return (
        <section id="testimonials">
        <div className="container">
          <div className="title-block">
            <h2>The Best Chatbot Tool Recommend Our Software</h2>
            <p>Industry experts mention their experience using our software and the excellent results they have achieved</p>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="testimonial-box">
                <div className="row personal-info">
                  <div className="col-md-2 col-xs-2">
                    <div className="profile-picture review-one" />
                  </div>
                  <div className="col-md-10 col-xs-10">
                    <h6>Joshua M. Salas <span className="rating">5 <i className="icon ion-md-star" /></span></h6>
                    <small>Marketing Intelligence | Author &amp; Content Creator</small>
                  </div>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur scelerisque, tortor nec mattis feugiat, velit purus euismod odio, quis vulputate velit urna sit amet enim. Maecenas vulputate auctor ligula sed sollicitudin.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="testimonial-box">
                <div className="row personal-info">
                  <div className="col-md-2 col-xs-2">
                    <div className="profile-picture review-one" />
                  </div>
                  <div className="col-md-10 col-xs-10">
                    <h6>Michael Edwards <span className="rating">5 <i className="icon ion-md-star" /></span></h6>
                    <small>Seo Consultant | Author &amp; Content Creator</small>
                  </div>
                </div>
                <p>In euismod, metus ac elementum tincidunt, dui eros ullamcorper lorem, at euismod augue augue quis leo. Fusce non dui augue. In hac habitasse platea dictumst. Mauris quis lacinia mauris. Proin ut pretium quam. Nam at ex finibus.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Testimonial;