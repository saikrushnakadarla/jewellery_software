import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRScanner = () => {
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10, // Higher FPS for fast scanning
      qrbox: { width: 500, height: 500 }, // Adjust scan area
    });

    scanner.render(
      (decodedText) => {
        setQrData(decodedText); // Auto-updates scanned data
        console.log("Scanned:", decodedText);
        // Perform API call or navigation here (optional)
      },
      (errorMessage) => {
        console.warn("QR Scan Error:", errorMessage);
      }
    );

    return () => scanner.clear(); // Cleanup when component unmounts
  }, []);

  return (
    <div>
      <h2>QR Code Scanner</h2>
      <div id="reader"></div>
      {qrData && <p>Scanned Data: {qrData}</p>}
    </div>
  );
};

export default QRScanner;
