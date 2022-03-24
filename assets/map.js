mapboxgl.accessToken = 'pk.eyJ1IjoibWtvd2FsdWsiLCJhIjoiY2tuZ2gwZWFjMDFmNTJycGdyejFrY2FidiJ9.6sedPNKLwYOMQzg1ELseyQ';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mkowaluk/cko9abxd75wsj17pb708923ov', // style URL
  center: [-116.231, 43.604], // starting position [lng, lat]
  zoom: 1 // starting zoom
});

map.fitBounds([
  [-135.0011, 24.9493],
  [-66.9326, 49.5904]
]);

document.getElementById('impact-africa-button').addEventListener('click', function(e) {
  document.querySelectorAll('button').forEach(button => button.classList.remove('active'));
  e.target.classList.add('active');
  map.fitBounds([
    [-20.028731, -32.791023],
    [58.034100, 35.887838]
  ]);
});

document.getElementById('impact-asia-button').addEventListener('click', function(e) {
  document.querySelectorAll('button').forEach(button => button.classList.remove('active'));
  e.target.classList.add('active');
  map.fitBounds([
    [40.781250,-7.710992],
    [190.898438,76.760541]
  ]);
});

document.getElementById('impact-central-america-button').addEventListener('click', function(e) {
  document.querySelectorAll('button').forEach(button => button.classList.remove('active'));
  e.target.classList.add('active');
  map.fitBounds([
    [-109.511719,5.615986],
    [-61.347656,25.005973]
  ]);
});

document.getElementById('impact-north-america-button').addEventListener('click', function(e) {
  document.querySelectorAll('button').forEach(button => button.classList.remove('active'));
  e.target.classList.add('active');
  map.fitBounds([
    [-135.0011, 24.9493],
    [-66.9326, 49.5904]
  ]);
});


document.getElementById('impact-south-america-button').addEventListener('click', function(e) {
  document.querySelectorAll('button').forEach(button => button.classList.remove('active'));
  e.target.classList.add('active');
  map.fitBounds([
    [-87.714844,-54.673831],
    [-30.937500,14.178402]
  ]);
});


map.on('load', function(e) {
  map.fitBounds([
    [-135.0011, 24.9493],
    [-66.9326, 49.5904]
  ]);

  let featuresData = async () => {
    let data = await fetch('https://api.mapbox.com/datasets/v1/mkowaluk/cko98on4b02fz20p6r7zc2m68/features?access_token=pk.eyJ1IjoibWtvd2FsdWsiLCJhIjoiY2tuZ2gwZWFjMDFmNTJycGdyejFrY2FidiJ9.6sedPNKLwYOMQzg1ELseyQ')
    let dataJSON = await data.json()

    dataJSON.features.forEach((marker) => {
      var el = document.createElement('div');
      el.innerHTML = '<span class="cup-animated"></span>'
      el.className = 'marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.addEventListener('click', function (e) {
        e.preventDefault();
        let featureContent = '<h2 class="impact-modal-heading">' + marker.properties["Title"] + '</h2>' + marker.properties["Organizations"] + marker.properties["Highlights"];
        showImpactModal(featureContent)
      });
      // add marker to map
      new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
    })
    return dataJSON;
  }

  featuresData();

});



let impactBody = document.querySelector('body');
let impactModalContainer = document.querySelector('#impact-modal-container');
let impactModalClose = document.querySelector('.impact-modal-close');
let impactModalContent = document.querySelector('.impact-modal-content');

impactModalClose.addEventListener('click', hideImpactModal);

function showImpactModal(modalContent) {
  impactModalContent.innerHTML = modalContent;
  impactModalContainer.classList.remove('out');
  impactModalContainer.classList.add('reveal');
  impactBody.classList.add('modal-active')
}

function hideImpactModal(e) {
  impactModalContainer.classList.add('out');
  impactBody.classList.remove('modal-active')
}

// let showMapModal = (e) => {
//     let features = map.queryRenderedFeatures(e.point, {
//         layers: ['impact-locations']
//     });

//     if(!features.length) {
//         return;
//     }

//     let feature = features[0];

//     let popup = new mapboxgl.Popup({
//         offset: {
//             'top': [0, 15],
//             'bottom': [0, -15]
//         },
//         // maxWidth: '400px'
//     })
//     .setLngLat(feature.geometry.coordinates)
//     .setHTML(`<h3 class="impact-location-title">${feature.properties.title}</h3>`)
//     .setLngLat(feature.geometry.coordinates)
//     .addTo(map);
// }

// map.on('click', 'impact-locations', showMapModal);