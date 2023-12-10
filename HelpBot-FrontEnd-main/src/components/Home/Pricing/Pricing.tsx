const Pricing = () => {
    return(
        <section id = "pricing" >
            <div className="container">
                <div className="title-block">
                    <h2>Plans and Pricing</h2>
                    <p>The best software to develop perfect content and advertising strategies to increase leads and sales.</p>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="pricing-box">
                            <h3 className="demo">Demo Version</h3>
                            <h6>Free</h6>
                            <small>forever</small>
                            <p>Demo gives you full access to all features for 7 days</p>
                            <div className="divider-light" />
                            <ul>
                                <li><i className="icon ion-md-checkmark-circle-outline demo" />Marketing plan</li>
                                <li><i className="icon ion-md-checkmark-circle-outline demo" />Seo reporting tool</li>
                                <li><i className="icon ion-md-checkmark-circle-outline demo" />Keywords explorer</li>
                                <li><i className="icon ion-md-checkmark-circle-outline demo" />Competitive analysis</li>
                                <li><i className="icon ion-md-checkmark-circle-outline demo" />Five projects - <span className="demo">¡New!</span></li>
                            </ul>
                            <div className="text-center">
                                <a href="#" className="btn btn-demo">Demo version</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="pricing-box">
                            <h3>Standard Version</h3>
                            <h6>$9</h6>
                            <small>per month</small>
                            <p>Outrank your competitors with this amazing software</p>
                            <div className="divider-light" />
                            <ul>
                                <li><i className="icon ion-md-checkmark-circle-outline" />Marketing plan</li>
                                <li><i className="icon ion-md-checkmark-circle-outline" />Seo reporting tool</li>
                                <li><i className="icon ion-md-checkmark-circle-outline" />Keywords explorer</li>
                                <li><i className="icon ion-md-checkmark-circle-outline" />Competitive analysis</li>
                                <li><i className="icon ion-md-checkmark-circle-outline" />Unlimited projects - <span>¡New!</span></li>
                            </ul>
                            <div className="text-center">
                                <a href="#" className="btn btn-buy">Buy now</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="pricing-box">
                            <h3>Agency Version</h3>
                            <h6>$29</h6>
                            <small>per month</small>
                            <p>For agencies and businesses with extensive web presence</p>
                            <div className="divider-light" />
                            <ul>
                                <li><i className="icon ion-md-checkmark-circle-outline" />Marketing plan</li>
                                <li><i className="icon ion-md-checkmark-circle-outline" />Seo reporting tool</li>
                                <li><i className="icon ion-md-checkmark-circle-outline" />Keywords explorer</li>
                                <li><i className="icon ion-md-checkmark-circle-outline" />Competitive analysis</li>
                                <li><i className="icon ion-md-checkmark-circle-outline" />Unlimited projects - <span>¡New!</span></li>
                            </ul>
                            <div className="text-center">
                                <a href="#" className="btn btn-buy">Buy now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </section >        
    )
}

export default Pricing;