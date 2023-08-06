      const video = document.getElementById('myVideo');
console.log("successsss");
      // Fetch data from JSON file and populate the HTML
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          const overlays = data.overlays.map(overlayData => {
            const image = document.createElement('img');
            image.src = overlayData.src;
            image.classList.add('image-overlay');
            image.dataset.start = overlayData.start;
            image.dataset.end = overlayData.end;

            const link = document.createElement('a');
            link.href = overlayData.link;
            link.target = '_blank';
            link.appendChild(image);

            document.getElementById('videoContainer').appendChild(link);

            return {
              ele: image,
              element: link,
              start: overlayData.start,
              end: overlayData.end
            };
          });

          // Now, add the event listener for timeupdate
          video.addEventListener('timeupdate', function() {
            const currentTime = video.currentTime;
            overlays.forEach(overlay => {
              const start = parseInt(overlay.start);
              const end = parseInt(overlay.end);
              if (currentTime >= start && currentTime <= end) {
                overlay.ele.style.display = 'inline';
              } else {
                overlay.ele.style.display = 'none';
              }
            });
          });
        });
    
