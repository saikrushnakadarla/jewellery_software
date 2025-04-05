import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import baseURL from './../../../../../Url/NodeBaseURL';
import { useLocation } from "react-router-dom";
import Webcam from "react-webcam";

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
    pricing: "",
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
    disscount_percentage: "",
    disscount: "",
    mc_per_gram: "",
    making_charges: "",
    rate: "",
    pieace_cost: "",
    rate_amt: "",
    tax_percent: "03% GST",
    tax_amt: "",
    hm_charges: "60.00",
    total_price: "",
    transaction_status: "Sales",
    qty: "1",
    opentag_id: "",
    product_image: null,
    imagePreview: null,
    remarks: "",
    sale_status: "Delivered",
  });
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const [metalTypes, setMetalTypes] = useState([]);
  const [purity, setPurity] = useState([]);
  const [filteredMetalTypes, setFilteredMetalTypes] = useState([]);
  const [filteredDesignOptions, setFilteredDesignOptions] = useState([]);
  const [filteredPurityOptions, setFilteredPurityOptions] = useState([]);
  const [isBarcodeSelected, setIsBarcodeSelected] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [metaltypeOptions, setMetaltypeOptions] = useState([]);
  const [purityOptions, setpurityOptions] = useState([]);
  const [designOptions, setDesignOptions] = useState([]);
  const [image, setImage] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let currentRate = "";

    const isGoldLikeMetal = ["gold", "diamond", "others"].includes(formData.metal_type?.toLowerCase());

    if (isGoldLikeMetal) {
      if (!formData.purity) {
        currentRate = rates.rate_22crt; // Default to 22-carat rate if purity is empty
      } else if (formData.purity.includes("24")) {
        currentRate = rates.rate_24crt;
      } else if (formData.purity.includes("22")) {
        currentRate = rates.rate_22crt;
      } else if (formData.purity.includes("18")) {
        currentRate = rates.rate_18crt;
      } else if (formData.purity.includes("16")) {
        currentRate = rates.rate_16crt;
      } else {
        currentRate = rates.rate_22crt; // Default to 22-carat rate if no match
      }
    } else if (formData.metal_type?.toLowerCase() === "silver") {
      currentRate = rates.silver_rate;
    }

    setFormData((prevData) => ({
      ...prevData,
      rate: currentRate,
    }));
  }, [formData.purity, formData.metal_type, rates]);



  useEffect(() => {
    const fetchCurrentRates = async () => {
      try {
        const response = await axios.get(`${baseURL}/get/current-rates`);
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
      setData(result.result);

    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchTags();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "category" && value === "") {
      updatedFormData = {
        ...updatedFormData, // Keep other existing values
        code: "",
        product_id: "",
        metal: "",
        product_name: "",
        metal_type: "",
        design_name: "",
        purity: "",
        pricing: "",
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
        disscount_percentage: "",
        disscount: "",
        mc_per_gram: "",
        making_charges: "",
        rate: "",
        pieace_cost: "",
        rate_amt: "",
        tax_percent: "03% GST",
        tax_amt: "",
        hm_charges: "60.00",
        total_price: "",
        transaction_status: "Sales",
        qty: "1",
        opentag_id: "",
        product_image: null,
        imagePreview: null,
        remarks: "",
        sale_status: "Delivered"
      };
    }

    if (name === "mc_on") {
      if (value !== formData.mc_on) {
        // Reset values only when changing from the tag's initial value
        if (!formData.isTagSelected) {
          updatedFormData.mc_per_gram = "0";
          updatedFormData.making_charges = "0";
        } else {
          updatedFormData.mc_per_gram = formData.mc_per_gram; // Keep previous value
          updatedFormData.making_charges = formData.making_charges; // Keep previous value
        }
      }
    }

    // if (name === "purity" || name === "metal_type") {
    //   if (formData.metal_type.toLowerCase() === "gold") {
    //     // Check for different purity values and set the rate accordingly for gold
    //     if (
    //       value.toLowerCase().includes("22") || // Check for 22 KT, 22K, 22k, etc.
    //       value.toLowerCase().includes("22kt") ||
    //       value.toLowerCase().includes("22k")
    //     ) {
    //       updatedFormData.rate = rates.rate_22crt;
    //     } else if (
    //       value.toLowerCase().includes("24") || // Check for 24 KT, 24K, etc.
    //       value.toLowerCase().includes("24kt") ||
    //       value.toLowerCase().includes("24k")
    //     ) {
    //       updatedFormData.rate = rates.rate_24crt;
    //     } else if (
    //       value.toLowerCase().includes("18") || // Check for 18 KT, 18K, etc.
    //       value.toLowerCase().includes("18kt") ||
    //       value.toLowerCase().includes("18k")
    //     ) {
    //       updatedFormData.rate = rates.rate_18crt;
    //     } else if (
    //       value.toLowerCase().includes("16") || // Check for 16 KT, 16K, etc.
    //       value.toLowerCase().includes("16kt") ||
    //       value.toLowerCase().includes("16k")
    //     ) {
    //       updatedFormData.rate = rates.rate_16crt;
    //     } else {
    //       updatedFormData.rate = "";
    //     }
    //   }
    // }

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

    if (name === "disscount_percentage") {
      const discountPercentage = parseFloat(value) || 0;
      const makingCharges = parseFloat(formData.making_charges) || 0;
      const discountAmount = (discountPercentage / 100) * makingCharges;

      updatedFormData.disscount = discountAmount.toFixed(2);
    }

    if (name === "pricing" && value === "By fixed") {
      // Clear the specified fields if pricing is "By fixed"
      updatedFormData.purity = "";
      updatedFormData.gross_weight = "";
      updatedFormData.stone_weight = "";
      updatedFormData.weight_bw = "";
      updatedFormData.stone_price = "";
      updatedFormData.va_on = "Gross Weight"; // Reset to default if needed
      updatedFormData.va_percent = "";
      updatedFormData.wastage_weight = "";
      updatedFormData.total_weight_av = "";
      updatedFormData.mc_on = "MC %"; // Reset to default if needed
      updatedFormData.mc_per_gram = "";
      updatedFormData.making_charges = "";
      updatedFormData.disscount_percentage = "";
      updatedFormData.disscount = "";
      updatedFormData.rate = "";
    }

    setFormData(updatedFormData);
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
        disscount_percentage: "",
        disscount: "",
        rate: "",
        pieace_cost: "",
        rate_amt: "",
        tax_percent: "",
        tax_amt: "",
        hm_charges: "60.00",
        total_price: "",
        qty: "", // Rese
        remarks: "",
        sale_status: "Delivered"
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

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${baseURL}/get/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const result = await response.json();
      if (result && Array.isArray(result)) {
        const formattedOptions = result.map((item) => ({
          label: item.product_name, // Display name
          value: item.product_name, // Unique value
        }));
        setCategoryOptions(formattedOptions);
      } else {
        console.error("Invalid API response format", result);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchSubCategory = async () => {
    try {
      const response = await fetch(`${baseURL}/subcategory`); // Use the correct API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      if (result && result.data) {
        // If formData.metal_type is available, filter based on it, otherwise show all
        const filteredData = formData.category
          ? result.data.filter((item) => item.category === formData.category)
          : result.data;

        // Format the filtered options
        const formattedOptions = filteredData.map((item) => ({
          label: item.sub_category_name, // Display value
          value: item.sub_category_name, // Unique ID for value
        }));

        setSubcategoryOptions(formattedOptions);
      } else {
        console.error("Invalid API response format", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, [formData.category]);

  const [allMetalTypes, setAllMetalTypes] = useState([]);

  useEffect(() => {
    const fetchMetalType = async () => {
      try {
        const response = await fetch(`${baseURL}/metaltype`);
        const data = await response.json();

        // Extract all metal types
        const allMetalTypes = Array.from(new Set(data.map((product) => product.metal_name)));

        // Store all metal types
        setAllMetalTypes(allMetalTypes);

        // Initially, show all metal types
        setMetaltypeOptions(allMetalTypes.map((category) => ({
          value: category,
          label: category,
        })));
      } catch (error) {
        console.error('Error fetching metal types:', error);
      }
    };

    fetchMetalType();
  }, []);

  useEffect(() => {
    if (!formData.category) {
      // Show all metal types if no category is selected
      setMetaltypeOptions(allMetalTypes.map((category) => ({
        value: category,
        label: category,
      })));
      return;
    }

    const fetchFilteredMetalTypes = async () => {
      try {
        const response = await fetch(`${baseURL}/get/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();

        // Find selected category object
        const selectedProduct = result.find((item) => item.product_name === formData.category);

        if (selectedProduct) {
          const filteredMetals = allMetalTypes.filter(
            (metal) => metal === selectedProduct.Category
          );

          const options = filteredMetals.map((category) => ({
            value: category,
            label: category,
          }));

          setMetaltypeOptions(options);

          // Auto-select the first option only when a category is selected
          if (formData.category && options.length > 0) {
            setFormData((prev) => ({ ...prev, metal_type: options[0].value }));
          }
        }
      } catch (error) {
        console.error("Error fetching filtered metal types:", error);
      }
    };

    fetchFilteredMetalTypes();
  }, [formData.category, allMetalTypes]);

  useEffect(() => {
    const fetchDesignName = async () => {
      try {
        const response = await fetch(`${baseURL}/designmaster`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result = await response.json();
        if (result && Array.isArray(result)) {
          const formattedOptions = result.map((item) => ({
            label: item.design_name, // Display name
            value: item.design_name, // Unique value
          }));
          setDesignOptions(formattedOptions);
        } else {
          console.error("Invalid API response format", result);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchDesignName();
  }, []);

  useEffect(() => {
    const fetchPurity = async () => {
      try {
        const response = await fetch(`${baseURL}/purity`);
        const data = await response.json();

        let filteredData = data;

        // If metal_type is set, filter based on it; otherwise, show all
        if (formData.metal_type) {
          filteredData = data.filter((product) =>
            product.metal?.toLowerCase() === formData.metal_type.toLowerCase()
          );
        }

        const purities = Array.from(
          new Set(filteredData.map((product) => `${product.name} | ${product.purity}`))
        );

        const purityOptions = purities.map((purity) => ({
          value: purity,
          label: purity,
        }));

        setpurityOptions(purityOptions);

        // Set default purity only if metal_type is available
        if (formData.metal_type && purityOptions.length > 0) {
          const defaultPurity = purityOptions.find((option) =>
            /22/i.test(option.value)
          )?.value;

          setFormData((prevData) => ({
            ...prevData,
            // purity: defaultPurity || "",
          }));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchPurity();
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
          pricing: "",
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
          disscount_percentage: "",
          disscount: "",
          rate: "",
          pieace_cost: "",
          rate_amt: "",
          tax_percent: "",
          tax_amt: "",
          hm_charges: "60.00",
          total_price: "",
          qty: "", // Reset qty
          remarks: "",
          sale_status: "Delivered"
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
          // purity: defaultPurity || "",
          pricing: "",
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
          pieace_cost: "",
          mc_on: "MC %",
          mc_per_gram: "",
          making_charges: "",
          disscount_percentage: "",
          disscount: "",
          tax_percent: product.tax_slab,
          qty: 1, // Set qty to 1 for product
        }));
        setIsQtyEditable(true); // Set qty as read-only
      } else {
        // Check if tag exists by code
        const tag = data.find((tag) => String(tag.PCode_BarCode) === String(code));
        if (tag) {
          // setIsBarcodeSelected(true);  
          // If the tag is marked as "Sold"
          if (tag.Status === "Sold" || tag.Status === "Sale Returned") {
            alert("The product is already sold out!");
            setFormData((prevData) => ({
              ...prevData,
            }));
            setIsQtyEditable(true); // Allow editing of qty
            return;
          }

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
            pricing: tag.Pricing || "",
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
            pieace_cost: tag.pieace_cost || "",
            mc_on: tag.Making_Charges_On || "",
            mc_per_gram: tag.MC_Per_Gram || "",
            making_charges: tag.Making_Charges || "",
            tax_percent: productDetails?.tax_slab || "",
            qty: 1, // Allow qty to be editable for tag
          }));
          setIsQtyEditable(false); // Allow editing of qty
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
            pricing: "",
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
            disscount_percentage: "",
            disscount: "",
            rate: "",
            pieace_cost: "",
            rate_amt: "",
            tax_percent: "",
            tax_amt: "",
            hm_charges: "60.00",
            total_price: "",
            qty: "", // Reset qty
            remarks: "",
            sale_status: "Delivered"
          }));
          setIsQtyEditable(true); // Default to editable
        }
      }
    } catch (error) {
      console.error("Error handling code change:", error);
    }
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData((prevData) => ({
  //         ...prevData,
  //         imagePreview: reader.result, // Update image preview in formData
  //       }));
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // This function handles the file input change event for the gallery selection.

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imagePreview: reader.result }));
      };
      reader.readAsDataURL(file);
      setShowOptions(false); // Hide options after selection
    }
  };

  const clearImage = () => {
    setFormData({ imagePreview: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setFormData((prev) => ({ ...prev, imagePreview: imageSrc }));
      setShowWebcam(false);
      setShowOptions(false); // Hide options after capturing
    }
  };


  return {
    formData,
    data,
    setFormData,
    products,
    isQtyEditable,
    handleChange,
    handleImageChange,
    fileInputRef,
    clearImage,
    captureImage,
    setShowWebcam,
    showWebcam,
    webcamRef,
    setShowOptions,
    showOptions,
    image,
    handleBarcodeChange,
    handleProductNameChange,
    handleMetalTypeChange,
    handleDesignNameChange,
    filteredDesignOptions,
    filteredPurityOptions,
    filteredMetalTypes,
    categoryOptions,
    subcategoryOptions,
    designOptions,
    purityOptions,
    metaltypeOptions,
    uniqueProducts,
    isBarcodeSelected,
    fetchCategory,
    fetchSubCategory,
  };

};

export default useProductHandlers;