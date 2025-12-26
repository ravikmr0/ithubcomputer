import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import HomePage from "@/components/pages/HomePage";
import AboutPage from "@/components/pages/AboutPage";
import ServicesPage from "@/components/pages/ServicesPage";
import ProductsPage from "@/components/pages/ProductsPage";
import AllProductsPage from "@/components/pages/AllProductsPage";
import ContactPage from "@/components/pages/ContactPage";
import { Toaster } from "@/components/ui/toaster";
import FloatingContactButtons from "@/components/layout/FloatingContactButtons";

// Service Pages
import LaptopDesktopRepairPage from "@/components/pages/services/LaptopDesktopRepairPage";
import DataRecoveryPage from "@/components/pages/services/DataRecoveryPage";
import SoftwareInstallationPage from "@/components/pages/services/SoftwareInstallationPage";
import CCTVInstallationPage from "@/components/pages/services/CCTVInstallationPage";
import BiometricSystemsPage from "@/components/pages/services/BiometricSystemsPage";

// Product Pages
import HardwarePartsPage from "@/components/pages/products/HardwarePartsPage";
import LaptopsNotebooksPage from "@/components/pages/products/LaptopsNotebooksPage";
import DesktopComputersPage from "@/components/pages/products/DesktopComputersPage";
import MonitorsDisplaysPage from "@/components/pages/products/MonitorsDisplaysPage";
import KeyboardsPage from "@/components/pages/products/KeyboardsPage";
import MouseTrackpadsPage from "@/components/pages/products/MouseTrackpadsPage";
import StorageDevicesPage from "@/components/pages/products/StorageDevicesPage";
import MemoryRAMPage from "@/components/pages/products/MemoryRAMPage";
import AudioEquipmentPage from "@/components/pages/products/AudioEquipmentPage";
import PrintersScannersPage from "@/components/pages/products/PrintersScannersPage";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/all-products" element={<AllProductsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Service Routes */}
            <Route path="/services/laptop-desktop-repair" element={<LaptopDesktopRepairPage />} />
            <Route path="/services/data-recovery" element={<DataRecoveryPage />} />
            <Route path="/services/software-installation" element={<SoftwareInstallationPage />} />
            <Route path="/services/cctv-installation" element={<CCTVInstallationPage />} />
            <Route path="/services/biometric-systems" element={<BiometricSystemsPage />} />
            
            {/* Product Routes */}
            <Route path="/products/hardware-parts" element={<HardwarePartsPage />} />
            <Route path="/products/laptops-notebooks" element={<LaptopsNotebooksPage />} />
            <Route path="/products/desktop-computers" element={<DesktopComputersPage />} />
            <Route path="/products/monitors-displays" element={<MonitorsDisplaysPage />} />
            <Route path="/products/keyboards" element={<KeyboardsPage />} />
            <Route path="/products/mouse-trackpads" element={<MouseTrackpadsPage />} />
            <Route path="/products/storage-devices" element={<StorageDevicesPage />} />
            <Route path="/products/memory-ram" element={<MemoryRAMPage />} />
            <Route path="/products/audio-equipment" element={<AudioEquipmentPage />} />
            <Route path="/products/printers-scanners" element={<PrintersScannersPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingContactButtons />
        <Toaster />
      </div>
    </Suspense>
  );
}

export default App;
