import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from './../../../../../Url/NodeBaseURL';
import { useLocation } from "react-router-dom";

const useProductHandlers = () => {
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [isQtyEditable, setIsQtyEditable] = useState(false);
  const location = useLocation();

  // Access the passed state (default to an empty object if undefined)
  const { invoice_number = "", mobile = "" } = location.state || {};

  const [rates, setRates] = useState({
    rate_24crt: "",
    rate_22crt: "",
    rate_18crt: "",
    rate_16crt: ""
  });

  const [formData, setFormData] = useState({
    customer_id: "value001",
    mobile: mobile,
    account_name: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    state: "",
    state_code: "",
    aadhar_card: "",
    gst_in: "",
    pan_card: "",
    terms: "Cash",
    date: "",
    invoice_number: invoice_number,
    code: "",
    product_id: "",
    metal: "",
    product_name: "",
    metal_type: "",
    design_name: "",
    purity: "",
    category: "",
    sub_category: "",
    gross_weight: "",
    stone_weight: "",
    weight_bw: "",
    stone_price: "",
    va_on: "Gross Weight",
    va_percent: "",
    wastage_weight: "",
    total_weight_av: "",
    mc_on: "MC %",
    mc_per_gram: "",
    making_charges: "",
    rate: "",
    rate_amt: "",
    tax_percent: "",
    tax_amt: "",
    total_price: "",
    transaction_status: "Orders",
    qty: "1",
    opentag_id: "",
    product_image: null,
    order_status: 'In Progress'
  });

  const [uniqueProducts, setUniqueProducts] = useState([]);
  const [metalTypes, setMetalTypes] = useState([]);
  const [purity, setPurity] = useState([]);
  const [filteredMetalTypes, setFilteredMetalTypes] = useState([]);
  const [designOptions, setDesignOptions] = useState([]);
  const [filteredDesignOptions, setFilteredDesignOptions] = useState([]);
  const [filteredPurityOptions, setFilteredPurityOptions] = useState([]);

  useEffect(() => {
    let currentRate = "";

    if (formData.metal_type === "Gold" && formData.purity) {
      // Check if the purity value includes specific numbers
      if (formData.purity.includes("24")) {
        currentRate = rates.rate_24crt;
      } else if (formData.purity.includes("22")) {
        currentRate = rates.rate_22crt;
      } else if (formData.purity.includes("18")) {
        currentRate = rates.rate_18crt;
      } else if (formData.purity.includes("16")) {
        currentRate = rates.rate_16crt;
      }
    } else if (formData.metal_type === "Silver" && formData.purity) {
      currentRate = rates.silver_rate;
    }

    setFormData((prevData) => ({
      ...prevData,
      rate: currentRate,
    }));
  }, [formData.purity, formData.metal_type, rates]);



  // Fetch rates on mount
  useEffect(() => {
    const fetchCurrentRates = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/current-rates`);
        console.log('API Response:', response.data);

        setRates({
          rate_24crt: response.data.rate_24crt || "",
          rate_22crt: response.data.rate_22crt || "",
          rate_18crt: response.data.rate_18crt || "",
          rate_16crt: response.data.rate_16crt || "",
          silver_rate: response.data.silver_rate || "",
        });
      } catch (error) {
        console.error('Error fetching current rates:', error);
      }
    };

    fetchCurrentRates();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${baseURL}/get/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch(`${baseURL}/get/opening-tags-entry`);
      if (!response.ok) {
        throw new Error("Failed to fetch tags");
      }
      const result = await response.json();

      // Remove duplicate product_Name entries
      const uniqueProductNames = Array.from(
        new Map(result.result.map((prod) => [prod.sub_category, prod])).values()
      );

      // Extract unique metal types
      const uniqueMetalTypes = Array.from(
        new Set(result.result.map((prod) => prod.metal_type))
      ).map((metalType) => ({ metal_type: metalType }));

      // Extract unique design names
      const uniqueDesigns = Array.from(
        new Set(result.result.map((prod) => prod.design_master))
      ).map((designMaster) => ({ design_master: designMaster }));

      const uniquePurity = Array.from(
        new Set(result.result.map((prod) => prod.Purity))
      ).map((Purity) => ({ Purity: Purity }));

      setData(result.result); // Set the full data
      setUniqueProducts(uniqueProductNames); // Set unique product_Name options
      setMetalTypes(uniqueMetalTypes); // Set all unique metal types
      setFilteredMetalTypes(uniqueMetalTypes); // Initially, show all metal types
      setDesignOptions(uniqueDesigns); // Set all unique designs
      setFilteredDesignOptions(uniqueDesigns); // Initially, show all designs
      setPurity(uniquePurity); // Set all unique metal types
      setFilteredPurityOptions(uniquePurity); // Initially, show all metal types
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchTags();
  }, []);

  // const handleProductNameChange = (productName) => {
  //   const productEntries = data.filter((prod) => prod.product_Name === productName);

  //   if (productEntries.length > 0) {
  //     const uniqueMetalTypes = Array.from(
  //       new Set(productEntries.map((prod) => prod.metal_type))
  //     ).map((metalType) => ({ metal_type: metalType }));

  //     const uniqueDesignOptions = Array.from(
  //       new Set(productEntries.map((prod) => prod.design_master))
  //     ).map((designMaster) => ({ design_master: designMaster }));

  //     const uniquePurityOptions = Array.from(
  //       new Set(productEntries.map((prod) => prod.Purity))
  //     ).map((Purity) => ({ Purity }));

  //     setFormData((prevData) => ({
  //       ...prevData,
  //       code: productEntries[0]?.rbarcode || "",
  //       product_id: productEntries[0]?.product_id || "",
  //       product_name: productName,
  //     }));

  //     setFilteredMetalTypes(uniqueMetalTypes);
  //     setFilteredDesignOptions(uniqueDesignOptions);
  //     setFilteredPurityOptions(uniquePurityOptions);
  //   } else {
  //     // Reset if no matching product entries found
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       code: "",
  //       product_id: "",
  //       product_name: "",
  //       metal_type: "",
  //       design_name: "",
  //       purity: "",
  //       gross_weight: "",
  //       stone_weight: "",
  //       stone_price: "",
  //       weight_bw: "",
  //       va_on: "",
  //       va_percent: "",
  //       wastage_weight: "",
  //       total_weight_aw: "",
  //       mc_on: "",
  //       mc_per_gram: "",
  //       making_charges: "",
  //       rate: "",
  //       rate_amt: "",
  //       tax_percent: "",
  //       tax_amt: "",
  //       total_price: "",
  //       qty: "",
  //     }));

  //     setFilteredMetalTypes(metalTypes);
  //     setFilteredDesignOptions(designOptions);
  //     setFilteredPurityOptions(purity);
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

     // Handle file input separately
  if (e.target.type === "file") {
    const selectedFile = e.target.files[0]; // Ensure files exist
    if (selectedFile) {
      setFormData((prevData) => ({
        ...prevData,
        product_image: selectedFile, // Store the File object
      }));
    }
    return; // Exit early to avoid unnecessary updates
  }


    // Preserve the current barcode
    const currentBarcode = formData.code;

    // Update the specific field in formData
    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "purity" || name === "metal_type") {
      // Separate condition for gold
      if (formData.metal_type.toLowerCase() === "gold") {
        // Check for different purity values and set the rate accordingly for gold
        if (
          value.toLowerCase().includes("22") || // Check for 22 KT, 22K, 22k, etc.
          value.toLowerCase().includes("22kt") ||
          value.toLowerCase().includes("22k")
        ) {
          updatedFormData.rate = rates.rate_22crt;
        } else if (
          value.toLowerCase().includes("24") || // Check for 24 KT, 24K, etc.
          value.toLowerCase().includes("24kt") ||
          value.toLowerCase().includes("24k")
        ) {
          updatedFormData.rate = rates.rate_24crt;
        } else if (
          value.toLowerCase().includes("18") || // Check for 18 KT, 18K, etc.
          value.toLowerCase().includes("18kt") ||
          value.toLowerCase().includes("18k")
        ) {
          updatedFormData.rate = rates.rate_18crt;
        } else if (
          value.toLowerCase().includes("16") || // Check for 16 KT, 16K, etc.
          value.toLowerCase().includes("16kt") ||
          value.toLowerCase().includes("16k")
        ) {
          updatedFormData.rate = rates.rate_16crt;
        } else {
          updatedFormData.rate = "";
        }
      }
    }

    // Trigger recalculation for Total MC if relevant fields are updated
    if (
      formData.metal_type?.toLowerCase() === "gold" &&
      (name === "mc_per_gram" || name === "rate_amt")
    ) {
      const mcPercentage = parseFloat(
        name === "mc_per_gram" ? value : formData.mc_per_gram
      ) || 0;
      const rateAmount = parseFloat(
        name === "rate_amt" ? value : formData.rate_amt
      ) || 0;

      const totalMC = (mcPercentage / 100) * rateAmount;
      setFormData((prevData) => ({
        ...prevData,
        making_charges: totalMC.toFixed(2),
      }));
    }

    // Destructure relevant fields
    const { product_name, metal_type, design_name, purity } = updatedFormData;

    if (product_name && metal_type && design_name && purity) {
      // Filter matching entries
      const matchingEntries = data.filter(
        (prod) =>
          prod.sub_category === product_name &&
          prod.metal_type === metal_type &&
          prod.design_master === design_name &&
          prod.Purity === purity
      );

      console.log("Matching Entries:", matchingEntries);

      if (matchingEntries.length > 0) {
        if (matchingEntries.length > 1) {
          // Handle multiple matching entries
          setFormData((prevData) => ({
            ...prevData,
            code: currentBarcode, // Preserve the selected barcode
            barcodeOptions: matchingEntries.map((entry) => ({
              value: entry.PCode_BarCode,
              label: entry.PCode_BarCode,
            })),
          }));
        } else if (matchingEntries.length === 1) {
          const matchingEntry = matchingEntries[0];

          // Check if the product is already sold
          if (matchingEntry.Status === "Sold") {
            alert("The product is already sold out.");

            // Clear the form details after the alert, except for the barcode
            setFormData((prevData) => ({
              ...prevData,
              barcodeOptions: [], // Clear barcode options
              category: "",
              sub_category: "",
              gross_weight: "",
              stone_weight: "",
              stone_price: "",
              weight_bw: "",
              va_on: "",
              va_percent: "",
              wastage_weight: "",
              total_weight_aw: "",
              mc_on: "",
              mc_per_gram: "",
              making_charges: "",
              rate: "",
              rate_amt: "",
              tax_percent: "",
              tax_amt: "",
              total_price: "",
              qty: "",
            }));

            return; // Stop further execution
          }

          const productId = matchingEntry.product_id;

          const productDetails = products.find(
            (prod) => String(prod.product_id) === String(productId)
          );

          // Set the selected form data based on the matching entry
          setFormData((prevData) => ({
            ...prevData,
            code: currentBarcode || matchingEntry.PCode_BarCode, // Use existing barcode or set the new one
            category: matchingEntry.category,
            sub_category: matchingEntry.sub_category,
            gross_weight: matchingEntry.Gross_Weight,
            stone_weight: matchingEntry.Stones_Weight || "",
            stone_price: matchingEntry.Stones_Price || "",
            weight_bw: matchingEntry.Weight_BW || "",
            va_on: matchingEntry.Wastage_On || "",
            va_percent: matchingEntry.Wastage_Percentage || "",
            wastage_weight: matchingEntry.WastageWeight || "",
            total_weight_aw: matchingEntry.TotalWeight_AW || "",
            mc_on: matchingEntry.Making_Charges_On || "",
            mc_per_gram: matchingEntry.MC_Per_Gram || "",
            making_charges: matchingEntry.Making_Charges || "",
            rate: matchingEntry.rate || "",
            tax_percent: productDetails?.tax_slab || "",
            qty: 1,
            barcodeOptions: [], // Clear barcode options after setting the data
          }));
        }
      } else {
        console.log("No matching entries found. No updates made.");
      }
    } else {
      console.log("Required fields are missing or incomplete. No updates made.");
    }
  };

  const handleProductNameChange = (productName) => {
    const productEntries = data.filter((prod) => prod.sub_category === productName);

    if (productEntries.length > 0) {
      const uniqueMetalTypes = Array.from(
        new Set(productEntries.map((prod) => prod.metal_type))
      ).map((metalType) => ({ metal_type: metalType }));

      setFormData((prevData) => ({
        ...prevData,
        product_name: productName,
        metal_type: "",
        design_name: "",
      }));

      setFilteredMetalTypes(uniqueMetalTypes); // Update metal types based on selected product
      setFilteredDesignOptions([]); // Clear design options initially
    } else {
      // Reset fields if no matching product entries found
      setFormData((prevData) => ({
        ...prevData,
        code: "",
        product_name: "",
        metal_type: "",
        design_name: "",
        purity: "",
        category: "",
        sub_category: "",
        gross_weight: "",
        stone_weight: "",
        stone_price: "",
        weight_bw: "",
        va_on: "",
        va_percent: "",
        wastage_weight: "",
        total_weight_aw: "",
        mc_on: "",
        mc_per_gram: "",
        making_charges: "",
        rate: "",
        rate_amt: "",
        tax_percent: "",
        tax_amt: "",
        total_price: "",
        qty: "", // Rese
      }));

      setFilteredMetalTypes(metalTypes);
      setFilteredDesignOptions(designOptions);
    }
  };

  const handleMetalTypeChange = (metalType) => {
    const productEntries = data.filter(
      (prod) => prod.sub_category === formData.product_name && prod.metal_type === metalType
    );

    if (productEntries.length > 0) {
      const uniqueDesignOptions = Array.from(
        new Set(productEntries.map((prod) => prod.design_master))
      ).map((designMaster) => ({ design_master: designMaster }));

      setFormData((prevData) => ({
        ...prevData,
        metal_type: metalType,
        design_name: "",
      }));

      setFilteredDesignOptions(uniqueDesignOptions); // Update design options based on metal type
    } else {
      // Reset if no matching entries found
      setFormData((prevData) => ({
        ...prevData,
        metal_type: "",
        design_name: "",
      }));

      setFilteredDesignOptions([]);
    }
  };

  const handleDesignNameChange = (designName) => {
    const productEntries = data.filter(
      (prod) =>
        prod.sub_category === formData.product_name &&
        prod.metal_type === formData.metal_type &&
        prod.design_master === designName
    );

    if (productEntries.length > 0) {
      const uniquePurityOptions = Array.from(
        new Set(productEntries.map((prod) => prod.Purity))
      ).map((Purity) => ({ Purity }));

      setFormData((prevData) => ({
        ...prevData,
        design_name: designName,
        purity: "",
      }));

      setFilteredPurityOptions(uniquePurityOptions); // Update purity options based on design
    } else {
      setFormData((prevData) => ({
        ...prevData,
        design_name: "",
        purity: "",

      }));

      setFilteredPurityOptions([]);
    }
  };

  const [isBarcodeSelected, setIsBarcodeSelected] = useState(false);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);

  useEffect(() => {
    if (formData.category) {
      axios
        .get("http://localhost:5000/subcategory")
        .then((response) => {
          // Log the raw response to inspect its structure
          console.log("API Response:", response.data);

          // Ensure 'data' exists in the response and it's an array
          const fetchedSubcategories = Array.isArray(response.data.data)
            ? response.data.data
            : [];

          // Filter subcategories by the selected category
          const filteredSubcategories = fetchedSubcategories.filter(
            (subcategory) => subcategory.category === formData.category
          );

          // Map the filtered data to match the format for the dropdown
          const options = filteredSubcategories.map((subcategory) => {
            return {
              value: subcategory.subcategory_id, // Correct field
              label: subcategory.sub_category_name, // Correct field
            };
          });

          console.log("Mapped Subcategory Options:", options); // Console log to check mapped options

          setSubcategoryOptions(options);
        })
        .catch((error) => {
          console.error("Error fetching subcategory data:", error);
        });
    }
  }, [formData.category]);

  const [metaltypeOptions, setMetaltypeOptions] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/get/products');
        const data = await response.json();

        // Extract unique categories (metal types) from the data
        const categories = Array.from(
          new Set(data.map((product) => product.Category))
        );

        // Set the metal type options
        setMetaltypeOptions(categories.map((category) => ({
          value: category,
          label: category,
        })));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const [purityOptions, setpurityOptions] = useState([]);

  useEffect(() => {
    const fetchPurity = async () => {
      try {
        const response = await fetch('http://localhost:5000/purity');
        const data = await response.json();

        // Filter the data based on the formData.metal_type
        const filteredData = data.filter((product) => {
          return product.metal?.toLowerCase() === formData.metal_type?.toLowerCase();
        });

        // Extract unique purities (name | purity) from the filtered data
        const purities = Array.from(
          new Set(filteredData.map((product) => `${product.name} | ${product.purity}`))
        );

        // Set the filtered purity options
        const purityOptions = purities.map((purity) => ({
          value: purity,
          label: purity,
        }));

        setpurityOptions(purityOptions);

        // Automatically set the default purity to "22" if available in the filtered options
        const defaultPurity = purityOptions.find((option) =>
          /22/i.test(option.value)
        )?.value;

        setFormData((prevData) => ({
          ...prevData,
          purity: defaultPurity || "", // Set default purity or empty if not found
        }));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (formData.metal_type) {
      fetchPurity(); // Fetch purity only when metal_type is defined
    }
  }, [formData.metal_type]);


  const handleBarcodeChange = async (code) => {
    try {
      if (!code) {
        // If barcode is cleared, reset all related fields and set code to ""
        setIsBarcodeSelected(false);  // Reset the barcode selection flag
        setFormData((prevData) => ({
          ...prevData,
          code: "",  // Reset code when barcode is cleared
          product_id: "",
          product_name: "",
          metal_type: "",
          design_name: "",
          purity: "",
          category: "",
          sub_category: "",
          gross_weight: "",
          stone_weight: "",
          stone_price: "",
          weight_bw: "",
          va_on: "Gross Weight",
          va_percent: "",
          wastage_weight: "",
          total_weight_aw: "",
          mc_on: "MC %",
          mc_per_gram: "",
          making_charges: "",
          rate: "",
          rate_amt: "",
          tax_percent: "",
          tax_amt: "",
          total_price: "",
          qty: "", // Reset qty
        }));
        setIsQtyEditable(true); // Default to editable if barcode is cleared
        return; // Exit early
      }

      // Check for product by code
      const product = products.find((prod) => String(prod.rbarcode) === String(code));
      if (product) {
        setIsBarcodeSelected(true);

        // Find the default purity value that includes "22"
        const defaultPurity = purityOptions.find((option) =>
          /22/i.test(option.value)
        )?.value;  // Set the barcode as selected
        setFormData((prevData) => ({
          ...prevData,
          code: product.rbarcode,  // Retain the selected barcode
          product_id: product.product_id,
          product_name: "", // Make editable
          metal_type: product.Category,
          design_name: "", // Make editable
          purity: defaultPurity || "",
          category: product.product_name,
          sub_category: "",
          gross_weight: "",
          stone_weight: "",
          stone_price: "",
          weight_bw: "",
          va_on: "Gross Weight",
          va_percent: "",
          wastage_weight: "",
          total_weight_aw: "",
          mc_on: "MC %",
          mc_per_gram: "",
          making_charges: "",
          tax_percent: product.tax_slab,
          qty: 1, // Set qty to 1 for product
        }));
        setIsQtyEditable(false); // Set qty as read-only
      } else {
        // Check if tag exists by code
        const tag = data.find((tag) => String(tag.PCode_BarCode) === String(code));
        if (tag) {
          // setIsBarcodeSelected(true);  
          // If the tag is marked as "Sold"
          // if (tag.Status === "Sold") {
          //   alert("The product is already sold out!");
          //   setFormData((prevData) => ({
          //     ...prevData,
          //   }));
          //   setIsQtyEditable(true); // Allow editing of qty
          //   return;
          // }

          const productId = tag.product_id;
          const productDetails = products.find((prod) => String(prod.product_id) === String(productId));

          setFormData((prevData) => ({
            ...prevData,
            code: tag.PCode_BarCode || "", // Retain the barcode
            product_id: tag.product_id || "",
            opentag_id: tag.opentag_id || "",
            product_name: tag.sub_category || "", // Make editable
            metal_type: tag.metal_type || "",
            design_name: tag.design_master || "", // Make editable
            purity: tag.Purity || "",
            category: tag.category || "",
            sub_category: tag.sub_category || "",
            gross_weight: tag.Gross_Weight || "",
            stone_weight: tag.Stones_Weight || "",
            stone_price: tag.Stones_Price || "",
            weight_bw: tag.Weight_BW || "",
            va_on: tag.Wastage_On || "",
            va_percent: tag.Wastage_Percentage || "",
            wastage_weight: tag.WastageWeight || "",
            total_weight_aw: tag.TotalWeight_AW || "",
            mc_on: tag.Making_Charges_On || "",
            mc_per_gram: tag.MC_Per_Gram || "",
            making_charges: tag.Making_Charges || "",
            tax_percent: productDetails?.tax_slab || "",
            qty: 1, // Allow qty to be editable for tag
          }));
          setIsQtyEditable(true); // Allow editing of qty
        } else {
          // Reset form if no tag is found
          setFormData((prevData) => ({
            ...prevData,
            code: "", // Reset code
            product_id: "",
            product_name: "",
            metal_type: "",
            design_name: "",
            purity: "",
            category: "",
            sub_category: "",
            gross_weight: "",
            stone_weight: "",
            stone_price: "",
            weight_bw: "",
            va_on: "Gross Weight",
            va_percent: "",
            wastage_weight: "",
            total_weight_aw: "",
            mc_on: "MC %",
            mc_per_gram: "",
            making_charges: "",
            rate: "",
            rate_amt: "",
            tax_percent: "",
            tax_amt: "",
            total_price: "",
            qty: "", // Reset qty
          }));
          setIsQtyEditable(true); // Default to editable
        }
      }
    } catch (error) {
      console.error("Error handling code change:", error);
    }
  };



  return {
    formData,
    data,
    setFormData,
    products,
    isQtyEditable,
    handleChange,
    handleBarcodeChange,
    handleProductNameChange,
    handleMetalTypeChange,
    handleDesignNameChange,
    filteredDesignOptions,
    filteredPurityOptions,
    filteredMetalTypes,
    subcategoryOptions,
    purityOptions,
    metaltypeOptions,
    uniqueProducts,
    isBarcodeSelected,
  };

};

export default useProductHandlers;