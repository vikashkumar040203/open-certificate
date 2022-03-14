var val
var userName = document.querySelector("#name");
var downloadName = userName
console.log(downloadName.value) 
console.log(userName)
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;
const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  val = capitalize(userName.value);
  console.log(val)

  //check if the text is empty or not
  if (val.trim() !== "" && userName.checkValidity()) {
    generatePDF(val);
  } else {
    userName.reportValidity();
  }
});


const generatePDF = async (name) => {
  const existingPdfBytes = await fetch("./template.pdf").then((res) =>
    res.arrayBuffer()
  );

  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./Sanchez-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  // Embed our custom font in the document
  const SanChezFont = await pdfDoc.embedFont(fontBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 45,
    y: 275,
    size: 50,
    font: SanChezFont,
    color: rgb(0.1, 0.4, 1),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  var file = new File(
    [pdfBytes],
    // "open-certificate.pdf",// prevuous version
    `${val}`,
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};