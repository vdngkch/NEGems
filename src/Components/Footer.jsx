import './Footer.css'
function Footer(){
    return(
        <>
          <footer className="footer">
            <div className="footer-container">
               <div className="footer-section">
                  <h2 className="footer-logo">NEGems</h2>

                  <p>
                    Discover hidden gems across Northeast India. 
                    Explore untouched places shared by travelers and locals.
                  </p>
               </div>

               <div className="footer-section">
                <h3>Follow us</h3>
                <div className="socials">
                    <span>Instagram</span>
                    <span>Twiter</span>
                    <span>Facebook</span>
                </div>
               </div>
            </div>

            <div className="footer-bottom">
                 © {new Date().getFullYear()} NEGems. All rights reserved.
            </div>
          </footer>
        </>
    )
}

export default Footer