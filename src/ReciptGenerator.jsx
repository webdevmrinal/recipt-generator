import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toWords } from "number-to-words";

const ReceiptGenerator = () => {
  const [formData, setFormData] = useState({
    companyName: "Swastik Enterprises",
    address:
      "3800, Rita Kunj, Ghurdaur Road, Rajeev Nagar Road No.-26, Rajeev Nagar, Patna, Bihar-800024",
    phone: "9910057443",
    email: "venktesh054@gmail.com",
    billTo: "CHAMPA DIGITAL XRAY",
    billToAddress: "Maa Laxmi Medical, Gurubazar Barari, Katihar, Bihar 854104",
    invoiceNo: "SE-Y23-24-22",
    date: "26-12-2023",
    time: "01:37 PM",
    itemName: "AERB REGISTRATION OF MOBILE XRAY",
    quantity: "1",
    price: "10,000.00",
    bankName: "IDBI Bank, Ashiana Nagar",
    accountNo: "1125102000008020",
    ifscCode: "IBKL0001125",
    accountHolder: "Swastik Enterprises",
  });
  const [logo, setLogo] = useState(null);
  const receiptRef = useRef(null);
  const [stamp, setStamp] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogo(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleStampUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setStamp(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = () => {
    const input = receiptRef.current;
    html2canvas(input, { scale: 2, backgroundColor: null }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("receipt.pdf");
    });
  };

  const convertNumberToWords = (num) => {
    if (!num || isNaN(num.replace(/,/g, ""))) {
      return "Zero Only";
    }

    num = num.replace(/,/g, "");
    const numericValue = parseFloat(num);

    if (numericValue === 0) {
      return "Zero";
    }

    const wholePart = Math.floor(numericValue);
    const decimalPart = Math.round((numericValue - wholePart) * 100);

    let result = toWords(wholePart);
    result = result.charAt(0).toUpperCase() + result.slice(1);

    if (decimalPart > 0) {
      result += ` and ${toWords(decimalPart)} paise`;
    }

    return result;
  };

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      <Card className="w-full md:w-1/2 mb-4 md:mb-0">
        <CardHeader className="text-xl font-semibold text-purple-400 border-b">
          Receipt Editor
        </CardHeader>
        <CardContent className="py-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="billTo">Bill To</Label>
              <Input
                id="billTo"
                name="billTo"
                value={formData.billTo}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="billToAddress">Bill To Address</Label>
              <Input
                id="billToAddress"
                name="billToAddress"
                value={formData.billToAddress}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="invoiceNo">Invoice No</Label>
              <Input
                id="invoiceNo"
                name="invoiceNo"
                value={formData.invoiceNo}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                name="itemName"
                value={formData.itemName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="accountNo">Account No</Label>
              <Input
                id="accountNo"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                id="ifscCode"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="accountHolder">Account Holder</Label>
              <Input
                id="accountHolder"
                name="accountHolder"
                value={formData.accountHolder}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="logo">Upload Logo</Label>
              <Input
                id="logo"
                type="file"
                onChange={handleLogoUpload}
                accept="image/*"
              />
            </div>
            <div>
              <Label htmlFor="stamp">Upload Stamp</Label>
              <Input
                id="stamp"
                type="file"
                onChange={handleStampUpload}
                accept="image/*"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={generatePDF}>Generate PDF</Button>
        </CardFooter>
      </Card>

      <Card className="w-full md:w-1/2">
        <CardHeader className="text-xl font-semibold text-purple-400 border-b">
          Receipt Preview
        </CardHeader>
        <CardContent
          className="overflow-auto py-4"
          style={{ height: "calc(100vh - 120px)" }}
        >
          <div
            ref={receiptRef}
            id="receipt-preview"
            className="bg-white p-8 shadow-lg"
            style={{ width: "210mm", height: "297mm" }}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-2xl font-bold">{formData.companyName}</h1>
                <p className="text-sm">{formData.address}</p>
                <p className="text-sm">Phone no.: {formData.phone}</p>
                <p className="text-sm">Email: {formData.email}</p>
              </div>
              {logo && (
                <img
                  src={logo}
                  alt="Company Logo"
                  className="w-16 h-16 object-contain"
                />
              )}
            </div>
            <h2 className="text-xl font-bold mb-4">Tax Invoice</h2>
            <div className="flex justify-between mb-4">
              <div>
                <p className="font-bold">Bill To:</p>
                <p>{formData.billTo}</p>
                <p>{formData.billToAddress}</p>
              </div>
              <div>
                <p>
                  <span className="font-bold">Invoice No.:</span>{" "}
                  {formData.invoiceNo}
                </p>
                <p>
                  <span className="font-bold">Date:</span> {formData.date}
                </p>
                <p>
                  <span className="font-bold">Time:</span> {formData.time}
                </p>
              </div>
            </div>
            <table className="w-full mb-4">
              <thead>
                <tr
                  style={{ backgroundColor: "#948fe3" }}
                  className="text-white"
                >
                  <th className="text-left p-2">#</th>
                  <th className="text-left p-2">Item name</th>
                  <th className="text-left p-2">HSN/ SAC</th>
                  <th className="text-left p-2">Quantity</th>
                  <th className="text-left p-2">Price/ unit</th>
                  <th className="text-left p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">1</td>
                  <td className="p-2">{formData.itemName}</td>
                  <td className="p-2"></td>
                  <td className="p-2">{formData.quantity}</td>
                  <td className="p-2">₹ {formData.price}</td>
                  <td className="p-2">₹ {formData.price}</td>
                </tr>
                <tr>
                  <td
                    className="p-2"
                    colSpan="5"
                    style={{ textAlign: "right" }}
                  >
                    <strong>Total</strong>
                  </td>
                  <td className="p-2">₹ {formData.price}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-between mb-4">
              <div>
                <p className="font-bold">INVOICE AMOUNT IN WORDS</p>
                <p className="capitalize">{convertNumberToWords(formData.price)+" Rupees Only"}</p>
              </div>
              <div>
                <p>
                  <span className="font-bold">Sub Total</span> ₹{" "}
                  {formData.price}
                </p>
                <p>
                  <span className="font-bold">Total</span> ₹ {formData.price}
                </p>
                <p>
                  <span className="font-bold">Received</span> ₹ {formData.price}
                </p>
                <p>
                  <span className="font-bold">Balance</span> ₹ 0.00
                </p>
              </div>
            </div>
            <div className="mb-4">
              <p className="font-bold">TERMS AND CONDITIONS</p>
              <p>Thank you for doing business with us.</p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="font-bold">Pay To-</p>
                <p>Bank Name: {formData.bankName}</p>
                <p>Bank Account No.: {formData.accountNo}</p>
                <p>Bank IFSC code: {formData.ifscCode}</p>
                <p>Account Holder's Name: {formData.accountHolder}</p>
              </div>
              <div className="text-right">
                <p>For, {formData.companyName}</p>
                {stamp && (
                  <img
                    src={stamp}
                    alt="Company Stamp"
                    className="w-20 h-20 object-contain mx-auto"
                  />
                )}
                <p>Authorized Signatory</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReceiptGenerator;
