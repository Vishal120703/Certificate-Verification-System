const puppeteer = require("puppeteer");
const Certificate = require("../models/certificate.model")
const XLSX = require("xlsx");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const QRCode = require("qrcode");
const path = require("path")

exports.createCertificate = async(req,res)=>{
    try{
    const {certificateId,studentName,studentEmail,internshipDomain,startDate,endDate} = req.body;
    if(!certificateId ||!studentName||!internshipDomain||!startDate||!endDate){
        return res.status(400).json({msg:"Please fill all the required feilds."})
    }
    const newCertificate = new Certificate({
        certificateId,
        studentName,
        studentEmail,
        internshipDomain,
        startDate,
        endDate
    })
    await newCertificate.save();
    return res.status(201).json({msg:"Certificate created"})
}
catch{
    return res.status(500).json({msg:"Something went Wrong."})
}
}

exports.verifyCertificate = async(req,res) =>{
    try{
        const {certificateId} = req.params;
        const certificate = await Certificate.findOne({certificateId});
        if(!certificate){
            return res.status(404).json({msg:"not found",certificate})
        }
        return res.status(200).json({msg:"found"})

    }
    catch{
        return res.status(500).json({msg:"Something went Wrong in verification."})
    }
}

exports.uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    let inserted = 0;
    let skipped = 0;

    for (let row of sheetData) {
      const existing = await Certificate.findOne({
        certificateId: row.certificateId
      });

      if (existing) {
        skipped++;
        continue;
      }

      await Certificate.create({
        certificateId: row.certificateId,
        studentName: row.studentName,
        studentEmail: row.studentEmail,
        internshipDomain: row.internshipDomain,
        startDate: row.startDate,
        endDate: row.endDate,
        issuedBy: req.user.id
      });

      inserted++;
    }
    fs.unlinkSync(req.file.path);
    return res.status(200).json({
      message: "Upload completed",
      inserted,
      skipped
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong"
    });
  }
};

exports.downloadCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({ certificateId });

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    // Build verification URL
    const baseURL = `${req.protocol}://${req.get("host")}`;
    const verifyURL = `${baseURL}/api/User/certificate/verify/${certificate.certificateId}`;

    // Generate QR
    const qrCode = await QRCode.toDataURL(verifyURL);

    // Load HTML template
    const templatePath = path.join(__dirname, "../templates/certificate.html");
    let html = fs.readFileSync(templatePath, "utf8");

    // Replace placeholders
    html = html
      .replace("{{studentName}}", certificate.studentName)
      .replace("{{internshipDomain}}", certificate.internshipDomain)
      .replace("{{startDate}}", new Date(certificate.startDate).toDateString())
      .replace("{{endDate}}", new Date(certificate.endDate).toDateString())
      .replace("{{certificateId}}", certificate.certificateId)
      .replace("{{qrCode}}", qrCode);

    // Launch Puppeteer safely (Windows compatible)
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    // Load HTML
    await page.setContent(html);

    // Generate PDF
    const pdfBuffer = await page.pdf({
      width: "29.7cm",
      height: "21cm",
      landscape: true,
      printBackground: true,
      margin: {
        top: "0cm",
        right: "0cm",
        bottom: "0cm",
        left: "0cm"
      }
    });

    await browser.close();

    // Send PDF
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${certificateId}.pdf"`,
      "Content-Length": pdfBuffer.length,
    });
    return res.end(pdfBuffer);
  }
  catch (error) {
    console.error("PDF Generation Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};