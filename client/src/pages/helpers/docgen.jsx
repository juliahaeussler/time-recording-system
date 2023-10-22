import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

export const createPdf = async (payload) => {
  // Default export is a4 paper, portrait, using millimeters for unit
  const doc = new jsPDF();

  doc.setFontSize(10);

  doc.text("Zeiterfassung", 15, 20);
  doc.text(`Projekt: ${payload.project}`, 15, 25);
  doc.text(`Leistungszeitraum: ${payload.timeframe}`, 15, 30);

  doc.autoTable({
    head: [["Datum", "Leistungsphase", "Text", "Stunden"]],
    body: payload.entries,
    theme: 'plain',
    margin: { top: 40 },
    styles: { fontSize: 9 },
    columnStyles: {3: {halign: 'right'}}
  });

  doc.save("auswertung.pdf");
};
