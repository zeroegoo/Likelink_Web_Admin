<template>
    <div class="p-4">
      <div class="rounded-xl" id="map" style="height: 500px;"></div>
    </div>
  </template>
  
  <script setup>
  // Basic imports
  import { onMounted } from 'vue'
  import L from 'leaflet'
  import 'leaflet/dist/leaflet.css'
  
  // List of people to show as circular icons
  const people = [
    {
      id: 1,
      name: 'Alice',
      lat: 13.7621,
      lng: 100.5370,
      photo: 'https://i.pravatar.cc/100?img=1',
    },
    {
      id: 2,
      name: 'Bob',
      lat: 13.7630,
      lng: 100.5345,
      photo: 'https://i.pravatar.cc/100?img=2',
    },
  ]
  
  // Initialize the Leaflet map
  const initMap = () => {
    const map = L.map('map').setView([13.7626, 100.5360], 15)
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)
  
    // Add each person as a custom circular icon
    people.forEach((person) => {
      const marker = L.marker([person.lat, person.lng], {
        icon: L.divIcon({
          html: `<div class="person-icon"><img src="${person.photo}" /></div>`,
          iconSize: [40, 40],
          iconAnchor: [20, 20],
          className: '',
        }),
      }).addTo(map)
  
      marker.bindPopup(person.name)
    })
  }
  
  // Call initMap when component mounts
  onMounted(() => {
    initMap()
  })
  </script>
  
  <style scoped>
  /* Style for circular profile icons */
  .person-icon img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  }
  </style>
  