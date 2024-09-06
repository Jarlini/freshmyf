import React from 'react';
import '/home/uki-student/Documents/fresh/frontend/myproject/src/component/Landingpage.css';
import photo2 from '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/Screenshot from 2024-08-23 10-57-22.png';
import photo3 from '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/Screenshot from 2024-08-23 10-58-53.png';
import photo4 from '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/Screenshot from 2024-08-23 11-00-11.png';
import photo5 from '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/Screenshot from 2024-08-23 11-22-57.png';


      
function LandingPage() {
  return (
    <div className="landing-page">
      <div className="content">
        <div className="left-div"><br></br>


        <br></br><br></br><br></br>

          <p>"Hi, welcome to Vayago! Join us on an unforgettable journey where every moment is filled with joy and excitement. Whether you're visiting temples or enjoying a peaceful camp, we've got the perfect package waiting for you. Come along and experience the happiness we offer—your adventure starts here!"

</p>
          <button className="home-button">Go to Home</button>
        </div>
        <div className="right-div">
          <img src={photo2} alt="Traveling" />
          <img src={photo3} alt="Traveling" />
          <img src={photo4} alt="Traveling" />
          <img src={photo5} alt="Traveling" />

        </div>
      </div>
      
      
     
    </div>
  );
}

export default LandingPage;