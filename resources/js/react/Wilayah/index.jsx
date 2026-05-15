import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import PetaWilayah from './peta-wilayah.jsx'

const el = document.getElementById('peta-wilayah-root')
if (el) createRoot(el).render(<PetaWilayah />)