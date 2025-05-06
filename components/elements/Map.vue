<template>
    <div class="p-4">
        <button @click="startTracking" class="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Start Navigation
        </button>

        <p v-if="distanceToDest !== null" class="mb-2 text-lg font-medium">
            Distance to destination: {{ (distanceToDest / 1000).toFixed(2) }} km
        </p>
        <p class="text-base text-gray-700 mb-2">
            Lat {{ destination[0].toFixed(6) }}, Lng {{ destination[1].toFixed(6) }}
        </p>

        <p v-if="geolocationError" class="text-red-500">{{ geolocationError }}</p>

        <!-- <div class="mb-2">
            <button @click="rotateArrow(45)" class="px-2 py-1 bg-gray-300 rounded mr-1">+ Rotate</button>
            <button @click="rotateArrow(-45)" class="px-2 py-1 bg-gray-300 rounded">- Rotate</button>
        </div> -->

        <div class="rounded-xl" id="map" style="height: 400px;"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'
import heartIcon from '../../assets/icons/heart.png'

// State
let map
let userMarker
let destinationMarker
let polyline
let arrowMarker
let lastLatLng = null
let lastFetchLatLng = null
let lastPanTime = 0
const manualRotation = ref(0)
const geolocationError = ref('')

// Destination
const destination = [13.7626, 100.5360]
const distanceToDest = ref(null)

const initMap = () => {
    map = L.map('map').setView(destination, 15)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    destinationMarker = L.marker(destination)
        .addTo(map)
        .bindPopup('ปลายทาง')
        .openPopup()
}

// Haversine formula
const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3
    const φ1 = lat1 * Math.PI / 180
    const φ2 = lat2 * Math.PI / 180
    const Δφ = (lat2 - lat1) * Math.PI / 180
    const Δλ = (lon2 - lon1) * Math.PI / 180

    const a =
        Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
}

const createRotatingIcon = (rotation) => {
    const finalRotation = rotation + manualRotation.value;
    return L.divIcon({
        html: `
          <div class="rotated-icon" style="transform: rotate(${finalRotation}deg);">
            <img src="${heartIcon}" style="width: 20px; height: 20px;" />
          </div>
        `,
        iconSize: [20, 20],
        className: '',
    })
}

const startTracking = async () => {
    geolocationError.value = ''; // Reset error message

    if (!navigator.geolocation) {
        geolocationError.value = 'Geolocation ไม่รองรับบนอุปกรณ์นี้';
        return;
    }

    // Request device orientation permission for iOS 13+
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const permission = await DeviceOrientationEvent.requestPermission();
            if (permission === 'granted') {
                window.addEventListener('deviceorientation', handleOrientation);
            } else {
                console.log('Device orientation permission not granted');
            }
        } catch (error) {
            console.error('Error requesting device orientation permission:', error);
        }
    } else {
        // For non-iOS or older iOS, just add the listener
        window.addEventListener('deviceorientation', handleOrientation);
    }

    navigator.geolocation.watchPosition(
        async (position) => {
            geolocationError.value = ''; // Reset error message on successful position

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const current = [lat, lng];

            // Calculate the distance to destination
            distanceToDest.value = getDistance(lat, lng, destination[0], destination[1]);

            if (!userMarker) {
                userMarker = L.marker(current).addTo(map).bindPopup('ตำแหน่งของคุณ').openPopup();
            } else {
                userMarker.setLatLng(current);
            }

            // Only pan every 2 seconds
            if (Date.now() - lastPanTime > 2000) {
                map.panTo(current);
                lastPanTime = Date.now();
            }

            // Fetch route if moved 30+ meters
            if (!lastFetchLatLng || getDistance(lastFetchLatLng[0], lastFetchLatLng[1], current[0], current[1]) > 30) {
                lastFetchLatLng = current;

                const url = `https://router.project-osrm.org/route/v1/driving/${lng},${lat};${destination[1]},${destination[0]}?overview=full&geometries=geojson`;
                try {
                    const res = await fetch(url);
                    const data = await res.json();
                    const coords = data.routes[0].geometry.coordinates.map((c) => [c[1], c[0]]);

                    if (polyline) {
                        polyline.setLatLngs(coords);
                    } else {
                        polyline = L.polyline(coords, { color: 'blue' }).addTo(map);
                    }
                } catch (err) {
                    console.error('Routing error:', err);
                }
            }

            if (!arrowMarker) {
                arrowMarker = L.marker(current, {
                    icon: createRotatingIcon(0),
                }).addTo(map);
            } else {
                arrowMarker.setLatLng(current);
                arrowMarker.setIcon(createRotatingIcon(0)); // Update icon on position change as well
            }

            lastLatLng = current;
        },
        (err) => {
            console.error('Geolocation error:', err);
            switch (err.code) {
                case 1:
                    geolocationError.value = 'คุณปฏิเสธการอนุญาตการเข้าถึงตำแหน่ง';
                    break;
                case 2:
                    geolocationError.value = 'ไม่สามารถระบุตำแหน่งของคุณได้ โปรดลองอีกครั้ง';
                    break;
                case 3:
                    geolocationError.value = 'การระบุตำแหน่งหมดเวลา โปรดตรวจสอบการเชื่อมต่อหรือลองอีกครั้ง';
                    break;
                default:
                    geolocationError.value = 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุในการระบุตำแหน่ง';
            }
        },
        {
            enableHighAccuracy: true,
            maximumAge: 3000,
            timeout: 15000,
        }
    );
};

const handleOrientation = (event) => {
    if (event.alpha !== null) {
        const heading = event.alpha; // Use alpha for compass heading
        if (arrowMarker) {
            arrowMarker.setIcon(createRotatingIcon(heading));
        }
    }
};

// const rotateArrow = (degrees) => {
//     manualRotation.value += degrees;
//     if (arrowMarker) {
//         arrowMarker.setIcon(createRotatingIcon(0)); // Re-apply icon to update rotation
//     }
// };

onMounted(() => {
    initMap()
})
</script>

<style scoped>
.rotated-icon {
    transform-origin: center;
    transition: transform 0.3s ease;
}
</style>