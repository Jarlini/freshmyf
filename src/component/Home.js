// src/components/PhotoSections.js
import React from 'react';
import'/home/uki-student/Documents/fresh/frontend/myproject/src/component/Home.css';
const photoData = {
  Karthirkamam: [
    { src: '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/images.jpeg', alt: 'Karthirkamam Photo 1' },
    { src: '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/Screenshot from 2024-08-29 12-15-00.png', alt: 'Karthirkamam Photo 2' },
    { src: '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/Screenshot from 2024-08-29 12-17-48.png', alt: 'Karthirkamam Photo 3' },
    { src: '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/images.jpeg', alt: 'Karthirkamam Photo 4' },
  ],
  MadhuMatha: [
    { src: '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/download (1).jpeg', alt: 'Madhu Matha Photo 1' },
    { src: '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/download.jpeg', alt: 'Madhu Matha Photo 2' },
    { src: '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/Screenshot from 2024-08-29 12-26-39.png', alt: 'Madhu Matha Photo 3' },
    { src: '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/images (1).jpeg', alt: 'Madhu Matha Photo 4' },
  ],
  KandyTrip: [
    { src: '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/images (2).jpeg', alt: 'Kandy Trip Photo 1' },
    { src: '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/download (2).jpeg' },
    { src: '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/download (5).jpeg', alt: 'Kandy Trip Photo 3' },
    { src: '/home/uki-student/Documents/fresh/frontend/myproject/src/component/photos/images (3).jpeg', alt: 'Kandy Trip Photo 4' },
  ],
};

const Home= () => {
  return (
    <div className="photo-sections">
      {Object.keys(photoData).map(section => (
        <section key={section} className="photo-section">
          <h2 className="section-heading">{section}</h2>
          <div className="photo-container">
            {photoData[section].map((photo, index) => (
              <img key={index} src={photo.src} alt={photo.alt} className="photo" />
            ))}
          </div>
          <button className="view-more-btn">View More</button>
        </section>
      ))}
    </div>
  );
};

export default Home;
